
#pragma once

#include <cstdint>

class Register {

public:
    Register(const char * name, unsigned int size);

    void Write(int value);
    long Read();
    void Inc();
    void Dec();

    bool Bit(uint8_t index);
    void Set(uint8_t index);
    void Clear(uint8_t index);
    void Change(uint8_t index, bool value);

    const char * Name();
    unsigned int Size();

private:
    const char * _name;
    unsigned int _size;
    int _value;

};