
#include "cpu.h"
#include "component.h"
#include "bus.h"
#include "register.h"
#include <emscripten/emscripten.h>
#include <sstream>

CPU::CPU(Bus * bus) : Component(bus) {

}

Register * CPU::GetRegister(uint8_t index) {
    return this->_registers[index];
}