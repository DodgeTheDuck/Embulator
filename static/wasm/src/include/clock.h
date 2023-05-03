
#pragma once

class Clock {

public:
    Clock(long hz);

    long Oscillate(double delta);
    long Cycles();

private: 
    long _hz;
    long _cycles;
    double _accumulator;
};