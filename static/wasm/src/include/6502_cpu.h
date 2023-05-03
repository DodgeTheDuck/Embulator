#pragma once

#include "cpu.h"
#include "register.h"

class Timer;

enum ERegisters {
    A = 0x0,
    X = 0x1,
    Y = 0x2,
    STATUS = 0x3,
    PC = 0x4,
    SP = 0x5
};

enum EFlags {
    C = (1 << 0),
    Z = (1 << 1),
    I = (1 << 2),
    D = (1 << 3),
    B = (1 << 4),
    U = (1 << 5),
    V = (1 << 6),
    N = (1 << 7)
};

class Bus;

class CPU_6502 : public CPU {

public:
    CPU_6502(Bus * bus);
    void Tick(double delta);
    void Clock(long totalCycles);
    void Reset();
    void Draw();
    void Nmi();
    virtual uint16_t GetProgramCounter();
    virtual uint8_t Read(uint16_t address, bool readOnly = false);
    virtual void Write(uint16_t address, uint8_t value);
    virtual void Push(uint8_t value);
    virtual uint8_t Pop();
    // uint8_t Fetch(bool implied);

private:
    Timer * _cycleTimer;

    int32_t _cycleCount;
    int32_t _cycles;


};