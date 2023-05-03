
#include "mapper_001.h"
#include <iostream>

Mapper001::Mapper001(uint8_t prgBanks, uint8_t chrBanks) : Mapper(prgBanks, chrBanks) {
    vRAMStatic.resize(32 * 1024);
    nControlRegister = 0x1C;
	nLoadRegister = 0x00;
	nLoadRegisterCount = 0x00;
	
	nCHRBankSelect4Lo = 0;
	nCHRBankSelect4Hi = 0;
	nCHRBankSelect8 = 0;

	nPRGBankSelect32 = 0;
	nPRGBankSelect16Lo = 0;
	nPRGBankSelect16Hi = prgBanks - 1;
}

uint16_t Mapper001::MapRead(uint16_t address, uint8_t &data) {

    uint16_t mapped = address;

    if (address < 0x2000)
	{
		if (_chrBanks == 0)
		{
			mapped = address;
			return mapped;
		}
		else
		{
			if (nControlRegister & 0b10000)
			{
				// 4K CHR Bank Mode
				if (address >= 0x0000 && address <= 0x0FFF)
				{
					mapped = nCHRBankSelect4Lo * 0x1000 + (address & 0x0FFF);
					return mapped;
				}

				if (address >= 0x1000 && address <= 0x1FFF)
				{
					mapped = nCHRBankSelect4Hi * 0x1000 + (address & 0x0FFF);
					return mapped;
				}
			}
			else
			{
				// 8K CHR Bank Mode
				mapped = nCHRBankSelect8 * 0x2000 + (address & 0x1FFF);
				return mapped;
			}
		}
	}	

    if (address >= 0x6000 && address <= 0x7FFF)
    {
        // Read is from static ram on cartridge
        mapped = 0xFFFFFFFF;

        // Read data from RAM
        data = vRAMStatic[address & 0x1FFF];

        return mapped;

    }

    if (address >= 0x8000)
    {
        printf("cpu read %u\n", address);
        if (nControlRegister & 0b01000)
        {            
            // 16K Mode
            if (address >= 0x8000 && address <= 0xBFFF)
            {
                mapped = nPRGBankSelect16Lo * 0x4000 + (address & 0x3FFF);
            }
            if (address >= 0xC000 && address <= 0xFFFF)
            {
                mapped = nPRGBankSelect16Hi * 0x4000 + (address & 0x3FFF);
            }
        }
        else
        {
            // 32K Mode
            mapped = nPRGBankSelect32 * 0x8000 + (address & 0x7FFF);
        }
        printf("mapped %u\n", mapped);
    }
    return mapped;
}

uint16_t Mapper001::MapWrite(uint16_t address, uint8_t &data) {    
    uint16_t mapped = address;
    printf("cpu write %u\n", address);
    return mapped;
}