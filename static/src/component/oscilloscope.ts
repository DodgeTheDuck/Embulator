import { Component } from "./component";

export class Oscilliscope extends Component {

    private _last: number;
    private _msAcc: number;
    private _pulseCount: number;

    constructor() {
        super();
        this._pulseCount = 0;
        this._last = 0;
        this._msAcc = 0;
    }

    public Update(): void {        

        let now = performance.now();
        let delta = now - this._last;
        this._msAcc += delta;
        this._last = now;

        if(this._msAcc >= 1000) {
            console.log(`Measured hz: ${this._pulseCount}`);
            this._pulseCount = 0;
            this._msAcc = 0;
        }

    }

    public Pulse(): void {
        this._pulseCount++;
    }

    public Read(addres: number): number {
        return 0x00;
    }

    public Write(address: number, value: number): void {
        
    }

}