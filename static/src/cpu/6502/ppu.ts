import { Component } from "../../component/component";
import { Pixel } from "../../data/pixel";
import { Bus } from "../../data/bus";
import { Register } from "../../data/register";

class ObjAttributeEntry {
    Y: number = 0;
    ID: number = 0;
    ATTRIBUTE: number = 0;
    X: number = 0;

    public ReadByte(i: number) {
        switch(i) {
            case 0:
                return this.Y;
            case 1:
                return this.ID;
            case 2:
                return this.ATTRIBUTE;
            case 3:
                return this.X;
        }
    }

    public WriteByte(i: number, value: number) {
        switch(i) {
            case 0:
                this.Y = value;
                break;
            case 1:
                this.ID = value;
                break;
            case 2:
                this.ATTRIBUTE = value;
                break;
            case 3:
                this.X = value;
                break;
        }
    }

}

class Mask {    
    
    ENHANCE_BLUE: number = 0;
    ENHANCE_GREEN: number = 0;
    ENHANCE_RED: number = 0;
    RENDER_SPRITES: number = 0;
    RENDER_BACKGROUND: number = 0;
    RENDER_SPRITES_LEFT: number = 0;
    RENDER_BACKGROUND_LEFT: number = 0;
    GRAYSCALE: number = 0;

    public Data(): number {
        return (this.GRAYSCALE << 7) | 
        (this.RENDER_BACKGROUND_LEFT << 6) | 
        (this.RENDER_SPRITES_LEFT << 5) | 
        (this.RENDER_BACKGROUND << 4) | 
        (this.RENDER_SPRITES << 3) | 
        (this.ENHANCE_RED << 2) | 
        (this.ENHANCE_GREEN << 1) | 
        (this.ENHANCE_BLUE);
    }

    public Set(n: number): void {
        this.GRAYSCALE = (n & 0b00000001) > 0 ? 1 : 0;
        this.RENDER_BACKGROUND_LEFT = (n & 0b00000010) > 0 ? 1 : 0;
        this.RENDER_SPRITES_LEFT = (n & 0b00000100) > 0 ? 1 : 0;
        this.RENDER_BACKGROUND = (n & 0b00001000) > 0 ? 1 : 0;
        this.RENDER_SPRITES = (n & 0b00010000) > 0 ? 1 : 0;
        this.ENHANCE_RED = (n & 0b00100000) > 0 ? 1 : 0;
        this.ENHANCE_GREEN = (n & 0b01000000) > 0 ? 1 : 0;
        this.ENHANCE_BLUE = (n & 0b10000000) > 0 ? 1 : 0;
    }

}

class LoopyRegister {
    COARSE_X: number = 0;
    COARSE_Y: number = 0;
    NAMETABLE_X: number = 0;
    NAMETABLE_Y: number = 0;
    FINE_Y: number = 0;
    
    public Data(): number {
        return (this.COARSE_X) | 
        (this.COARSE_Y << 5) | 
        (this.NAMETABLE_X << 10) |
        (this.NAMETABLE_Y << 11) |
        (this.FINE_Y << 12)
    }

    public Set(n: number): void {
        if(n > 0xFFFF) {
            console.log("HMM: " + n );
        }
        this.COARSE_X = (n & 0b0000000000011111);
        this.COARSE_Y = ((n & 0b0000001111100000) >> 5);
        this.NAMETABLE_X = ((n & 0b0000010000000000) >> 10);
        this.NAMETABLE_Y = ((n & 0b0000100000000000) >> 11);
        this.FINE_Y = ((n & 0b0111000000000000) >> 12);
    }

}

class Status {
    SPRITE_OVERFLOW: number = 0;
    SPRITE_ZERO_HIT: number = 0;
    VERTICAL_BLANK: number = 0;
    PREV_WRITE_LSB: number = 0;

    public Data(): number {
        return (this.PREV_WRITE_LSB) | 
        (this.SPRITE_OVERFLOW << 5) | 
        (this.SPRITE_ZERO_HIT << 6) | 
        (this.VERTICAL_BLANK << 7) 
    }

    public Set(n: number): void {
        this.PREV_WRITE_LSB = (n & 0b00011111);
        this.SPRITE_OVERFLOW = (n & 0b00100000) > 0 ? 1 : 0;
        this.SPRITE_ZERO_HIT = (n & 0b01000000) > 0 ? 1 : 0;
        this.VERTICAL_BLANK = (n & 0b10000000) > 0 ? 1 : 0;
    }

}

class Control {

    NAMETABLE_X: number = 0;
    NAMETABLE_Y: number = 0;
    INCREMENT_MODE: number = 0;
    PATTERN_SPRITE: number = 0;
    PATTERN_BACKGROUND: number = 0;
    SPRITE_SIZE: number = 0;
    SLAVE_MODE: number = 0;
    ENABLE_NMI: number = 0;

