import { ALU } from "../../alu/alu";
import { CPU_6502, ERegisters, ESstatusBits } from "./cpu_6502";
import { Register } from "../../data/register";

export class CPU_6502_ALU extends ALU {

    constructor(cpu: CPU_6502) {
        super(cpu);
    }

    public Increment(a: number): number {
        let result = (a+1) % 256;        
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));
        return result;
    }

    public Decrement(a: number): number {
        let result = (a-1) % 256;        
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));
        return result;
    }

    public Or(a: number, b: number): number {
        let result = a | b;        
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));
        return result;
    }

    public Xor(a: number, b: number): number {
        let result = a ^ b;        
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));
        return result;
    }

    public And(a: number, b: number): number {
        let result = a & b;        
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));
        return result;
    }

    public ShiftRight(a: number): number {
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, (a & 0x0001) > 0 ? 1 : 0);
        let temp = a >> 1;
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(temp));        
        return temp & 0x00FF;
    }

    public ShiftLeft(a: number): number {   
        let temp = a << 1;
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, (temp & 0xFF00) > 0 ? 1 : 0);
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(a));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(a));        
        return temp & 0x00FF;
    }

    public RotateLeft(a: number): number {
        let c = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C);        
        let temp = (a << 1) | c         
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, (temp & 0xFF00) > 0 ? 1 : 0);
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(temp));        
        return temp & 0x00FF;
    }

    public RotateRight(a: number): number {
        let c = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C);        
        let temp = (c << 7) | (a >> 1);
        //console.log(temp);
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, (temp & 0x01) > 0 ? 1 : 0);
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(temp));        
        return temp & 0x00FF;
    }

    public Add(a: number, b: number): number {

        let c: number = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C);
        let result = (a+b+c) ;

        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, this._CheckCarry(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(result));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(result));

        let overflow = (~(a ^ b) & (a ^ result)) & 0x0080;
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.V, overflow);

        return result & 0x00FF;
    }

    public Subtract(a: number, b: number): number {
        let c: number = this._cpu.Register(ERegisters.STATUS).Bit(ESstatusBits.C);
        b ^= 0x00FF;
        b &= 0x00ff;
        let temp = (a+b+c);
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.C, this._CheckCarry(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, this._CheckZero(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, this._CheckNegative(temp));
        this._cpu.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.V, ((temp ^ a) & (temp ^ b) & 0x0080) > 0 ? 1 : 0);
        return temp & 0x00FF;
    }

    private _SafeByte(value: number): number {
        if(value < 0) {
            return 256+(value % 256);
        } else {
            return value % 256;
        }             
    }

    private _CheckZero(value: number): number {
        return ((value & 0x00FF) === 0) ? 1 : 0;
    }

    private _CheckNegative(value: number): number {
        return (value & 0x80) ? 1 : 0;
    }

    private _CheckCarry(value: number): number {
        return (value & 0xFF00) > 0 ? 1 : 0;
    }

}