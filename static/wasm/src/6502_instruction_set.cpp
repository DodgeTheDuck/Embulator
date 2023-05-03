
#include "6502_instruction_set.h"
#include "6502_cpu.h"
#include "bus.h"
#include "instruction.h"
#include <stdio.h>

SAddressResult IMP(CPU * cpu) {
    SAddressResult result;
    result.address = 0x0000;
    result.implied = true;
    return result;
}

SAddressResult IMM(CPU * cpu) {
    SAddressResult result;    
    result.address = cpu->GetRegister(ERegisters::PC)->Read()-1;
    return result;
}

SAddressResult ABX(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-2;

    uint16_t lo = cpu->Read(pc);    
    uint16_t hi = cpu->Read(pc+1);
    
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    result.address = (hi << 8) | lo;
    result.address += x;
    return result;
}

SAddressResult ABY(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-2;

    uint16_t lo = cpu->Read(pc);        
    uint16_t hi = cpu->Read(pc+1);    

    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();
    result.address = (hi << 8) | lo;
    result.address += y;
    return result;
}

SAddressResult ABS(CPU * cpu) {
    SAddressResult result;

    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-2;

    uint16_t lo = cpu->Read(pc);    
    uint16_t hi = cpu->Read(pc+1);
        
    result.address = (hi << 8) | lo;
    return result;
}

SAddressResult INX(CPU * cpu) {
    
    SAddressResult result;

    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    uint16_t operand = cpu->Read(pc);
    

    uint16_t x = cpu->GetRegister(ERegisters::X)->Read();

    uint16_t lo = cpu->GetBus()->Read((operand + x) & 0x00FF);
    uint16_t hi = cpu->GetBus()->Read((operand + x + 1) & 0x00FF);
    
    result.address = (hi << 8) | lo;

    return result;
}

SAddressResult INY(CPU * cpu) {
    
    SAddressResult result;

    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    uint16_t operand = cpu->Read(pc);
    

    uint16_t lo = cpu->GetBus()->Read(operand);
    uint16_t hi = cpu->GetBus()->Read((operand + 1) & 0x00FF);
    
    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();

    result.address = (hi << 8) | lo;
    result.address += y;

    return result;
}

SAddressResult IND(CPU * cpu) {
    
    SAddressResult result;

    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-2;

    uint16_t lo = cpu->Read(pc);    
    uint16_t hi = cpu->Read(pc+1);
    
    uint16_t ptr = (hi << 8) | lo;

    if(lo == 0x00FF) {
        result.address = (cpu->GetBus()->Read(ptr & 0xFF00) << 8) | cpu->GetBus()->Read(ptr);
    } else {
        result.address = (cpu->GetBus()->Read(ptr + 1) << 8) | cpu->GetBus()->Read(ptr);
    }

    return result;
}

SAddressResult ZPX(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    uint16_t operand = cpu->Read(pc);    
    uint16_t x = cpu->GetRegister(ERegisters::X)->Read();
    result.address = operand + x;
    result.address &= 0x00FF;
    return result;
}

SAddressResult ZPY(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    uint16_t operand = cpu->Read(pc);    
    uint16_t y = cpu->GetRegister(ERegisters::Y)->Read();
    result.address = operand + y;
    result.address &= 0x00FF;
    return result;
}

SAddressResult ZPG(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    uint8_t operand = cpu->Read(pc);
    result.address = operand;
    return result;
}

SAddressResult REL(CPU * cpu) {
    SAddressResult result;
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    
    int8_t operand = cpu->Read(pc);
    result.address = pc + 1 + operand;
    return result;
}

// INSTRUCTIONS --------------

void ADC(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);

    uint16_t temp = (uint16_t)a + (uint16_t)operand + (uint16_t)c;

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, temp > 255);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, ((temp & 0x00FF) == 0));
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::V, (~((uint16_t)a ^ (uint16_t)operand) & ((uint16_t)a ^ (uint16_t)temp)) & 0x0080);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);

    cpu->GetRegister(ERegisters::A)->Write(temp & 0x00FF);
}

void SBC(CPU * cpu, SAddressResult addresser) {
    uint16_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);
    
    operand ^= 0x00FF;

    uint16_t temp = (uint16_t)a + (uint16_t)operand + (uint16_t)c;

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, temp > 255);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, ((temp & 0x00FF) == 0));
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::V, (~((uint16_t)a ^ (uint16_t)operand) & ((uint16_t)a ^ (uint16_t)temp)) & 0x0080);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);

    cpu->GetRegister(ERegisters::A)->Write(temp & 0x00FF);
}

