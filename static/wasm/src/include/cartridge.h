#pragma once

#include "component.h"

class Mapper;
class Bus;

enum EMirrorType {
	VERTICAL,
	HORIZONTAL
};

class Cartridge : public Component {

public:
	Cartridge(uint8_t * data, uint32_t size, Bus * bus);

    virtual void Tick(double delta);    
    virtual void Clock(long totalCycles);
    virtual void Draw();
	virtual uint8_t Read(uint16_t address, bool readOnly = false);
    virtual void Write(uint16_t address, uint8_t value);

	EMirrorType GetMirrorType();

private: 

	uint16_t _prgChunkSize;
	uint16_t _chrChunkSize;

	uint8_t _prgSize;
	uint8_t _chrSize;

	uint16_t _prgStart;
	uint16_t _chrStart;

	uint8_t * _prgData;
	uint16_t _prgLength;

	uint8_t * _chrData;
	uint16_t _chrLength;

	EMirrorType _mirrorType;

	Mapper * _mapper;

};