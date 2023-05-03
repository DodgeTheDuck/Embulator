
#include "storage.h"
#include "bus.h"
#include <iomanip>
#include <sstream>
#include <emscripten/emscripten.h>

Storage::Storage(uint64_t size, Bus * bus) : Component(bus) {
	_data = new uint8_t[size];
	_size = size;
}

void Storage::Draw() {

}

uint8_t Storage::_Read(uint16_t addr) {
	return _data[addr];
}

void Storage::_Write(uint16_t addr, uint8_t data) {
	_data[addr] = data;
}

Storage::~Storage() {
	delete(_data);
}