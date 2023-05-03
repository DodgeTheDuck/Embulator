import { Mapper000 } from "../data/mapper_000";
import { Mapper } from "../data/memory_mapper";
import { Component } from "./component";
import {ROM} from "./rom"

export class Cartridge extends Component {
    
    private _constant: string;
    private _prgSize: number;
    private _chrSize: number;

    private _prgStart: number;
    private _chrStart: number;

    private _prgChunkSize: number;
    private _chrChunkSize: number;

    private _prgRom: ROM;
    private _chrRom: ROM;

    private _mapper: Mapper;
    
    constructor(data: number[]) {

        super();

        this._prgChunkSize = 16384;
        this._chrChunkSize = 8192;
        
        this._prgSize = data[4];
        this._chrSize = data[5];
        
        this._prgStart = 16;
        this._chrStart = this._prgStart + this._prgSize * this._prgChunkSize;
        
        let prgData: number[] = [];        
        let prgLength: number = this._prgChunkSize * this._prgSize;
        let prgIndex: number = 0;
        for(let i = this._prgStart; i < this._prgStart+prgLength; i++) {
            prgData[prgIndex++] = data[i];
        }
        this._prgRom = new ROM(prgLength, prgData);        

        let chrData: number[] = [];        
        let chrLength: number = this._chrChunkSize * this._chrSize;
        let chrIndex: number = 0;
        for(let i = this._chrStart; i < this._chrStart+chrLength; i++) {
            chrData[chrIndex++] = data[i];
        }
        this._chrRom = new ROM(chrLength, chrData);

        this._mapper = new Mapper000(this._prgSize, this._chrSize);

    }

    public Pulse() {

    }

    public Update() {

    }

    public Read(addr: number): number {
        let mapped = this._mapper.MapRead(addr);
        if(mapped >= 0) {
            if(addr >= 0x0000 && addr <= 0x1FFF) {
                return this._chrRom.Read(mapped);
            }
            if(addr >= 0x8000 && addr <= 0xFFFF) {
                return this._prgRom.Read(mapped);
            }
        }
        return -1;
    }

    public Write(addr: number, data: number) {
        let mapped = this._mapper.MapWrite(addr);
        if(mapped >= 0) {
            this._prgRom.Write(mapped, data);
        } 
    }

    public PrgRom(): ROM {
        return this._prgRom;
    }

    public ChrRom(): ROM {
        return this._chrRom
    }

}