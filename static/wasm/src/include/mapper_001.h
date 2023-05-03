
#pragma once

#include "mapper.h"
#include <vector>

class Mapper001 : public Mapper {

public:
    Mapper001(uint8_t prgBanks, uint8_t chrBanks);

    virtual uint16_t MapRead(uint16_t address, uint8_t &data);
    virtual uint16_t MapWrite(uint16_t address, uint8_t &data);

private:

    uint8_t nCHRBankSelect4Lo = 0x00;
	uint8_t nCHRBankSelect4Hi = 0x00;
	uint8_t nCHRBankSelect8 = 0x00;

	uint8_t nPRGBankSelect16Lo = 0x00;
	uint8_t nPRGBankSelect16Hi = 0x00;
	uint8_t nPRGBankSelect32 = 0x00;

	uint8_t nLoadRegister = 0x00;
	uint8_t nLoadRegisterCount = 0x00;
	uint8_t nControlRegister = 0x00;

	std::vector<uint8_t> vRAMStatic;

};