
#include "system_nes.h"

#include <emscripten\emscripten.h>
#include "component.h"
#include "clock.h"
#include "6502_cpu.h"
#include "6502_instruction_set.h"
#include "ram.h"
#include "bus.h"
#include "register.h"
#include "cartridge.h"
#include "disassembler.h"
#include "dma.h"
#include "ppu.h"
#include "timer.h"
#include "input.h"

EM_JS(void, JS_UpdateCycles, (uint32_t cycles), {
	UpdateComponent("system", {cycles: cycles});
});

SystemNes::SystemNes() : EmulatedSystem() {

    _cpuBus = new Bus();
    _ppuBus = new Bus();
    _cpu = new CPU_6502(_cpuBus);
    _ram = new RAM(8192, _cpuBus);
    _ppu = new PPU(_ppuBus);
    _dma = new DMA(_cpuBus, _ppu);
    _input = new Input(_cpuBus);

    _cpuBus->Connect(_ram, 0x0000, 0x1FFF);
    _cpuBus->Connect(_ppu, 0x2000, 0x3FFF);       
    _cpuBus->Connect(_dma, 0x4014, 0x4014);        
    _cpuBus->Connect(_input, 0x4016, 0x4017);        

    _components.push_back(_cpu);
    _components.push_back(_ram);
    _components.push_back(_ppu);
    _components.push_back(_input);

    _cycleTimer = new Timer();

    _clock = new Clock(5000000);

    _cpu->Reset();

}

void SystemNes::Tick(double delta) {

    _cycleTimer->Tick(delta);

    for(int i = 0; i < _components.size(); i++) {
        _components[i]->Tick(delta);
    }

    if(_running || _step) {

        long pulses = 1;

        if(!_step) {
            pulses = _clock->Oscillate(delta);
        }

        for(int i = 0; i < pulses; i++) {

            _totalCycles++;

            if((_totalCycles % 3) == 0 || _step) {                
                if(_running && _disassembler->IsBreakpoint(_cpu->GetRegister(ERegisters::PC)->Read())) {
                    _running = false;
                    break;
                }
                _dma->Clock(_totalCycles);
                _cpu->Clock(_totalCycles);                           
            }

            _ppu->Clock(_totalCycles);


            if(_ppu->IsNmi()) {
                _cpu->Nmi();
                _ppu->ClearNmi();
            }
        
        }    

        _cps += pulses;

        if(_step) {
            _step = false;
        }

    }

}

void SystemNes::Draw(double delta) {
    EmulatedSystem::Draw(delta);
    if(_debugging) {
        if(_disassembler) {
            _disassembler->Draw();
        }
        
        if(_cycleTimer->Second()) {
            JS_UpdateCycles(_cps);
            _cps = 0;
        }
    }
}

void SystemNes::LoadProgram(uint8_t * data, uint16_t size) {

    _cart = new Cartridge(data, size, _cpuBus);

    _ppu->SetCart(_cart);

    _cpuBus->Connect(_cart, 0x8000, 0xFFFF);
    _ppuBus->Connect(_cart, 0x0000, 0x1FFF);
    _ppuBus->Connect(_cart, 0x8000, 0xFFFF);

    _cpu->Reset();

    _disassembler = new Disassembler(_cpu, _cpuBus, new IS_6502(_cpu), 0xFFFF);
    _disassembler->Run(_cpu->GetProgramCounter());


    _running = true;

}

uint8_t SystemNes::Read(uint16_t address) {
    return _cpuBus->Read(address);
}

Disassembler * SystemNes::GetDisassembler() {
    return _disassembler;
}

Input * SystemNes::GetInput() {
    return _input;
}

void SystemNes::Step() {
    _step = true;
}