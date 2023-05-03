
#include <iostream>
#include <emscripten/emscripten.h>
#include <emscripten/html5.h>
#include "component.h"
#include "6502_cpu.h"
#include "system_nes.h"
#include "disassembler.h"
#include "input.h"
#include "keyboard.h"

EmulatedSystem * sys;

double secondTimer;
double lastTime;


extern "C" {    

    uint8_t * ReadBus(int address, int count) {
        uint8_t * data = (uint8_t*)calloc(count, sizeof(uint8_t));
        for(int i = 0; i < count; i++) {
            data[i] = sys->Read(address+i);
        }
        return data;
    }

    void Step() {
        sys->Step();
    }

    void LoadProgram(uint8_t data[], int size) {
        printf("!!!!!loading program %i\n", size);
        sys->LoadProgram(data, size);
    }

    void AddBreakpoint(uint16_t address) {
        sys->GetDisassembler()->AddBreakpoint(address);
    }

    void RemoveBreakpoint(uint16_t address) {
        sys->GetDisassembler()->RemoveBreakpoint(address);
    }

    void ToggleRunning() {
        sys->ToggleRunning();
    }

    void ToggleDebugger() {
        sys->ToggleDebugging();
    }

    void KeyDown(int index, int key) {
        if(key < 255) {
            Keyboard::SetKeyState((EKey)key, EKeyState::KEY_DOWN);        
        }
    }

    void KeyUp(int index, int key) {
        if(key < 255) {
            Keyboard::SetKeyState((EKey)key, EKeyState::KEY_UP);        
        }
    }

}


EM_JS(void, JS_SetKeyboardPointer, (void * address), {
	SetKeyboardPointer(address);
});

int Run(double time, void* userData) {

    double delta = (time - lastTime);
    lastTime = time;
    secondTimer += delta;    
    sys->Tick(delta);    
    sys->Draw(delta);

    if(secondTimer >= 1000) {        
        secondTimer = 0;
    }

    return 1;
}

int main(int argc, char ** argv) {

    sys = new SystemNes();

    JS_SetKeyboardPointer(Keyboard::_keyStates);

    emscripten_request_animation_frame_loop(Run, 0);

}