    public Data(): number {
        return (this.ENABLE_NMI << 7) | 
        (this.SLAVE_MODE << 6) | 
        (this.SPRITE_SIZE << 5) | 
        (this.PATTERN_BACKGROUND << 4) | 
        (this.PATTERN_SPRITE << 3) | 
        (this.INCREMENT_MODE << 2) | 
        (this.NAMETABLE_Y << 1) | 
        (this.NAMETABLE_X) 
    }

    public Set(n: number): void {
        this.ENABLE_NMI = (n & 0b10000000) > 0 ? 1 : 0;
        this.SLAVE_MODE = (n & 0b01000000) > 0 ? 1 : 0;
        this.SPRITE_SIZE = (n & 0b00100000) > 0 ? 1 : 0;
        this.PATTERN_BACKGROUND = (n & 0b00010000) > 0 ? 1 : 0;
        this.PATTERN_SPRITE = (n & 0b00001000) > 0 ? 1 : 0;
        this.INCREMENT_MODE = (n & 0b00000100) > 0 ? 1 : 0;
        this.NAMETABLE_Y = (n & 0b00000010) > 0 ? 1 : 0;
        this.NAMETABLE_X = (n & 0b00000001) > 0 ? 1 : 0;
    }

}

interface PixelInfo {
    color: Pixel,
    x: number,
    y: number
}

export class PPU extends Component {

    private _tblName: number[][];
    private _tblPattern: number[][];
    private _tblPalette: number[];

    private _screen: Pixel[];

    private _scanline: number;
    private _cycle: number;
    private _bus: Bus;

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;

    private _mask: Mask;
    private _status: Status;

    private _vramAddr: LoopyRegister;
    private _tramAddr: LoopyRegister;

    private _control: Control;

    private _bgShifterPatternLo: number;
    private _bgShifterPatternHi: number;
    private _bgShifterAttribLo: number;
    private _bgShifterAttribHi: number;

    private _bgNextTileLsb: number;
    private _bgNextTileMsb: number;

    private _bgNextTileAttrib: number;    

    private _bgNextTileId: number;

    private _nmi: boolean;

    private _fineX: number;

    private _addressLatch: number;

    private _drawBuffer: ImageData;

    private _palScreen: Pixel[];

    private _ppuDataBuffer: number;

    private _pixels: PixelInfo[];

    private _spriteScanline: ObjAttributeEntry[];

    private _oam: ObjAttributeEntry[];
    private _oamAddr: number;

    
    private _spriteZeroHitPossible: boolean;
    private _spriteZeroBeingRendered: boolean;

    private _spriteCount: number;
    private _spriteShifterPatternLo: number[];
    private _spriteShifterPatternHi: number[];

    private _frameComplete: boolean;

    private _drawCount: number;
    private _drawTimer: number;
    private _timeLastFrame: number;

    private _buffer: ArrayBuffer;
    private _frameBufferData32: Uint32Array;
    private _frameBufferData8: Uint8ClampedArray;

