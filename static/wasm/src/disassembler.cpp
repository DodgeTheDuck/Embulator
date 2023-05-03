
#include "disassembler.h"

#include <emscripten/emscripten.h>
#include <sstream>
#include "instruction_set.h"
#include "instruction.h"
#include "cpu.h"
#include "6502_cpu.h"
#include "bus.h"

EM_JS(void, JS_UpdateDisassembler, (int address, const char* mnem), {
	UpdateComponent("disassembler", {address: address, mnem: mnem});
});

EM_JS(void, JS_UpdatePC, (int pc), {
	UpdateComponent("disassembler", {pc: pc});
});

Disassembler::Disassembler(CPU * cpu, Bus * bus, InstructionSet * is, int maxLength) {
    _cpu = cpu;
    _bus = bus;
    _is = is;
    _rows = (Row**)calloc(maxLength, sizeof(Row*));
    _length = maxLength;
    _redrawRows = false;
}

void Disassembler::Run(uint16_t address) {    

    uint16_t tempPC = _cpu->GetRegister(ERegisters::PC)->Read();

    this->_Traverse(address);
    
    uint16_t nmiPointer = 0xFFFA;
    uint16_t lo = _bus->Read(nmiPointer);
    uint16_t hi = _bus->Read(nmiPointer+1);

    uint16_t nmiAddress = (hi << 8) | lo;

    this->_Traverse(nmiAddress);

    _cpu->GetRegister(ERegisters::PC)->Write(tempPC);

    _redrawRows = true;
}

void Disassembler::Draw() {

    uint16_t pc = _cpu->GetProgramCounter();

    JS_UpdatePC(pc);

    if(_redrawRows) {
        for(int i = 0x0000; i < 0xFFFF; i++) {
            Row * r = this->_rows[i];
            if(r) {
                JS_UpdateDisassembler(r->address, r->mnem);
            }
        }
        _redrawRows = false;
    }

}

void Disassembler::AddBreakpoint(uint16_t address) {
    _breakpoints.push_back(address);
}

void Disassembler::RemoveBreakpoint(uint16_t address) {
    for(int i = 0; i < _breakpoints.size(); i++) {
        if(_breakpoints[i] == address) {
            _breakpoints.erase(_breakpoints.begin() + i);
        }
    }
}

bool Disassembler::IsBreakpoint(uint16_t address) {
    for(int i = 0; i < _breakpoints.size(); i++) {
        if(_breakpoints[i] == address) return true;
    }
    return false;
}

void Disassembler::_Traverse(uint16_t address) {

    uint16_t offset = 0;

    while(1) {

        if(this->_rows[address+offset]) {
            return;
        }

        uint8_t value = this->_bus->Read(address + offset);

        Instruction * ins = this->_is->Lookup(value);

        if(ins) {

            _cpu->GetRegister(ERegisters::PC)->Write(address+offset+ins->Bytes());

            this->_rows[address+offset] = new Row(
                (uint16_t)(address+offset),
                ins->Mnemonic()
            );

            if(ins->BranchType() == EBranchType::RETURN) {          
                return;
            } else if(ins->BranchType() == EBranchType::UNCONDITIONAL) {
                SAddressResult result = ins->RunAddresser(_cpu);                            
                this->_Traverse(result.address);              
                return;
            } else if(ins->BranchType() == EBranchType::CONDITIONAL) {
                SAddressResult result = ins->RunAddresser(_cpu);                
                this->_Traverse(result.address);
            }    

            offset += ins->Bytes();
        } else {
            offset++;
        }


        if(address+offset > this->_length-1) {
            break;
        }

    };

}