void AND(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t result = a & operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, result == 0);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    cpu->GetRegister(ERegisters::A)->Write(result);
}

void ASL(CPU * cpu, SAddressResult addresser) {

    uint8_t operand = 0;

    if(addresser.implied) {
        operand = cpu->GetRegister(ERegisters::A)->Read();
    } else {
        operand = cpu->Read(addresser.address);
    }
    
    uint16_t result = (uint16_t)operand << 1;

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, (result & 0xFF00) > 0);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (result & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    if(addresser.implied) {
        cpu->GetRegister(ERegisters::A)->Write(result & 0x00FF);
    } else {
        cpu->GetBus()->Write(addresser.address, result & 0x00FF);
    }
}

void BCC(CPU * cpu, SAddressResult addresser) {
    uint8_t c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);
    if(c == 0) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BCS(CPU * cpu, SAddressResult addresser) {
    uint8_t c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);
    if(c == 1) {
        //printf("BCS: BRANCHING TO %u", addresser.address);
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BEQ(CPU * cpu, SAddressResult addresser) {
    uint8_t z = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::Z);
    if(z == 1) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BIT(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t temp = a & operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::V, operand & (1 << 6));
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, operand & (1 << 7));
}

void BMI(CPU * cpu, SAddressResult addresser) {
    uint8_t n = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::N);
    if(n == 1) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BNE(CPU * cpu, SAddressResult addresser) {
    uint8_t z = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::Z);
    if(z == 0) {
        //printf("BNE: BRANCHING TO %u", addresser.address);
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BPL(CPU * cpu, SAddressResult addresser) {
    uint8_t n = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::N);
    if(n == 0) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BRK(CPU * cpu, SAddressResult addresser) {
    //TODO
}

void BVC(CPU * cpu, SAddressResult addresser) {
    uint8_t v = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::V);
    if(v == 0) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void BVS(CPU * cpu, SAddressResult addresser) {
    uint8_t v = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::V);
    if(v == 1) {
        cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
    }
}

void CLC(CPU * cpu, SAddressResult addresser) {
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::C);
}

void CLD(CPU * cpu, SAddressResult addresser) {
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::D);
}

void CLI(CPU * cpu, SAddressResult addresser) {
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::I);
}

void CLV(CPU * cpu, SAddressResult addresser) {
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::V);
}

void CMP(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t temp = (uint16_t)a - (uint16_t)operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, a >= operand);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);
}

void CPX(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    uint8_t temp = (uint16_t)x - (uint16_t)operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, x >= operand);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);
}

void CPY(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();
    uint8_t temp = (uint16_t)y - (uint16_t)operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, y >= operand);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);
}

void DEC(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);                            
    uint8_t temp = operand - 1;
    //printf("DEC: %u(%u) = %u : PC: %u\n", addresser.address, operand, temp, cpu->GetProgramCounter());
    cpu->GetBus()->Write(addresser.address, temp & 0x00FF);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);
}

void DEX(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::X)->Dec();
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, x == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, x & 0x80);
}

void DEY(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::Y)->Dec();
    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, y == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, y & 0x80);
}

void EOR(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t result = a ^ operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, result == 0);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    cpu->GetRegister(ERegisters::A)->Write(result);
}

void INC(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint16_t temp = (uint16_t)operand + 1;
    cpu->GetBus()->Write(addresser.address, temp & 0x00FF);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (temp & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, temp & 0x0080);
}

void INX(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::X)->Inc();
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, x == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, x & 0x80);
}

void INY(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::Y)->Inc();
    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, y == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, y & 0x80);
}

void JMP(CPU * cpu, SAddressResult addresser) {
    // printf("JMP: %u", addresser.address);
    cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
}

void JSR(CPU * cpu, SAddressResult addresser) {
    uint16_t pc = cpu->GetRegister(ERegisters::PC)->Read()-1;
    // printf("JSR: from(%u) to (%u)", pc, addresser.address);
    cpu->Push((pc >> 8) & 0x00FF);
    cpu->Push(pc & 0x00FF);
    cpu->GetRegister(ERegisters::PC)->Write(addresser.address);
}

void LDA(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    cpu->GetRegister(ERegisters::A)->Write(operand);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, operand == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, operand & 0x80);
}

void LDX(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    cpu->GetRegister(ERegisters::X)->Write(cpu->GetBus()->Read(addresser.address));
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, operand == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, operand & 0x80);
}

void LDY(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    cpu->GetRegister(ERegisters::Y)->Write(cpu->GetBus()->Read(addresser.address));
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, operand == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, operand & 0x80);
}

