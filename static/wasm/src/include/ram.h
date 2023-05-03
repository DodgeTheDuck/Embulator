#pragma once

#include "storage.h"

class Bus;

class RAM : public Storage {

public:
	RAM(uint64_t size, Bus * bus);
	virtual uint8_t Read(uint16_t addr, bool readOnly = false);
	virtual void Write(uint16_t addr, uint8_t data);

	virtual void Tick(double delta);
	virtual void Clock(long totalCycles);

};