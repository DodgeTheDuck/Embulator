import { Timer } from "./timer";

export class Stopwatch {

    private _interval: number;
    private _repeat: boolean;
    private _callback: Function;

    private _timer: Timer;

    constructor(interval: number, repeat: boolean, callback: Function) {
        this._interval = interval;
        this._callback = callback;
        this._repeat = repeat;
        this._timer = new Timer();
    }

    public Tick() {
        if(this._timer) {
            this._timer.Measure();
            if(this._timer.Total() > this._interval) {
                this._callback();
                this._timer.Reset(this._interval);
                if(!this._repeat) {
                    this._timer = null;
                }
            }
        }
    }

}