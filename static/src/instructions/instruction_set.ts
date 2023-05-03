import { ALU } from "../alu/alu";
import { CPU_6502_ALU } from "../cpu/6502/cpu_6502_alu";
import { CPU } from "../cpu/cpu";
import { Bus } from "../data/bus";

export interface Instruction {
    mnem: string,
    operation: Function,
    addresser?: Function,
    bytes: number,
    duration: number
}


export abstract class InstructionSet {

    protected _instructions: Instruction[];
    protected _cpu: CPU;
    protected _bus: Bus;
    protected _alu: CPU_6502_ALU;

    constructor(cpu: CPU, bus: Bus, alu: CPU_6502_ALU) {
        this._instructions = [];
        this._cpu = cpu;
        this._bus = bus;
        this._alu = alu;
    }

    public Lookup(opcode: number): Instruction {
        return this._instructions[opcode];
    }

    protected _LogNotImplemented(op: Instruction, code: number): void {
        throw(`${op.mnem}(${code.toString(16)}) NOT IMPLEMENTED`);
    }
    

}