#pragma once

#include "def.h"
#include "component.h"

class Storage : public Component {

public:
	virtual uint8_t Read(uint16_t addr, bool readOnly = false) = 0;
	virtual void Write(uint16_t addr, uint8_t data) = 0;

	virtual void Tick(double delta) = 0;
	virtual void Clock(long totalCycles) = 0;
	virtual void Draw();

	Storage(uint64_t size, Bus * bus);

protected:
	uint8_t _Read(uint16_t addr);
	void _Write(uint16_t addr, uint8_t data);
	~Storage();

private:
	uint8_t * _data;
	uint64_t _size;

};