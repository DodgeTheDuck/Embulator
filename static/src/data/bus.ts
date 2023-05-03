import { Bitset } from "./bitset";
import { RAM } from "../component/ram";
import { Component } from "../component/component";

interface IConnection {
    component: Component;
    addrMin: number;
    addrMax: number;
}

export class Bus {

    private _connections: IConnection[];

    constructor() {
        this._connections = [];
    }

    public Write(address: number, value: number, rdOnly: boolean = false): void {
        for(let connection of this._connections ) {
            if(address >= connection.addrMin && address <= connection.addrMax) {                
                connection.component.Write(address, value, rdOnly);
                return;
            }
        }
    }

    public Read(address: number, rdOnly: boolean = false): number {
        for(let connection of this._connections ) {
            if(address >= connection.addrMin && address <= connection.addrMax) {                
                return connection.component.Read(address, true);                
            }
        }
        return -1;
    }

    public Connect(component: Component, addrMin: number, addrMax: number, mirrorLength?: number) {
        this._connections.push({
            component: component,
            addrMin: addrMin,
            addrMax: addrMax
        });
    }

}