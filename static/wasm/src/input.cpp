
#include "input.h"
#include "bus.h"
#include "keyboard.h"

Input::Input(Bus * bus) : Component(bus) {
    printf("%u\n", Keyboard::_keyStates);
}

void Input::Tick(double delta) {
    _controller[0] = 0x00;
    _controller[0] |= Keyboard::IsKeyDown(EKey::M) ? 0x80 : 0x00;     // A Button
    _controller[0] |= Keyboard::IsKeyDown(EKey::K) ? 0x40 : 0x00;     // B Button
    _controller[0] |= Keyboard::IsKeyDown(EKey::SHIFT) ? 0x20 : 0x00;     // Select
    _controller[0] |= Keyboard::IsKeyDown(EKey::ENTER) ? 0x10 : 0x00;     // Start
    _controller[0] |= Keyboard::IsKeyDown(EKey::UP) ? 0x08 : 0x00;
    _controller[0] |= Keyboard::IsKeyDown(EKey::DOWN) ? 0x04 : 0x00;
    _controller[0] |= Keyboard::IsKeyDown(EKey::LEFT) ? 0x02 : 0x00;
    _controller[0] |= Keyboard::IsKeyDown(EKey::RIGHT) ? 0x01 : 0x00;
}

void Input::Clock(long totalCycles) {

}

uint8_t Input::Read(uint16_t address, bool readOnly) {
    uint8_t data = (_controllerState[address & 0x0001] & 0x80) > 0;
    _controllerState[address & 0x0001] <<= 1;
    return data;
}

void Input::Write(uint16_t address, uint8_t data) {
    _controllerState[address & 0x0001] = _controller[address & 0x0001];
}

void Input::Draw() {

}

void Input::AddInput(int index, int value) {
    uint8_t val;
    if(value == 87) val = 0x08;    
    else if(value == 83) val = 0x04;
    else if(value == 65) val = 0x02;
    else if(value == 68) val = 0x01;
    else if(value == 13) val = 0x10; // start
    else if(value == 16) val = 0x20; // select
    
    _controller[index] |= val;
}