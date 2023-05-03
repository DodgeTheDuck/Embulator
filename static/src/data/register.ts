import { Bitset } from "./bitset";

class Register_old {

    private _size: number;
    private _bits: Bitset;

    constructor(size: number) {
        this._bits = new Bitset(size);
        this._size = size;
    }

    public Read(): number {
        return this._bits.AsDecimal();
    }

    public Increment(): boolean {
        return this.Add(1);
    }
    
    public Decrement(): void {
        let dec: number = this._bits.AsDecimal();
        this._bits.Set(--dec);
    }

    public Add(n: number): boolean {
        let result: Bitset = new Bitset(this._size);
        let other: Bitset = new Bitset(this._size);
        let carry: number = 0;
        other.Set(n);
        for(let i = this._size-1; i >=0; i--) {
            if(i === this._size-1) {
                result.SetBit(i, this._bits.GetBit(i) ^ (other.GetBit(i)));
                carry = this._bits.GetBit(i) & other.GetBit(i);
            } else {
                let half = this._bits.GetBit(i) ^ (other.GetBit(i));
                let halfCarry = this._bits.GetBit(i) & other.GetBit(i);
                result.SetBit(i, half ^ carry);
                carry = carry & half;
                carry = carry | halfCarry;
            }
        }
        this._bits = result;
        return carry === 1;
    }

    public Or(bits: Bitset): void {
        for(let i = 0; i < this._size; i++) {
            this._bits[i] |= bits[i];
        }
    }    

    public Zero(): void {
        this._bits.Set(0);
    }

    get data(): Bitset {
        return this._bits;
    }

}

export class Register {

    _data: number;
    _length: number;
    _name: string;
    _mask: number;

    constructor(length: number, name: string) {
        this._data = 0;
        this._length = length;
        this._name = name;
        this._mask = ((2 ** this._length)-1);

    }

    public Write(value: number): void {        
        this._data = value & this._mask;
    }

    public Read(): number {
        return this._data;
    }

    public ChangeBit(index: number, value: number): void {
        if(value === 1) {
            this._data |= 1 << index;
        } else {
            this._data &= ~(1 << index);
        }
    } 

    public Bit(index: number): number {
        return (this._data & ( 1 << index)) >> index;
    }

    public Set(index: number): void {
        this._data |= 1 << index;
    }

    public Clear(index: number): void {
        this._data &= ~(1 << index);
    }

    public Flip(index: number): void {
        this._data ^= 1 << index;
    }

    public Name(): string {
        return this._name;
    }

}