    constructor(bus: Bus) {
        super();
        this._bus = bus;
        this._tblName = [];
        for(let i = 0; i < 2; i++) {
            this._tblName[i] = [];
            for(let j = 0; j < 1024; j++) {
                this._tblName[i][j] = 0;
            }
        }
        this._tblPattern = [];
        for(let i = 0; i < 2; i++) {
            this._tblPattern[i] = [];
            for(let j = 0; j < 4096; j++) {
                this._tblPattern[i][j] = 0;
            }
        }

        this._drawCount = 0;
        this._drawTimer = 0;
        this._timeLastFrame = 0;

        this._tblPalette = [];
        this._screen = new Array(0x40);

        this._canvas = <HTMLCanvasElement>document.getElementById("screen");
        this._context = this._canvas.getContext("2d");        

        this._context.clearRect(0, 0, 1024, 768);

        this._cycle = 0;
        this._scanline = 0;

        this._nmi = false;

        this._fineX = 0;

        this._frameComplete = false;

        this._drawBuffer = this._context.createImageData(256, 240);
        this._buffer = new ArrayBuffer(this._drawBuffer.data.length);
        this._frameBufferData8 = new Uint8ClampedArray(this._buffer);    
        this._frameBufferData32 = new Uint32Array(this._buffer);    

        this._control = new Control();
        this._mask = new Mask();
        this._status = new Status();

        this._vramAddr = new LoopyRegister();
        this._tramAddr = new LoopyRegister();

        this._bgShifterPatternHi = 0;
        this._bgShifterAttribLo = 0;
        this._bgShifterAttribHi = 0;
    
        this._bgNextTileLsb = 0;
        this._bgNextTileMsb = 0;

        this._bgNextTileAttrib = 0;
        
        this._addressLatch = 0;

        this._spriteZeroHitPossible = false;
        this._spriteZeroBeingRendered = false;


        this._ppuDataBuffer = 0;

        for(let i = 0; i < 256 * 240 * 4; i++) {
            this._drawBuffer.data[i] = 255;
        }

        this._pixels = [];

        this._spriteShifterPatternHi = [];
        this._spriteShifterPatternLo = [];
        this._spriteScanline = [];
        this._oam = [];

        for(let i = 0; i < 64; i++) {
            this._oam[i] = new ObjAttributeEntry();
        }

        this._oamAddr = 0;

        this._palScreen = [];

        this._palScreen[0x00] = new Pixel(84, 84, 84);
        this._palScreen[0x01] = new Pixel(0, 30, 116);
        this._palScreen[0x02] = new Pixel(8, 16, 144);
        this._palScreen[0x03] = new Pixel(48, 0, 136);
        this._palScreen[0x04] = new Pixel(68, 0, 100);
        this._palScreen[0x05] = new Pixel(92, 0, 48);
        this._palScreen[0x06] = new Pixel(84, 4, 0);
        this._palScreen[0x07] = new Pixel(60, 24, 0);
        this._palScreen[0x08] = new Pixel(32, 42, 0);
        this._palScreen[0x09] = new Pixel(8, 58, 0);
        this._palScreen[0x0A] = new Pixel(0, 64, 0);
        this._palScreen[0x0B] = new Pixel(0, 60, 0);
        this._palScreen[0x0C] = new Pixel(0, 50, 60);
        this._palScreen[0x0D] = new Pixel(0, 0, 0);
        this._palScreen[0x0E] = new Pixel(0, 0, 0);
        this._palScreen[0x0F] = new Pixel(0, 0, 0);

        this._palScreen[0x10] = new Pixel(152, 150, 152);
        this._palScreen[0x11] = new Pixel(8, 76, 196);
        this._palScreen[0x12] = new Pixel(48, 50, 236);
        this._palScreen[0x13] = new Pixel(92, 30, 228);
        this._palScreen[0x14] = new Pixel(136, 20, 176);
        this._palScreen[0x15] = new Pixel(160, 20, 100);
        this._palScreen[0x16] = new Pixel(152, 34, 32);
        this._palScreen[0x17] = new Pixel(120, 60, 0);
        this._palScreen[0x18] = new Pixel(84, 90, 0);
        this._palScreen[0x19] = new Pixel(40, 114, 0);
        this._palScreen[0x1A] = new Pixel(8, 124, 0);
        this._palScreen[0x1B] = new Pixel(0, 118, 40);
        this._palScreen[0x1C] = new Pixel(0, 102, 120);
        this._palScreen[0x1D] = new Pixel(0, 0, 0);
        this._palScreen[0x1E] = new Pixel(0, 0, 0);
        this._palScreen[0x1F] = new Pixel(0, 0, 0);

        this._palScreen[0x20] = new Pixel(236, 238, 236);
        this._palScreen[0x21] = new Pixel(76, 154, 236);
        this._palScreen[0x22] = new Pixel(120, 124, 236);
        this._palScreen[0x23] = new Pixel(176, 98, 236);
        this._palScreen[0x24] = new Pixel(228, 84, 236);
        this._palScreen[0x25] = new Pixel(236, 88, 180);
        this._palScreen[0x26] = new Pixel(236, 106, 100);
        this._palScreen[0x27] = new Pixel(212, 136, 32);
        this._palScreen[0x28] = new Pixel(160, 170, 0);
        this._palScreen[0x29] = new Pixel(116, 196, 0);
        this._palScreen[0x2A] = new Pixel(76, 208, 32);
        this._palScreen[0x2B] = new Pixel(56, 204, 108);
        this._palScreen[0x2C] = new Pixel(56, 180, 204);
        this._palScreen[0x2D] = new Pixel(60, 60, 60);
        this._palScreen[0x2E] = new Pixel(0, 0, 0);
        this._palScreen[0x2F] = new Pixel(0, 0, 0);

        this._palScreen[0x30] = new Pixel(236, 238, 236);
        this._palScreen[0x31] = new Pixel(168, 204, 236);
        this._palScreen[0x32] = new Pixel(188, 188, 236);
        this._palScreen[0x33] = new Pixel(212, 178, 236);
        this._palScreen[0x34] = new Pixel(236, 174, 236);
        this._palScreen[0x35] = new Pixel(236, 174, 212);
        this._palScreen[0x36] = new Pixel(236, 180, 176);
        this._palScreen[0x37] = new Pixel(228, 196, 144);
        this._palScreen[0x38] = new Pixel(204, 210, 120);
        this._palScreen[0x39] = new Pixel(180, 222, 120);
        this._palScreen[0x3A] = new Pixel(168, 226, 144);
        this._palScreen[0x3B] = new Pixel(152, 226, 180);
        this._palScreen[0x3C] = new Pixel(160, 214, 228);
        this._palScreen[0x3D] = new Pixel(160, 162, 160);
        this._palScreen[0x3E] = new Pixel(0, 0, 0);
        this._palScreen[0x3F] = new Pixel(0, 0, 0);

    }

