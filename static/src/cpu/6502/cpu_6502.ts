import { Register } from "../../data/register";
import { CPU } from "../cpu";
import { CPU_6502_ALU } from "./cpu_6502_alu";
import { CPU_6502_Instructions } from "./cpu_6502_instructions";
import { Bus } from "../../data/bus";
import { Instruction } from "../../instructions/instruction_set";
import { Logger } from "../../debug/logger";
import { DMA } from "../../component/dma";

export enum ESstatusBits {
    C,
    Z,
    I,
    D,
    B,
    UNUSED,
    V,
    N,
}

export enum ERegisters {
    A,
    X,
    Y,
    STATUS,
    SP,
    PC
}

export class CPU_6502 extends CPU {

    private _alu: CPU_6502_ALU;
    private _instructions: CPU_6502_Instructions;

    private _cycles: number;
    private _cycleCount: number;


    private _dma: DMA;

    constructor(bus: Bus, dma: DMA) {
        super(bus);

        this._alu = new CPU_6502_ALU(this);
        this._instructions = new CPU_6502_Instructions(this, this._alu, this._bus);

        this._registers[ERegisters.A] = new Register(8, "A");
        this._registers[ERegisters.X] = new Register(8, "X");
        this._registers[ERegisters.Y] = new Register(8, "Y");
        this._registers[ERegisters.STATUS] = new Register(8, "Status");
        this._registers[ERegisters.SP] = new Register(8, "SP");
        this._registers[ERegisters.PC] = new Register(16, "PC");        

        this._cycles = 0;
        this._cycleCount = 0;

        this._dma = dma;

        this._clockDivide = 3;

    }

    public Reset(): void {
        this.Register(ERegisters.SP).Write(0xff);

        let entry = 0xFFFC;
        let lo = this._bus.Read(entry);
        let hi = this._bus.Read(entry+1);
        let pcStart = (hi << 8) | lo;

        this.Register(ERegisters.PC).Write(pcStart);
        this.Register(ERegisters.STATUS).Write(0x00);
    }

    public Update(): void {
  
    }

    public Pulse(clkCount: number, logger: Logger): void {

        if(this._dma.DmaTransfer) {
            return;
        }

        this._cycleCount++;

        if(this._cycles > 0) {
            this._cycles--;
            return;
        }

        let pc: number = this.Register(ERegisters.PC).Read();
        let data: number = this._bus.Read(pc);

        let op: Instruction = this._instructions.Lookup(data);

        if(op) {

            // let logMsg = "";
            // logMsg = `${this._ToHex(pc, 4)} `;
            // logMsg += `A:${this._ToHex(this.Register(ERegisters.A).Read(), 2)} `;
            // logMsg += `X:${this._ToHex(this.Register(ERegisters.X).Read(), 2)} `;
            // logMsg += `Y:${this._ToHex(this.Register(ERegisters.Y).Read(), 2)} `;
            // logMsg += `SP:${this._ToHex(this.Register(ERegisters.SP).Read(), 2)} `;
            
            // logger.WriteLine(logMsg);

            let operands: number[] = this._GetOperands(op.bytes-1);

            let data: number = op.addresser(operands);
            op.operation(data);
     
            this._cycles = Math.max(op.duration-1, 0);            
            
        } else {
            throw(`UNDEFINED OP 0x${data.toString(16).toUpperCase()} at 0x${pc.toString(16).toUpperCase()}`);
        }

    }    

    
    private _ToHex(number, length) {
   
        var str = '' + number.toString(16);
        while (str.length < length) {
            str = '0' + str;
        }
       
        return "0x" + str.toUpperCase();
    
    }

    public Nmi(): void {

        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), (this.Register(ERegisters.PC).Read() >> 8) & 0x00FF);
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read()-1);
        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), this.Register(ERegisters.PC).Read() & 0x00FF);
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read()-1);

        this.Register(ERegisters.STATUS).Clear(ESstatusBits.B);
        this.Register(ERegisters.STATUS).Set(ESstatusBits.UNUSED);
        this.Register(ERegisters.STATUS).Set(ESstatusBits.I);

        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), this.Register(ERegisters.STATUS).Read());
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read()-1);

        let addrAbs = 0xFFFA;
        let lo = this._bus.Read(addrAbs);
        let hi = this._bus.Read(addrAbs + 1);

        this.Register(ERegisters.PC).Write((hi << 8) | lo);
        this._cycles = 8;
        
    }

    public Read(address: number): number {
        return 0;
    }

    public Write(address: number): void {
        
    }

    public InstructionLookup(data: number): Instruction {
        return this._instructions.Lookup(data);
    }

    public OperandLookup(address: number, ins: Instruction): number[] {
        return this._GetOperandsSafe(ins.bytes-1, address);
    }

    public Cycles(): number {
        return this._cycleCount;
    }

    public TestStatus(value: number, index: ESstatusBits): void {
        switch(index) {
            case ESstatusBits.Z: {
                this.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, (value === 0) ? 1 : 0);
                break;
            }
            case ESstatusBits.N: {
                let sign = (value & 0b10000000);
                this.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, (sign > 0) ? 1 : 0); 
            }
        }
    }

    private _GetOperandsSafe(n: number, address: number): number[] {
        let result: number[] = [];
        for(let i = 0; i < n; i++) {
            let byte: number = this._bus.Read(address+i);
            result.push(byte);
        }
        return result;
    }

    private _GetOperands(n: number): number[] {
        let result: number[] = [];
        this.Register(ERegisters.PC).Write((this.Register(ERegisters.PC).Read()+1) % 0xFFFF);
        for(let i = 0; i < n; i++) {
            let byte: number = this._bus.Read(this.Register(ERegisters.PC).Read());
            result.push(byte);
            this.Register(ERegisters.PC).Write((this.Register(ERegisters.PC).Read()+1) % 0xFFFF);
        }
        return result;
    }

}