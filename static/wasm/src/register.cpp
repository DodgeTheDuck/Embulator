
#include "register.h"
#include <iostream>
#include <cmath>

Register::Register(const char * name, unsigned int size) {
    this->_name = name;
    this->_size = size;
}

void Register::Write(int value) {
    if(this->_size == 8) {
        this->_value = (uint8_t)value;
    } else {
        this->_value = (uint16_t)value;
    }
}

long Register::Read() {
    return this->_value;
}

void Register::Inc() {
    this->Write(this->_value + 1);
}

void Register::Dec() {
    this->Write(this->_value - 1);
}

bool Register::Bit(uint8_t index) {
    return (this->_value & index) > 0;
}

void Register::Set(uint8_t index) {
    this->_value |= index;
}

void Register::Clear(uint8_t index) {
    this->_value &= ~index;
}

void Register::Change(uint8_t index, bool value) {
    if(value) {
        this->Set(index);
    } else {
        this->Clear(index);
    }
}

const char * Register::Name() {
    return this->_name;
}

unsigned int Register::Size() {
    return this->_size;
}