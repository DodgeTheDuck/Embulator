
#pragma once

#include <emscripten\emscripten.h>

enum EKey {
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
};

enum EKeyState {
    KEY_UP = 0x0,
    KEY_DOWN = 0x1
};

class Keyboard {

public:
    static bool IsKeyDown(EKey key) {
        return _keyStates[key] == EKeyState::KEY_DOWN;
    }
    static void SetKeyState(EKey key, EKeyState state) {
        _keyStates[key] = state;
    }

public:
    inline static EKeyState _keyStates[255];

};

