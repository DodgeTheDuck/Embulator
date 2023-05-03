#pragma once

#include "system.h"

class Clock;
class CPU_6502;
class RAM;
class Bus;
class Cartridge;
class PPU;
class DMA;
class Timer;
class Input;

class Disassembler;

class SystemNes : public EmulatedSystem {

public:
	SystemNes();

	virtual void Tick(double delta);
	virtual void Draw(double delta);
	virtual void LoadProgram(uint8_t * data, uint16_t size);
	virtual Disassembler * GetDisassembler();
	virtual Input * GetInput();
	virtual uint8_t Read(uint16_t address);
	void TogglePlay();
	void Step();

private:

	Clock 		* _clock;

	Bus 		* _cpuBus;
	Bus 		* _ppuBus;

	CPU_6502 	* _cpu;
	PPU 		* _ppu;
	RAM 		* _ram;
	Cartridge 	* _cart;
	DMA 		* _dma;
	Timer 		* _cycleTimer;
	Input 		* _input;

	Disassembler * _disassembler;

	uint32_t _cps;
	long _totalCycles;


};