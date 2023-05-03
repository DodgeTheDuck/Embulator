
#include "cartridge.h"
#include "bus.h"
#include "mapper.h"
#include "mapper_000.h"
#include "mapper_001.h"
#include <string>

Cartridge::Cartridge(uint8_t * data, uint32_t size, Bus * bus) : Component(bus) {

    _prgChunkSize = 16384;
    _chrChunkSize = 8192;

    _prgSize = data[4];
    _chrSize = data[5];

    _mirrorType = (data[6] & 0x01) ? EMirrorType::VERTICAL : EMirrorType::HORIZONTAL;

    _prgStart = 16;
    _chrStart = _prgStart + _prgSize * _prgChunkSize;

    _prgLength = _prgSize * _prgChunkSize;
    _prgData = (uint8_t*)calloc(_prgLength, sizeof(uint8_t));

    for(int i = 0; i < _prgLength; i++) {
        _prgData[i] = data[i+_prgStart];
    }
    
    _chrLength = _chrSize * _chrChunkSize;
    _chrData = (uint8_t*)calloc(_chrLength, sizeof(uint8_t));

    for(int i = 0; i < _chrLength; i++) {
        _chrData[i] = data[i+_chrStart];
    }

    uint16_t mapperId = ((data[7] >> 4) << 4) | (data[6] >> 4);

    switch(mapperId) {
        case 0: {
            _mapper = new Mapper000(_prgSize, _chrSize);
            break;
        }
        case 1: {
            _mapper = new Mapper001(_prgSize, _chrSize);
            break;
        }
        default: {
            printf("Mapper %u not supported\n", mapperId);
            break;
        }
    }

}

void Cartridge::Tick(double delta) {

}

void Cartridge::Clock(long totalCycles) {

}

void Cartridge::Draw() {

}

uint8_t Cartridge::Read(uint16_t address, bool readOnly) {
    uint16_t mapped = address;
    uint8_t data = 0;
    if(_mapper) {
        mapped = _mapper->MapRead(address, data);
        if(mapped == 0xFFFFFFFF) {
            return data;
        }
    }
    if(address >= 0x0000 && address <= 0x1FFF) {
        return _chrData[mapped];
    }
    if(address >= 0x8000 && address <= 0xFFFF) {
        return _prgData[mapped];
    }
    return 0x1F;
}

void Cartridge::Write(uint16_t address, uint8_t value) {
    uint16_t mapped = address;
    uint8_t data = 0;
    if(_mapper) {
        mapped = _mapper->MapWrite(address, data);
        if(mapped == 0xFFFFFFFF) {
            
        }
    }

}

EMirrorType Cartridge::GetMirrorType() {
    return _mirrorType;
}