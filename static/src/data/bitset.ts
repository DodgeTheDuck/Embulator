
export class Bitset {

    private _size: number;
    private _bits: number[];

    constructor(size: number) {
        this._bits = [];
        this._size = size;
        for(let i = 0; i < size; i++) {
            this._bits[i] = 0;
        }
    }

    public SetLow(value: number) {
        let bits = new Bitset(8);
        bits.Set(value);
        for(let i = 0; i < this._size / 2; i++) {
            this._bits[i] = bits.GetBit(i);
        }
    }

    public SetHigh(value: number) {
        let bits = new Bitset(8);
        bits.Set(value);
        for(let i = this._size/2; i < this._size; i++) {
            this._bits[i] = bits.GetBit(i-this._size/2);
        }
    }

    public SetBit(index: number, val: number): void {
        if(index < 0 || index > this._size-1) {
            console.log(`SetBit: Index ${index} Out of bounds`);
        }
        this._bits[index] = val;
    }

    public Data(): number[] {
        return this._bits;
    }

    public FromBitset(bitset: Bitset): void {
        for(let i = 0; i < this._size; i++) {
            this._bits[i] = bitset.GetBit(i);
        }
    }

    public Set(decimal: number): void {        
        let bitStr: string = (decimal).toString(2).split("").reverse().join("");
        for(let i = this._size-1; i >= 0; i--) {
            if(i < this._size-bitStr.length) 
                this._bits[i] = 0 
            else 
                this._bits[i] = parseInt(bitStr[this._size-i-1]);
        }
    }

    public GetBit(index: number): number {        
        return this._bits[index];
    }

    public AsDecimal(): number {
        let bitStr: string = "";
        for(let i = 0; i < this._size; i++) {        
            bitStr = bitStr.concat(this._bits[i].toString());
        }
        return parseInt(bitStr, 2);
    }

}