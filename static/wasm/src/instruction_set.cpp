
#include "instruction_set.h"
#include "instruction.h"

InstructionSet::InstructionSet() {

}

Instruction * InstructionSet::Lookup(uint8_t opcode) {
    return this->_instructions[opcode];
}

void InstructionSet::_AddInstruction(uint8_t opcode, Instruction * ins) {
    this->_instructions[opcode] = ins;
}

