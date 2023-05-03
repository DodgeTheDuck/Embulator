#pragma once

#include <vector>
#include <string>

class Component;
class Timer;
class Disassembler;
class Input;

class EmulatedSystem {

public:
	virtual void Tick(double delta) = 0;
	virtual void Draw(double delta);
	virtual uint8_t Read(uint16_t address) = 0;
	virtual void LoadProgram(uint8_t * data, uint16_t size) = 0;	
	virtual void Step() = 0;
	virtual void ToggleRunning();
	virtual void ToggleDebugging();
	virtual Disassembler * GetDisassembler() = 0;
	virtual Input * GetInput() = 0;
	std::vector<Component*> GetComponents();

protected: 
	EmulatedSystem();
	
	std::vector<Component*> _components;

	Timer 		* _frameTimer;
	bool 		  _running;
	bool	      _step;
	bool 		  _debugging;


};