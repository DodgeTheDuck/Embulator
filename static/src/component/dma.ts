import { PPU } from "../cpu/6502/ppu";
import { Bus } from "../data/bus";
import { EKey, Input } from "../input";
import { Component } from "./component";

export class DMA extends Component {

    private _bus: Bus;
    private _ppu: PPU;

    private _controllerState: number[];
    private _controller: number[];

    private _dmaPage: number;
    private _dmaAddr: number;
    private _dmaData: number;

    private _dmaDummy: boolean;

    private _dmaTransfer: boolean;

    constructor(bus: Bus, ppu: PPU) {
        super();
        
        this._controllerState = [];
        this._controller = [];

        this._dmaPage = 0;
        this._dmaAddr = 0;
        this._dmaData = 0;
        this._dmaDummy = true;
        this._dmaTransfer = false;

        this._clockDivide = 3;

        this._bus = bus;
        this._ppu = ppu;

    }

    public Read(address: number, rdOnly: boolean): number {

        let data: number = 0;

        if(address >= 0x4016 && address <= 0x4017) {
            data = (this._controllerState[address & 0x0001] & 0x80 ) > 0 ? 1 : 0;
            this._controllerState[address & 0x0001] <<= 1;
            this._controllerState[address & 0x0001] &= 0xFF;
        }

        return data;

    }

    public Write(address: number, value: number): void {
                
        if(address === 0x4014) {
            this._dmaPage = value;
            this._dmaAddr = 0x0;
            this._dmaTransfer = true;
   
        }

        if(address >= 0x4016 && address <= 0x4017) {
            this._controllerState[address & 0x0001] = this._controller[address & 0x0001];
        }        

    }

    public Update(): void {
        
        this._controller[0] = 0x00;
        
        if(Input.IsKeyDown(EKey.M)) {
            this._controller[0] |= 0x80;
        }
        if(Input.IsKeyDown(EKey.K)) {
            this._controller[0] |= 0x40;
        }
        if(Input.IsKeyDown(EKey.SHIFT)) {
            this._controller[0] |= 0x20;
        }
        if(Input.IsKeyDown(EKey.ENTER)) {
            this._controller[0] |= 0x10;
        }
        if(Input.IsKeyDown(EKey.LEFT)) {
            this._controller[0] |= 0x02;
        }
        if(Input.IsKeyDown(EKey.RIGHT)) {
            this._controller[0] |= 0x01;
        }
        if(Input.IsKeyDown(EKey.UP)) {
            this._controller[0] |= 0x08;
        }
        if(Input.IsKeyDown(EKey.DOWN)) {
            this._controller[0] |= 0x04;
        }

    }


    public Pulse(clkCount: number): void {

        if(this._dmaTransfer) {
            if(this._dmaDummy) {
                if(clkCount %  2 === 1) {
                    this._dmaDummy = false;
                }
            } else {
                if(clkCount % 2 === 0) {
                    this._dmaData = this._bus.Read((this._dmaPage << 8) | this._dmaAddr);
                } else {
                    this._ppu.OAM(this._dmaAddr, this._dmaData);
                    this._dmaAddr++;
                    this._dmaAddr %= 256;
                    if(this._dmaAddr == 0x00) {
                        this._dmaTransfer = false;
                        this._dmaDummy = true;
                    }
                }
            }
        }
    }

    get DmaTransfer(): boolean {
        return this._dmaTransfer;
    }

}