void LSR(CPU * cpu, SAddressResult addresser) {

    uint8_t operand = 0;

    if(addresser.implied) {
        operand = cpu->GetRegister(ERegisters::A)->Read();
    } else {
        operand = cpu->Read(addresser.address);
    }
    
    uint16_t result = operand >> 1;

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, operand & 0x0001);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (result & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    if(addresser.implied) {
        cpu->GetRegister(ERegisters::A)->Write(result & 0x00FF);
    } else {
        cpu->GetBus()->Write(addresser.address, result & 0x00FF);
    }
}

void NOP(CPU * cpu, SAddressResult addresser) {

}

void ORA(CPU * cpu, SAddressResult addresser) {
    uint8_t operand = cpu->Read(addresser.address);
    
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    uint8_t result = a | operand;
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, result == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    cpu->GetRegister(ERegisters::A)->Write(result);
}

void PHA(CPU * cpu, SAddressResult addresser) {
    cpu->Push(cpu->GetRegister(ERegisters::A)->Read());
}

void PHP(CPU * cpu, SAddressResult addresser) {
    cpu->GetRegister(ERegisters::STATUS)->Set(EFlags::B);
    cpu->GetRegister(ERegisters::STATUS)->Set(EFlags::U);
    cpu->Push(cpu->GetRegister(ERegisters::STATUS)->Read());
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::B);
    cpu->GetRegister(ERegisters::STATUS)->Clear(EFlags::U);
}

void PLA(CPU * cpu, SAddressResult addresser) {
    uint8_t value = cpu->Pop();
    // printf("PLA\n");
    cpu->GetRegister(ERegisters::A)->Write(value);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, value == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, value & 0x80);
}

void PLP(CPU * cpu, SAddressResult addresser) {
    uint8_t value = cpu->Pop();
    cpu->GetRegister(ERegisters::STATUS)->Write(value);
    //cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::U, 1);
}

void ROL(CPU * cpu, SAddressResult addresser) {

    bool c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);

    uint8_t operand = 0;

    if(addresser.implied) {
        operand = cpu->GetRegister(ERegisters::A)->Read();
    } else {
        operand = cpu->Read(addresser.address);
    }
    
    uint16_t result = (uint16_t)(operand << 1) | c;

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, result & 0xFF00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (result & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    if(addresser.implied) {
        cpu->GetRegister(ERegisters::A)->Write(result & 0x00FF);
    } else {
        cpu->GetBus()->Write(addresser.address, result & 0x00FF);
    }

}

void ROR(CPU * cpu, SAddressResult addresser) {

    bool c = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::C);

    uint8_t operand = 0;

    if(addresser.implied) {
        operand = cpu->GetRegister(ERegisters::A)->Read();
    } else {
        operand = cpu->Read(addresser.address);
    }
    
    uint16_t result = (uint16_t)(c << 7) | (operand >> 1);

    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::C, operand & 0x01);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, (result & 0x00FF) == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, result & 0x80);
    if(addresser.implied) {
        cpu->GetRegister(ERegisters::A)->Write(result & 0x00FF);
    } else {
        cpu->GetBus()->Write(addresser.address, result & 0x00FF);
    }
    
}

void RTI(CPU * cpu, SAddressResult addresser) {
    
    uint8_t status = cpu->Pop();
    
    uint8_t b = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::B);
    //uint8_t u = cpu->GetRegister(ERegisters::STATUS)->Bit(EFlags::U);
    status &= ~b;
    //status &= ~u;
    cpu->GetRegister(ERegisters::STATUS)->Write(status);

    uint16_t pc = cpu->Pop();
    pc |= (((uint16_t)cpu->Pop()) << 8);

    // printf("RTI from(%u) to (%u)", cpu->GetRegister(ERegisters::PC)->Read(),pc);

    cpu->GetRegister(ERegisters::PC)->Write(pc);

}


void RTS(CPU * cpu, SAddressResult addresser) {    
    // printf("RTS: CALLED");
    uint16_t pc = cpu->Pop();
    pc |= (((uint16_t)cpu->Pop()) << 8);
    cpu->GetRegister(ERegisters::PC)->Write(pc);
    cpu->GetRegister(ERegisters::PC)->Inc();
    // printf("RTS: %u\n", pc);
    
}

void SEC(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::STATUS)->Set(EFlags::C);
}

void SED(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::STATUS)->Set(EFlags::D);
}

void SEI(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::STATUS)->Set(EFlags::I);
}

