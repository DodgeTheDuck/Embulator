
#include "component.h"
#include <emscripten\emscripten.h>
#include <emscripten\html5.h>

class Bus;

class Input : public Component {

public:
    Input(Bus * bus);
    virtual void Tick(double delta);    
    virtual void Clock(long totalCycles);
    virtual void Draw();
	virtual uint8_t Read(uint16_t address, bool readOnly = false);
    virtual void Write(uint16_t address, uint8_t value);
    
    void AddInput(int index, int value);

private:
    
    EM_BOOL _HandleKeyDown(int eventType, const EmscriptenKeyboardEvent *e, void * userData);

    uint8_t _controller[2];
    uint8_t _controllerState[2];

};