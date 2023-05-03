import { InstructionSet } from "../../instructions/instruction_set";
import { CPU_6502, ERegisters, ESstatusBits } from "./cpu_6502";
import { CPU_6502_ALU } from "./cpu_6502_alu";
import { Bus } from "../../data/bus";
import { Register } from "../../data/register";
import { CPU } from "../cpu";

class OpParameters {

    private _address: number;
    private _value: number;
    private _register: Register;
    private _extraCycles: number;

    constructor(address: number, value: number, extraCycles: number, register: Register = null) {
        this._address = address;
        this._value = value;
        this._register = register;
        this._extraCycles = extraCycles;
    }
    
    get Address(): number {
        return this._address;
    }

    get Value(): number {
        return this._value;
    }

    get Register(): Register {
        return this._register;
    }

    get ExtraCycles(): number {
        return this._extraCycles;
    }
    
}

export class CPU_6502_Instructions extends InstructionSet {

    constructor(cpu: CPU_6502, alu: CPU_6502_ALU, bus: Bus) {

        super(cpu, bus, alu);

        this._instructions[0x00] = {
            mnem: "BRK",
            bytes: 1,
            duration: 7,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.BRK,
        }

        this._instructions[0x01] = {
            mnem: "ORA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x05] = {
            mnem: "ORA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x06] = {
            mnem: "ASL",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ASL,
        }

        this._instructions[0x08] = {
            mnem: "PHP",
            bytes: 1,
            duration: 3,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PHP,
        }

        this._instructions[0x09] = {
            mnem: "ORA",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x0A] = {
            mnem: "ASL",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ASL,
        }

        this._instructions[0x0D] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x0E] = {
            mnem: "ASL",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ASL,
        }

        this._instructions[0x10] = {
            mnem: "BPL",
            bytes: 2,
            duration: 2, 
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BPL,
        }

        this._instructions[0x1A] = {
            mnem: "NOP",
            bytes: 1,
            duration: 2, 
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.NOP,
        }

        this._instructions[0x11] = {
            mnem: "ORA",
            bytes: 2,
            duration: 5, 
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x15] = {
            mnem: "ORA",
            bytes: 2,
            duration: 5, 
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x16] = {
            mnem: "ASL",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ASL,
        }

        this._instructions[0x18] = {
            mnem: "CLC",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLC,
        }
        
