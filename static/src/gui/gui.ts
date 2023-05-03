import { PPU } from "../cpu/6502/ppu";
import { CPU } from "../cpu/cpu";
import { Bus } from "../data/bus";
import { Disassembler } from "../debug/disassembler";
import { Input } from "../input";
import { GuiDebugger } from "./gui_debugger";

export class GUI {

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    private _dis: Disassembler;

    constructor() {
        this._canvas = <HTMLCanvasElement>document.getElementById("debugger");
        this._context = this._canvas.getContext('2d');
        this._dis = new Disassembler(this._canvas);
    }

    public Update(): void {
        this._dis.Update();
        Input.Reset();
    }

    public Draw(cpu: CPU, bus: Bus, ppu: PPU, ppuBus: Bus): void {
        this._dis.Draw(cpu, bus, ppu, ppuBus, this._context);
    }

    get Disassembler(): Disassembler {
        return this._dis;
    }

}