
#pragma once

#include "mapper.h"

class Mapper000 : public Mapper {

public:
    Mapper000(uint8_t prgBanks, uint8_t chrBanks);

    virtual uint16_t MapRead(uint16_t address, uint8_t &data);
    virtual uint16_t MapWrite(uint16_t address, uint8_t &data);

};