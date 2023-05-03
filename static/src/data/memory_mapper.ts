import { Bus } from "./bus";

export abstract class Mapper {

    public abstract MapRead(addr: number): number;
    public abstract MapWrite(addr: number): number;

}
