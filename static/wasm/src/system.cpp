
#include "system.h"
#include "component.h"
#include "timer.h"
#include <emscripten/emscripten.h>

EM_JS(void, JS_SYSTEM, (long fps), {
	UpdateComponent("system", {fps: fps});
});


EmulatedSystem::EmulatedSystem() {
    _frameTimer = new Timer();
    _running = false;
    _step = false;
    _debugging = false;
}

void EmulatedSystem::Draw(double delta) {
    if(_debugging) {
        for(int i = 0; i < _components.size(); i++) {
            _components[i]->Draw();
        }
        _frameTimer->Tick(delta);
        if(_frameTimer->Second()) {
            JS_SYSTEM(_frameTimer->TickCount());
        }
    }
}

void EmulatedSystem::ToggleRunning() {
    _running = !_running;
}

void EmulatedSystem::ToggleDebugging() {
    _debugging = !_debugging;
}

std::vector<Component*> EmulatedSystem::GetComponents() {
    return _components;
}