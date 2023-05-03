#pragma once

#include "component.h"
#include <vector>

class Bus;
class PPU;

class DMA : public Component {

public:
    DMA(Bus * bus, PPU * ppu);
    virtual void Tick(double delta);
    virtual void Clock(long totalCycles);
    virtual void Draw();
    virtual uint8_t Read(uint16_t address, bool readOnly = false);
    virtual void Write(uint16_t address, uint8_t value);

private:
    uint8_t dma_page = 0x00;
	uint8_t dma_addr = 0x00;
	uint8_t dma_data = 0x00;

	bool dma_dummy = true;
	bool dma_transfer = false;

    PPU * _ppu;


};