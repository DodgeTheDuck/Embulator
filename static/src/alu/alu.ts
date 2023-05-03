
import { Register } from "../data/register";
import { CPU } from "../cpu/cpu";

export abstract class ALU {

    protected _cpu: CPU

    constructor(cpu: CPU) {
        this._cpu = cpu;
    }

    public abstract Add(a: number, b: number): number;

}