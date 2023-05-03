
#include "instruction.h"

Instruction::Instruction(
    const char * mnem, 
    uint8_t bytes,
    uint8_t cycles,
    Operation op, 
    AddressMode am,
    EBranchType branchType) {

    _mnem = mnem;
    _bytes = bytes;
    _cycles = cycles;
    _operation = op;
    _addressMode = am;
    _branchType = branchType;
}

void Instruction::Execute(CPU * cpu) {    
    SAddressResult adm = _addressMode(cpu);
    _operation(cpu, adm);
}

const char* Instruction::Mnemonic() {
    return _mnem;
}

uint8_t Instruction::Bytes() {
    return _bytes;
}

uint8_t Instruction::Cycles() {
    return _cycles;
}

EBranchType Instruction::BranchType() {
    return _branchType;
}

SAddressResult Instruction::RunAddresser(CPU * cpu) {
    return _addressMode(cpu);
}

Instruction::~Instruction() {

}