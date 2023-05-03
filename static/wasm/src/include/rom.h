#pragma once

#include "storage.h"

class ROM : public Storage {

public:
	ROM(uint64_t size, Bus * bus);
	virtual uint8_t Read(uint16_t addr, bool readOnly = false);

};
