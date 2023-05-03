
#include "bus.h"
#include "ram.h"

RAM::RAM(uint64_t size, Bus * bus) : Storage(size, bus) {

}

uint8_t RAM::Read(uint16_t addr, bool readOnly) {
	return _Read(addr);
}

void RAM::Write(uint16_t addr, uint8_t data) {
	return _Write(addr, data);
}

void RAM::Tick(double delta) {

}

void RAM::Clock(long totalCycles) {

}