#pragma once

#include "def.h"

#include <vector>

class Component;

struct Connection {
    Component * component;
    uint16_t addrMin;
    uint16_t addrMax;
};

class Bus {

public:
    uint8_t Read(uint16_t addr);
    void Write(uint16_t addr, uint8_t data);
    bool Probe(uint16_t address);
    void Connect(Component * component, uint16_t addr_min, uint16_t addr_max);

private:
    std::vector<Connection> _connections;

};