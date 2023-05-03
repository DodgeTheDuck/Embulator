#pragma once

#include "component.h"
#include <vector>

class Register;
class Bus;
class InstructionSet;

class CPU : public Component {

public:
    virtual void Tick(double delta) = 0;
    virtual void Clock(long totalCycles) = 0;
    virtual void Draw() = 0;
    Register * GetRegister(uint8_t index);
    virtual uint16_t GetProgramCounter() = 0;
    virtual uint8_t Read(uint16_t address, bool readOnly = false) = 0;
    virtual void Write(uint16_t address, uint8_t value) = 0;
    virtual void Push(uint8_t value) = 0;
    virtual uint8_t Pop() = 0;

protected:
    CPU(Bus * bus);
    std::vector<Register *> _registers;
    InstructionSet * _instructions;

};