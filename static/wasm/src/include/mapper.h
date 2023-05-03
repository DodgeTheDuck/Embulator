
#pragma once

#include <cstdint>

class Mapper {

public:
    Mapper(uint8_t prgBanks, uint8_t chrBanks);

    virtual uint16_t MapRead(uint16_t address, uint8_t &data) = 0;
    virtual uint16_t MapWrite(uint16_t address, uint8_t &data) = 0;

protected: 
    uint8_t _prgBanks;
    uint8_t _chrBanks;

};