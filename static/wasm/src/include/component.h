#pragma once

#include "def.h"
#include <string>

class Bus;

class Component {

public:
    Component(Bus * bus);
    virtual void Tick(double delta) = 0;    
    virtual void Clock(long totalCycles) = 0;
    virtual void Draw() = 0;
    virtual uint8_t Read(uint16_t address, bool readOnly = false) = 0;
    virtual void Write(uint16_t address, uint8_t value) = 0;
    Bus * GetBus();

protected:
    Bus * _bus;

};