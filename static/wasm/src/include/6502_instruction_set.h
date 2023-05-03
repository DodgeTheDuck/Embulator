#pragma once

#include "instruction_set.h"

class CPU_6502;

class IS_6502 : public InstructionSet {

public:
    IS_6502(CPU_6502 * cpu);
    virtual void Run(uint8_t opcode);
    ~IS_6502();

private:

    CPU_6502 * _cpu;

};