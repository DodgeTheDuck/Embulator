
#include <clock.h>
#include <math.h>

Clock::Clock(long hz) {
    this->_hz = hz;
}

long Clock::Oscillate(double delta) {
    
    double targetMs = 1000.0 / this->_hz;

    if(delta > 200) {
        return 1;
    }

    if(delta > targetMs) {
        double targetPulses = delta / targetMs;
        int nPulses = round(targetPulses);
        this->_cycles += nPulses;
        return nPulses;
    } else {
        this->_accumulator+=delta;
        if(this->_accumulator >= targetMs) {
            this->_accumulator = 0;
            this->_cycles++;
            return 1;
        }
        return 0;
    }

}

long Clock::Cycles() {
    return this->_cycles;
}