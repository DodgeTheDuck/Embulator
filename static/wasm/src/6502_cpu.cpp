
#include "6502_cpu.h"
#include "bus.h"
#include "6502_instruction_set.h"
#include "instruction.h"
#include "timer.h"
#include <emscripten/emscripten.h>

EM_JS(void, JS_UpdateCpu, (const char * name, uint32_t nameLength, uint32_t value, uint32_t s), {
	UpdateComponent("cpu", {name: name, length: nameLength, value: value, bits: s});
});

CPU_6502::CPU_6502(Bus * bus) : CPU(bus) {
    
    this->_cycleCount = 0;
    this->_cycles = 0;

    this->_registers.push_back(new Register("A", 8));
    this->_registers.push_back(new Register("X", 8));
    this->_registers.push_back(new Register("Y", 8));
    this->_registers.push_back(new Register("STATUS", 8));
    this->_registers.push_back(new Register("PC", 16));
    this->_registers.push_back(new Register("SP", 8));

    this->_instructions = new IS_6502(this);

    this->_cycleTimer = new Timer();

}

void CPU_6502::Tick(double delta) {

    this->_cycleTimer->Tick(delta);

}

void CPU_6502::Clock(long totalCycles) {

    uint16_t pc = this->GetRegister(ERegisters::PC)->Read();
    uint8_t data = this->_bus->Read(pc);

    Instruction * ins = this->_instructions->Lookup(data);

    if(ins) {   
        
        if(this->_cycles == 0) {         
            //printf("PC: %u -- INS: %s\n", pc, ins->Mnemonic());
            uint8_t bytes = ins->Bytes();
            this->GetRegister(ERegisters::PC)->Write(pc + bytes);

            ins->Execute(this);        


            uint16_t pc = this->GetRegister(ERegisters::PC)->Read();

            this->_cycles = ins->Cycles()-1;
            this->_cycleCount += ins->Cycles();
        } else {
            this->_cycles--;
        }

    }

}

void CPU_6502::Draw() {

    if(this->_cycleTimer->Second()) {

        for(int i = 0; i < this->_registers.size(); i++) {
            Register * reg = this->_registers[i];    
            JS_UpdateCpu(reg->Name(), strlen(reg->Name()), reg->Read(), reg->Size());
        }

        this->_cycleCount = 0;
    }

}

uint8_t CPU_6502::Read(uint16_t address, bool readOnly) {
    return this->_bus->Read(address);
}

void CPU_6502::Write(uint16_t address, uint8_t value) {
    
}

void CPU_6502::Push(uint8_t value) {
    uint16_t sp = this->GetRegister(ERegisters::SP)->Read();
    this->_bus->Write(0x0100 + sp, value);
    this->GetRegister(ERegisters::SP)->Dec();
}

uint8_t CPU_6502::Pop() {
    this->GetRegister(ERegisters::SP)->Inc();
    uint16_t sp = this->GetRegister(ERegisters::SP)->Read();
    return this->_bus->Read(0x0100 + sp);
}

void CPU_6502::Reset() {

    for(int i = 0; i < this->_registers.size(); i++) {
        this->_registers[i]->Write(0x0);
    }

    this->GetRegister(ERegisters::SP)->Write(0xFF);

    uint16_t entryPointer = 0xFFFC;

    uint16_t lo = _bus->Read(entryPointer);
    uint16_t hi = _bus->Read(entryPointer+1);
    uint16_t entry = (hi << 8) | lo;
    printf("pc: %u\n", entry);
    this->GetRegister(ERegisters::PC)->Write(entry);

}

void CPU_6502::Nmi() {

    //printf("NMI: %u\n", GetRegister(ERegisters::PC)->Read());

    uint16_t pc = GetRegister(ERegisters::PC)->Read();
    Push((pc >> 8) & 0x00FF);
    Push(pc & 0x00FF);

    GetRegister(ERegisters::STATUS)->Clear(EFlags::B);
    //GetRegister(ERegisters::STATUS)->Set(EFlags::U);
    GetRegister(ERegisters::STATUS)->Set(EFlags::I);

    Push(GetRegister(ERegisters::STATUS)->Read());

    uint16_t address = 0xFFFA;
    uint16_t lo = Read(address);
    uint16_t hi = Read(address+1);

    GetRegister(ERegisters::PC)->Write((hi << 8) | lo);

    _cycles = 8;

}

uint16_t CPU_6502::GetProgramCounter() {
    return (uint16_t)GetRegister(ERegisters::PC)->Read();
}