        this._instructions[0x19] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x1D] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ORA,
        }

        this._instructions[0x1E] = {
            mnem: "ASL",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ASL,
        }

        this._instructions[0x20] = {
            mnem: "JSR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.JSR,
        }

        this._instructions[0x21] = {
            mnem: "AND",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x24] = {
            mnem: "BIT",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.BIT,
        }

        this._instructions[0x25] = {
            mnem: "AND",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x26] = {
            mnem: "ROL",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ROL,
        }

        this._instructions[0x28] = {
            mnem: "PLP",
            bytes: 1,
            duration: 4,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PLP,
        }

        this._instructions[0x29] = {
            mnem: "AND",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x2A] = {
            mnem: "ROL",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ROL,
        }

        this._instructions[0x2C] = {
            mnem: "BIT",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.BIT,
        }

        
        this._instructions[0x2D] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.AND,
        }
        
        this._instructions[0x2E] = {
            mnem: "ROL",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ROL,
        }

        this._instructions[0x30] = {
            mnem: "BMI",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BMI,
        }

        this._instructions[0x31] = {
            mnem: "AND",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x35] = {
            mnem: "AND",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x36] = {
            mnem: "ROL",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ROL,
        }

        this._instructions[0x38] = {
            mnem: "SEC",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SEC
        }
        
        this._instructions[0x39] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.AND,
        }

        this._instructions[0x3E] = {
            mnem: "ROL",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ROL,
        }

        this._instructions[0x3D] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.AND
        }

        this._instructions[0x40] = {
            mnem: "RTI",
            bytes: 1,
            duration: 6,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.RTI
        }

        this._instructions[0x41] = {
            mnem: "EOR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x45] = {
            mnem: "EOR",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x46] = {
            mnem: "LSR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LSR
        }

        this._instructions[0x48] = {
            mnem: "PHA",
            bytes: 1,
            duration: 3,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PHA
        }

        this._instructions[0x49] = {
            mnem: "EOR",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x4A] = {
            mnem: "LSR",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.LSR
        }

        this._instructions[0x4C] = {
            mnem: "JMP",
            bytes: 3,
            duration: 3,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.JMP
        }

        this._instructions[0x4D] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x4E] = {
            mnem: "LSR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LSR
        }

        this._instructions[0x50] = {
            mnem: "BVC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BVC,
        }

        this._instructions[0x51] = {
            mnem: "EOR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x55] = {
            mnem: "EOR",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x56] = {
            mnem: "LSR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LSR
        }

        this._instructions[0x58] = {
            mnem: "CLI",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLI,
        }

        this._instructions[0x59] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x5D] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.EOR
        }

        this._instructions[0x5E] = {
            mnem: "LSR",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LSR
        }

        this._instructions[0x60] = {
            mnem: "RTS",
            bytes: 1,
            duration: 6,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.RTS
        }

        this._instructions[0x61] = {
            mnem: "ADC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.ADC,
        }   

        this._instructions[0x65] = {
            mnem: "ADC",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ADC,
        }

        this._instructions[0x66] = {
            mnem: "ROR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ROR,
        }

        this._instructions[0x68] = {
            mnem: "PLA",
            bytes: 1,
            duration: 4,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PLA
        }

        this._instructions[0x69] = {
            mnem: "ADC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.ADC,
        }

        this._instructions[0x6A] = {
            mnem: "ROR",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ROR,
        }

        this._instructions[0x6C] = {
            mnem: "JMP",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.Indirect,
            operation: this._OPERATIONS.JMP
        }
                   
        this._instructions[0x6D] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ADC,
        }  

        this._instructions[0x6E] = {
            mnem: "ROR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ROR,
        }
        
        this._instructions[0x70] = {
            mnem: "BVS",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BVS,
        }

        this._instructions[0x71] = {
            mnem: "ADC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ADC,
        }   
        
        this._instructions[0x75] = {
            mnem: "ADC",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ADC,
        }

        this._instructions[0x76] = {
            mnem: "ROR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ROR,
        }

        this._instructions[0x78] = {
            mnem: "SEI",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SEI
        }
        
        this._instructions[0x79] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.ADC,
        }   

        this._instructions[0x7D] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ADC,
        }   

        this._instructions[0x7E] = {
            mnem: "ROR",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ROR,
        }

        this._instructions[0x81] = {
            mnem: "STA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0x84] = {
            mnem: "STY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STY
        }

        this._instructions[0x85] = {
            mnem: "STA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0x86] = {
            mnem: "STX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STX
        }

        this._instructions[0x88] = {
            mnem: "DEY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.DEY
        }

        this._instructions[0x8A] = {
            mnem: "TXA",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TXA
        }

        this._instructions[0x8C] = {
            mnem: "STY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STY
        }

        this._instructions[0x8D] = {
            mnem: "STA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0x8E] = {
            mnem: "STX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STX
        }

        this._instructions[0x90] = {
            mnem: "BCC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BCC,
        }

        this._instructions[0x91] = {
            mnem: "STA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0x94] = {
            mnem: "STY",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.STY
        }

        this._instructions[0x95] = {
            mnem: "STA",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0x96] = {
            mnem: "STX",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageYIndexed,
            operation: this._OPERATIONS.STX
        }

        this._instructions[0x98] = {
            mnem: "TYA",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TYA
        }

        this._instructions[0x99] = {
            mnem: "STA",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.STA
        }
        
        this._instructions[0x9A] = {
            mnem: "TXS",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TXS
        }

        this._instructions[0x9D] = {
            mnem: "STA",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.STA
        }

        this._instructions[0xA0] = {
            mnem: "LDY",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDY
        }

        this._instructions[0xA1] = {
            mnem: "LDA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xA2] = {
            mnem: "LDX",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDX
        }

        this._instructions[0xA4] = {
            mnem: "LDY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDY
        }
        
        this._instructions[0xA5] = {
            mnem: "LDA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xA6] = {
            mnem: "LDX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDX
        }

        this._instructions[0xA8] = {
            mnem: "TAY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TAY
        }

        this._instructions[0xA9] = {
            mnem: "LDA",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xAA] = {
            mnem: "TAX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TAX
        }
        
        this._instructions[0xAC] = {
            mnem: "LDY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDY
        }
        
        this._instructions[0xAD] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xAE] = {
            mnem: "LDX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDX
        }

        this._instructions[0xB0] = {
            mnem: "BCS",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BCS,
        }

        this._instructions[0xB1] = {
            mnem: "LDA",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xB4] = {
            mnem: "LDY",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LDY
        }

        this._instructions[0xB5] = {
            mnem: "LDA",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xB6] = {
            mnem: "LDX",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageYIndexed,
            operation: this._OPERATIONS.LDX
        }

        this._instructions[0xB8] = {
            mnem: "CLV",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLV,
        }

        this._instructions[0xB9] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xBA] = {
            mnem: "TSX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TSX
        }

        this._instructions[0xBC] = {
            mnem: "LDY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LDY
        }

        this._instructions[0xBD] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LDA
        }

        this._instructions[0xBE] = {
            mnem: "LDX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.LDX
        }

        this._instructions[0xC0] = {
            mnem: "CPY",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CPY
        }

        this._instructions[0xC1] = {
            mnem: "CMP",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.CMP
        }
        
        this._instructions[0xC4] = {
            mnem: "CPY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CPY
        }
        
        this._instructions[0xC5] = {
            mnem: "CMP",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CMP
        }
        
        this._instructions[0xC6] = {
            mnem: "DEC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.DEC
        }
                
        this._instructions[0xC8] = {
            mnem: "INY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.INY
        }
        
        this._instructions[0xC9] = {
            mnem: "CMP",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CMP
        }

        this._instructions[0xCA] = {
            mnem: "DEX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.DEX
        }

        this._instructions[0xCC] = {
            mnem: "CPY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CPY
        }

        this._instructions[0xCD] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CMP
        }
        
        this._instructions[0xCE] = {
            mnem: "DEC",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.DEC
        }

        this._instructions[0xD0] = {
            mnem: "BNE",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BNE,
        }

        this._instructions[0xD1] = {
            mnem: "CMP",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.CMP
        }

        this._instructions[0xD5] = {
            mnem: "CMP",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.CMP
        }

        this._instructions[0xD6] = {
            mnem: "DEC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.DEC
        }

        this._instructions[0xD8] = {
            mnem: "CLD",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLD,
        }

        this._instructions[0xD9] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.CMP
        }

        this._instructions[0xDD] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.CMP
        }

        this._instructions[0xDE] = {
            mnem: "DEC",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.DEC
        }
        
        this._instructions[0xE0] = {
            mnem: "CPX",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CPX
        }

        this._instructions[0xE1] = {
            mnem: "SBC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xE5] = {
            mnem: "SBC",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xE9] = {
            mnem: "SBC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.SBC
        }
        
        this._instructions[0xEA] = {
            mnem: "NOP",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.NOP
        }

        this._instructions[0xE4] = {
            mnem: "CPX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CPX
        }

        this._instructions[0xE6] = {
            mnem: "INC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.INC
        }

        this._instructions[0xE8] = {
            mnem: "INX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.INX
        }

        this._instructions[0xEC] = {
            mnem: "CPX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CPX
        }

        this._instructions[0xED] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xEE] = {
            mnem: "INC",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.INC
        }

        this._instructions[0xF0] = {
            mnem: "BEQ",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BEQ,
        }

        this._instructions[0xF1] = {
            mnem: "SBC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xF5] = {
            mnem: "SBC",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xF6] = {
            mnem: "INC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.INC
        }

        this._instructions[0xF8] = {
            mnem: "SED",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SED
        }

        this._instructions[0xF9] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xFD] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.SBC
        }

        this._instructions[0xFE] = {
            mnem: "INC",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.INC
        }

    }

    private _ADR_MODES = {

        Implied: (ops: number[]): OpParameters => {
            return new OpParameters(0, 0, 0);
        },

        Accumulator: (ops: number[]): OpParameters => {
            return new OpParameters(0, this._cpu.Register(ERegisters.A).Read(), 0, this._cpu.Register(ERegisters.A));
        },

        Immediate: (ops: number[]): OpParameters => {
            return new OpParameters(ops[0], ops[0], 0);
        },

        Absolute: (ops: number[]): OpParameters => {
            let addr = (ops[1] << 8) | ops[0];
            return new OpParameters(addr, this._bus.Read(addr, true), 0);
        },    

        AbsXIndexed: (ops: number[]): OpParameters => {

            let address = (ops[1] << 8) | ops[0];
            let finalAddress = (address + this._cpu.Register(ERegisters.X).Read()) % 65536;

            let extraCycles = 0;
            
            if((finalAddress & 0xFF00) !== (ops[1] << 8)) {
                extraCycles = 1;
            }

            return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), extraCycles);

        },

        AbsYIndexed: (ops: number[]): OpParameters => {

            let address = (ops[1] << 8) | ops[0];
            let finalAddress = (address + this._cpu.Register(ERegisters.Y).Read()) % 65536;

            let extraCycles = 0;

            if((finalAddress & 0xFF00) !== (ops[1] << 8)) {
                extraCycles = 1;
            }

            return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), extraCycles);

        },

        XIndexedIndirect: (ops: number[]): OpParameters => {

            let address = this._bus.Read(ops[0], true);

            let lo = this._bus.Read((address + this._cpu.Register(ERegisters.X).Read()) & 0x00FF, true);
            let hi = this._bus.Read((address + this._cpu.Register(ERegisters.X).Read() + 1) & 0x00FF, true);        
            let addr = (hi << 8) | lo;

            return new OpParameters(addr, this._bus.Read(addr, true), 0);

        },

        IndirectIndexedY: (ops: number[]): OpParameters => {

            let address1 = this._bus.Read(ops[0], true);
            let address2 = this._bus.Read(ops[0]+1, true);

            let fullAddress = (address2 << 8) | (address1 + this._cpu.Register(ERegisters.Y).Read());

            let extraCycles = 0;

            if((fullAddress & 0xFF00) != (address2 << 8)) {
                extraCycles = 1;
            }

            return new OpParameters(fullAddress, this._bus.Read(fullAddress, true), extraCycles);

        },

        Indirect: (ops: number[]): OpParameters => {

            let ptr = (ops[1] << 8) | ops[0];
            let finalAddress = 0;

            if(ops[0] == 0x00FF) {
                finalAddress = (this._bus.Read(ptr & 0xFF00, true) << 8) | this._bus.Read(ptr, true);
            } else {
                finalAddress = (this._bus.Read(ptr + 1, true) << 8) | this._bus.Read(ptr, true);
            }

            return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), 0);
        },

        ZeroPage: (ops: number[]): OpParameters => {            
            return new OpParameters(ops[0], this._bus.Read(ops[0], true), 0);
        },

        ZeroPageXIndexed: (ops: number[]): OpParameters => {
            let address = (ops[0] + this._cpu.Register(ERegisters.X).Read()) % 256;
            return new OpParameters(address, this._bus.Read(address, true), 0);
        },

        ZeroPageYIndexed: (ops: number[]): OpParameters => {
            let address = (ops[0] + this._cpu.Register(ERegisters.Y).Read()) % 256
            return new OpParameters(address, this._bus.Read(address, true), 0);
        },

        Relative: (ops: number[]): OpParameters => {
            return new OpParameters(this._cpu.Register(ERegisters.PC).Read(), this._cpu.Register(ERegisters.PC).Read() + this._AsSigned(ops[0]), 0);
        }

    }

    private _OPERATIONS = {

        ADC: (data: OpParameters): void => {
            let result = this._alu.Add(this._cpu.Register(ERegisters.A).Read(), data.Value);
            this._cpu.Register(ERegisters.A).Write(result);
        },

        AND: (data: OpParameters): void => {
            let result = this._alu.And(this._cpu.Register(ERegisters.A).Read(), data.Value);
            this._cpu.Register(ERegisters.A).Write(result);
        },

        ASL: (data: OpParameters): void => {
            let result = this._alu.ShiftLeft(data.Value);
            if(data.Register) {
                data.Register.Write(result);
            } else {
                this._bus.Write(data.Address, result);
            }
        },

        BCC: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C) === 0) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BCS: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C) === 1) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BEQ: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.Z) === 1) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BIT: (data: OpParameters): void => {          
            
            let n: number = (data.Value & 0b10000000) > 0 ? 1: 0;
            let v: number = (data.Value & 0b01000000) > 0 ? 1: 0;

            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, n);
            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.V, v);

            let result = this._cpu.Register(ERegisters.A).Read() & data.Value;
            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, (result & 0x00FF) == 0x00 ? 1 : 0);
        },

        BMI: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.N) === 1) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BNE: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.Z) === 0) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BPL: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.N) === 0) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BRK: (data: OpParameters): void => {
            throw("BRK not implemented");
        },

        BVC: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.V) === 0) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        BVS: (data: OpParameters): void => {
            if(this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.V) === 1) {
                this._cpu.Register(ERegisters.PC).Write(data.Value);
            }
        },

        CLC: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.C);
        },

        CLD: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.D);
        },

        CLI: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.I);
        },

        CLV: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.V);
        },

        CMP: (data: OpParameters): void => {
            let a: number = this._cpu.Register(ERegisters.A).Read();
            let temp = this._AsSigned(a - data.Value);
            this._cpu.TestStatus(temp, ESstatusBits.Z);
            this._cpu.TestStatus(temp, ESstatusBits.N);
            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, a >= data.Value ? 1 : 0);
        },

        CPX: (data: OpParameters): void => {
            let x: number = this._cpu.Register(ERegisters.X).Read();
            let temp = this._AsSigned(x - data.Value);
            this._cpu.TestStatus(temp, ESstatusBits.Z);
            this._cpu.TestStatus(temp, ESstatusBits.N);
            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, x >= data.Value ? 1 : 0);
        },

        CPY: (data: OpParameters): void => {
            let y: number = this._cpu.Register(ERegisters.Y).Read();
            let temp = this._AsSigned(y - data.Value);
            this._cpu.TestStatus(temp, ESstatusBits.Z);
            this._cpu.TestStatus(temp, ESstatusBits.N);
            this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, y >= data.Value ? 1 : 0);
        },

        DEC: (data: OpParameters): void => {
            let result = this._alu.Decrement(data.Value);
            this._bus.Write(data.Address, result);
        },

        DEX: (data: OpParameters): void => {
            let result = this._alu.Decrement(this._cpu.Register(ERegisters.X).Read());
            this._cpu.Register(ERegisters.X).Write(result);
        },

        DEY: (data: OpParameters): void => {
            let result = this._alu.Decrement(this._cpu.Register(ERegisters.Y).Read());
            this._cpu.Register(ERegisters.Y).Write(result);
        },

        EOR: (data: OpParameters): void => {
            let result = this._alu.Xor(this._cpu.Register(ERegisters.A).Read(), data.Value);
            this._cpu.Register(ERegisters.A).Write(result);
        },

        INC: (data: OpParameters): void => {
            let result = this._alu.Increment(data.Value);
            this._bus.Write(data.Address, result);
        },

        INX: (data: OpParameters): void => {
            let result = this._alu.Increment(this._cpu.Register(ERegisters.X).Read());
            this._cpu.Register(ERegisters.X).Write(result);
        },

        INY: (data: OpParameters): void => {
            let result = this._alu.Increment(this._cpu.Register(ERegisters.Y).Read());
            this._cpu.Register(ERegisters.Y).Write(result);
        },

        JMP: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.PC).Write(data.Address);
        },

        JSR: (data: OpParameters): void => {
            let address = data.Address;

            let pcHi = ((this._cpu.Register(ERegisters.PC).Read() - 1) >> 8) & 0x00FF;
            let pcLo = (this._cpu.Register(ERegisters.PC).Read() - 1) & 0x00FF

            this._Push(pcHi);
            this._Push(pcLo);
            this._cpu.Register(ERegisters.PC).Write(address);
        },

        LDA: (data: OpParameters): void => {
            this._cpu.TestStatus(data.Value, ESstatusBits.Z);
            this._cpu.TestStatus(data.Value, ESstatusBits.N);
            this._cpu.Register(ERegisters.A).Write(data.Value);
        },

        LDX: (data: OpParameters): void => {
            this._cpu.TestStatus(data.Value, ESstatusBits.Z);
            this._cpu.TestStatus(data.Value, ESstatusBits.N);
            this._cpu.Register(ERegisters.X).Write(data.Value);
        },

        LDY: (data: OpParameters): void => {
            this._cpu.TestStatus(data.Value, ESstatusBits.Z);
            this._cpu.TestStatus(data.Value, ESstatusBits.N);
            this._cpu.Register(ERegisters.Y).Write(data.Value);
        },

        LSR: (data: OpParameters): void => {
            let result = this._alu.ShiftRight(data.Value);
            if(data.Register) {
                data.Register.Write(result);
            } else {
                this._bus.Write(data.Address, result);
            }
        },

        NOP: (data: OpParameters): void => {
            
        },

        ORA: (data: OpParameters): void => {
            let result = this._alu.Or(this._cpu.Register(ERegisters.A).Read(), data.Value);
            this._cpu.Register(ERegisters.A).Write(result);
        },

        PHA: (data: OpParameters): void => {
            this._Push(this._cpu.Register(ERegisters.A).Read());
        },

        PHP: (data: OpParameters): void => {
            let b = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.B);
            let u = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.UNUSED);
            this._Push(this._cpu.Register(ERegisters.STATUS).Read() | b | u);
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.B);
            this._cpu.Register(ERegisters.STATUS).Clear(ESstatusBits.UNUSED);
        },

        PLA: (data: OpParameters): void => {
            let a = this._Pull();
            this._cpu.Register(ERegisters.A).Write(a);
            this._cpu.TestStatus(a, ESstatusBits.Z);
            this._cpu.TestStatus(a, ESstatusBits.N);
        },

        PLP: (data: OpParameters): void => {
            let a = this._Pull();
            this._cpu.Register(ERegisters.STATUS).Write(a);
            this._cpu.Register(ERegisters.STATUS).Set(ESstatusBits.UNUSED);
        },

        ROL: (data: OpParameters): void => {
            if(data.Register) {
                let result = this._alu.RotateLeft(data.Register.Read());
                data.Register.Write(result);
            } else {
                let result = this._alu.RotateLeft(data.Value);
                this._bus.Write(data.Address, result);
            }
        },

        ROR: (data: OpParameters): void => {
            if(data.Register) {
                let result = this._alu.RotateRight(data.Register.Read());
                data.Register.Write(result);
            } else {
                let result = this._alu.RotateRight(data.Value);
                this._bus.Write(data.Address, result);
            }
        },

        RTI: (data: OpParameters): void => {
                
            let a = this._Pull();
            this._cpu.Register(ERegisters.STATUS).Write(a);
            this._cpu.Register(ERegisters.STATUS).Flip(ESstatusBits.B);
            this._cpu.Register(ERegisters.STATUS).Flip(ESstatusBits.UNUSED);
            
            let returnLo = this._Pull();
            let returnHi = this._Pull();
            let returnAddr = (returnHi << 8) | returnLo;

            this._cpu.Register(ERegisters.PC).Write(returnAddr);

        },

        RTS: (data: OpParameters): void => {

            let returnLo = this._Pull();
            let returnHi = this._Pull();
            let returnAddr = (returnHi << 8) | returnLo;
            this._cpu.Register(ERegisters.PC).Write(returnAddr + 1);

        },

        SBC: (data: OpParameters): void => {
            let result = this._alu.Subtract(this._cpu.Register(ERegisters.A).Read(), data.Value);
            this._cpu.Register(ERegisters.A).Write(result);
        },

        SEC: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Set(ESstatusBits.C);
        },

        SED: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Set(ESstatusBits.D);
        },

        SEI: (data: OpParameters): void => {
            this._cpu.Register(ERegisters.STATUS).Set(ESstatusBits.I);
        },

        STA: (data: OpParameters): void => {
            this._bus.Write(data.Address, this._cpu.Register(ERegisters.A).Read());
        },

        STX: (data: OpParameters): void => {
            this._bus.Write(data.Address, this._cpu.Register(ERegisters.X).Read());
        },

        STY: (data: OpParameters): void => {
            this._bus.Write(data.Address, this._cpu.Register(ERegisters.Y).Read());
        },

        TAX: (data: OpParameters): void => {
            let a = this._cpu.Register(ERegisters.A).Read();
            this._cpu.TestStatus(a, ESstatusBits.Z);
            this._cpu.TestStatus(a, ESstatusBits.N);
            this._cpu.Register(ERegisters.X).Write(a);
        },

        TAY: (data: OpParameters): void => {
            let a = this._cpu.Register(ERegisters.A).Read();
            this._cpu.TestStatus(a, ESstatusBits.Z);
            this._cpu.TestStatus(a, ESstatusBits.N);
            this._cpu.Register(ERegisters.Y).Write(a);
        },

        TSX: (data: OpParameters): void => {
            let sp = this._cpu.Register(ERegisters.SP).Read();
            this._cpu.TestStatus(sp, ESstatusBits.Z);
            this._cpu.TestStatus(sp, ESstatusBits.N);
            this._cpu.Register(ERegisters.X).Write(sp);
        },

        TXA: (data: OpParameters): void => {
            let x = this._cpu.Register(ERegisters.X).Read();
            this._cpu.TestStatus(x, ESstatusBits.Z);
            this._cpu.TestStatus(x, ESstatusBits.N);
            this._cpu.Register(ERegisters.A).Write(x);
        },

        TXS: (data: OpParameters): void => {
            let x = this._cpu.Register(ERegisters.X).Read();
            this._cpu.Register(ERegisters.SP).Write(x);
        },

        TYA: (data: OpParameters): void => {
            let y = this._cpu.Register(ERegisters.Y).Read();
            this._cpu.TestStatus(y, ESstatusBits.Z);
            this._cpu.TestStatus(y, ESstatusBits.N);
            this._cpu.Register(ERegisters.A).Write(y);
        },

    }

    private _AsSigned(value: number): number {
        if(value < 0) {
            return 256+value;
        }
        let sign = (value & (1 << 7)) >> 7;
        if(sign === 1) {
            return -(256+(~(value)+1));
        } else {
            return value;
        }
    }

    private _Push(value: number): void {
        this._bus.Write(0x0100 + this._cpu.Register(ERegisters.SP).Read(), value);
        this._cpu.Register(ERegisters.SP).Write(this._cpu.Register(ERegisters.SP).Read()-1);
    }

    private _Pull(): number {
        this._cpu.Register(ERegisters.SP).Write(this._cpu.Register(ERegisters.SP).Read()+1);
        return this._bus.Read(0x0100 + this._cpu.Register(ERegisters.SP).Read());
    }

}