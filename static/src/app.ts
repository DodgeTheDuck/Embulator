import { Stopwatch } from "./metric/stopwatch";
import { Timer } from "./metric/timer";
import { Component } from "./component/component";
import { Clock } from "./component/clock";
import { Oscilliscope } from "./component/oscilloscope";
import { Bitset } from "./data/bitset";
import { Register } from "./data/register";
import { System } from "./system";
import { GUI } from "./gui/gui";

export class App {

    private _frameCount: number;
    private _frameDelta: number;
    private _frameLastTime: number;

    private _motherboard: System;

    constructor() {   
        this._motherboard = null;
        this._frameCount = 0;
        this._frameDelta = 0;
        this._frameLastTime = performance.now();
    }

    public Initiate() {
        this._motherboard = new System();
    }

    public Run() {
        
        let now = performance.now();
        let delta = now - this._frameLastTime;
        this._frameCount++;
        this._frameDelta += delta;
        this._frameLastTime = now;

        if(this._frameDelta > 1000) {
            console.log("FPS: " + this._frameCount);
            this._frameCount = 0;
            this._frameDelta = 0;
        }

        this._Tick();
        this._Draw();                
        requestAnimationFrame(() => {this.Run();});
    }

    private _Tick() {
        this._motherboard.Update();
    }

    private _Draw() {
        this._motherboard.Draw();
    }

}