void STA(CPU * cpu, SAddressResult addresser) {    
    //printf("STA: %u(%u) : PC: %u\n", addresser.address, cpu->GetRegister(ERegisters::A)->Read(), cpu->GetProgramCounter());
    cpu->GetBus()->Write(addresser.address, cpu->GetRegister(ERegisters::A)->Read());
}

void STX(CPU * cpu, SAddressResult addresser) {    
    cpu->GetBus()->Write(addresser.address, cpu->GetRegister(ERegisters::X)->Read());
}

void STY(CPU * cpu, SAddressResult addresser) {    
    cpu->GetBus()->Write(addresser.address, cpu->GetRegister(ERegisters::Y)->Read());
}

void TAX(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::X)->Write(cpu->GetRegister(ERegisters::A)->Read());
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, x == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, x & 0x80);
    //printf("TAX\n");
}

void TAY(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::Y)->Write(cpu->GetRegister(ERegisters::A)->Read());
    uint8_t y = cpu->GetRegister(ERegisters::Y)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, y == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, y & 0x80);
    // printf("TAY\n");
}

void TSX(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::X)->Write(cpu->GetRegister(ERegisters::SP)->Read());
    uint8_t x = cpu->GetRegister(ERegisters::X)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, x == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, x & 0x80);
}

void TXA(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::A)->Write(cpu->GetRegister(ERegisters::X)->Read());
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, a == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, a & 0x80);
}

void TXS(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::SP)->Write(cpu->GetRegister(ERegisters::X)->Read());
}

void TYA(CPU * cpu, SAddressResult addresser) {    
    cpu->GetRegister(ERegisters::A)->Write(cpu->GetRegister(ERegisters::Y)->Read());
    uint8_t a = cpu->GetRegister(ERegisters::A)->Read();
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::Z, a == 0x00);
    cpu->GetRegister(ERegisters::STATUS)->Change(EFlags::N, a & 0x80);
}

