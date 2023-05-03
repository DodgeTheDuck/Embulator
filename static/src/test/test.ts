import { RAM } from "../component/ram";
import { CPU_6502 } from "../cpu/6502/cpu_6502";
import { CPU_6502_Instructions } from "../cpu/6502/cpu_6502_instructions";
import { CPU } from "../cpu/cpu";

export abstract class Test {
    
    protected _cpu: CPU;

    constructor(cpu: CPU) {
        this._cpu = cpu;        
    }

    public abstract Run(): boolean;

}