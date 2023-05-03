
#include "mapper_000.h"

Mapper000::Mapper000(uint8_t prgBanks, uint8_t chrBanks) : Mapper(prgBanks, chrBanks) {

}

uint16_t Mapper000::MapRead(uint16_t address, uint8_t &data) {
    uint16_t mapped = address;
    if(address >= 0x8000 && address <= 0xFFFF) {
        mapped = address & (_prgBanks > 1 ? 0x7FFF : 0x3FFF);
    }
    return mapped;
}

uint16_t Mapper000::MapWrite(uint16_t address, uint8_t &data) {    
    uint16_t mapped = address;
    return mapped;
}