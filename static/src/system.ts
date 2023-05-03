import { Component } from "./component/component";
import { Clock } from "./component/clock";
import { Oscilliscope } from "./component/oscilloscope";
import { CPU_6502, ERegisters } from "./cpu/6502/cpu_6502";
import { Bus } from "./data/bus";
import { RAM } from "./component/ram";
import { INesLoader } from "./data/ines";
import { Bitset } from "./data/bitset";
import { Cartridge } from "./component/cartridge";
import { PPU } from "./cpu/6502/ppu";
import { GUI } from "./gui/gui";
import { Instruction } from "./instructions/instruction_set";
import { Disassembler } from "./debug/disassembler";
import { GuiDebugger } from "./gui/gui_debugger";
import { CPU } from "./cpu/cpu";
import { Logger } from "./debug/logger";
import { DMA } from "./component/dma";

export class System {    
    
    private _components: Component[];
    private _cpuBus: Bus;
    private _ppuBus: Bus;
    private _clock: Clock;
    private _running: boolean;
    private _step: boolean;
    private _gui: GUI
    private _tickCount: number;
    private _tickCounter: number;
    private _lastFrame: number;

    private _log: Logger;

    private _cpu: CPU_6502;    
    private _ppu: PPU;
    private _dma: DMA;
    
    private _tickTimer: number;

    constructor() {
        
        this._components = [];
        this._clock = new Clock(3000000);
        this._running = false;
        this._step = false;
        this._gui = new GUI();
        this._tickCount = 0;
        this._log = new Logger();        

        this._tickTimer = 0;
        this._tickCount = 0;
        this._tickCounter = 0;
        this._lastFrame = 0;

        let loader: INesLoader = new INesLoader();

        loader.LoadAsync("\\rom\\smb.nes", (data: number[]) => {
            
            let cart: Cartridge = new Cartridge(data);
            
            this._cpuBus = new Bus();    
            this._ppuBus = new Bus();            
                        
            let oscilloscope: Oscilliscope = new Oscilliscope();
            let ram: RAM = new RAM(8192);    
            this._ppu = new PPU(this._ppuBus);
            this._dma = new DMA(this._cpuBus, this._ppu);
            this._cpu = new CPU_6502(this._cpuBus, this._dma);

            //this._components.push(oscilloscope);
            //this._components.push(ram);
            this._components.push(this._cpu);
            this._components.push(this._ppu);
            this._components.push(this._dma);

            //this._cpuBus.Connect(cpu, -1, -1);
            this._cpuBus.Connect(ram, 0x0000, 0x1FFF);
            this._cpuBus.Connect(this._ppu, 0x2000, 0x3FFF);
            this._cpuBus.Connect(this._dma, 0x4014, 0x4019);
            this._cpuBus.Connect(cart, 0x8000, 0xFFFF);

            this._ppuBus.Connect(cart, 0x0000, 0xFFFF);

            this._running = true;

            //this._ppuBus.Connect(cart.ChrRom(), 0x0000, 0x1FFF);
                        
            this._cpu.Reset();
                        
            this._gui.Disassembler.System = this;
            this._gui.Disassembler.Run(this._cpu.Register(ERegisters.PC).Read(), this._cpuBus, this._cpu);
            this._gui.Disassembler.ScrollTo(this._cpu.Register(ERegisters.PC).Read());            

        });

        let btn: HTMLButtonElement = <HTMLButtonElement>document.getElementById("save_log");
        btn.onclick = () => {
            this._log.Save();
        }

    }    

    public Update(): void {

        if(this._ppu) {
            if(this._ppu.FrameComplete) {
                this._ppu.FrameComplete = false;
                return;
            }
        }

        for(let component of this._components) {            
            component.Update();
        }

        if(this._running || this._step) {

            if(!this._step) {

                let pulses = this._clock.Oscillate();      

                for(let i = 0; i < pulses; i++) {                    
                    
                    if(this._tickCount % 3 === 0) {
                        this._cpu.Pulse(this._tickCount, this._log);
                    }
                    this._ppu.Pulse();
                    this._dma.Pulse(this._tickCount);

                    // for(let component of this._components) {
                    //     if(this._tickCount % component.ClockDivide === 0) {
                    //         component.Pulse(this._tickCount, this._log);
                    //     }
                    // }                    

                    if(this._ppu.NMI) {
                        this._cpu.Nmi();
                        this._ppu.NMI = false;
                    }
                    
                    // if(this._gui.Disassembler.BreakpointCheck(this._cpu.Register(ERegisters.PC).Read())) {
                    //     this._running = false;
                    //     break;
                    // }

                    this._tickCount++;
                    this._tickCounter++;

                }


            } else {
                for(let component of this._components) {            
                    component.Pulse(this._tickCount, this._log);
                }
            }
            this._step = false;
        }

        if(this._components.length > 0) {
            this._gui.Disassembler.SetLocation(this._cpu.Register(ERegisters.PC).Read(), this._cpuBus, this._cpu);
            this._gui.Update();
        }      

        let now = performance.now();

        let delta = now - this._lastFrame;
        this._lastFrame = now;


        if(delta > 100) {
            console.log("This update took: " + delta + "ms");
        }


        this._tickTimer += delta;


        if(this._tickTimer >= 1000) {
            this._tickTimer = 0;
            console.log("TPS: " + this._tickCounter);
            this._tickCounter = 0;
        }

    }

    public Draw(): void {
        if((<CPU_6502>this._components[1])) {
            this._gui.Draw(this._cpu, this._cpuBus, this._ppu, this._ppuBus);
        }
    }

    public Pause(): void {
        this._running = false;        
    }

    public TogglePausePlayer(): void {
        this._running = !this._running;
    }

    public Start(): void {
        this._running = true;
    }

    public Step(): void {
        console.log("Stepping");
        this._step = true;
    }

    // public UpdateGui(gui: GUI) {

    //     if(this._components.length > 0) {

    //         let pcNow: number = (<CPU_6502>this._components[2]).Register(ERegisters.PC).Read();

    //         if(this._lastPc !== pcNow) {

    //             //gui.Debugger.ClearDisassembler();

    //             let cpu: CPU_6502 = (<CPU_6502>this._components[2]);
    //             let data: number = this._cpuBus.Read(pcNow);

    //             if(data !== null) {
    //                 let ins: Instruction = cpu.InstructionLookup(data);              
    //                 let ops: number[] = [];
    //                 if(ins) {                  
    //                     ops = cpu.OperandLookup(pcNow+1, ins);
    //                 }
    //                 gui.Debugger.AddDisassemblerRow(false, pcNow, data, ins, ops);
    //             }

    //             gui.Debugger.ClearRegisters();

    //             for(let i = 0; i < cpu.Registers().length; i++) {
    //                 gui.Debugger.AddRegisterRow(cpu.Register(i));
    //             }

    //             gui.Debugger.ClearStatus();

    //             gui.Debugger.AddStatusRow(cpu.Register(ERegisters.STATUS));

    //             this._lastPc = pcNow;


    //         }

    //     }

    // }

}