
class Timer {

public:
    Timer();

    long Tick(double delta);
    bool Second();
    long TickCount();

private:

    double _secAccumulator;
    long _lastMeasure;
    long _tickCount;

};