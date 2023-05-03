import { Component } from "../component/component";
import { Register } from "../data/register";
import { Bus } from "../data/bus";
import { Logger } from "../debug/logger";

export class CPU extends Component {

    protected _registers: Register[];
    protected _bus: Bus;

    constructor(bus: Bus) {
        super();
        this._bus = bus;
        this._registers = [];
    }

    public Update(): void {

    }

    public Pulse(clkCount: number, logger: Logger): void {

    }

    public Read(address: number): number {
        return 0x00;
    }

    public Write(address: number, value: number): void {
        
    }

    public Register(index: number): Register {
        return this._registers[index];
    }

    public Registers(): Register[] {
        return this._registers;
    }

    public TestStatus(value: number, index: number): void {

    }

}