import { Component } from "./component";

export class ROM extends Component {

    private _data: number[];

    constructor(size: number, data: number[]) {
        super();
        this._data = [];
        for(let i = 0; i < size; i++) {
            this._data[i] = data[i];
        }
    }

    public Read(address: number): number {
        return this._data[address];
    }

    public Write(address: number, value: number): void {

    }

    public Update(): void {

    }

    public Pulse(): void {
        
    }

}