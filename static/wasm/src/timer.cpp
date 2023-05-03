
#include "timer.h"
#include "emscripten/emscripten.h"

Timer::Timer() {
    this->_lastMeasure = emscripten_get_now();
}

long Timer::Tick(double delta) {
    this->_secAccumulator += delta;
    this->_tickCount++;
    return delta;
}

bool Timer::Second() {
    if(this->_secAccumulator >= 1000) {
        this->_secAccumulator = 0;
        return true;
    } else {
        return false;
    }
}

long Timer::TickCount() {
    long t = this->_tickCount;
    this->_tickCount = 0;
    return t;
}
