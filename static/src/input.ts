
export enum EKey {
    UP = 87,
    DOWN = 83,
    LEFT = 65,
    RIGHT = 68,
    SHIFT = 16,
    ENTER = 13,
    M = 77,
    K = 75,
    N_1 = 49,
    N_2 = 50,
    N_3 = 51,
    PG_DOWN = 34,
    PG_UP = 33,
    F_5 = 116,
    F_8 = 119
}

export interface IMouse {
    x: number,
    y: number,
    mLeft: boolean,
    mRight: boolean,
    mDelta: number
}

window.addEventListener("keydown", (ev) => {
    ev.preventDefault();
    Input._keys[ev.which] = 2;
});
window.addEventListener("keyup", (ev) => {
    ev.preventDefault();
    Input._keys[ev.which] = 0;
});

window.addEventListener("mousemove", (ev) => {
    let gameCanvas = document.querySelector("canvas");
    let gameBounds = gameCanvas.getBoundingClientRect();
    Input._mx = Math.round(ev.clientX - gameBounds.x);
    Input._my = Math.round(ev.clientY - gameBounds.y);
});
window.addEventListener("wheel", (ev) => {
    Input._mDelta = ev.deltaY;
});
window.addEventListener("mousedown", (ev) => {
    ev.preventDefault();
    if(ev.button === 0) {
        Input._mLeft = true;
    } else {
        Input._mRight = true;
    }
});
window.addEventListener("mouseup", (ev) => {
    if(ev.button === 0) {
        Input._mLeft = false;
    } else {
        Input._mRight = false;
    }
});

window.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    return false;
});

export class Input {

    static _keys: number[] = [];
    static _mx: number;
    static _my: number;
    static _mLeft: boolean;
    static _mRight: boolean;
    static _mDelta: number;

    public static Reset() {
        Input._mLeft = false;
        Input._mDelta = 0;

        for(let i = 0; i < this._keys.length; i++) {
            if(this._keys[i] === 2) this._keys[i] = 1;
        }

    }

    public static IsKeyDown(keyCode) {
        return Input._keys[keyCode] === 1;
    }

    public static IsKeyPress(keyCode) {
        return Input._keys[keyCode] === 2;
    }

    public static Mouse(): IMouse {
        let delta = 0;
        if(Input._mDelta > 0) delta = 1;
        if(Input._mDelta < 0) delta = -1;
        return {
            x: Input._mx || 0,
            y: Input._my || 0,
            mLeft: Input._mLeft || false,
            mRight: Input._mRight || false,
            mDelta: delta
        }
    }


};