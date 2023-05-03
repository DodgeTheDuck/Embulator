import { Mapper } from "./memory_mapper";

export class Mapper000 extends Mapper {

    private _nPrgBanks: number;
    private _nChrBanks: number;

    constructor(nPrgBanks: number, nChrBanks: number) {
        super();
        this._nPrgBanks = nPrgBanks;
        this._nChrBanks = nChrBanks;
    }

    public MapRead(addr: number): number {
        let mapped = -1;

        if(addr >= 0x0000 && addr <= 0x1FFF) {
            mapped = addr;
        }

        if(addr >= 0x8000 && addr <= 0xFFFF) {
            mapped = addr & (this._nPrgBanks > 1 ? 0x7FFF : 0x3FFF);
        }
        return mapped;

    }

    public MapWrite(addr: number): number {
        //add cart RAM option
        let mapped = -1;
        if(addr >= 0x8000 && addr <= 0xFFFF) {
            mapped = addr & (this._nPrgBanks > 1 ? 0x7FFF : 0x3FFF);
        }
        return mapped;
    }

}
