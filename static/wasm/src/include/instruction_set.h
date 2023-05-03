#pragma once
#include <map>

class Instruction;

class InstructionSet {

public:
    InstructionSet();

protected:    
    std::map<uint8_t, Instruction *> _instructions;

private:

public:
    virtual void Run(uint8_t opcode) = 0;
    Instruction * Lookup(uint8_t opcode);

protected:
    void _AddInstruction(uint8_t opcode, Instruction * ins);

private:

};