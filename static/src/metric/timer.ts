
export class Timer {

    private _acc: number;
    private _last: number;
    
    constructor() {
        this._last = 0;        
        this._acc = 0;
    }

    public Measure(): number {
        let now: number = performance.now();
        let delta = now - this._last;        
        this._acc += delta;
        this._last = now;
        return delta;
    }

    public Total(): number {
        return this._acc;
    }

    public Reset(interval: number): void {
        this._acc = interval - this._acc;
    }

}