IS_6502::IS_6502(CPU_6502 * cpu) {

    this->_cpu = cpu;

    this->_AddInstruction(0x00, new Instruction(
        "BRK",
        1,
        7,
        &BRK,
        &IMP
    ));

    this->_AddInstruction(0x01, new Instruction(
        "ORA",
        2,
        6,
        &ORA,
        &INX
    ));

    this->_AddInstruction(0x05, new Instruction(
        "ORA",
        2,
        3,
        &ORA,
        &ZPG
    ));

    this->_AddInstruction(0x06, new Instruction(
        "ASL",
        2,
        5,
        &ASL,
        &ZPG
    ));

    this->_AddInstruction(0x08, new Instruction(
        "PHP",
        1,
        3,
        &PHP,
        &IMP
    ));

    this->_AddInstruction(0x09, new Instruction(
        "ORA",
        2,
        2,
        &ORA,
        &IMM
    ));

    this->_AddInstruction(0x0A, new Instruction(
        "ASL",
        1,
        2,
        &ASL,
        &IMP
    ));

    this->_AddInstruction(0x0D, new Instruction(
        "ORA",
        3,
        4,
        &ORA,
        &ABS
    ));

    this->_AddInstruction(0x0E, new Instruction(
        "ASL",
        3,
        6,
        &ASL,
        &ABS
    ));

    this->_AddInstruction(0x10, new Instruction(
        "BPL",
        2,
        2,
        &BPL,
        &REL,
        EBranchType::CONDITIONAL
    ));
    
    this->_AddInstruction(0x11, new Instruction(
        "ORA",
        2,
        5,
        &ORA,
        &INY
    ));

    this->_AddInstruction(0x15, new Instruction(
        "ORA",
        2,
        4,
        &ORA,
        &ZPX
    ));

    this->_AddInstruction(0x16, new Instruction(
        "ASL",
        2,
        6,
        &ASL,
        &ZPX
    ));

    this->_AddInstruction(0x18, new Instruction(
        "CLC",
        1,
        2,
        &CLC,
        &IMP
    ));

    this->_AddInstruction(0x19, new Instruction(
        "ORA",
        3,
        4,
        &ORA,
        &ABY
    ));

    this->_AddInstruction(0x1A, new Instruction(
        "NOP",
        1,
        2,
        &NOP,
        &IMP
    ));
    
    this->_AddInstruction(0x1D, new Instruction(
        "ORA",
        3,
        4,
        &ORA,
        &ABX
    ));

    this->_AddInstruction(0x1E, new Instruction(
        "ASL",
        3,
        7,
        &ASL,
        &ABX
    ));

    this->_AddInstruction(0x20, new Instruction(
        "JSR",
        3,
        6,
        &JSR,
        &ABS,
        EBranchType::CONDITIONAL
    ));
    
    this->_AddInstruction(0x21, new Instruction(
        "AND",
        2,
        6,
        &AND,
        &INX
    ));

    this->_AddInstruction(0x24, new Instruction(
        "BIT",
        2,
        3,
        &BIT,
        &ZPG
    ));

    this->_AddInstruction(0x25, new Instruction(
        "AND",
        2,
        3,
        &AND,
        &ZPG
    ));

    this->_AddInstruction(0x26, new Instruction(
        "ROL",
        2,
        5,
        &ROL,
        &ZPG
    ));

    this->_AddInstruction(0x28, new Instruction(
        "PLP",
        1,
        4,
        &PLP,
        &IMP
    ));

    this->_AddInstruction(0x29, new Instruction(
        "AND",
        2,
        2,
        &AND,
        &IMM
    ));

    this->_AddInstruction(0x2A, new Instruction(
        "ROL",
        1,
        2,
        &ROL,
        &IMP
    ));

    this->_AddInstruction(0x2C, new Instruction(
        "BIT",
        3,
        4,
        &BIT,
        &ABS
    ));

    this->_AddInstruction(0x2D, new Instruction(
        "AND",
        3,
        4,
        &AND,
        &ABS
    ));

    this->_AddInstruction(0x2E, new Instruction(
        "ROL",
        3,
        6,
        &ROL,
        &ABS
    ));

    this->_AddInstruction(0x30, new Instruction(
        "BMI",
        2,
        2,
        &BMI,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0x31, new Instruction(
        "AND",
        2,
        5,
        &AND,
        &INY
    ));
    
    this->_AddInstruction(0x35, new Instruction(
        "AND",
        2,
        4,
        &AND,
        &ZPX
    ));
    
    this->_AddInstruction(0x36, new Instruction(
        "ROL",
        2,
        6,
        &ROL,
        &ZPX
    ));

    this->_AddInstruction(0x38, new Instruction(
        "SEC",
        1,
        2,
        &SEC,
        &IMP
    ));

    this->_AddInstruction(0x39, new Instruction(
        "AND",
        3,
        4,
        &AND,
        &ABY
    ));

    this->_AddInstruction(0x3D, new Instruction(
        "AND",
        3,
        4,
        &AND,
        &ABX
    ));

    this->_AddInstruction(0x3E, new Instruction(
        "ROL",
        3,
        7,
        &ROL,
        &ABX
    ));

    this->_AddInstruction(0x40, new Instruction(
        "RTI",
        1,
        6,
        &RTI,
        &IMP,
        EBranchType::RETURN
    ));

    this->_AddInstruction(0x41, new Instruction(
        "EOR",
        2,
        6,
        &EOR,
        &INX
    ));

    this->_AddInstruction(0x45, new Instruction(
        "EOR",
        2,
        3,
        &EOR,
        &ZPG
    ));

    this->_AddInstruction(0x46, new Instruction(
        "LSR",
        2,
        5,
        &LSR,
        &ZPG
    ));

    this->_AddInstruction(0x48, new Instruction(
        "PHA",
        1,
        3,
        &PHA,
        &IMP
    ));

    this->_AddInstruction(0x49, new Instruction(
        "EOR",
        2,
        2,
        &EOR,
        &IMM
    ));

    this->_AddInstruction(0x4A, new Instruction(
        "LSR",
        1,
        2,
        &LSR,
        &IMP
    ));

    this->_AddInstruction(0x4C, new Instruction(
        "JMP",
        3,
        3,
        &JMP,
        &ABS,
        EBranchType::UNCONDITIONAL
    ));


    this->_AddInstruction(0x4D, new Instruction(
        "EOR",
        3,
        4,
        &EOR,
        &ABS
    ));
    
    this->_AddInstruction(0x4E, new Instruction(
        "LSR",
        3,
        6,
        &LSR,
        &ABS
    ));

    this->_AddInstruction(0x50, new Instruction(
        "BVC",
        2,
        2,
        &BVC,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0x51, new Instruction(
        "EOR",
        2,
        5,
        &EOR,
        &INY
    ));

    this->_AddInstruction(0x55, new Instruction(
        "EOR",
        2,
        4,
        &EOR,
        &ZPX
    ));

    this->_AddInstruction(0x56, new Instruction(
        "LSR",
        2,
        6,
        &LSR,
        &ZPX
    ));

    this->_AddInstruction(0x58, new Instruction(
        "CLI",
        1,
        2,
        &CLI,
        &IMP
    ));

    this->_AddInstruction(0x59, new Instruction(
        "EOR",
        3,
        4,
        &EOR,
        &ABY
    ));

    this->_AddInstruction(0x5D, new Instruction(
        "EOR",
        3,
        4,
        &EOR,
        &ABX
    ));

    this->_AddInstruction(0x5E, new Instruction(
        "LSR",
        3,
        7,
        &LSR,
        &ABX
    ));

    this->_AddInstruction(0x60, new Instruction(
        "RTS",
        1,
        6,
        &RTS,
        &IMP,
        EBranchType::RETURN
    ));

    this->_AddInstruction(0x61, new Instruction(
        "ADC",
        2,
        6,
        &ADC,
        &INX
    ));

    this->_AddInstruction(0x65, new Instruction(
        "ADC",
        2,
        3,
        &ADC,
        &ZPG
    ));

    this->_AddInstruction(0x66, new Instruction(
        "ROR",
        2,
        5,
        &ROR,
        &ZPG
    ));

    this->_AddInstruction(0x68, new Instruction(
        "PLA",
        1,
        4,
        &PLA,
        &IMP
    ));

    this->_AddInstruction(0x69, new Instruction(
        "ADC",
        2,
        2,
        &ADC,
        &IMM
    ));

    this->_AddInstruction(0x6A, new Instruction(
        "ROR",
        1,
        2,
        &ROR,
        &IMP
    ));

    this->_AddInstruction(0x6C, new Instruction(
        "JMP",
        3,
        5,
        &JMP,
        &IND,
        EBranchType::UNCONDITIONAL
    ));

    this->_AddInstruction(0x6D, new Instruction(
        "ADC",
        3,
        4,
        &ADC,
        &ABS
    ));
    
    this->_AddInstruction(0x6E, new Instruction(
        "ROR",
        3,
        6,
        &ROR,
        &ABS
    ));

    this->_AddInstruction(0x70, new Instruction(
        "BVS",
        2,
        2,
        &BVS,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0x71, new Instruction(
        "ADC",
        2,
        5,
        &ADC,
        &INY
    ));

    this->_AddInstruction(0x75, new Instruction(
        "ADC",
        2,
        4,
        &ADC,
        &ZPX
    ));

    this->_AddInstruction(0x76, new Instruction(
        "ROR",
        2,
        6,
        &ROR,
        &ZPX
    ));

    this->_AddInstruction(0x78, new Instruction(
        "SEI",
        1,
        2,
        &SEI,
        &IMP
    ));

    this->_AddInstruction(0x79, new Instruction(
        "ADC",
        3,
        4,
        &ADC,
        &ABY
    ));

    this->_AddInstruction(0x7D, new Instruction(
        "ADC",
        3,
        4,
        &ADC,
        &ABX
    ));

    this->_AddInstruction(0x7E, new Instruction(
        "ROR",
        3,
        7,
        &ROR,
        &ABX
    ));

    this->_AddInstruction(0x81, new Instruction(
        "STA",
        2,
        6,
        &STA,
        &INX
    ));

    this->_AddInstruction(0x84, new Instruction(
        "STY",
        2,
        3,
        &STY,
        &ZPG
    ));

    this->_AddInstruction(0x85, new Instruction(
        "STA",
        2,
        3,
        &STA,
        &ZPG
    ));

    this->_AddInstruction(0x86, new Instruction(
        "STX",
        2,
        3,
        &STX,
        &ZPG
    ));

    this->_AddInstruction(0x88, new Instruction(
        "DEY",
        1,
        2,
        &DEY,
        &IMP
    ));

    this->_AddInstruction(0x8A, new Instruction(
        "TXA",
        1,
        2,
        &TXA,
        &IMP
    ));

    this->_AddInstruction(0x8C, new Instruction(
        "STY",
        3,
        4,
        &STY,
        &ABS
    ));

    this->_AddInstruction(0x8D, new Instruction(
        "STA",
        3,
        4,
        &STA,
        &ABS
    ));

    this->_AddInstruction(0x8E, new Instruction(
        "STX",
        3,
        4,
        &STX,
        &ABS
    ));

    this->_AddInstruction(0x90, new Instruction(
        "BCC",
        2,
        2,
        &BCC,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0x91, new Instruction(
        "STA",
        2,
        6,
        &STA,
        &INY
    ));

    this->_AddInstruction(0x94, new Instruction(
        "STY",
        2,
        4,
        &STY,
        &ZPX
    ));

    this->_AddInstruction(0x95, new Instruction(
        "STA",
        2,
        4,
        &STA,
        &ZPX
    ));

    this->_AddInstruction(0x96, new Instruction(
        "STX",
        2,
        4,
        &STX,
        &ZPY
    ));

    this->_AddInstruction(0x98, new Instruction(
        "TYA",
        1,
        2,
        &TYA,
        &IMP
    ));

    this->_AddInstruction(0x99, new Instruction(
        "STA",
        3,
        5,
        &STA,
        &ABY
    ));

    this->_AddInstruction(0x9A, new Instruction(
        "TXS",
        1,
        2,
        &TXS,
        &IMP
    ));

    this->_AddInstruction(0x9D, new Instruction(
        "STA",
        3,
        5,
        &STA,
        &ABX
    ));

    this->_AddInstruction(0xA0, new Instruction(
        "LDY",
        2,
        2,
        &LDY,
        &IMM
    ));

    this->_AddInstruction(0xA1, new Instruction(
        "LDA",
        2,
        6,
        &LDA,
        &INX
    ));

    this->_AddInstruction(0xA2, new Instruction(
        "LDX",
        2,
        2,
        &LDX,
        &IMM
    ));
    
    this->_AddInstruction(0xA4, new Instruction(
        "LDY",
        2,
        3,
        &LDY,
        &ZPG
    ));

    this->_AddInstruction(0xA5, new Instruction(
        "LDA",
        2,
        3,
        &LDA,
        &ZPG
    ));

    this->_AddInstruction(0xA6, new Instruction(
        "LDX",
        2,
        3,
        &LDX,
        &ZPG
    ));

    this->_AddInstruction(0xA8, new Instruction(
        "TAY",
        1,
        2,
        &TAY,
        &IMP
    ));

    this->_AddInstruction(0xA9, new Instruction(
        "LDA",
        2,
        2,
        &LDA,
        &IMM
    ));

    this->_AddInstruction(0xAA, new Instruction(
        "TAX",
        1,
        2,
        &TAX,
        &IMP
    ));

    this->_AddInstruction(0xAC, new Instruction(
        "LDY",
        3,
        4,
        &LDY,
        &ABS
    ));

    this->_AddInstruction(0xAD, new Instruction(
        "LDA",
        3,
        4,
        &LDA,
        &ABS
    ));

    this->_AddInstruction(0xAE, new Instruction(
        "LDX",
        3,
        4,
        &LDX,
        &ABS
    ));

    this->_AddInstruction(0xB0, new Instruction(
        "BCS",
        2,
        2,
        &BCS,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0xB1, new Instruction(
        "LDA",
        2,
        5,
        &LDA,
        &INY
    ));

    this->_AddInstruction(0xB4, new Instruction(
        "LDY",
        2,
        4,
        &LDY,
        &ZPX
    ));

    this->_AddInstruction(0xB5, new Instruction(
        "LDA",
        2,
        4,
        &LDA,
        &ZPX
    ));

    this->_AddInstruction(0xB6, new Instruction(
        "LDX",
        2,
        4,
        &LDX,
        &ZPY
    ));

    this->_AddInstruction(0xB8, new Instruction(
        "CLV",
        1,
        2,
        &CLV,
        &IMP
    ));

    this->_AddInstruction(0xB9, new Instruction(
        "LDA",
        3,
        4,
        &LDA,
        &ABY
    ));

    this->_AddInstruction(0xBA, new Instruction(
        "TSX",
        1,
        2,
        &TSX,
        &IMP
    ));

    this->_AddInstruction(0xBC, new Instruction(
        "LDY",
        3,
        4,
        &LDY,
        &ABX
    ));

    this->_AddInstruction(0xBD, new Instruction(
        "LDA",
        3,
        4,
        &LDA,
        &ABX
    ));

    this->_AddInstruction(0xBE, new Instruction(
        "LDX",
        3,
        4,
        &LDX,
        &ABY
    ));

    this->_AddInstruction(0xC0, new Instruction(
        "CPY",
        2,
        2,
        &CPY,
        &IMM
    ));

    this->_AddInstruction(0xC1, new Instruction(
        "CMP",
        2,
        6,
        &CMP,
        &INX
    ));

    this->_AddInstruction(0xC4, new Instruction(
        "CPY",
        2,
        3,
        &CPY,
        &ZPG
    ));

    this->_AddInstruction(0xC5, new Instruction(
        "CMP",
        2,
        3,
        &CMP,
        &ZPG
    ));

    this->_AddInstruction(0xC6, new Instruction(
        "DEC",
        2,
        5,
        &DEC,
        &ZPG
    ));

    this->_AddInstruction(0xC8, new Instruction(
        "INY",
        1,
        2,
        &INY,
        &IMP
    ));

    this->_AddInstruction(0xC9, new Instruction(
        "CMP",
        2,
        2,
        &CMP,
        &IMM
    ));

    this->_AddInstruction(0xCA, new Instruction(
        "DEX",
        1,
        2,
        &DEX,
        &IMP
    ));

    this->_AddInstruction(0xCC, new Instruction(
        "CPY",
        3,
        4,
        &CPY,
        &ABS
    ));

    this->_AddInstruction(0xCD, new Instruction(
        "CMP",
        3,
        4,
        &CMP,
        &ABS
    ));

    this->_AddInstruction(0xCE, new Instruction(
        "DEC",
        3,
        6,
        &DEC,
        &ABS
    ));

    this->_AddInstruction(0xD0, new Instruction(
        "BNE",
        2,
        2,
        &BNE,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0xD1, new Instruction(
        "CMP",
        2,
        5,
        &CMP,
        &INY
    ));

    this->_AddInstruction(0xD5, new Instruction(
        "CMP",
        2,
        4,
        &CMP,
        &ZPX
    ));

    this->_AddInstruction(0xD6, new Instruction(
        "DEC",
        2,
        6,
        &DEC,
        &ZPX
    ));

    this->_AddInstruction(0xD8, new Instruction(
        "CLD",
        1,
        2,
        &CLD,
        &IMP
    ));

    this->_AddInstruction(0xD9, new Instruction(
        "CMP",
        3,
        4,
        &CMP,
        &ABY
    ));

    this->_AddInstruction(0xDD, new Instruction(
        "CMP",
        3,
        4,
        &CMP,
        &ABX
    ));

    this->_AddInstruction(0xDE, new Instruction(
        "DEC",
        3,
        7,
        &DEC,
        &ABX
    ));

    this->_AddInstruction(0xE0, new Instruction(
        "CPX",
        2,
        2,
        &CPX,
        &IMM
    ));

    this->_AddInstruction(0xE1, new Instruction(
        "SBC",
        2,
        6,
        &SBC,
        &INX
    ));

    this->_AddInstruction(0xE4, new Instruction(
        "CPX",
        2,
        3,
        &CPX,
        &ZPG
    ));

    this->_AddInstruction(0xE5, new Instruction(
        "SBC",
        2,
        3,
        &SBC,
        &ZPG
    ));

    this->_AddInstruction(0xE6, new Instruction(
        "INC",
        2,
        5,
        &INC,
        &ZPG
    ));

    this->_AddInstruction(0xE8, new Instruction(
        "INX",
        1,
        2,
        &INX,
        &IMP
    ));

    this->_AddInstruction(0xE9, new Instruction(
        "SBC",
        2,
        2,
        &SBC,
        &IMM
    ));

    this->_AddInstruction(0xEA, new Instruction(
        "NOP",
        1,
        2,
        &NOP,
        &IMP
    ));

    this->_AddInstruction(0xEC, new Instruction(
        "CPX",
        3,
        4,
        &CPX,
        &ABS
    ));

    this->_AddInstruction(0xED, new Instruction(
        "SBC",
        3,
        4,
        &SBC,
        &ABS
    ));

    this->_AddInstruction(0xEE, new Instruction(
        "INC",
        3,
        6,
        &INC,
        &ABS
    ));

    this->_AddInstruction(0xF0, new Instruction(
        "BEQ",
        2,
        2,
        &BEQ,
        &REL,
        EBranchType::CONDITIONAL
    ));

    this->_AddInstruction(0xF1, new Instruction(
        "SBC",
        2,
        5,
        &SBC,
        &INY
    ));

    this->_AddInstruction(0xF5, new Instruction(
        "SBC",
        2,
        4,
        &SBC,
        &ZPX
    ));

    this->_AddInstruction(0xF6, new Instruction(
        "INC",
        2,
        6,
        &INC,
        &ZPX
    ));

    this->_AddInstruction(0xF8, new Instruction(
        "SED",
        1,
        2,
        &SED,
        &IMP
    ));

    this->_AddInstruction(0xF9, new Instruction(
        "SBC",
        3,
        4,
        &SBC,
        &ABY
    ));

    this->_AddInstruction(0xFD, new Instruction(
        "SBC",
        3,
        4,
        &SBC,
        &ABX
    ));

    this->_AddInstruction(0xFE, new Instruction(
        "INC",
        3,
        7,
        &INC,
        &ABX
    ));

}

void IS_6502::Run(uint8_t opcode) {
    this->_instructions[opcode]->Execute(this->_cpu);
}

IS_6502::~IS_6502() {

}