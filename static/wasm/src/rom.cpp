
#include "rom.h"
#include "bus.h"

ROM::ROM(uint64_t size, Bus * bus) : Storage(size, bus) {

}

uint8_t ROM::Read(uint16_t addr, bool readOnly = false) {
	return _Read(addr);
}