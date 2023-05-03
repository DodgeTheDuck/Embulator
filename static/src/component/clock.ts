import { Component } from "./component";

export class Clock {

    private _last: number;
    private _msAcc: number;
    private _overAcc: number;
    private _hz: number;

    constructor(hz: number) {
        this._hz = hz;
        this._last = performance.now();
        this._msAcc = 0;
        this._overAcc = 0;
    }

    public Oscillate(): number {
        
        //return 41650;
        //return 41650;

        let now = performance.now();
        let delta = now - this._last;
        this._msAcc += delta;
        this._last = now;
        let targetMs = 1000 / this._hz;        

        let maxHz = 50000;

        if(delta >= targetMs) {
            let targetPulses = delta / targetMs;
            let nPulses = Math.round(targetPulses);
            let overshoot = targetPulses - nPulses;
            this._overAcc += overshoot;
            if(this._overAcc >= 1) {
                nPulses++;
                this._overAcc -= 1;
            }
            this._msAcc = 0;            
            if(delta >= 1000) {
                console.log("Clock took too long: " + delta + "ms");
                nPulses = 1; // stop it locking my browser when im debugging
            }
            if(nPulses > maxHz) nPulses = maxHz;
            return nPulses;
        } else {
            if(this._msAcc >= targetMs) {
                this._msAcc -= targetMs;
                return 1;
            } else {
                return 0;
            }
        }

    };

}