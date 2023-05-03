import { Bus } from "../data/bus";
import { Logger } from "../debug/logger";

export abstract class Component {

    protected _buses: Bus[];
    protected _clockDivide: number;

    constructor() {
        this._buses = [];
        this._clockDivide = 1;
    }

    public abstract Update(): void;
    public abstract Pulse(clkCount: number, logger: Logger): void;

    public abstract Read(address: number, rdOnly: boolean): number;
    public abstract Write(address: number, value: number, rdOnly: boolean): void;

    public Connect(bus: Bus, index: number): void {
        this._buses[index] = bus;
    }

    get ClockDivide(): number {
        return this._clockDivide;
    }

}