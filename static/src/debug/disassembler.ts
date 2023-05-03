import { CPU_6502, ERegisters } from "../cpu/6502/cpu_6502";
import { PPU } from "../cpu/6502/ppu";
import { CPU } from "../cpu/cpu";
import { Bus } from "../data/bus";
import { Pixel } from "../data/pixel";
import { Register } from "../data/register";
import { EKey, Input } from "../input";
import { Instruction } from "../instructions/instruction_set";
import { System } from "../system";

enum ERowType {
    INSTRUCTION,
    UNI_START,
    UNI_MID,
    UNI_END
}

interface Data {
    address: number,
    instruction: Instruction,
    ops: number[];
}

interface Row {
    text: string,
    address: number,
    type: ERowType
}

interface Breakpoint {
    row: number,
    address: number
}

export class Disassembler {

    private _system: System;

    private _rowHeight: number;
    private _scroll: number;    
    private _location: number;

    private _tblWidth: number;
    private _tblHeight: number;

    private _registersX: number;
    private _registersWidth: number;

    private _statusY: number;
    private _hover: number;

    private _canvas: HTMLCanvasElement;    

    private _breakpoints: Breakpoint[];

    private _stackY: number;

    private _paletteY: number;

    private _enabled: boolean;

    private _branchOps: string[] = [
        "BCC",
        "BCS",
        "BEQ",
        "BMI",
        "BNE",
        "BPL",
        "BVC",
        "BVS",
        "JMP",
        "JSR"
    ]

    private _data: Data[];    
    private _rows: Row[];

    constructor(canvas: HTMLCanvasElement) {

        this._canvas = canvas;

        this._data = [];
        this._rows = [];
        this._rowHeight = 32;
        this._scroll = 0;
        this._location = 0;
        this._tblWidth = 512;
        this._tblHeight = 1024;
        this._hover = -1;

        this._registersX = this._tblWidth + 16;
        this._registersWidth = 256;

        this._statusY = 256;

        this._stackY = 340;

        this._paletteY = 400;

        this._enabled = false;

        this._breakpoints = [];

    }

    public Run(from: number, bus: Bus, cpu: CPU_6502) {
        this._Traverse(from, bus, cpu);
        //this._Traverse(0xF4ED, bus, cpu);
        this._Fill(0xFFFF, bus, cpu);
        this._Process();
    }

    public Draw(cpu: CPU, bus: Bus, ppu: PPU, ppuBus: Bus, context: CanvasRenderingContext2D): void {
        if(this._enabled) {
            this._DrawDis(context);
            this._DrawRegisters(cpu, context);
            this._DrawStatus(cpu.Register(ERegisters.STATUS), context);
            this._DrawStack(cpu, bus, context);
            this._DrawPalette(ppu, ppuBus, context);
            this._DrawLocation(context);
        }

    }

    public Update(): void {

        if(this._enabled) {

            let mx: number = Input.Mouse().x - this._canvas.getBoundingClientRect().x;
            let my: number = Input.Mouse().y - this._canvas.getBoundingClientRect().y;
            
            if(mx > 0 && my > 0 && mx < this._tblWidth && my < this._tblHeight) {

                let delta: number = Input.Mouse().mDelta;
                this._scroll += delta;

                this._hover = Math.floor(my / this._rowHeight);

                if(Input.Mouse().mLeft) {
                    let rowIndex: number = this._hover + this._scroll;
                    let row: Row = this._rows[rowIndex];
                    this._breakpoints.push({
                        row: rowIndex,
                        address: row.address
                    });
                } else if(Input.Mouse().mRight) {
                    let rowIndex: number = this._hover + this._scroll;
                    let row: Row = this._rows[rowIndex];
                    if(row) {
                        this._breakpoints = this._breakpoints.filter((bp) => { if(bp.address !== row.address) return bp;});
                    }
                }

            } else {
                this._hover = -1;
            }        

            if(Input.IsKeyPress(EKey.PG_DOWN)) {
                this._scroll += 0x0010;
            }
            if(Input.IsKeyPress(EKey.PG_UP)) {
                this._scroll -= 0x0010;
            }

            if(Input.IsKeyPress(EKey.F_5)) {
                this._system.TogglePausePlayer();
            }

            if(Input.IsKeyPress(EKey.F_8)) {
                this._system.Step();
                if(this._location < this._scroll || this._location > this._scroll + 1024 / this._rowHeight) this._scroll = this._location;
            }

            if(this._scroll < 0) this._scroll = 0;
            if(this._scroll > this._data.length) this._scroll = this._data.length;

        }

    }

    public BreakpointCheck(address: number): boolean {

        if(this._enabled) {

            for(let i = 0; i < this._breakpoints.length; i++) {
                if(address === this._breakpoints[i].address) {
                    return true;
                }
            }
            return false;

        }

    }

    public ScrollTo(address: number): void {
        if(this._enabled) {
            this._scroll = this._FindRow(address);
        }
    }

