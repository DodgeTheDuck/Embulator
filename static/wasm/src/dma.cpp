
#include "dma.h"
#include "bus.h"
#include "ppu.h"

DMA::DMA(Bus * bus, PPU * ppu) : Component(bus) {
    dma_page = 0x00;
	dma_addr = 0x00;
	dma_data = 0x00;
	dma_dummy = true;
	dma_transfer = false;
    _ppu = ppu;
}

void DMA::Tick(double delta) {
 
}

void DMA::Clock(long totalCycles) {
   if (dma_transfer)
    {

        if (dma_dummy)
        {

            if (totalCycles % 2 == 1)
            {
                dma_dummy = false;
            }
        }
        else
        {
            if (totalCycles % 2 == 0)
            {
                dma_data = _bus->Read(dma_page << 8 | dma_addr);
            }
            else
            {

                _ppu->pOAM[dma_addr] = dma_data;

                dma_addr++;

                if (dma_addr == 0x00)
                {
                    dma_transfer = false;
                    dma_dummy = true;
                }
            }
        }
    }

}

uint8_t DMA::Read(uint16_t address, bool readOnly) {
    return 0x00;
}

void DMA::Write(uint16_t address, uint8_t data) {
    if(address == 0x4014) {
        dma_page = data;
        dma_addr = 0x00;
        dma_transfer = true;
    }
}

void DMA::Draw() {

}