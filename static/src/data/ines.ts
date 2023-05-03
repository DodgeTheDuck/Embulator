import { Bitset } from "./bitset";

export class INesLoader {

    constructor() {

    }

    public LoadAsync(src: string, callback: Function) {

        fetch(src).then((response) => {
            response.arrayBuffer().then((buffer) => {
                let bytes = new Uint8Array(buffer);
                callback(bytes);
            })
        })        

    }

}