    public SetLocation(address: number, bus: Bus, cpu: CPU_6502): void {
        if(this._enabled) {
            this._location = this._FindRow(address);  
            if(this._location === -1) {
                this._Traverse(address, bus, cpu);
                this._rows = [];
                this._Process();
            }      
        }
    }

    private _FindRow(address: number): number {
        for(let i = 0; i < this._rows.length; i++) {
            if(this._rows[i].address === address) {
                return i;
            }
        }
        return -1;
    }

    private _DrawStack(cpu: CPU, bus: Bus, context: CanvasRenderingContext2D): void {

        let spStart = 0x0100 + cpu.Register(ERegisters.SP).Read()+1;
        let spEnd = 0x01FF;

        for(let i = spStart; i <= spEnd; i++) {            

            context.fillText(this._ToHex(bus.Read(i, true), 2), this._registersX, this._stackY + (i - spStart) * this._rowHeight);

        }


    }

    private _DrawPalette(ppu: PPU, bus: Bus, context: CanvasRenderingContext2D): void {

        let swatchSize = 16;

        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                let c: Pixel = ppu.GetColor(i, j);
                context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
                context.fillRect(this._registersX + 128 + j * swatchSize, this._paletteY + i * swatchSize, swatchSize, swatchSize);
            }
        }

        let selectedPalette = 0;
        let selectedPattern = 0;

        for(let nTileY = 0; nTileY < 16; nTileY++) {
            for(let nTileX = 0; nTileX < 16; nTileX++) {
                let nOffset = nTileY * 256 + nTileX * 16;
                for(let row = 0; row < 8; row++) {
                    let tileLsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0000, true);
                    let tileMsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0008, true);

                    for(let col = 0; col < 8; col++) {

                        let rawPixel = (tileLsb & 0x01) + (tileMsb & 0x01);

                        tileLsb >>>= 1;
                        tileMsb >>>= 1;

                        let c: Pixel = ppu.GetColor(selectedPalette, rawPixel);
                        
                        context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
                        context.fillRect(this._registersX + 128 + ((nTileX * 8 + (7-col)) * 2), this._paletteY + 80 + ((nTileY * 8 + row) * 2), 2, 2);

                    }

                }
            }
        }

        // selectedPalette = 1;
        // selectedPattern = 1;

        // for(let nTileY = 0; nTileY < 16; nTileY++) {
        //     for(let nTileX = 0; nTileX < 16; nTileX++) {
        //         let nOffset = nTileY * 256 + nTileX * 16;
        //         for(let row = 0; row < 8; row++) {
        //             let tileLsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0000);
        //             let tileMsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0008);

        //             for(let col = 0; col < 8; col++) {

        //                 let rawPixel = (tileLsb & 0x01) + (tileMsb & 0x01);

        //                 tileLsb >>>= 1;
        //                 tileMsb >>>= 1;

        //                 let c: Pixel = ppu.GetColor(selectedPalette, rawPixel);
                        
        //                 context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        //                 context.fillRect(this._registersX + 300 + ((nTileX * 8 + (7-col)) * 8), this._paletteY + 80 + ((nTileY * 8 + row) * 8), 8, 8);

        //             }

        //         }
        //     }
        // }

    }

    private _DrawStatus(register: Register, context: CanvasRenderingContext2D): void {

        let names: string = "N V . B D I Z C";
        let bits: string = "";

        for(let i = 7; i >= 0; i--) {

            bits += register.Bit(i).toString() + " ";

        }

        context.fillText(names, this._registersX, this._statusY);
        context.fillText(bits, this._registersX, this._statusY + this._rowHeight);

    }

    private _DrawDis(context: CanvasRenderingContext2D): void {

        context.fillStyle = "#36454F";
        context.fillRect(0, 0, this._tblWidth + this._registersWidth + 1200, this._tblHeight);
        
        let count: number = 1024 / this._rowHeight;

        context.font = "20px monospace";
        context.fillStyle = "white";

        for(let i = this._scroll; i < Math.min(this._scroll+count, this._rows.length); i++) {
            let r: Row = this._rows[i];
            this._DrawRow(i-this._scroll, r, context);
        }

        for(let i = 0; i < this._breakpoints.length; i++) {
            this._DrawBreakpoint(this._breakpoints[i].row, context);
        }

    }

    private _DrawLocation(context: CanvasRenderingContext2D): void {
        let y: number = this._location * this._rowHeight + this._rowHeight / 2 - (this._scroll * this._rowHeight);
        context.fillRect(12, y+5, 8, 8);
    }

    
    private _DrawBreakpoint(row: number, context: CanvasRenderingContext2D): void {
        let y: number = row * this._rowHeight + this._rowHeight / 2 - (this._scroll * this._rowHeight);
        context.fillStyle = "red";
        context.fillRect(10, y+3, 12, 12);
        context.fillStyle = "white";
    }

    private _DrawRow(index: number, row: Row, context: CanvasRenderingContext2D): void {

        let rStartX: number = 32;

        let lStartX: number = 72 + rStartX;
        let lWidth: number = 100;
        let lHeight: number = 4;
        let tStartX: number = lStartX + lWidth + 4;
        let tWidth = context.measureText("UNIDENTIFIED").width;
        let rLStartX: number = tStartX + tWidth + 4;
        
        if(index == this._hover) {
            context.fillStyle = "gray";
            context.fillRect(rStartX, index * this._rowHeight+4, this._tblWidth - rStartX * 2, this._rowHeight);
            context.fillStyle = "white";
        }        

        switch(row.type) {
            case ERowType.UNI_START: {
                let lineY: number = index * this._rowHeight + this._rowHeight / 2+8;
                context.fillText(this._ToHex(row.address, 4), rStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(lStartX, lineY, lWidth, lHeight);
                context.fillText("UNIDENTIFIED", tStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(rLStartX, lineY, lWidth, lHeight);
                break;
            }
            case ERowType.UNI_MID: {
                context.fillText("....", 512/2-28, this._rowHeight * index + this._rowHeight);
                break;
            }
            case ERowType.UNI_END: {                
                let lineY: number = index * this._rowHeight + this._rowHeight / 2+8;
                context.fillText(this._ToHex(row.address, 4), rStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(lStartX, lineY, lWidth * 2 + tWidth + 8, 4);
                break;
            }
            case ERowType.INSTRUCTION: {     
                context.fillText(row.text, rStartX, this._rowHeight * index + this._rowHeight);
                break;
            }
        }

    }

    private _DrawRegisters(cpu: CPU, context: CanvasRenderingContext2D) {
        let registers: Register[] = cpu.Registers();

        for(let i = 0; i < registers.length; i++) {
            this._DrawRegister(registers[i], i, context);
        }

        let text: string = `Cycles : ${(<CPU_6502>cpu).Cycles()}`;
        context.fillText(text, this._registersX, registers.length  * this._rowHeight + 32);

    }

    private _DrawRegister(register: Register, row: number, context: CanvasRenderingContext2D) {
        let text: string = `${register.Name()} : ${this._ToHex(register.Read(), 2)}`;
        context.fillText(text, this._registersX, row * this._rowHeight + 32);
    }

    private _Traverse(from: number, bus: Bus, cpu: CPU_6502) {

        let offset: number = 0;

        while(true) {

            if(this._data[from + offset] !== undefined) {
                if(this._data[from + offset].instruction !== null) break;
            }

            let d: number = bus.Read(from + offset, true);
            let ins: Instruction = cpu.InstructionLookup(d);

            if(ins) {

                let ops: number[] = cpu.OperandLookup(from + offset + 1, ins);                          

                let data: Data = {
                    instruction: ins,
                    address: from+offset,
                    ops: ops                
                }            

                this._data[from+offset] = data;

                if(this._branchOps.find(test => test === ins.mnem) !== undefined) {
                    let addr = 0;
                    if(ins.bytes === 3) {
                        addr = (ops[1] << 8) | ops[0];
                    } else {
                        addr = ops[0];
                    }
                    this._Traverse(addr, bus, cpu);
                } 

                if(ins.mnem === "JMP" || ins.mnem === "RTS" || ins.mnem === "RTI") break;

                offset += ins.bytes -1;
                

            } else {
                console.log(`UNDEFINED OP 0x${d.toString(16).toUpperCase()} at 0x${(from+offset).toString(16).toUpperCase()}`)
                break;
            }

            offset++;

        }

    }

    private _Fill(to: number, bus: Bus, cpu: CPU_6502) {
        for(let i = 0; i < to; i++) {
            if(this._data[i]) continue;
            let d: number = bus.Read(i, true);
            this._data[i] = {
                address: i,
                instruction: null,
                ops: []
            }            
        }
    }

    private _Process() {
        
      let unidentified: boolean = false;
      let continued: boolean = false;

        for(let i = 0; i < this._data.length; i++) {

            let d: Data = this._data[i];

            if(!d) continue;

            let ins: Instruction = d.instruction;
            
            if(ins) {
                if(unidentified) {
                    this._rows.push({
                        text: "",
                        address: i-1,
                        type: ERowType.UNI_END
                    })                    
                }

                let text: string = `${this._ToHex(i, 4)} ${ins.mnem}`;
                
                for(let j = 0; j < d.ops.length; j++) {
                    text += " " + this._ToHex(d.ops[j], 2);
                }
            
                this._rows.push({
                    text: text,
                    address: i,
                    type: ERowType.INSTRUCTION
                })    
                i+=ins.bytes-1;
                unidentified = false;
                continued = false;
            } else if(!unidentified) {
                this._rows.push({
                    text: "",
                    address: i,
                    type: ERowType.UNI_START
                })   
                unidentified = true;
            } else if(!continued) {
                this._rows.push({
                    text: "",
                    address: i,
                    type: ERowType.UNI_MID
                })   
                continued = true;
            }
            
            

        }

    }

    private _ToHex(number, length) {
   
        var str = '' + number.toString(16);
        while (str.length < length) {
            str = '0' + str;
        }
       
        return "0x" + str.toUpperCase();
    
    }

    set System(system: System) {
        this._system = system;
    }

}