#pragma once

#include "def.h"
#include "cpu.h"

struct SAddressResult {
    uint16_t address;
    bool implied = false;
};

enum EBranchType {
     NONE = 0x0,
     CONDITIONAL = 0x01,
     UNCONDITIONAL = 0x02,
     RETURN = 0x03
};

typedef void (*Operation)(CPU * cpu, SAddressResult address);
typedef SAddressResult (*AddressMode)(CPU * cpu);

class Instruction {

public:
     Instruction(
          const char * mnem, 
          uint8_t bytes,
          uint8_t cycles,
          Operation op, 
          AddressMode am,
          EBranchType branchType = EBranchType::NONE);
     ~Instruction();

private:
     const char * _mnem;
     uint8_t _bytes;
     uint8_t _cycles;
     Operation _operation;
     AddressMode _addressMode;
     EBranchType _branchType;

public:
     void Execute(CPU * cpu);
     const char* Mnemonic();
     uint8_t Bytes();
     uint8_t Cycles();
     EBranchType BranchType();
     SAddressResult RunAddresser(CPU * cpu);


};