import { Component } from "./component";

export class RAM extends Component {

    private _data: number[];

    constructor(size: number) {
        super();
        this._data = [];
        for(let i = 0; i < size; i++) {
            this._data[i] = 0
        }
    }

    public Read(address: number): number {
        return this._data[address];
    }

    public Write(address: number, data: number): void {
        this._data[address] = data;
    }

    public Update(): void {

    }

    public Pulse(): void {

    }

}