    public Update(): void {
        
    }

    public Pulse(): void {

        let IncrementScrollX = () => {
            if(this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                if(this._vramAddr.COARSE_X === 31) {
                    this._vramAddr.COARSE_X = 0;
                    this._vramAddr.NAMETABLE_X = (this._vramAddr.NAMETABLE_X === 1) ? 0 : 1; // WAS BITWISE NOTTED HMM
                } else {
                    this._vramAddr.COARSE_X++;
                }
            }
        }

        let IncrementScrollY = () => {
            if(this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                if(this._vramAddr.FINE_Y < 7) {
                    this._vramAddr.FINE_Y++;
                } else {
                    this._vramAddr.FINE_Y = 0;
                    if(this._vramAddr.COARSE_Y == 29) {
                        this._vramAddr.COARSE_Y = 0;
                        this._vramAddr.NAMETABLE_Y = (this._vramAddr.NAMETABLE_Y === 1) ? 0 : 1; // WAS BITWISE NOTTED HMM
                    } else {
                        if(this._vramAddr.COARSE_Y == 31) {
                            this._vramAddr.COARSE_Y = 0;
                        } else {
                            this._vramAddr.COARSE_Y++;
                        }
                    }
                }            
            }
        }

        let TransferAddressX = () => {
            if(this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {                
                this._vramAddr.NAMETABLE_X = this._tramAddr.NAMETABLE_X;
                this._vramAddr.COARSE_X = this._tramAddr.COARSE_X;
            }
        }

        let TransferAddressY = () => {
            if(this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                this._vramAddr.FINE_Y = this._tramAddr.FINE_Y;
                this._vramAddr.NAMETABLE_Y = this._tramAddr.NAMETABLE_Y;
                this._vramAddr.COARSE_Y = this._tramAddr.COARSE_Y;
            }
        }

        let LoadBackgroundShifters = () => {
            this._bgShifterPatternLo = (this._bgShifterPatternLo & 0xFF00) | this._bgNextTileLsb;
            this._bgShifterPatternHi = (this._bgShifterPatternHi & 0xFF00) | this._bgNextTileMsb;
            this._bgShifterAttribLo = (this._bgShifterAttribLo & 0xFF00) | ((this._bgNextTileAttrib & 0b01) ? 0xFF : 0x00);
            this._bgShifterAttribHi = (this._bgShifterAttribHi & 0xFF00) | ((this._bgNextTileAttrib & 0b10) ? 0xFF : 0x00);
        }

        let UpdateShifters = () => {
            if(this._mask.RENDER_BACKGROUND) {
                this._bgShifterPatternLo = (this._bgShifterPatternLo << 1) & 0xFFFF;
                this._bgShifterPatternHi = (this._bgShifterPatternHi << 1) & 0xFFFF;
                this._bgShifterAttribLo = (this._bgShifterAttribLo << 1) & 0xFFFF;
                this._bgShifterAttribHi = (this._bgShifterAttribHi << 1) & 0xFFFF;
            }

            if(this._mask.RENDER_SPRITES && this._cycle >= 1 && this._cycle < 258) {
                for(let i = 0; i < this._spriteCount; i++) {
                    if(this._spriteScanline[i].X > 0) {
                        this._spriteScanline[i].X--;
                    } else {
                       this._spriteShifterPatternLo[i] = (this._spriteShifterPatternLo[i] << 1) & 0xFF;
                       this._spriteShifterPatternHi[i] = (this._spriteShifterPatternHi[i] << 1) & 0xFF;
                    }
                }
            }

        }

        if(this._scanline >= -1 && this._scanline < 240) {
            if(this._scanline === 0 && this._cycle === 0) {

                this._cycle = 1;
            }
            if(this._scanline == -1 && this._cycle == 1) {
                this._status.VERTICAL_BLANK = 0;

                this._status.SPRITE_OVERFLOW = 0;
                this._status.SPRITE_ZERO_HIT = 0;
                for(let i = 0; i < 8; i++) {
                    this._spriteShifterPatternLo[i] = 0;
                    this._spriteShifterPatternHi[i] = 0;
                }

            }
            if((this._cycle >= 2 && this._cycle < 258) || (this._cycle >= 321 && this._cycle < 338)) {
                UpdateShifters();
                switch((this._cycle - 1) % 8) {
                    case 0:
                        LoadBackgroundShifters();
                        this._bgNextTileId = this._PpuRead(0x2000 | (this._vramAddr.Data() & 0x0FFF));
                        break;
                    case 2:
                        this._bgNextTileAttrib = this._PpuRead(
                                        0x23C0  | (this._vramAddr.NAMETABLE_Y << 11)
                                                | (this._vramAddr.NAMETABLE_X << 10)
                                                | ((this._vramAddr.COARSE_Y >> 2) << 3)
                                                | (this._vramAddr.COARSE_X >> 2));
                        if(this._vramAddr.COARSE_Y & 0x02) this._bgNextTileAttrib >>= 4;
                        if(this._vramAddr.COARSE_X & 0x02) this._bgNextTileAttrib >>= 2;
                        this._bgNextTileAttrib &= 0x03;
                        break;
                    case 4: 
                        this._bgNextTileLsb = this._PpuRead((this._control.PATTERN_BACKGROUND << 12)
                                                            + ((this._bgNextTileId << 4))
                                                            + (this._vramAddr.FINE_Y) + 0);
                                                            break;
                    case 6: 
                        this._bgNextTileMsb = this._PpuRead((this._control.PATTERN_BACKGROUND << 12)
                                                            + ((this._bgNextTileId << 4))
                                                            + (this._vramAddr.FINE_Y) + 8);
                                                            break;
                    case 7: 
                        IncrementScrollX();
                        break;                    
                }
              
            }

            if(this._cycle === 256) {
                IncrementScrollY();
            }
            if(this._cycle === 257) {
                LoadBackgroundShifters();
                TransferAddressX();
            }
            if(this._cycle === 338 || this._cycle === 340) {
                this._bgNextTileId = this._PpuRead(0x2000 | (this._vramAddr.Data() & 0x0FFF));
            }
            if(this._scanline == -1 && this._cycle >= 280 && this._cycle < 305) {
                TransferAddressY();
            }

            if(this._cycle === 257 && this._scanline >= 0) {

                this._spriteCount = 0;

                for(let i = 0; i < 8; i++) {

                    this._spriteScanline[i] = new ObjAttributeEntry();
                    this._spriteScanline[i].ATTRIBUTE = 0xFF;
                    this._spriteScanline[i].Y = 0xFF;
                    this._spriteScanline[i].X = 0xFF;
                    this._spriteScanline[i].ID = 0xFF;                    

                    this._spriteShifterPatternLo[i] = 0;
                    this._spriteShifterPatternHi[i] = 0;
                }

                let nOAMEntry = 0;
                this._spriteZeroHitPossible = false;

                while(nOAMEntry < 64 && this._spriteCount < 9) {

                    let diff = this._scanline - this._oam[nOAMEntry].Y;

                    if(diff >= 0 && diff < (this._control.SPRITE_SIZE ? 16 : 8)) {
                        if(this._spriteCount < 8) {
                            if(nOAMEntry === 0) {
                                this._spriteZeroHitPossible = true;
                            }
                            this._spriteScanline[this._spriteCount].ATTRIBUTE = this._oam[nOAMEntry].ATTRIBUTE;
                            this._spriteScanline[this._spriteCount].X = this._oam[nOAMEntry].X;
                            this._spriteScanline[this._spriteCount].Y = this._oam[nOAMEntry].Y;
                            this._spriteScanline[this._spriteCount].ID = this._oam[nOAMEntry].ID;

                            this._spriteCount++;
                        }
                    }

                    nOAMEntry++;

                }

                this._status.SPRITE_OVERFLOW = (this._spriteCount > 8) ? 1 : 0;

            }

            if(this._cycle === 340) {

                for(let i = 0; i < this._spriteCount; i++) {

                    let spritePatternBitsLo: number = 0;
                    let spritePatternBitsHi: number = 0;
                    let spritePatternAddrLo: number = 0;
                    let spritePatternAddrHi: number = 0;

                    if(this._control.SPRITE_SIZE === 0) {

                        if((this._spriteScanline[i].ATTRIBUTE & 0x80) === 0) {
                            spritePatternAddrLo = (this._control.PATTERN_SPRITE << 12)
                            | (this._spriteScanline[i].ID << 4)
                            | (this._scanline - this._spriteScanline[i].Y)
                        } else {
                            spritePatternAddrLo = (this._control.PATTERN_SPRITE << 12)
                            | (this._spriteScanline[i].ID << 4)
                            | (7-(this._scanline - this._spriteScanline[i].Y))
                        }

                    } else {

                        if((this._spriteScanline[i].ATTRIBUTE & 0x80) === 0) {

                            if(this._scanline - this._spriteScanline[i].Y < 8) {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                | ((this._spriteScanline[i].ID & 0xFE) << 4)
                                | ((this._scanline - this._spriteScanline[i].Y) & 0x07)
                            } else {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                | (((this._spriteScanline[i].ID & 0xFE)+1) << 4)
                                | ((this._scanline - this._spriteScanline[i].Y) & 0x07)
                            }


                        } else {

                            if(this._scanline - this._spriteScanline[i].Y < 8) {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                | (((this._spriteScanline[i].ID & 0xFE)+1) << 4)
                                | (7 - (this._scanline - this._spriteScanline[i].Y) & 0x07)
                            } else {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                | (((this._spriteScanline[i].ID & 0xFE)) << 4)
                                | (7 - (this._scanline - this._spriteScanline[i].Y) & 0x07)
                            }

                        }
                        
                    }

                    spritePatternAddrHi = spritePatternAddrLo + 8;

                    spritePatternBitsLo = this._PpuRead(spritePatternAddrLo);
                    spritePatternBitsHi = this._PpuRead(spritePatternAddrHi);

                    if((this._spriteScanline[i].ATTRIBUTE & 0x40) > 0) {

                        let flipbyte = (b: number) => {
                            b = (b & 0xF0) >> 4 | (b & 0x0F) << 4;
                            b = (b & 0xCC) >> 2 | (b & 0x33) << 2;
                            b = (b & 0xAA) >> 1 | (b & 0x55) << 1;
                            return b;
                        }

                        spritePatternBitsLo = flipbyte(spritePatternBitsLo);
                        spritePatternBitsHi = flipbyte(spritePatternBitsHi);

                    }

                    this._spriteShifterPatternLo[i] = spritePatternBitsLo;
                    this._spriteShifterPatternHi[i] = spritePatternBitsHi;

                }

            }

        }
        
        if(this._scanline === 240) {
            // nothing
        }
        if(this._scanline >= 241 && this._scanline < 261) {
            if(this._scanline === 241 && this._cycle === 1) {
                this._status.VERTICAL_BLANK = 1;
                if(this._control.ENABLE_NMI) {
                    this._nmi = true;
                }
            }
        }
        
        let bgPixel = 0x00;
        let bgPalette = 0x00;

        if(this._mask.RENDER_BACKGROUND) {

            let bitMux: number = 0x8000 >> this._fineX;

            let p0Pixel: number = (this._bgShifterPatternLo & bitMux) > 0 ? 1 : 0;
            let p1Pixel: number = (this._bgShifterPatternHi & bitMux) > 0 ? 1 : 0;

            bgPixel = (p1Pixel << 1) | p0Pixel;

            let bgPal0 = (this._bgShifterAttribLo & bitMux) > 0 ? 1 : 0;
            let bgPal1 = (this._bgShifterAttribHi & bitMux) > 0 ? 1 : 0;

            bgPalette = (bgPal1 << 1) | bgPal0;

        }

        let fgPixel = 0x0;
        let fgPalette = 0x0;
        let fgPriority = 0x0;

        if(this._mask.RENDER_SPRITES) {

            this._spriteZeroBeingRendered = false;

            for(let i = 0; i < this._spriteCount; i++) {

               if(this._spriteScanline[i].X === 0) {

                    let fgPixelLo: number = ((this._spriteShifterPatternLo[i] & 0x80) > 0) ? 1 : 0
                    let fgPixelHi: number = ((this._spriteShifterPatternHi[i] & 0x80) > 0) ? 1 : 0

                    fgPixel = (fgPixelHi << 1) | fgPixelLo;

                    fgPalette = (this._spriteScanline[i].ATTRIBUTE & 0x03) + 0x04;
                    fgPriority = ((this._spriteScanline[i].ATTRIBUTE & 0x20) === 0) ? 1 : 0;

                    if(fgPixel !== 0) {
                        if(i === 0) {
                            this._spriteZeroBeingRendered = true;
                        }
                        break;
                    }

              }

            }

        }

        let finalPixel: number = 0x0;
        let finalPalette: number = 0x0;

        if(bgPixel === 0 && fgPixel === 0) {
            finalPixel = 0x0;
            finalPalette = 0x0;
        }
        else if(bgPixel === 0 && fgPixel > 0) {
            finalPixel = fgPixel;
            finalPalette = fgPalette;
        }
        else if(bgPixel > 0 && fgPixel === 0) {
            finalPixel = bgPixel;
            finalPalette = bgPalette;
        }
        else if(bgPixel > 0 && fgPixel > 0) {

            if(fgPriority) {
                finalPixel = fgPixel;
                finalPalette = fgPalette;
            } else {
                finalPixel = bgPixel;
                finalPalette = bgPalette;
            }

            if(this._spriteZeroHitPossible && this._spriteZeroBeingRendered) {
                if(this._mask.RENDER_BACKGROUND_LEFT && this._mask.RENDER_SPRITES_LEFT) {
                    // if(this._mask.RENDER_BACKGROUND_LEFT && this._mask.RENDER_SPRITES_LEFT) {
                    //     if(this._cycle >= 9 && this._cycle < 258) {
                    //         this._status.SPRITE_ZERO_HIT = 1;
                    //     }
                    // } else {
                        if(this._cycle >= 1 && this._cycle < 258) {
                            this._status.SPRITE_ZERO_HIT = 1;
                        }
                    //}
                }
            }

        }

        let x = (this._cycle - 1);
        let y = this._scanline;

        let color: Pixel = this.GetColor(finalPalette, finalPixel);

        // this._pixels.push({
        //     color: color,
        //     x: x,
        //     y: y
        // })

        let index = ((y * (this._drawBuffer.width * 4)) + (x * 4));

        this._drawBuffer.data[index] = color.r;
        this._drawBuffer.data[index+1] = color.g;
        this._drawBuffer.data[index+2] = color.b;

        this._cycle++;

        if(this._cycle >= 341) {
            this._cycle = 0;
            this._scanline++;

            if(this._scanline >= 261) {
                this._scanline = -1;

                // let blitRect = (x, y, color) => {

                //     for(let i = y; i <= y; i++) {
                //         for(let j = x; j <= x; j++ ) {
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))] = color.r;
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))+1] = color.g;
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))+2] = color.b;
                //         }
                //     }

                // }

                this._frameComplete = true;

                this._drawCount++;

                let delta = performance.now() - this._timeLastFrame;
                this._drawTimer += delta;

                if(this._drawTimer > 1000) {
                    this._drawTimer = 0;
                    console.log("PPU_DRAWS: " + this._drawCount);
                    this._drawCount = 0;
                }

                this._timeLastFrame = performance.now();

                // for(let i = 0; i < this._pixels.length; i+=1) {
                //     let p: PixelInfo = this._pixels[Math.floor(i)];
                //     let index = ((p.y * (this._drawBuffer.width * 4)) + (p.x * 4));
                //     this._drawBuffer.data[index] = p.color.r;
                //     this._drawBuffer.data[index+1] = p.color.g;
                //     this._drawBuffer.data[index+2] = p.color.b;
                // }                
                this._context.putImageData(this._drawBuffer, 64, 64);
                //this._pixels = [];

            }
        }

    }

    public Read(address: number, rdOnly: boolean): number {        

        let data: number = 0;
        address &= 0x0007;

        if(rdOnly) {
            switch(address) {
                case 0x0000: // Control
                    data = this._control.Data();
                    break;
                case 0x0001: // Mask
                    data = this._mask.Data();
                    break;
                case 0x0002: // Status
                    data = this._status.Data();
                    break;
                case 0x0003: // OAM Address
                    break;
                case 0x0004: // OAM Data
                    break;
                case 0x0005: // Scroll
                    break;
                case 0x0006: // PPU Address
                    break;
                case 0x0007: // PPU Data
                    break;
            }
        } else {
            switch(address) {
                case 0x0000: // Control
                    data = this._control.Data();
                    break;
                case 0x0001: // Mask
                    data = this._mask.Data();
                    break;
                case 0x0002: // Status
                    data = this._status.Data();
                    this._status.VERTICAL_BLANK = 0;
                    this._addressLatch = 0;
                    break;
                case 0x0003: // OAM Address
                    break;
                case 0x0004: // OAM Data
                    let index = Math.floor(this._oamAddr / 4);
                    let offset = this._oamAddr % 4;
                    data = this._oam[index].ReadByte(offset);
                    break;
                case 0x0005: // Scroll
                    break;
                case 0x0006: // PPU Address
                    break;
                case 0x0007: // PPU Data
                    let d: number = this._vramAddr.Data();
                    data = this._ppuDataBuffer;
                    this._ppuDataBuffer = this._PpuRead(d);
                    if(d >= 0x3F00) data = this._ppuDataBuffer;
                    this._vramAddr.Set(d + (this._control.INCREMENT_MODE ? 32 : 1));
                    break;
            }
        }

        return data;

    }

    public Write(address: number, value: number): void {
        
        address &= 0x0007;

        switch(address) {
            case 0x0000: // Control
                this._control.Set(value);
                this._tramAddr.NAMETABLE_X = this._control.NAMETABLE_X;
                this._tramAddr.NAMETABLE_Y = this._control.NAMETABLE_Y;
                break;
            case 0x0001: // Mask
                this._mask.Set(value);
                break;
            case 0x0002: // Status                
                break;
            case 0x0003: // OAM Address
                this._oamAddr = value;
                break;
            case 0x0004: // OAM Data
                let index = Math.floor(this._oamAddr / 4);
                let offset = this._oamAddr % 4;
                this._oam[index].WriteByte(offset, value);
                break;
            case 0x0005: // Scroll
                if(this._addressLatch === 0) {
                    this._fineX = value & 0x07;
                    this._tramAddr.COARSE_X = value >> 3;
                    this._addressLatch = 1;
                } else {
                    this._tramAddr.FINE_Y = value & 0x07;
                    this._tramAddr.COARSE_Y = value >> 3;
                    this._addressLatch = 0;
                }
                break;
            case 0x0006: // PPU Address
                if(this._addressLatch === 0) {
                    this._tramAddr.Set(((value & 0x3F) << 8) | (this._tramAddr.Data() & 0x00FF));
                    this._addressLatch = 1;
                } else {
                    this._tramAddr.Set((this._tramAddr.Data() & 0xFF00) | value);
                    this._vramAddr.Set(this._tramAddr.Data());
                    this._addressLatch = 0;
                }
                break;
            case 0x0007: // PPU Data
                let d: number = this._vramAddr.Data();
                this._PpuWrite(d, value)
                this._vramAddr.Set(d + (this._control.INCREMENT_MODE ? 32 : 1));
                break;
        }

        this._status.PREV_WRITE_LSB = (value & 0b00011111);
 
    }

    public GetColor(palette, pixel): Pixel {
        return this._palScreen[this._PpuRead(0x3F00 + ((palette << 2)) + pixel) & 0x3F];
    }

    public OAM(index: number, data: number): void {
        let newIndex = Math.floor(index / 4);
        let offset = index % 4;
        this._oam[newIndex].WriteByte(offset, data);
    }

    private _PpuRead(address: number): number {

        address &= 0x3FFF;
        
        let data = this._bus.Read(address);

        if(data === -1) {

            if(address >= 0x0000 && address <= 0x1FFF) {
                data = this._tblPattern[(address & 0x1000) >> 12][address & 0x0FFF];
            } else if(address >= 0x2000 && address <= 0x3EFF) {

                address &= 0x0FFF;

                if (address >= 0x0000 && address <= 0x03FF)
                    data = this._tblName[0][address & 0x03FF];
                if (address >= 0x0400 && address <= 0x07FF)
                    data = this._tblName[1][address & 0x03FF];
                if (address >= 0x0800 && address <= 0x0BFF)
                    data = this._tblName[0][address & 0x03FF];
                if (address >= 0x0C00 && address <= 0x0FFF)
                    data = this._tblName[1][address & 0x03FF];

            } else if(address >= 0x3F00 && address <= 0x3FFF) {

                address &= 0x001F;

                if(address === 0x0010) address = 0x0000;
                if(address === 0x0014) address = 0x0004;
                if(address === 0x0018) address = 0x0008;
                if(address === 0x001C) address = 0x000C;
                
                data = this._tblPalette[address] & (this._mask.GRAYSCALE ? 0x30 : 0x3F);

            }

        }

        return data;

    }

    private _PpuWrite(address: number, data: number) {

        address &= 0x3FFF;

        if(address >= 0x0000 && address <= 0x1FFF) {

            this._tblPattern[(address & 0x1000) >> 12][address & 0x0FFF] = data;

        } else if(address >= 0x2000 && address <= 0x3EFF) {

            address &= 0x0FFF;

            if (address >= 0x0000 && address <= 0x03FF)
                this._tblName[0][address & 0x03FF] = data;
            if (address >= 0x0400 && address <= 0x07FF)
                this._tblName[1][address & 0x03FF] = data;
            if (address >= 0x0800 && address <= 0x0BFF)
                this._tblName[0][address & 0x03FF] = data;
            if (address >= 0x0C00 && address <= 0x0FFF)
                this._tblName[1][address & 0x03FF] = data;
                
        } else if(address >= 0x3F00 && address <= 0x3FFF) {
            address &= 0x001F;
            if (address == 0x0010) address = 0x0000;
            if (address == 0x0014) address = 0x0004;
            if (address == 0x0018) address = 0x0008;
            if (address == 0x001C) address = 0x000C;
            this._tblPalette[address] = data;
        } 
    }

    private _DrawPattern(i: number, palette: number): void {

     

    }

    private _VramAddr(): number {
        // COARSE_X: number,
        // COARSE_Y: number,
        // NAMETABLE_X: number,
        // NAMETABLE_Y: number,
        // FINE_Y: number

        let b0_4 = this._vramAddr.COARSE_X.toString(2);
        let b5_9 = this._vramAddr.COARSE_Y.toString(2);
        let b10 = this._vramAddr.NAMETABLE_X.toString(2);
        let b11 = this._vramAddr.NAMETABLE_Y.toString(2);
        let b12_14 = this._vramAddr.FINE_Y.toString(2);

        return parseInt(b12_14+b11+b10+b5_9+b0_4, 2);

    }

    get FrameComplete(): boolean {
        return this._frameComplete;
    }

    set FrameComplete(state: boolean) {
        this._frameComplete = state;
    }

    get NMI(): boolean {
        return this._nmi;
    }

    set NMI(state: boolean) {
        this._nmi = state;
    }

}