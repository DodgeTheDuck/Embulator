
#include "bus.h"
#include "component.h"

uint8_t Bus::Read(uint16_t address) {
    for(int i = 0; i < this->_connections.size(); i++) {
        Connection c = this->_connections[i];
        if(address >= c.addrMin && address <= c.addrMax) {
            return c.component->Read(address, false);
        }
    }
    return 0x00;
}

void Bus::Write(uint16_t address, uint8_t data) {
    for(int i = 0; i < this->_connections.size(); i++) {
        Connection c = this->_connections[i];
        if(address >= c.addrMin && address <= c.addrMax) {
            c.component->Write(address, data);
        }
    }
}

bool Bus::Probe(uint16_t address) {
    for(int i = 0; i < this->_connections.size(); i++) {
        Connection c = this->_connections[i];
        if(address >= c.addrMin && address <= c.addrMax) {
            return true;
        }
    }
    return false;
}

void Bus::Connect(Component * component, uint16_t addr_min, uint16_t addr_max) {
    Connection c;
    c.component = component;
    c.addrMin = addr_min;
    c.addrMax = addr_max;
    this->_connections.push_back(c);
}
