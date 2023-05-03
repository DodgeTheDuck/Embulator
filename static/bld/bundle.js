/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/src/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/src/alu/alu.ts":
/*!*******************************!*\
  !*** ./static/src/alu/alu.ts ***!
  \*******************************/
/*! exports provided: ALU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ALU", function() { return ALU; });
class ALU {
    constructor(cpu) {
        this._cpu = cpu;
    }
}


/***/ }),

/***/ "./static/src/app.ts":
/*!***************************!*\
  !*** ./static/src/app.ts ***!
  \***************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./system */ "./static/src/system.ts");

class App {
    constructor() {
        this._motherboard = null;
        this._frameCount = 0;
        this._frameDelta = 0;
        this._frameLastTime = performance.now();
    }
    Initiate() {
        this._motherboard = new _system__WEBPACK_IMPORTED_MODULE_0__["System"]();
    }
    Run() {
        let now = performance.now();
        let delta = now - this._frameLastTime;
        this._frameCount++;
        this._frameDelta += delta;
        this._frameLastTime = now;
        if (this._frameDelta > 1000) {
            console.log("FPS: " + this._frameCount);
            this._frameCount = 0;
            this._frameDelta = 0;
        }
        this._Tick();
        this._Draw();
        requestAnimationFrame(() => { this.Run(); });
    }
    _Tick() {
        this._motherboard.Update();
    }
    _Draw() {
        this._motherboard.Draw();
    }
}


/***/ }),

/***/ "./static/src/component/cartridge.ts":
/*!*******************************************!*\
  !*** ./static/src/component/cartridge.ts ***!
  \*******************************************/
/*! exports provided: Cartridge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cartridge", function() { return Cartridge; });
/* harmony import */ var _data_mapper_000__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/mapper_000 */ "./static/src/data/mapper_000.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./static/src/component/component.ts");
/* harmony import */ var _rom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rom */ "./static/src/component/rom.ts");



class Cartridge extends _component__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    constructor(data) {
        super();
        this._prgChunkSize = 16384;
        this._chrChunkSize = 8192;
        this._prgSize = data[4];
        this._chrSize = data[5];
        this._prgStart = 16;
        this._chrStart = this._prgStart + this._prgSize * this._prgChunkSize;
        let prgData = [];
        let prgLength = this._prgChunkSize * this._prgSize;
        let prgIndex = 0;
        for (let i = this._prgStart; i < this._prgStart + prgLength; i++) {
            prgData[prgIndex++] = data[i];
        }
        this._prgRom = new _rom__WEBPACK_IMPORTED_MODULE_2__["ROM"](prgLength, prgData);
        let chrData = [];
        let chrLength = this._chrChunkSize * this._chrSize;
        let chrIndex = 0;
        for (let i = this._chrStart; i < this._chrStart + chrLength; i++) {
            chrData[chrIndex++] = data[i];
        }
        this._chrRom = new _rom__WEBPACK_IMPORTED_MODULE_2__["ROM"](chrLength, chrData);
        this._mapper = new _data_mapper_000__WEBPACK_IMPORTED_MODULE_0__["Mapper000"](this._prgSize, this._chrSize);
    }
    Pulse() {
    }
    Update() {
    }
    Read(addr) {
        let mapped = this._mapper.MapRead(addr);
        if (mapped >= 0) {
            if (addr >= 0x0000 && addr <= 0x1FFF) {
                return this._chrRom.Read(mapped);
            }
            if (addr >= 0x8000 && addr <= 0xFFFF) {
                return this._prgRom.Read(mapped);
            }
        }
        return -1;
    }
    Write(addr, data) {
        let mapped = this._mapper.MapWrite(addr);
        if (mapped >= 0) {
            this._prgRom.Write(mapped, data);
        }
    }
    PrgRom() {
        return this._prgRom;
    }
    ChrRom() {
        return this._chrRom;
    }
}


/***/ }),

/***/ "./static/src/component/clock.ts":
/*!***************************************!*\
  !*** ./static/src/component/clock.ts ***!
  \***************************************/
/*! exports provided: Clock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Clock", function() { return Clock; });
class Clock {
    constructor(hz) {
        this._hz = hz;
        this._last = performance.now();
        this._msAcc = 0;
        this._overAcc = 0;
    }
    Oscillate() {
        //return 41650;
        //return 41650;
        let now = performance.now();
        let delta = now - this._last;
        this._msAcc += delta;
        this._last = now;
        let targetMs = 1000 / this._hz;
        let maxHz = 50000;
        if (delta >= targetMs) {
            let targetPulses = delta / targetMs;
            let nPulses = Math.round(targetPulses);
            let overshoot = targetPulses - nPulses;
            this._overAcc += overshoot;
            if (this._overAcc >= 1) {
                nPulses++;
                this._overAcc -= 1;
            }
            this._msAcc = 0;
            if (delta >= 1000) {
                console.log("Clock took too long: " + delta + "ms");
                nPulses = 1; // stop it locking my browser when im debugging
            }
            if (nPulses > maxHz)
                nPulses = maxHz;
            return nPulses;
        }
        else {
            if (this._msAcc >= targetMs) {
                this._msAcc -= targetMs;
                return 1;
            }
            else {
                return 0;
            }
        }
    }
    ;
}


/***/ }),

/***/ "./static/src/component/component.ts":
/*!*******************************************!*\
  !*** ./static/src/component/component.ts ***!
  \*******************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
class Component {
    constructor() {
        this._buses = [];
        this._clockDivide = 1;
    }
    Connect(bus, index) {
        this._buses[index] = bus;
    }
    get ClockDivide() {
        return this._clockDivide;
    }
}


/***/ }),

/***/ "./static/src/component/dma.ts":
/*!*************************************!*\
  !*** ./static/src/component/dma.ts ***!
  \*************************************/
/*! exports provided: DMA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DMA", function() { return DMA; });
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../input */ "./static/src/input.ts");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component */ "./static/src/component/component.ts");


class DMA extends _component__WEBPACK_IMPORTED_MODULE_1__["Component"] {
    constructor(bus, ppu) {
        super();
        this._controllerState = [];
        this._controller = [];
        this._dmaPage = 0;
        this._dmaAddr = 0;
        this._dmaData = 0;
        this._dmaDummy = true;
        this._dmaTransfer = false;
        this._clockDivide = 3;
        this._bus = bus;
        this._ppu = ppu;
    }
    Read(address, rdOnly) {
        let data = 0;
        if (address >= 0x4016 && address <= 0x4017) {
            data = (this._controllerState[address & 0x0001] & 0x80) > 0 ? 1 : 0;
            this._controllerState[address & 0x0001] <<= 1;
            this._controllerState[address & 0x0001] &= 0xFF;
        }
        return data;
    }
    Write(address, value) {
        if (address === 0x4014) {
            this._dmaPage = value;
            this._dmaAddr = 0x0;
            this._dmaTransfer = true;
        }
        if (address >= 0x4016 && address <= 0x4017) {
            this._controllerState[address & 0x0001] = this._controller[address & 0x0001];
        }
    }
    Update() {
        this._controller[0] = 0x00;
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].M)) {
            this._controller[0] |= 0x80;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].K)) {
            this._controller[0] |= 0x40;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].SHIFT)) {
            this._controller[0] |= 0x20;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].ENTER)) {
            this._controller[0] |= 0x10;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].LEFT)) {
            this._controller[0] |= 0x02;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].RIGHT)) {
            this._controller[0] |= 0x01;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].UP)) {
            this._controller[0] |= 0x08;
        }
        if (_input__WEBPACK_IMPORTED_MODULE_0__["Input"].IsKeyDown(_input__WEBPACK_IMPORTED_MODULE_0__["EKey"].DOWN)) {
            this._controller[0] |= 0x04;
        }
    }
    Pulse(clkCount) {
        if (this._dmaTransfer) {
            if (this._dmaDummy) {
                if (clkCount % 2 === 1) {
                    this._dmaDummy = false;
                }
            }
            else {
                if (clkCount % 2 === 0) {
                    this._dmaData = this._bus.Read((this._dmaPage << 8) | this._dmaAddr);
                }
                else {
                    this._ppu.OAM(this._dmaAddr, this._dmaData);
                    this._dmaAddr++;
                    this._dmaAddr %= 256;
                    if (this._dmaAddr == 0x00) {
                        this._dmaTransfer = false;
                        this._dmaDummy = true;
                    }
                }
            }
        }
    }
    get DmaTransfer() {
        return this._dmaTransfer;
    }
}


/***/ }),

/***/ "./static/src/component/oscilloscope.ts":
/*!**********************************************!*\
  !*** ./static/src/component/oscilloscope.ts ***!
  \**********************************************/
/*! exports provided: Oscilliscope */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Oscilliscope", function() { return Oscilliscope; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./static/src/component/component.ts");

class Oscilliscope extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor() {
        super();
        this._pulseCount = 0;
        this._last = 0;
        this._msAcc = 0;
    }
    Update() {
        let now = performance.now();
        let delta = now - this._last;
        this._msAcc += delta;
        this._last = now;
        if (this._msAcc >= 1000) {
            console.log(`Measured hz: ${this._pulseCount}`);
            this._pulseCount = 0;
            this._msAcc = 0;
        }
    }
    Pulse() {
        this._pulseCount++;
    }
    Read(addres) {
        return 0x00;
    }
    Write(address, value) {
    }
}


/***/ }),

/***/ "./static/src/component/ram.ts":
/*!*************************************!*\
  !*** ./static/src/component/ram.ts ***!
  \*************************************/
/*! exports provided: RAM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RAM", function() { return RAM; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./static/src/component/component.ts");

class RAM extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(size) {
        super();
        this._data = [];
        for (let i = 0; i < size; i++) {
            this._data[i] = 0;
        }
    }
    Read(address) {
        return this._data[address];
    }
    Write(address, data) {
        this._data[address] = data;
    }
    Update() {
    }
    Pulse() {
    }
}


/***/ }),

/***/ "./static/src/component/rom.ts":
/*!*************************************!*\
  !*** ./static/src/component/rom.ts ***!
  \*************************************/
/*! exports provided: ROM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROM", function() { return ROM; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./static/src/component/component.ts");

class ROM extends _component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(size, data) {
        super();
        this._data = [];
        for (let i = 0; i < size; i++) {
            this._data[i] = data[i];
        }
    }
    Read(address) {
        return this._data[address];
    }
    Write(address, value) {
    }
    Update() {
    }
    Pulse() {
    }
}


/***/ }),

/***/ "./static/src/cpu/6502/cpu_6502.ts":
/*!*****************************************!*\
  !*** ./static/src/cpu/6502/cpu_6502.ts ***!
  \*****************************************/
/*! exports provided: ESstatusBits, ERegisters, CPU_6502 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESstatusBits", function() { return ESstatusBits; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERegisters", function() { return ERegisters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU_6502", function() { return CPU_6502; });
/* harmony import */ var _data_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/register */ "./static/src/data/register.ts");
/* harmony import */ var _cpu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../cpu */ "./static/src/cpu/cpu.ts");
/* harmony import */ var _cpu_6502_alu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cpu_6502_alu */ "./static/src/cpu/6502/cpu_6502_alu.ts");
/* harmony import */ var _cpu_6502_instructions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cpu_6502_instructions */ "./static/src/cpu/6502/cpu_6502_instructions.ts");




var ESstatusBits;
(function (ESstatusBits) {
    ESstatusBits[ESstatusBits["C"] = 0] = "C";
    ESstatusBits[ESstatusBits["Z"] = 1] = "Z";
    ESstatusBits[ESstatusBits["I"] = 2] = "I";
    ESstatusBits[ESstatusBits["D"] = 3] = "D";
    ESstatusBits[ESstatusBits["B"] = 4] = "B";
    ESstatusBits[ESstatusBits["UNUSED"] = 5] = "UNUSED";
    ESstatusBits[ESstatusBits["V"] = 6] = "V";
    ESstatusBits[ESstatusBits["N"] = 7] = "N";
})(ESstatusBits || (ESstatusBits = {}));
var ERegisters;
(function (ERegisters) {
    ERegisters[ERegisters["A"] = 0] = "A";
    ERegisters[ERegisters["X"] = 1] = "X";
    ERegisters[ERegisters["Y"] = 2] = "Y";
    ERegisters[ERegisters["STATUS"] = 3] = "STATUS";
    ERegisters[ERegisters["SP"] = 4] = "SP";
    ERegisters[ERegisters["PC"] = 5] = "PC";
})(ERegisters || (ERegisters = {}));
class CPU_6502 extends _cpu__WEBPACK_IMPORTED_MODULE_1__["CPU"] {
    constructor(bus, dma) {
        super(bus);
        this._alu = new _cpu_6502_alu__WEBPACK_IMPORTED_MODULE_2__["CPU_6502_ALU"](this);
        this._instructions = new _cpu_6502_instructions__WEBPACK_IMPORTED_MODULE_3__["CPU_6502_Instructions"](this, this._alu, this._bus);
        this._registers[ERegisters.A] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](8, "A");
        this._registers[ERegisters.X] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](8, "X");
        this._registers[ERegisters.Y] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](8, "Y");
        this._registers[ERegisters.STATUS] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](8, "Status");
        this._registers[ERegisters.SP] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](8, "SP");
        this._registers[ERegisters.PC] = new _data_register__WEBPACK_IMPORTED_MODULE_0__["Register"](16, "PC");
        this._cycles = 0;
        this._cycleCount = 0;
        this._dma = dma;
        this._clockDivide = 3;
    }
    Reset() {
        this.Register(ERegisters.SP).Write(0xff);
        let entry = 0xFFFC;
        let lo = this._bus.Read(entry);
        let hi = this._bus.Read(entry + 1);
        let pcStart = (hi << 8) | lo;
        this.Register(ERegisters.PC).Write(pcStart);
        this.Register(ERegisters.STATUS).Write(0x00);
    }
    Update() {
    }
    Pulse(clkCount, logger) {
        if (this._dma.DmaTransfer) {
            return;
        }
        this._cycleCount++;
        if (this._cycles > 0) {
            this._cycles--;
            return;
        }
        let pc = this.Register(ERegisters.PC).Read();
        let data = this._bus.Read(pc);
        let op = this._instructions.Lookup(data);
        if (op) {
            // let logMsg = "";
            // logMsg = `${this._ToHex(pc, 4)} `;
            // logMsg += `A:${this._ToHex(this.Register(ERegisters.A).Read(), 2)} `;
            // logMsg += `X:${this._ToHex(this.Register(ERegisters.X).Read(), 2)} `;
            // logMsg += `Y:${this._ToHex(this.Register(ERegisters.Y).Read(), 2)} `;
            // logMsg += `SP:${this._ToHex(this.Register(ERegisters.SP).Read(), 2)} `;
            // logger.WriteLine(logMsg);
            let operands = this._GetOperands(op.bytes - 1);
            let data = op.addresser(operands);
            op.operation(data);
            this._cycles = Math.max(op.duration - 1, 0);
        }
        else {
            throw (`UNDEFINED OP 0x${data.toString(16).toUpperCase()} at 0x${pc.toString(16).toUpperCase()}`);
        }
    }
    _ToHex(number, length) {
        var str = '' + number.toString(16);
        while (str.length < length) {
            str = '0' + str;
        }
        return "0x" + str.toUpperCase();
    }
    Nmi() {
        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), (this.Register(ERegisters.PC).Read() >> 8) & 0x00FF);
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read() - 1);
        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), this.Register(ERegisters.PC).Read() & 0x00FF);
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read() - 1);
        this.Register(ERegisters.STATUS).Clear(ESstatusBits.B);
        this.Register(ERegisters.STATUS).Set(ESstatusBits.UNUSED);
        this.Register(ERegisters.STATUS).Set(ESstatusBits.I);
        this._bus.Write(0x0100 + this.Register(ERegisters.SP).Read(), this.Register(ERegisters.STATUS).Read());
        this.Register(ERegisters.SP).Write(this.Register(ERegisters.SP).Read() - 1);
        let addrAbs = 0xFFFA;
        let lo = this._bus.Read(addrAbs);
        let hi = this._bus.Read(addrAbs + 1);
        this.Register(ERegisters.PC).Write((hi << 8) | lo);
        this._cycles = 8;
    }
    Read(address) {
        return 0;
    }
    Write(address) {
    }
    InstructionLookup(data) {
        return this._instructions.Lookup(data);
    }
    OperandLookup(address, ins) {
        return this._GetOperandsSafe(ins.bytes - 1, address);
    }
    Cycles() {
        return this._cycleCount;
    }
    TestStatus(value, index) {
        switch (index) {
            case ESstatusBits.Z: {
                this.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.Z, (value === 0) ? 1 : 0);
                break;
            }
            case ESstatusBits.N: {
                let sign = (value & 0b10000000);
                this.Register(ERegisters.STATUS).ChangeBit(ESstatusBits.N, (sign > 0) ? 1 : 0);
            }
        }
    }
    _GetOperandsSafe(n, address) {
        let result = [];
        for (let i = 0; i < n; i++) {
            let byte = this._bus.Read(address + i);
            result.push(byte);
        }
        return result;
    }
    _GetOperands(n) {
        let result = [];
        this.Register(ERegisters.PC).Write((this.Register(ERegisters.PC).Read() + 1) % 0xFFFF);
        for (let i = 0; i < n; i++) {
            let byte = this._bus.Read(this.Register(ERegisters.PC).Read());
            result.push(byte);
            this.Register(ERegisters.PC).Write((this.Register(ERegisters.PC).Read() + 1) % 0xFFFF);
        }
        return result;
    }
}


/***/ }),

/***/ "./static/src/cpu/6502/cpu_6502_alu.ts":
/*!*********************************************!*\
  !*** ./static/src/cpu/6502/cpu_6502_alu.ts ***!
  \*********************************************/
/*! exports provided: CPU_6502_ALU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU_6502_ALU", function() { return CPU_6502_ALU; });
/* harmony import */ var _alu_alu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../alu/alu */ "./static/src/alu/alu.ts");
/* harmony import */ var _cpu_6502__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cpu_6502 */ "./static/src/cpu/6502/cpu_6502.ts");


class CPU_6502_ALU extends _alu_alu__WEBPACK_IMPORTED_MODULE_0__["ALU"] {
    constructor(cpu) {
        super(cpu);
    }
    Increment(a) {
        let result = (a + 1) % 256;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        return result;
    }
    Decrement(a) {
        let result = (a - 1) % 256;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        return result;
    }
    Or(a, b) {
        let result = a | b;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        return result;
    }
    Xor(a, b) {
        let result = a ^ b;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        return result;
    }
    And(a, b) {
        let result = a & b;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        return result;
    }
    ShiftRight(a) {
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, (a & 0x0001) > 0 ? 1 : 0);
        let temp = a >> 1;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(temp));
        return temp & 0x00FF;
    }
    ShiftLeft(a) {
        let temp = a << 1;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, (temp & 0xFF00) > 0 ? 1 : 0);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(a));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(a));
        return temp & 0x00FF;
    }
    RotateLeft(a) {
        let c = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
        let temp = (a << 1) | c;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, (temp & 0xFF00) > 0 ? 1 : 0);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(temp));
        return temp & 0x00FF;
    }
    RotateRight(a) {
        let c = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
        let temp = (c << 7) | (a >> 1);
        //console.log(temp);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, (temp & 0x01) > 0 ? 1 : 0);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(temp));
        return temp & 0x00FF;
    }
    Add(a, b) {
        let c = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
        let result = (a + b + c);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, this._CheckCarry(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(result));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(result));
        let overflow = (~(a ^ b) & (a ^ result)) & 0x0080;
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V, overflow);
        return result & 0x00FF;
    }
    Subtract(a, b) {
        let c = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
        b ^= 0x00FF;
        b &= 0x00ff;
        let temp = (a + b + c);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, this._CheckCarry(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, this._CheckZero(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, this._CheckNegative(temp));
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V, ((temp ^ a) & (temp ^ b) & 0x0080) > 0 ? 1 : 0);
        return temp & 0x00FF;
    }
    _SafeByte(value) {
        if (value < 0) {
            return 256 + (value % 256);
        }
        else {
            return value % 256;
        }
    }
    _CheckZero(value) {
        return ((value & 0x00FF) === 0) ? 1 : 0;
    }
    _CheckNegative(value) {
        return (value & 0x80) ? 1 : 0;
    }
    _CheckCarry(value) {
        return (value & 0xFF00) > 0 ? 1 : 0;
    }
}


/***/ }),

/***/ "./static/src/cpu/6502/cpu_6502_instructions.ts":
/*!******************************************************!*\
  !*** ./static/src/cpu/6502/cpu_6502_instructions.ts ***!
  \******************************************************/
/*! exports provided: CPU_6502_Instructions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU_6502_Instructions", function() { return CPU_6502_Instructions; });
/* harmony import */ var _instructions_instruction_set__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../instructions/instruction_set */ "./static/src/instructions/instruction_set.ts");
/* harmony import */ var _cpu_6502__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cpu_6502 */ "./static/src/cpu/6502/cpu_6502.ts");


class OpParameters {
    constructor(address, value, extraCycles, register = null) {
        this._address = address;
        this._value = value;
        this._register = register;
        this._extraCycles = extraCycles;
    }
    get Address() {
        return this._address;
    }
    get Value() {
        return this._value;
    }
    get Register() {
        return this._register;
    }
    get ExtraCycles() {
        return this._extraCycles;
    }
}
class CPU_6502_Instructions extends _instructions_instruction_set__WEBPACK_IMPORTED_MODULE_0__["InstructionSet"] {
    constructor(cpu, alu, bus) {
        super(cpu, bus, alu);
        this._ADR_MODES = {
            Implied: (ops) => {
                return new OpParameters(0, 0, 0);
            },
            Accumulator: (ops) => {
                return new OpParameters(0, this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), 0, this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A));
            },
            Immediate: (ops) => {
                return new OpParameters(ops[0], ops[0], 0);
            },
            Absolute: (ops) => {
                let addr = (ops[1] << 8) | ops[0];
                return new OpParameters(addr, this._bus.Read(addr, true), 0);
            },
            AbsXIndexed: (ops) => {
                let address = (ops[1] << 8) | ops[0];
                let finalAddress = (address + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read()) % 65536;
                let extraCycles = 0;
                if ((finalAddress & 0xFF00) !== (ops[1] << 8)) {
                    extraCycles = 1;
                }
                return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), extraCycles);
            },
            AbsYIndexed: (ops) => {
                let address = (ops[1] << 8) | ops[0];
                let finalAddress = (address + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read()) % 65536;
                let extraCycles = 0;
                if ((finalAddress & 0xFF00) !== (ops[1] << 8)) {
                    extraCycles = 1;
                }
                return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), extraCycles);
            },
            XIndexedIndirect: (ops) => {
                let address = this._bus.Read(ops[0], true);
                let lo = this._bus.Read((address + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read()) & 0x00FF, true);
                let hi = this._bus.Read((address + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read() + 1) & 0x00FF, true);
                let addr = (hi << 8) | lo;
                return new OpParameters(addr, this._bus.Read(addr, true), 0);
            },
            IndirectIndexedY: (ops) => {
                let address1 = this._bus.Read(ops[0], true);
                let address2 = this._bus.Read(ops[0] + 1, true);
                let fullAddress = (address2 << 8) | (address1 + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read());
                let extraCycles = 0;
                if ((fullAddress & 0xFF00) != (address2 << 8)) {
                    extraCycles = 1;
                }
                return new OpParameters(fullAddress, this._bus.Read(fullAddress, true), extraCycles);
            },
            Indirect: (ops) => {
                let ptr = (ops[1] << 8) | ops[0];
                let finalAddress = 0;
                if (ops[0] == 0x00FF) {
                    finalAddress = (this._bus.Read(ptr & 0xFF00, true) << 8) | this._bus.Read(ptr, true);
                }
                else {
                    finalAddress = (this._bus.Read(ptr + 1, true) << 8) | this._bus.Read(ptr, true);
                }
                return new OpParameters(finalAddress, this._bus.Read(finalAddress, true), 0);
            },
            ZeroPage: (ops) => {
                return new OpParameters(ops[0], this._bus.Read(ops[0], true), 0);
            },
            ZeroPageXIndexed: (ops) => {
                let address = (ops[0] + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read()) % 256;
                return new OpParameters(address, this._bus.Read(address, true), 0);
            },
            ZeroPageYIndexed: (ops) => {
                let address = (ops[0] + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read()) % 256;
                return new OpParameters(address, this._bus.Read(address, true), 0);
            },
            Relative: (ops) => {
                return new OpParameters(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Read(), this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Read() + this._AsSigned(ops[0]), 0);
            }
        };
        this._OPERATIONS = {
            ADC: (data) => {
                let result = this._alu.Add(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), data.Value);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(result);
            },
            AND: (data) => {
                let result = this._alu.And(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), data.Value);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(result);
            },
            ASL: (data) => {
                let result = this._alu.ShiftLeft(data.Value);
                if (data.Register) {
                    data.Register.Write(result);
                }
                else {
                    this._bus.Write(data.Address, result);
                }
            },
            BCC: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C) === 0) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BCS: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C) === 1) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BEQ: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z) === 1) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BIT: (data) => {
                let n = (data.Value & 0b10000000) > 0 ? 1 : 0;
                let v = (data.Value & 0b01000000) > 0 ? 1 : 0;
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N, n);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V, v);
                let result = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read() & data.Value;
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z, (result & 0x00FF) == 0x00 ? 1 : 0);
            },
            BMI: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N) === 1) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BNE: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z) === 0) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BPL: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N) === 0) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BRK: (data) => {
                throw ("BRK not implemented");
            },
            BVC: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V) === 0) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            BVS: (data) => {
                if (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V) === 1) {
                    this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Value);
                }
            },
            CLC: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
            },
            CLD: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].D);
            },
            CLI: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].I);
            },
            CLV: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].V);
            },
            CMP: (data) => {
                let a = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read();
                let temp = this._AsSigned(a - data.Value);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, a >= data.Value ? 1 : 0);
            },
            CPX: (data) => {
                let x = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read();
                let temp = this._AsSigned(x - data.Value);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, x >= data.Value ? 1 : 0);
            },
            CPY: (data) => {
                let y = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read();
                let temp = this._AsSigned(y - data.Value);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(temp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).ChangeBit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C, y >= data.Value ? 1 : 0);
            },
            DEC: (data) => {
                let result = this._alu.Decrement(data.Value);
                this._bus.Write(data.Address, result);
            },
            DEX: (data) => {
                let result = this._alu.Decrement(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read());
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Write(result);
            },
            DEY: (data) => {
                let result = this._alu.Decrement(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read());
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Write(result);
            },
            EOR: (data) => {
                let result = this._alu.Xor(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), data.Value);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(result);
            },
            INC: (data) => {
                let result = this._alu.Increment(data.Value);
                this._bus.Write(data.Address, result);
            },
            INX: (data) => {
                let result = this._alu.Increment(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read());
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Write(result);
            },
            INY: (data) => {
                let result = this._alu.Increment(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read());
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Write(result);
            },
            JMP: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(data.Address);
            },
            JSR: (data) => {
                let address = data.Address;
                let pcHi = ((this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Read() - 1) >> 8) & 0x00FF;
                let pcLo = (this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Read() - 1) & 0x00FF;
                this._Push(pcHi);
                this._Push(pcLo);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(address);
            },
            LDA: (data) => {
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(data.Value);
            },
            LDX: (data) => {
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Write(data.Value);
            },
            LDY: (data) => {
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(data.Value, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Write(data.Value);
            },
            LSR: (data) => {
                let result = this._alu.ShiftRight(data.Value);
                if (data.Register) {
                    data.Register.Write(result);
                }
                else {
                    this._bus.Write(data.Address, result);
                }
            },
            NOP: (data) => {
            },
            ORA: (data) => {
                let result = this._alu.Or(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), data.Value);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(result);
            },
            PHA: (data) => {
                this._Push(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read());
            },
            PHP: (data) => {
                let b = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].B);
                let u = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Bit(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].UNUSED);
                this._Push(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Read() | b | u);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].B);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Clear(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].UNUSED);
            },
            PLA: (data) => {
                let a = this._Pull();
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(a);
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
            },
            PLP: (data) => {
                let a = this._Pull();
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Write(a);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Set(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].UNUSED);
            },
            ROL: (data) => {
                if (data.Register) {
                    let result = this._alu.RotateLeft(data.Register.Read());
                    data.Register.Write(result);
                }
                else {
                    let result = this._alu.RotateLeft(data.Value);
                    this._bus.Write(data.Address, result);
                }
            },
            ROR: (data) => {
                if (data.Register) {
                    let result = this._alu.RotateRight(data.Register.Read());
                    data.Register.Write(result);
                }
                else {
                    let result = this._alu.RotateRight(data.Value);
                    this._bus.Write(data.Address, result);
                }
            },
            RTI: (data) => {
                let a = this._Pull();
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Write(a);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Flip(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].B);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Flip(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].UNUSED);
                let returnLo = this._Pull();
                let returnHi = this._Pull();
                let returnAddr = (returnHi << 8) | returnLo;
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(returnAddr);
            },
            RTS: (data) => {
                let returnLo = this._Pull();
                let returnHi = this._Pull();
                let returnAddr = (returnHi << 8) | returnLo;
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].PC).Write(returnAddr + 1);
            },
            SBC: (data) => {
                let result = this._alu.Subtract(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read(), data.Value);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(result);
            },
            SEC: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Set(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].C);
            },
            SED: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Set(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].D);
            },
            SEI: (data) => {
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].STATUS).Set(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].I);
            },
            STA: (data) => {
                this._bus.Write(data.Address, this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read());
            },
            STX: (data) => {
                this._bus.Write(data.Address, this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read());
            },
            STY: (data) => {
                this._bus.Write(data.Address, this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read());
            },
            TAX: (data) => {
                let a = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read();
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Write(a);
            },
            TAY: (data) => {
                let a = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Read();
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(a, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Write(a);
            },
            TSX: (data) => {
                let sp = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Read();
                this._cpu.TestStatus(sp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(sp, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Write(sp);
            },
            TXA: (data) => {
                let x = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read();
                this._cpu.TestStatus(x, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(x, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(x);
            },
            TXS: (data) => {
                let x = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].X).Read();
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Write(x);
            },
            TYA: (data) => {
                let y = this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].Y).Read();
                this._cpu.TestStatus(y, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].Z);
                this._cpu.TestStatus(y, _cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ESstatusBits"].N);
                this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].A).Write(y);
            },
        };
        this._instructions[0x00] = {
            mnem: "BRK",
            bytes: 1,
            duration: 7,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.BRK,
        };
        this._instructions[0x01] = {
            mnem: "ORA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x05] = {
            mnem: "ORA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x06] = {
            mnem: "ASL",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ASL,
        };
        this._instructions[0x08] = {
            mnem: "PHP",
            bytes: 1,
            duration: 3,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PHP,
        };
        this._instructions[0x09] = {
            mnem: "ORA",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x0A] = {
            mnem: "ASL",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ASL,
        };
        this._instructions[0x0D] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x0E] = {
            mnem: "ASL",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ASL,
        };
        this._instructions[0x10] = {
            mnem: "BPL",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BPL,
        };
        this._instructions[0x1A] = {
            mnem: "NOP",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.NOP,
        };
        this._instructions[0x11] = {
            mnem: "ORA",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x15] = {
            mnem: "ORA",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x16] = {
            mnem: "ASL",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ASL,
        };
        this._instructions[0x18] = {
            mnem: "CLC",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLC,
        };
        this._instructions[0x19] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x1D] = {
            mnem: "ORA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ORA,
        };
        this._instructions[0x1E] = {
            mnem: "ASL",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ASL,
        };
        this._instructions[0x20] = {
            mnem: "JSR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.JSR,
        };
        this._instructions[0x21] = {
            mnem: "AND",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x24] = {
            mnem: "BIT",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.BIT,
        };
        this._instructions[0x25] = {
            mnem: "AND",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x26] = {
            mnem: "ROL",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ROL,
        };
        this._instructions[0x28] = {
            mnem: "PLP",
            bytes: 1,
            duration: 4,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PLP,
        };
        this._instructions[0x29] = {
            mnem: "AND",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x2A] = {
            mnem: "ROL",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ROL,
        };
        this._instructions[0x2C] = {
            mnem: "BIT",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.BIT,
        };
        this._instructions[0x2D] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x2E] = {
            mnem: "ROL",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ROL,
        };
        this._instructions[0x30] = {
            mnem: "BMI",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BMI,
        };
        this._instructions[0x31] = {
            mnem: "AND",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x35] = {
            mnem: "AND",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x36] = {
            mnem: "ROL",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ROL,
        };
        this._instructions[0x38] = {
            mnem: "SEC",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SEC
        };
        this._instructions[0x39] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.AND,
        };
        this._instructions[0x3E] = {
            mnem: "ROL",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ROL,
        };
        this._instructions[0x3D] = {
            mnem: "AND",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.AND
        };
        this._instructions[0x40] = {
            mnem: "RTI",
            bytes: 1,
            duration: 6,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.RTI
        };
        this._instructions[0x41] = {
            mnem: "EOR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x45] = {
            mnem: "EOR",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x46] = {
            mnem: "LSR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LSR
        };
        this._instructions[0x48] = {
            mnem: "PHA",
            bytes: 1,
            duration: 3,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PHA
        };
        this._instructions[0x49] = {
            mnem: "EOR",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x4A] = {
            mnem: "LSR",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.LSR
        };
        this._instructions[0x4C] = {
            mnem: "JMP",
            bytes: 3,
            duration: 3,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.JMP
        };
        this._instructions[0x4D] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x4E] = {
            mnem: "LSR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LSR
        };
        this._instructions[0x50] = {
            mnem: "BVC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BVC,
        };
        this._instructions[0x51] = {
            mnem: "EOR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x55] = {
            mnem: "EOR",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x56] = {
            mnem: "LSR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LSR
        };
        this._instructions[0x58] = {
            mnem: "CLI",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLI,
        };
        this._instructions[0x59] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x5D] = {
            mnem: "EOR",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.EOR
        };
        this._instructions[0x5E] = {
            mnem: "LSR",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LSR
        };
        this._instructions[0x60] = {
            mnem: "RTS",
            bytes: 1,
            duration: 6,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.RTS
        };
        this._instructions[0x61] = {
            mnem: "ADC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x65] = {
            mnem: "ADC",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x66] = {
            mnem: "ROR",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.ROR,
        };
        this._instructions[0x68] = {
            mnem: "PLA",
            bytes: 1,
            duration: 4,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.PLA
        };
        this._instructions[0x69] = {
            mnem: "ADC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x6A] = {
            mnem: "ROR",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Accumulator,
            operation: this._OPERATIONS.ROR,
        };
        this._instructions[0x6C] = {
            mnem: "JMP",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.Indirect,
            operation: this._OPERATIONS.JMP
        };
        this._instructions[0x6D] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x6E] = {
            mnem: "ROR",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.ROR,
        };
        this._instructions[0x70] = {
            mnem: "BVS",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BVS,
        };
        this._instructions[0x71] = {
            mnem: "ADC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x75] = {
            mnem: "ADC",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x76] = {
            mnem: "ROR",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.ROR,
        };
        this._instructions[0x78] = {
            mnem: "SEI",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SEI
        };
        this._instructions[0x79] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x7D] = {
            mnem: "ADC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ADC,
        };
        this._instructions[0x7E] = {
            mnem: "ROR",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.ROR,
        };
        this._instructions[0x81] = {
            mnem: "STA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x84] = {
            mnem: "STY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STY
        };
        this._instructions[0x85] = {
            mnem: "STA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x86] = {
            mnem: "STX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.STX
        };
        this._instructions[0x88] = {
            mnem: "DEY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.DEY
        };
        this._instructions[0x8A] = {
            mnem: "TXA",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TXA
        };
        this._instructions[0x8C] = {
            mnem: "STY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STY
        };
        this._instructions[0x8D] = {
            mnem: "STA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x8E] = {
            mnem: "STX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.STX
        };
        this._instructions[0x90] = {
            mnem: "BCC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BCC,
        };
        this._instructions[0x91] = {
            mnem: "STA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x94] = {
            mnem: "STY",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.STY
        };
        this._instructions[0x95] = {
            mnem: "STA",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x96] = {
            mnem: "STX",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageYIndexed,
            operation: this._OPERATIONS.STX
        };
        this._instructions[0x98] = {
            mnem: "TYA",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TYA
        };
        this._instructions[0x99] = {
            mnem: "STA",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0x9A] = {
            mnem: "TXS",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TXS
        };
        this._instructions[0x9D] = {
            mnem: "STA",
            bytes: 3,
            duration: 5,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.STA
        };
        this._instructions[0xA0] = {
            mnem: "LDY",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDY
        };
        this._instructions[0xA1] = {
            mnem: "LDA",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xA2] = {
            mnem: "LDX",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDX
        };
        this._instructions[0xA4] = {
            mnem: "LDY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDY
        };
        this._instructions[0xA5] = {
            mnem: "LDA",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xA6] = {
            mnem: "LDX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.LDX
        };
        this._instructions[0xA8] = {
            mnem: "TAY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TAY
        };
        this._instructions[0xA9] = {
            mnem: "LDA",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xAA] = {
            mnem: "TAX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TAX
        };
        this._instructions[0xAC] = {
            mnem: "LDY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDY
        };
        this._instructions[0xAD] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xAE] = {
            mnem: "LDX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.LDX
        };
        this._instructions[0xB0] = {
            mnem: "BCS",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BCS,
        };
        this._instructions[0xB1] = {
            mnem: "LDA",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xB4] = {
            mnem: "LDY",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LDY
        };
        this._instructions[0xB5] = {
            mnem: "LDA",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xB6] = {
            mnem: "LDX",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageYIndexed,
            operation: this._OPERATIONS.LDX
        };
        this._instructions[0xB8] = {
            mnem: "CLV",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLV,
        };
        this._instructions[0xB9] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xBA] = {
            mnem: "TSX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.TSX
        };
        this._instructions[0xBC] = {
            mnem: "LDY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LDY
        };
        this._instructions[0xBD] = {
            mnem: "LDA",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.LDA
        };
        this._instructions[0xBE] = {
            mnem: "LDX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.LDX
        };
        this._instructions[0xC0] = {
            mnem: "CPY",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CPY
        };
        this._instructions[0xC1] = {
            mnem: "CMP",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xC4] = {
            mnem: "CPY",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CPY
        };
        this._instructions[0xC5] = {
            mnem: "CMP",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xC6] = {
            mnem: "DEC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.DEC
        };
        this._instructions[0xC8] = {
            mnem: "INY",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.INY
        };
        this._instructions[0xC9] = {
            mnem: "CMP",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xCA] = {
            mnem: "DEX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.DEX
        };
        this._instructions[0xCC] = {
            mnem: "CPY",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CPY
        };
        this._instructions[0xCD] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xCE] = {
            mnem: "DEC",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.DEC
        };
        this._instructions[0xD0] = {
            mnem: "BNE",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BNE,
        };
        this._instructions[0xD1] = {
            mnem: "CMP",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xD5] = {
            mnem: "CMP",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xD6] = {
            mnem: "DEC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.DEC
        };
        this._instructions[0xD8] = {
            mnem: "CLD",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.CLD,
        };
        this._instructions[0xD9] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xDD] = {
            mnem: "CMP",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.CMP
        };
        this._instructions[0xDE] = {
            mnem: "DEC",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.DEC
        };
        this._instructions[0xE0] = {
            mnem: "CPX",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.CPX
        };
        this._instructions[0xE1] = {
            mnem: "SBC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.XIndexedIndirect,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xE5] = {
            mnem: "SBC",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xE9] = {
            mnem: "SBC",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Immediate,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xEA] = {
            mnem: "NOP",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.NOP
        };
        this._instructions[0xE4] = {
            mnem: "CPX",
            bytes: 2,
            duration: 3,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.CPX
        };
        this._instructions[0xE6] = {
            mnem: "INC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.ZeroPage,
            operation: this._OPERATIONS.INC
        };
        this._instructions[0xE8] = {
            mnem: "INX",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.INX
        };
        this._instructions[0xEC] = {
            mnem: "CPX",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.CPX
        };
        this._instructions[0xED] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xEE] = {
            mnem: "INC",
            bytes: 3,
            duration: 6,
            addresser: this._ADR_MODES.Absolute,
            operation: this._OPERATIONS.INC
        };
        this._instructions[0xF0] = {
            mnem: "BEQ",
            bytes: 2,
            duration: 2,
            addresser: this._ADR_MODES.Relative,
            operation: this._OPERATIONS.BEQ,
        };
        this._instructions[0xF1] = {
            mnem: "SBC",
            bytes: 2,
            duration: 5,
            addresser: this._ADR_MODES.IndirectIndexedY,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xF5] = {
            mnem: "SBC",
            bytes: 2,
            duration: 4,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xF6] = {
            mnem: "INC",
            bytes: 2,
            duration: 6,
            addresser: this._ADR_MODES.ZeroPageXIndexed,
            operation: this._OPERATIONS.INC
        };
        this._instructions[0xF8] = {
            mnem: "SED",
            bytes: 1,
            duration: 2,
            addresser: this._ADR_MODES.Implied,
            operation: this._OPERATIONS.SED
        };
        this._instructions[0xF9] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsYIndexed,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xFD] = {
            mnem: "SBC",
            bytes: 3,
            duration: 4,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.SBC
        };
        this._instructions[0xFE] = {
            mnem: "INC",
            bytes: 3,
            duration: 7,
            addresser: this._ADR_MODES.AbsXIndexed,
            operation: this._OPERATIONS.INC
        };
    }
    _AsSigned(value) {
        if (value < 0) {
            return 256 + value;
        }
        let sign = (value & (1 << 7)) >> 7;
        if (sign === 1) {
            return -(256 + (~(value) + 1));
        }
        else {
            return value;
        }
    }
    _Push(value) {
        this._bus.Write(0x0100 + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Read(), value);
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Write(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Read() - 1);
    }
    _Pull() {
        this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Write(this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Read() + 1);
        return this._bus.Read(0x0100 + this._cpu.Register(_cpu_6502__WEBPACK_IMPORTED_MODULE_1__["ERegisters"].SP).Read());
    }
}


/***/ }),

/***/ "./static/src/cpu/6502/ppu.ts":
/*!************************************!*\
  !*** ./static/src/cpu/6502/ppu.ts ***!
  \************************************/
/*! exports provided: PPU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PPU", function() { return PPU; });
/* harmony import */ var _component_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../component/component */ "./static/src/component/component.ts");
/* harmony import */ var _data_pixel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/pixel */ "./static/src/data/pixel.ts");


class ObjAttributeEntry {
    constructor() {
        this.Y = 0;
        this.ID = 0;
        this.ATTRIBUTE = 0;
        this.X = 0;
    }
    ReadByte(i) {
        switch (i) {
            case 0:
                return this.Y;
            case 1:
                return this.ID;
            case 2:
                return this.ATTRIBUTE;
            case 3:
                return this.X;
        }
    }
    WriteByte(i, value) {
        switch (i) {
            case 0:
                this.Y = value;
                break;
            case 1:
                this.ID = value;
                break;
            case 2:
                this.ATTRIBUTE = value;
                break;
            case 3:
                this.X = value;
                break;
        }
    }
}
class Mask {
    constructor() {
        this.ENHANCE_BLUE = 0;
        this.ENHANCE_GREEN = 0;
        this.ENHANCE_RED = 0;
        this.RENDER_SPRITES = 0;
        this.RENDER_BACKGROUND = 0;
        this.RENDER_SPRITES_LEFT = 0;
        this.RENDER_BACKGROUND_LEFT = 0;
        this.GRAYSCALE = 0;
    }
    Data() {
        return (this.GRAYSCALE << 7) |
            (this.RENDER_BACKGROUND_LEFT << 6) |
            (this.RENDER_SPRITES_LEFT << 5) |
            (this.RENDER_BACKGROUND << 4) |
            (this.RENDER_SPRITES << 3) |
            (this.ENHANCE_RED << 2) |
            (this.ENHANCE_GREEN << 1) |
            (this.ENHANCE_BLUE);
    }
    Set(n) {
        this.GRAYSCALE = (n & 0b00000001) > 0 ? 1 : 0;
        this.RENDER_BACKGROUND_LEFT = (n & 0b00000010) > 0 ? 1 : 0;
        this.RENDER_SPRITES_LEFT = (n & 0b00000100) > 0 ? 1 : 0;
        this.RENDER_BACKGROUND = (n & 0b00001000) > 0 ? 1 : 0;
        this.RENDER_SPRITES = (n & 0b00010000) > 0 ? 1 : 0;
        this.ENHANCE_RED = (n & 0b00100000) > 0 ? 1 : 0;
        this.ENHANCE_GREEN = (n & 0b01000000) > 0 ? 1 : 0;
        this.ENHANCE_BLUE = (n & 0b10000000) > 0 ? 1 : 0;
    }
}
class LoopyRegister {
    constructor() {
        this.COARSE_X = 0;
        this.COARSE_Y = 0;
        this.NAMETABLE_X = 0;
        this.NAMETABLE_Y = 0;
        this.FINE_Y = 0;
    }
    Data() {
        return (this.COARSE_X) |
            (this.COARSE_Y << 5) |
            (this.NAMETABLE_X << 10) |
            (this.NAMETABLE_Y << 11) |
            (this.FINE_Y << 12);
    }
    Set(n) {
        if (n > 0xFFFF) {
            console.log("HMM: " + n);
        }
        this.COARSE_X = (n & 0b0000000000011111);
        this.COARSE_Y = ((n & 0b0000001111100000) >> 5);
        this.NAMETABLE_X = ((n & 0b0000010000000000) >> 10);
        this.NAMETABLE_Y = ((n & 0b0000100000000000) >> 11);
        this.FINE_Y = ((n & 0b0111000000000000) >> 12);
    }
}
class Status {
    constructor() {
        this.SPRITE_OVERFLOW = 0;
        this.SPRITE_ZERO_HIT = 0;
        this.VERTICAL_BLANK = 0;
        this.PREV_WRITE_LSB = 0;
    }
    Data() {
        return (this.PREV_WRITE_LSB) |
            (this.SPRITE_OVERFLOW << 5) |
            (this.SPRITE_ZERO_HIT << 6) |
            (this.VERTICAL_BLANK << 7);
    }
    Set(n) {
        this.PREV_WRITE_LSB = (n & 0b00011111);
        this.SPRITE_OVERFLOW = (n & 0b00100000) > 0 ? 1 : 0;
        this.SPRITE_ZERO_HIT = (n & 0b01000000) > 0 ? 1 : 0;
        this.VERTICAL_BLANK = (n & 0b10000000) > 0 ? 1 : 0;
    }
}
class Control {
    constructor() {
        this.NAMETABLE_X = 0;
        this.NAMETABLE_Y = 0;
        this.INCREMENT_MODE = 0;
        this.PATTERN_SPRITE = 0;
        this.PATTERN_BACKGROUND = 0;
        this.SPRITE_SIZE = 0;
        this.SLAVE_MODE = 0;
        this.ENABLE_NMI = 0;
    }
    Data() {
        return (this.ENABLE_NMI << 7) |
            (this.SLAVE_MODE << 6) |
            (this.SPRITE_SIZE << 5) |
            (this.PATTERN_BACKGROUND << 4) |
            (this.PATTERN_SPRITE << 3) |
            (this.INCREMENT_MODE << 2) |
            (this.NAMETABLE_Y << 1) |
            (this.NAMETABLE_X);
    }
    Set(n) {
        this.ENABLE_NMI = (n & 0b10000000) > 0 ? 1 : 0;
        this.SLAVE_MODE = (n & 0b01000000) > 0 ? 1 : 0;
        this.SPRITE_SIZE = (n & 0b00100000) > 0 ? 1 : 0;
        this.PATTERN_BACKGROUND = (n & 0b00010000) > 0 ? 1 : 0;
        this.PATTERN_SPRITE = (n & 0b00001000) > 0 ? 1 : 0;
        this.INCREMENT_MODE = (n & 0b00000100) > 0 ? 1 : 0;
        this.NAMETABLE_Y = (n & 0b00000010) > 0 ? 1 : 0;
        this.NAMETABLE_X = (n & 0b00000001) > 0 ? 1 : 0;
    }
}
class PPU extends _component_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(bus) {
        super();
        this._bus = bus;
        this._tblName = [];
        for (let i = 0; i < 2; i++) {
            this._tblName[i] = [];
            for (let j = 0; j < 1024; j++) {
                this._tblName[i][j] = 0;
            }
        }
        this._tblPattern = [];
        for (let i = 0; i < 2; i++) {
            this._tblPattern[i] = [];
            for (let j = 0; j < 4096; j++) {
                this._tblPattern[i][j] = 0;
            }
        }
        this._drawCount = 0;
        this._drawTimer = 0;
        this._timeLastFrame = 0;
        this._tblPalette = [];
        this._screen = new Array(0x40);
        this._canvas = document.getElementById("screen");
        this._context = this._canvas.getContext("2d");
        this._context.clearRect(0, 0, 1024, 768);
        this._cycle = 0;
        this._scanline = 0;
        this._nmi = false;
        this._fineX = 0;
        this._frameComplete = false;
        this._drawBuffer = this._context.createImageData(256, 240);
        this._buffer = new ArrayBuffer(this._drawBuffer.data.length);
        this._frameBufferData8 = new Uint8ClampedArray(this._buffer);
        this._frameBufferData32 = new Uint32Array(this._buffer);
        this._control = new Control();
        this._mask = new Mask();
        this._status = new Status();
        this._vramAddr = new LoopyRegister();
        this._tramAddr = new LoopyRegister();
        this._bgShifterPatternHi = 0;
        this._bgShifterAttribLo = 0;
        this._bgShifterAttribHi = 0;
        this._bgNextTileLsb = 0;
        this._bgNextTileMsb = 0;
        this._bgNextTileAttrib = 0;
        this._addressLatch = 0;
        this._spriteZeroHitPossible = false;
        this._spriteZeroBeingRendered = false;
        this._ppuDataBuffer = 0;
        for (let i = 0; i < 256 * 240 * 4; i++) {
            this._drawBuffer.data[i] = 255;
        }
        this._pixels = [];
        this._spriteShifterPatternHi = [];
        this._spriteShifterPatternLo = [];
        this._spriteScanline = [];
        this._oam = [];
        for (let i = 0; i < 64; i++) {
            this._oam[i] = new ObjAttributeEntry();
        }
        this._oamAddr = 0;
        this._palScreen = [];
        this._palScreen[0x00] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](84, 84, 84);
        this._palScreen[0x01] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 30, 116);
        this._palScreen[0x02] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](8, 16, 144);
        this._palScreen[0x03] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](48, 0, 136);
        this._palScreen[0x04] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](68, 0, 100);
        this._palScreen[0x05] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](92, 0, 48);
        this._palScreen[0x06] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](84, 4, 0);
        this._palScreen[0x07] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](60, 24, 0);
        this._palScreen[0x08] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](32, 42, 0);
        this._palScreen[0x09] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](8, 58, 0);
        this._palScreen[0x0A] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 64, 0);
        this._palScreen[0x0B] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 60, 0);
        this._palScreen[0x0C] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 50, 60);
        this._palScreen[0x0D] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x0E] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x0F] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x10] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](152, 150, 152);
        this._palScreen[0x11] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](8, 76, 196);
        this._palScreen[0x12] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](48, 50, 236);
        this._palScreen[0x13] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](92, 30, 228);
        this._palScreen[0x14] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](136, 20, 176);
        this._palScreen[0x15] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](160, 20, 100);
        this._palScreen[0x16] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](152, 34, 32);
        this._palScreen[0x17] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](120, 60, 0);
        this._palScreen[0x18] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](84, 90, 0);
        this._palScreen[0x19] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](40, 114, 0);
        this._palScreen[0x1A] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](8, 124, 0);
        this._palScreen[0x1B] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 118, 40);
        this._palScreen[0x1C] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 102, 120);
        this._palScreen[0x1D] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x1E] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x1F] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x20] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 238, 236);
        this._palScreen[0x21] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](76, 154, 236);
        this._palScreen[0x22] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](120, 124, 236);
        this._palScreen[0x23] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](176, 98, 236);
        this._palScreen[0x24] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](228, 84, 236);
        this._palScreen[0x25] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 88, 180);
        this._palScreen[0x26] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 106, 100);
        this._palScreen[0x27] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](212, 136, 32);
        this._palScreen[0x28] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](160, 170, 0);
        this._palScreen[0x29] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](116, 196, 0);
        this._palScreen[0x2A] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](76, 208, 32);
        this._palScreen[0x2B] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](56, 204, 108);
        this._palScreen[0x2C] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](56, 180, 204);
        this._palScreen[0x2D] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](60, 60, 60);
        this._palScreen[0x2E] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x2F] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x30] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 238, 236);
        this._palScreen[0x31] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](168, 204, 236);
        this._palScreen[0x32] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](188, 188, 236);
        this._palScreen[0x33] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](212, 178, 236);
        this._palScreen[0x34] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 174, 236);
        this._palScreen[0x35] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 174, 212);
        this._palScreen[0x36] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](236, 180, 176);
        this._palScreen[0x37] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](228, 196, 144);
        this._palScreen[0x38] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](204, 210, 120);
        this._palScreen[0x39] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](180, 222, 120);
        this._palScreen[0x3A] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](168, 226, 144);
        this._palScreen[0x3B] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](152, 226, 180);
        this._palScreen[0x3C] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](160, 214, 228);
        this._palScreen[0x3D] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](160, 162, 160);
        this._palScreen[0x3E] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
        this._palScreen[0x3F] = new _data_pixel__WEBPACK_IMPORTED_MODULE_1__["Pixel"](0, 0, 0);
    }
    Update() {
    }
    Pulse() {
        let IncrementScrollX = () => {
            if (this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                if (this._vramAddr.COARSE_X === 31) {
                    this._vramAddr.COARSE_X = 0;
                    this._vramAddr.NAMETABLE_X = (this._vramAddr.NAMETABLE_X === 1) ? 0 : 1; // WAS BITWISE NOTTED HMM
                }
                else {
                    this._vramAddr.COARSE_X++;
                }
            }
        };
        let IncrementScrollY = () => {
            if (this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                if (this._vramAddr.FINE_Y < 7) {
                    this._vramAddr.FINE_Y++;
                }
                else {
                    this._vramAddr.FINE_Y = 0;
                    if (this._vramAddr.COARSE_Y == 29) {
                        this._vramAddr.COARSE_Y = 0;
                        this._vramAddr.NAMETABLE_Y = (this._vramAddr.NAMETABLE_Y === 1) ? 0 : 1; // WAS BITWISE NOTTED HMM
                    }
                    else {
                        if (this._vramAddr.COARSE_Y == 31) {
                            this._vramAddr.COARSE_Y = 0;
                        }
                        else {
                            this._vramAddr.COARSE_Y++;
                        }
                    }
                }
            }
        };
        let TransferAddressX = () => {
            if (this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                this._vramAddr.NAMETABLE_X = this._tramAddr.NAMETABLE_X;
                this._vramAddr.COARSE_X = this._tramAddr.COARSE_X;
            }
        };
        let TransferAddressY = () => {
            if (this._mask.RENDER_BACKGROUND || this._mask.RENDER_SPRITES) {
                this._vramAddr.FINE_Y = this._tramAddr.FINE_Y;
                this._vramAddr.NAMETABLE_Y = this._tramAddr.NAMETABLE_Y;
                this._vramAddr.COARSE_Y = this._tramAddr.COARSE_Y;
            }
        };
        let LoadBackgroundShifters = () => {
            this._bgShifterPatternLo = (this._bgShifterPatternLo & 0xFF00) | this._bgNextTileLsb;
            this._bgShifterPatternHi = (this._bgShifterPatternHi & 0xFF00) | this._bgNextTileMsb;
            this._bgShifterAttribLo = (this._bgShifterAttribLo & 0xFF00) | ((this._bgNextTileAttrib & 0b01) ? 0xFF : 0x00);
            this._bgShifterAttribHi = (this._bgShifterAttribHi & 0xFF00) | ((this._bgNextTileAttrib & 0b10) ? 0xFF : 0x00);
        };
        let UpdateShifters = () => {
            if (this._mask.RENDER_BACKGROUND) {
                this._bgShifterPatternLo = (this._bgShifterPatternLo << 1) & 0xFFFF;
                this._bgShifterPatternHi = (this._bgShifterPatternHi << 1) & 0xFFFF;
                this._bgShifterAttribLo = (this._bgShifterAttribLo << 1) & 0xFFFF;
                this._bgShifterAttribHi = (this._bgShifterAttribHi << 1) & 0xFFFF;
            }
            if (this._mask.RENDER_SPRITES && this._cycle >= 1 && this._cycle < 258) {
                for (let i = 0; i < this._spriteCount; i++) {
                    if (this._spriteScanline[i].X > 0) {
                        this._spriteScanline[i].X--;
                    }
                    else {
                        this._spriteShifterPatternLo[i] = (this._spriteShifterPatternLo[i] << 1) & 0xFF;
                        this._spriteShifterPatternHi[i] = (this._spriteShifterPatternHi[i] << 1) & 0xFF;
                    }
                }
            }
        };
        if (this._scanline >= -1 && this._scanline < 240) {
            if (this._scanline === 0 && this._cycle === 0) {
                this._cycle = 1;
            }
            if (this._scanline == -1 && this._cycle == 1) {
                this._status.VERTICAL_BLANK = 0;
                this._status.SPRITE_OVERFLOW = 0;
                this._status.SPRITE_ZERO_HIT = 0;
                for (let i = 0; i < 8; i++) {
                    this._spriteShifterPatternLo[i] = 0;
                    this._spriteShifterPatternHi[i] = 0;
                }
            }
            if ((this._cycle >= 2 && this._cycle < 258) || (this._cycle >= 321 && this._cycle < 338)) {
                UpdateShifters();
                switch ((this._cycle - 1) % 8) {
                    case 0:
                        LoadBackgroundShifters();
                        this._bgNextTileId = this._PpuRead(0x2000 | (this._vramAddr.Data() & 0x0FFF));
                        break;
                    case 2:
                        this._bgNextTileAttrib = this._PpuRead(0x23C0 | (this._vramAddr.NAMETABLE_Y << 11)
                            | (this._vramAddr.NAMETABLE_X << 10)
                            | ((this._vramAddr.COARSE_Y >> 2) << 3)
                            | (this._vramAddr.COARSE_X >> 2));
                        if (this._vramAddr.COARSE_Y & 0x02)
                            this._bgNextTileAttrib >>= 4;
                        if (this._vramAddr.COARSE_X & 0x02)
                            this._bgNextTileAttrib >>= 2;
                        this._bgNextTileAttrib &= 0x03;
                        break;
                    case 4:
                        this._bgNextTileLsb = this._PpuRead((this._control.PATTERN_BACKGROUND << 12)
                            + ((this._bgNextTileId << 4))
                            + (this._vramAddr.FINE_Y) + 0);
                        break;
                    case 6:
                        this._bgNextTileMsb = this._PpuRead((this._control.PATTERN_BACKGROUND << 12)
                            + ((this._bgNextTileId << 4))
                            + (this._vramAddr.FINE_Y) + 8);
                        break;
                    case 7:
                        IncrementScrollX();
                        break;
                }
            }
            if (this._cycle === 256) {
                IncrementScrollY();
            }
            if (this._cycle === 257) {
                LoadBackgroundShifters();
                TransferAddressX();
            }
            if (this._cycle === 338 || this._cycle === 340) {
                this._bgNextTileId = this._PpuRead(0x2000 | (this._vramAddr.Data() & 0x0FFF));
            }
            if (this._scanline == -1 && this._cycle >= 280 && this._cycle < 305) {
                TransferAddressY();
            }
            if (this._cycle === 257 && this._scanline >= 0) {
                this._spriteCount = 0;
                for (let i = 0; i < 8; i++) {
                    this._spriteScanline[i] = new ObjAttributeEntry();
                    this._spriteScanline[i].ATTRIBUTE = 0xFF;
                    this._spriteScanline[i].Y = 0xFF;
                    this._spriteScanline[i].X = 0xFF;
                    this._spriteScanline[i].ID = 0xFF;
                    this._spriteShifterPatternLo[i] = 0;
                    this._spriteShifterPatternHi[i] = 0;
                }
                let nOAMEntry = 0;
                this._spriteZeroHitPossible = false;
                while (nOAMEntry < 64 && this._spriteCount < 9) {
                    let diff = this._scanline - this._oam[nOAMEntry].Y;
                    if (diff >= 0 && diff < (this._control.SPRITE_SIZE ? 16 : 8)) {
                        if (this._spriteCount < 8) {
                            if (nOAMEntry === 0) {
                                this._spriteZeroHitPossible = true;
                            }
                            this._spriteScanline[this._spriteCount].ATTRIBUTE = this._oam[nOAMEntry].ATTRIBUTE;
                            this._spriteScanline[this._spriteCount].X = this._oam[nOAMEntry].X;
                            this._spriteScanline[this._spriteCount].Y = this._oam[nOAMEntry].Y;
                            this._spriteScanline[this._spriteCount].ID = this._oam[nOAMEntry].ID;
                            this._spriteCount++;
                        }
                    }
                    nOAMEntry++;
                }
                this._status.SPRITE_OVERFLOW = (this._spriteCount > 8) ? 1 : 0;
            }
            if (this._cycle === 340) {
                for (let i = 0; i < this._spriteCount; i++) {
                    let spritePatternBitsLo = 0;
                    let spritePatternBitsHi = 0;
                    let spritePatternAddrLo = 0;
                    let spritePatternAddrHi = 0;
                    if (this._control.SPRITE_SIZE === 0) {
                        if ((this._spriteScanline[i].ATTRIBUTE & 0x80) === 0) {
                            spritePatternAddrLo = (this._control.PATTERN_SPRITE << 12)
                                | (this._spriteScanline[i].ID << 4)
                                | (this._scanline - this._spriteScanline[i].Y);
                        }
                        else {
                            spritePatternAddrLo = (this._control.PATTERN_SPRITE << 12)
                                | (this._spriteScanline[i].ID << 4)
                                | (7 - (this._scanline - this._spriteScanline[i].Y));
                        }
                    }
                    else {
                        if ((this._spriteScanline[i].ATTRIBUTE & 0x80) === 0) {
                            if (this._scanline - this._spriteScanline[i].Y < 8) {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                    | ((this._spriteScanline[i].ID & 0xFE) << 4)
                                    | ((this._scanline - this._spriteScanline[i].Y) & 0x07);
                            }
                            else {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                    | (((this._spriteScanline[i].ID & 0xFE) + 1) << 4)
                                    | ((this._scanline - this._spriteScanline[i].Y) & 0x07);
                            }
                        }
                        else {
                            if (this._scanline - this._spriteScanline[i].Y < 8) {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                    | (((this._spriteScanline[i].ID & 0xFE) + 1) << 4)
                                    | (7 - (this._scanline - this._spriteScanline[i].Y) & 0x07);
                            }
                            else {
                                spritePatternAddrLo = ((this._spriteScanline[i].ID & 0x01) << 12)
                                    | (((this._spriteScanline[i].ID & 0xFE)) << 4)
                                    | (7 - (this._scanline - this._spriteScanline[i].Y) & 0x07);
                            }
                        }
                    }
                    spritePatternAddrHi = spritePatternAddrLo + 8;
                    spritePatternBitsLo = this._PpuRead(spritePatternAddrLo);
                    spritePatternBitsHi = this._PpuRead(spritePatternAddrHi);
                    if ((this._spriteScanline[i].ATTRIBUTE & 0x40) > 0) {
                        let flipbyte = (b) => {
                            b = (b & 0xF0) >> 4 | (b & 0x0F) << 4;
                            b = (b & 0xCC) >> 2 | (b & 0x33) << 2;
                            b = (b & 0xAA) >> 1 | (b & 0x55) << 1;
                            return b;
                        };
                        spritePatternBitsLo = flipbyte(spritePatternBitsLo);
                        spritePatternBitsHi = flipbyte(spritePatternBitsHi);
                    }
                    this._spriteShifterPatternLo[i] = spritePatternBitsLo;
                    this._spriteShifterPatternHi[i] = spritePatternBitsHi;
                }
            }
        }
        if (this._scanline === 240) {
            // nothing
        }
        if (this._scanline >= 241 && this._scanline < 261) {
            if (this._scanline === 241 && this._cycle === 1) {
                this._status.VERTICAL_BLANK = 1;
                if (this._control.ENABLE_NMI) {
                    this._nmi = true;
                }
            }
        }
        let bgPixel = 0x00;
        let bgPalette = 0x00;
        if (this._mask.RENDER_BACKGROUND) {
            let bitMux = 0x8000 >> this._fineX;
            let p0Pixel = (this._bgShifterPatternLo & bitMux) > 0 ? 1 : 0;
            let p1Pixel = (this._bgShifterPatternHi & bitMux) > 0 ? 1 : 0;
            bgPixel = (p1Pixel << 1) | p0Pixel;
            let bgPal0 = (this._bgShifterAttribLo & bitMux) > 0 ? 1 : 0;
            let bgPal1 = (this._bgShifterAttribHi & bitMux) > 0 ? 1 : 0;
            bgPalette = (bgPal1 << 1) | bgPal0;
        }
        let fgPixel = 0x0;
        let fgPalette = 0x0;
        let fgPriority = 0x0;
        if (this._mask.RENDER_SPRITES) {
            this._spriteZeroBeingRendered = false;
            for (let i = 0; i < this._spriteCount; i++) {
                if (this._spriteScanline[i].X === 0) {
                    let fgPixelLo = ((this._spriteShifterPatternLo[i] & 0x80) > 0) ? 1 : 0;
                    let fgPixelHi = ((this._spriteShifterPatternHi[i] & 0x80) > 0) ? 1 : 0;
                    fgPixel = (fgPixelHi << 1) | fgPixelLo;
                    fgPalette = (this._spriteScanline[i].ATTRIBUTE & 0x03) + 0x04;
                    fgPriority = ((this._spriteScanline[i].ATTRIBUTE & 0x20) === 0) ? 1 : 0;
                    if (fgPixel !== 0) {
                        if (i === 0) {
                            this._spriteZeroBeingRendered = true;
                        }
                        break;
                    }
                }
            }
        }
        let finalPixel = 0x0;
        let finalPalette = 0x0;
        if (bgPixel === 0 && fgPixel === 0) {
            finalPixel = 0x0;
            finalPalette = 0x0;
        }
        else if (bgPixel === 0 && fgPixel > 0) {
            finalPixel = fgPixel;
            finalPalette = fgPalette;
        }
        else if (bgPixel > 0 && fgPixel === 0) {
            finalPixel = bgPixel;
            finalPalette = bgPalette;
        }
        else if (bgPixel > 0 && fgPixel > 0) {
            if (fgPriority) {
                finalPixel = fgPixel;
                finalPalette = fgPalette;
            }
            else {
                finalPixel = bgPixel;
                finalPalette = bgPalette;
            }
            if (this._spriteZeroHitPossible && this._spriteZeroBeingRendered) {
                if (this._mask.RENDER_BACKGROUND_LEFT && this._mask.RENDER_SPRITES_LEFT) {
                    // if(this._mask.RENDER_BACKGROUND_LEFT && this._mask.RENDER_SPRITES_LEFT) {
                    //     if(this._cycle >= 9 && this._cycle < 258) {
                    //         this._status.SPRITE_ZERO_HIT = 1;
                    //     }
                    // } else {
                    if (this._cycle >= 1 && this._cycle < 258) {
                        this._status.SPRITE_ZERO_HIT = 1;
                    }
                    //}
                }
            }
        }
        let x = (this._cycle - 1);
        let y = this._scanline;
        let color = this.GetColor(finalPalette, finalPixel);
        // this._pixels.push({
        //     color: color,
        //     x: x,
        //     y: y
        // })
        let index = ((y * (this._drawBuffer.width * 4)) + (x * 4));
        this._drawBuffer.data[index] = color.r;
        this._drawBuffer.data[index + 1] = color.g;
        this._drawBuffer.data[index + 2] = color.b;
        this._cycle++;
        if (this._cycle >= 341) {
            this._cycle = 0;
            this._scanline++;
            if (this._scanline >= 261) {
                this._scanline = -1;
                // let blitRect = (x, y, color) => {
                //     for(let i = y; i <= y; i++) {
                //         for(let j = x; j <= x; j++ ) {
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))] = color.r;
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))+1] = color.g;
                //             this._drawBuffer.data[(((y+i) * (this._drawBuffer.width * 4)) + ((x+j) * 4))+2] = color.b;
                //         }
                //     }
                // }
                this._frameComplete = true;
                this._drawCount++;
                let delta = performance.now() - this._timeLastFrame;
                this._drawTimer += delta;
                if (this._drawTimer > 1000) {
                    this._drawTimer = 0;
                    console.log("PPU_DRAWS: " + this._drawCount);
                    this._drawCount = 0;
                }
                this._timeLastFrame = performance.now();
                // for(let i = 0; i < this._pixels.length; i+=1) {
                //     let p: PixelInfo = this._pixels[Math.floor(i)];
                //     let index = ((p.y * (this._drawBuffer.width * 4)) + (p.x * 4));
                //     this._drawBuffer.data[index] = p.color.r;
                //     this._drawBuffer.data[index+1] = p.color.g;
                //     this._drawBuffer.data[index+2] = p.color.b;
                // }                
                this._context.putImageData(this._drawBuffer, 64, 64);
                //this._pixels = [];
            }
        }
    }
    Read(address, rdOnly) {
        let data = 0;
        address &= 0x0007;
        if (rdOnly) {
            switch (address) {
                case 0x0000: // Control
                    data = this._control.Data();
                    break;
                case 0x0001: // Mask
                    data = this._mask.Data();
                    break;
                case 0x0002: // Status
                    data = this._status.Data();
                    break;
                case 0x0003: // OAM Address
                    break;
                case 0x0004: // OAM Data
                    break;
                case 0x0005: // Scroll
                    break;
                case 0x0006: // PPU Address
                    break;
                case 0x0007: // PPU Data
                    break;
            }
        }
        else {
            switch (address) {
                case 0x0000: // Control
                    data = this._control.Data();
                    break;
                case 0x0001: // Mask
                    data = this._mask.Data();
                    break;
                case 0x0002: // Status
                    data = this._status.Data();
                    this._status.VERTICAL_BLANK = 0;
                    this._addressLatch = 0;
                    break;
                case 0x0003: // OAM Address
                    break;
                case 0x0004: // OAM Data
                    let index = Math.floor(this._oamAddr / 4);
                    let offset = this._oamAddr % 4;
                    data = this._oam[index].ReadByte(offset);
                    break;
                case 0x0005: // Scroll
                    break;
                case 0x0006: // PPU Address
                    break;
                case 0x0007: // PPU Data
                    let d = this._vramAddr.Data();
                    data = this._ppuDataBuffer;
                    this._ppuDataBuffer = this._PpuRead(d);
                    if (d >= 0x3F00)
                        data = this._ppuDataBuffer;
                    this._vramAddr.Set(d + (this._control.INCREMENT_MODE ? 32 : 1));
                    break;
            }
        }
        return data;
    }
    Write(address, value) {
        address &= 0x0007;
        switch (address) {
            case 0x0000: // Control
                this._control.Set(value);
                this._tramAddr.NAMETABLE_X = this._control.NAMETABLE_X;
                this._tramAddr.NAMETABLE_Y = this._control.NAMETABLE_Y;
                break;
            case 0x0001: // Mask
                this._mask.Set(value);
                break;
            case 0x0002: // Status                
                break;
            case 0x0003: // OAM Address
                this._oamAddr = value;
                break;
            case 0x0004: // OAM Data
                let index = Math.floor(this._oamAddr / 4);
                let offset = this._oamAddr % 4;
                this._oam[index].WriteByte(offset, value);
                break;
            case 0x0005: // Scroll
                if (this._addressLatch === 0) {
                    this._fineX = value & 0x07;
                    this._tramAddr.COARSE_X = value >> 3;
                    this._addressLatch = 1;
                }
                else {
                    this._tramAddr.FINE_Y = value & 0x07;
                    this._tramAddr.COARSE_Y = value >> 3;
                    this._addressLatch = 0;
                }
                break;
            case 0x0006: // PPU Address
                if (this._addressLatch === 0) {
                    this._tramAddr.Set(((value & 0x3F) << 8) | (this._tramAddr.Data() & 0x00FF));
                    this._addressLatch = 1;
                }
                else {
                    this._tramAddr.Set((this._tramAddr.Data() & 0xFF00) | value);
                    this._vramAddr.Set(this._tramAddr.Data());
                    this._addressLatch = 0;
                }
                break;
            case 0x0007: // PPU Data
                let d = this._vramAddr.Data();
                this._PpuWrite(d, value);
                this._vramAddr.Set(d + (this._control.INCREMENT_MODE ? 32 : 1));
                break;
        }
        this._status.PREV_WRITE_LSB = (value & 0b00011111);
    }
    GetColor(palette, pixel) {
        return this._palScreen[this._PpuRead(0x3F00 + ((palette << 2)) + pixel) & 0x3F];
    }
    OAM(index, data) {
        let newIndex = Math.floor(index / 4);
        let offset = index % 4;
        this._oam[newIndex].WriteByte(offset, data);
    }
    _PpuRead(address) {
        address &= 0x3FFF;
        let data = this._bus.Read(address);
        if (data === -1) {
            if (address >= 0x0000 && address <= 0x1FFF) {
                data = this._tblPattern[(address & 0x1000) >> 12][address & 0x0FFF];
            }
            else if (address >= 0x2000 && address <= 0x3EFF) {
                address &= 0x0FFF;
                if (address >= 0x0000 && address <= 0x03FF)
                    data = this._tblName[0][address & 0x03FF];
                if (address >= 0x0400 && address <= 0x07FF)
                    data = this._tblName[1][address & 0x03FF];
                if (address >= 0x0800 && address <= 0x0BFF)
                    data = this._tblName[0][address & 0x03FF];
                if (address >= 0x0C00 && address <= 0x0FFF)
                    data = this._tblName[1][address & 0x03FF];
            }
            else if (address >= 0x3F00 && address <= 0x3FFF) {
                address &= 0x001F;
                if (address === 0x0010)
                    address = 0x0000;
                if (address === 0x0014)
                    address = 0x0004;
                if (address === 0x0018)
                    address = 0x0008;
                if (address === 0x001C)
                    address = 0x000C;
                data = this._tblPalette[address] & (this._mask.GRAYSCALE ? 0x30 : 0x3F);
            }
        }
        return data;
    }
    _PpuWrite(address, data) {
        address &= 0x3FFF;
        if (address >= 0x0000 && address <= 0x1FFF) {
            this._tblPattern[(address & 0x1000) >> 12][address & 0x0FFF] = data;
        }
        else if (address >= 0x2000 && address <= 0x3EFF) {
            address &= 0x0FFF;
            if (address >= 0x0000 && address <= 0x03FF)
                this._tblName[0][address & 0x03FF] = data;
            if (address >= 0x0400 && address <= 0x07FF)
                this._tblName[1][address & 0x03FF] = data;
            if (address >= 0x0800 && address <= 0x0BFF)
                this._tblName[0][address & 0x03FF] = data;
            if (address >= 0x0C00 && address <= 0x0FFF)
                this._tblName[1][address & 0x03FF] = data;
        }
        else if (address >= 0x3F00 && address <= 0x3FFF) {
            address &= 0x001F;
            if (address == 0x0010)
                address = 0x0000;
            if (address == 0x0014)
                address = 0x0004;
            if (address == 0x0018)
                address = 0x0008;
            if (address == 0x001C)
                address = 0x000C;
            this._tblPalette[address] = data;
        }
    }
    _DrawPattern(i, palette) {
    }
    _VramAddr() {
        // COARSE_X: number,
        // COARSE_Y: number,
        // NAMETABLE_X: number,
        // NAMETABLE_Y: number,
        // FINE_Y: number
        let b0_4 = this._vramAddr.COARSE_X.toString(2);
        let b5_9 = this._vramAddr.COARSE_Y.toString(2);
        let b10 = this._vramAddr.NAMETABLE_X.toString(2);
        let b11 = this._vramAddr.NAMETABLE_Y.toString(2);
        let b12_14 = this._vramAddr.FINE_Y.toString(2);
        return parseInt(b12_14 + b11 + b10 + b5_9 + b0_4, 2);
    }
    get FrameComplete() {
        return this._frameComplete;
    }
    set FrameComplete(state) {
        this._frameComplete = state;
    }
    get NMI() {
        return this._nmi;
    }
    set NMI(state) {
        this._nmi = state;
    }
}


/***/ }),

/***/ "./static/src/cpu/cpu.ts":
/*!*******************************!*\
  !*** ./static/src/cpu/cpu.ts ***!
  \*******************************/
/*! exports provided: CPU */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CPU", function() { return CPU; });
/* harmony import */ var _component_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component/component */ "./static/src/component/component.ts");

class CPU extends _component_component__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(bus) {
        super();
        this._bus = bus;
        this._registers = [];
    }
    Update() {
    }
    Pulse(clkCount, logger) {
    }
    Read(address) {
        return 0x00;
    }
    Write(address, value) {
    }
    Register(index) {
        return this._registers[index];
    }
    Registers() {
        return this._registers;
    }
    TestStatus(value, index) {
    }
}


/***/ }),

/***/ "./static/src/data/bitset.ts":
/*!***********************************!*\
  !*** ./static/src/data/bitset.ts ***!
  \***********************************/
/*! exports provided: Bitset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bitset", function() { return Bitset; });
class Bitset {
    constructor(size) {
        this._bits = [];
        this._size = size;
        for (let i = 0; i < size; i++) {
            this._bits[i] = 0;
        }
    }
    SetLow(value) {
        let bits = new Bitset(8);
        bits.Set(value);
        for (let i = 0; i < this._size / 2; i++) {
            this._bits[i] = bits.GetBit(i);
        }
    }
    SetHigh(value) {
        let bits = new Bitset(8);
        bits.Set(value);
        for (let i = this._size / 2; i < this._size; i++) {
            this._bits[i] = bits.GetBit(i - this._size / 2);
        }
    }
    SetBit(index, val) {
        if (index < 0 || index > this._size - 1) {
            console.log(`SetBit: Index ${index} Out of bounds`);
        }
        this._bits[index] = val;
    }
    Data() {
        return this._bits;
    }
    FromBitset(bitset) {
        for (let i = 0; i < this._size; i++) {
            this._bits[i] = bitset.GetBit(i);
        }
    }
    Set(decimal) {
        let bitStr = (decimal).toString(2).split("").reverse().join("");
        for (let i = this._size - 1; i >= 0; i--) {
            if (i < this._size - bitStr.length)
                this._bits[i] = 0;
            else
                this._bits[i] = parseInt(bitStr[this._size - i - 1]);
        }
    }
    GetBit(index) {
        return this._bits[index];
    }
    AsDecimal() {
        let bitStr = "";
        for (let i = 0; i < this._size; i++) {
            bitStr = bitStr.concat(this._bits[i].toString());
        }
        return parseInt(bitStr, 2);
    }
}


/***/ }),

/***/ "./static/src/data/bus.ts":
/*!********************************!*\
  !*** ./static/src/data/bus.ts ***!
  \********************************/
/*! exports provided: Bus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bus", function() { return Bus; });
class Bus {
    constructor() {
        this._connections = [];
    }
    Write(address, value, rdOnly = false) {
        for (let connection of this._connections) {
            if (address >= connection.addrMin && address <= connection.addrMax) {
                connection.component.Write(address, value, rdOnly);
                return;
            }
        }
    }
    Read(address, rdOnly = false) {
        for (let connection of this._connections) {
            if (address >= connection.addrMin && address <= connection.addrMax) {
                return connection.component.Read(address, true);
            }
        }
        return -1;
    }
    Connect(component, addrMin, addrMax, mirrorLength) {
        this._connections.push({
            component: component,
            addrMin: addrMin,
            addrMax: addrMax
        });
    }
}


/***/ }),

/***/ "./static/src/data/ines.ts":
/*!*********************************!*\
  !*** ./static/src/data/ines.ts ***!
  \*********************************/
/*! exports provided: INesLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INesLoader", function() { return INesLoader; });
class INesLoader {
    constructor() {
    }
    LoadAsync(src, callback) {
        fetch(src).then((response) => {
            response.arrayBuffer().then((buffer) => {
                let bytes = new Uint8Array(buffer);
                callback(bytes);
            });
        });
    }
}


/***/ }),

/***/ "./static/src/data/mapper_000.ts":
/*!***************************************!*\
  !*** ./static/src/data/mapper_000.ts ***!
  \***************************************/
/*! exports provided: Mapper000 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mapper000", function() { return Mapper000; });
/* harmony import */ var _memory_mapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memory_mapper */ "./static/src/data/memory_mapper.ts");

class Mapper000 extends _memory_mapper__WEBPACK_IMPORTED_MODULE_0__["Mapper"] {
    constructor(nPrgBanks, nChrBanks) {
        super();
        this._nPrgBanks = nPrgBanks;
        this._nChrBanks = nChrBanks;
    }
    MapRead(addr) {
        let mapped = -1;
        if (addr >= 0x0000 && addr <= 0x1FFF) {
            mapped = addr;
        }
        if (addr >= 0x8000 && addr <= 0xFFFF) {
            mapped = addr & (this._nPrgBanks > 1 ? 0x7FFF : 0x3FFF);
        }
        return mapped;
    }
    MapWrite(addr) {
        //add cart RAM option
        let mapped = -1;
        if (addr >= 0x8000 && addr <= 0xFFFF) {
            mapped = addr & (this._nPrgBanks > 1 ? 0x7FFF : 0x3FFF);
        }
        return mapped;
    }
}


/***/ }),

/***/ "./static/src/data/memory_mapper.ts":
/*!******************************************!*\
  !*** ./static/src/data/memory_mapper.ts ***!
  \******************************************/
/*! exports provided: Mapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Mapper", function() { return Mapper; });
class Mapper {
}


/***/ }),

/***/ "./static/src/data/pixel.ts":
/*!**********************************!*\
  !*** ./static/src/data/pixel.ts ***!
  \**********************************/
/*! exports provided: Pixel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pixel", function() { return Pixel; });
class Pixel {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
}


/***/ }),

/***/ "./static/src/data/register.ts":
/*!*************************************!*\
  !*** ./static/src/data/register.ts ***!
  \*************************************/
/*! exports provided: Register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Register", function() { return Register; });
/* harmony import */ var _bitset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bitset */ "./static/src/data/bitset.ts");

class Register_old {
    constructor(size) {
        this._bits = new _bitset__WEBPACK_IMPORTED_MODULE_0__["Bitset"](size);
        this._size = size;
    }
    Read() {
        return this._bits.AsDecimal();
    }
    Increment() {
        return this.Add(1);
    }
    Decrement() {
        let dec = this._bits.AsDecimal();
        this._bits.Set(--dec);
    }
    Add(n) {
        let result = new _bitset__WEBPACK_IMPORTED_MODULE_0__["Bitset"](this._size);
        let other = new _bitset__WEBPACK_IMPORTED_MODULE_0__["Bitset"](this._size);
        let carry = 0;
        other.Set(n);
        for (let i = this._size - 1; i >= 0; i--) {
            if (i === this._size - 1) {
                result.SetBit(i, this._bits.GetBit(i) ^ (other.GetBit(i)));
                carry = this._bits.GetBit(i) & other.GetBit(i);
            }
            else {
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
    Or(bits) {
        for (let i = 0; i < this._size; i++) {
            this._bits[i] |= bits[i];
        }
    }
    Zero() {
        this._bits.Set(0);
    }
    get data() {
        return this._bits;
    }
}
class Register {
    constructor(length, name) {
        this._data = 0;
        this._length = length;
        this._name = name;
        this._mask = ((Math.pow(2, this._length)) - 1);
    }
    Write(value) {
        this._data = value & this._mask;
    }
    Read() {
        return this._data;
    }
    ChangeBit(index, value) {
        if (value === 1) {
            this._data |= 1 << index;
        }
        else {
            this._data &= ~(1 << index);
        }
    }
    Bit(index) {
        return (this._data & (1 << index)) >> index;
    }
    Set(index) {
        this._data |= 1 << index;
    }
    Clear(index) {
        this._data &= ~(1 << index);
    }
    Flip(index) {
        this._data ^= 1 << index;
    }
    Name() {
        return this._name;
    }
}


/***/ }),

/***/ "./static/src/debug/disassembler.ts":
/*!******************************************!*\
  !*** ./static/src/debug/disassembler.ts ***!
  \******************************************/
/*! exports provided: Disassembler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Disassembler", function() { return Disassembler; });
/* harmony import */ var _cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cpu/6502/cpu_6502 */ "./static/src/cpu/6502/cpu_6502.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../input */ "./static/src/input.ts");


var ERowType;
(function (ERowType) {
    ERowType[ERowType["INSTRUCTION"] = 0] = "INSTRUCTION";
    ERowType[ERowType["UNI_START"] = 1] = "UNI_START";
    ERowType[ERowType["UNI_MID"] = 2] = "UNI_MID";
    ERowType[ERowType["UNI_END"] = 3] = "UNI_END";
})(ERowType || (ERowType = {}));
class Disassembler {
    constructor(canvas) {
        this._branchOps = [
            "BCC",
            "BCS",
            "BEQ",
            "BMI",
            "BNE",
            "BPL",
            "BVC",
            "BVS",
            "JMP",
            "JSR"
        ];
        this._canvas = canvas;
        this._data = [];
        this._rows = [];
        this._rowHeight = 32;
        this._scroll = 0;
        this._location = 0;
        this._tblWidth = 512;
        this._tblHeight = 1024;
        this._hover = -1;
        this._registersX = this._tblWidth + 16;
        this._registersWidth = 256;
        this._statusY = 256;
        this._stackY = 340;
        this._paletteY = 400;
        this._enabled = false;
        this._breakpoints = [];
    }
    Run(from, bus, cpu) {
        this._Traverse(from, bus, cpu);
        //this._Traverse(0xF4ED, bus, cpu);
        this._Fill(0xFFFF, bus, cpu);
        this._Process();
    }
    Draw(cpu, bus, ppu, ppuBus, context) {
        if (this._enabled) {
            this._DrawDis(context);
            this._DrawRegisters(cpu, context);
            this._DrawStatus(cpu.Register(_cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_0__["ERegisters"].STATUS), context);
            this._DrawStack(cpu, bus, context);
            this._DrawPalette(ppu, ppuBus, context);
            this._DrawLocation(context);
        }
    }
    Update() {
        if (this._enabled) {
            let mx = _input__WEBPACK_IMPORTED_MODULE_1__["Input"].Mouse().x - this._canvas.getBoundingClientRect().x;
            let my = _input__WEBPACK_IMPORTED_MODULE_1__["Input"].Mouse().y - this._canvas.getBoundingClientRect().y;
            if (mx > 0 && my > 0 && mx < this._tblWidth && my < this._tblHeight) {
                let delta = _input__WEBPACK_IMPORTED_MODULE_1__["Input"].Mouse().mDelta;
                this._scroll += delta;
                this._hover = Math.floor(my / this._rowHeight);
                if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].Mouse().mLeft) {
                    let rowIndex = this._hover + this._scroll;
                    let row = this._rows[rowIndex];
                    this._breakpoints.push({
                        row: rowIndex,
                        address: row.address
                    });
                }
                else if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].Mouse().mRight) {
                    let rowIndex = this._hover + this._scroll;
                    let row = this._rows[rowIndex];
                    if (row) {
                        this._breakpoints = this._breakpoints.filter((bp) => { if (bp.address !== row.address)
                            return bp; });
                    }
                }
            }
            else {
                this._hover = -1;
            }
            if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].IsKeyPress(_input__WEBPACK_IMPORTED_MODULE_1__["EKey"].PG_DOWN)) {
                this._scroll += 0x0010;
            }
            if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].IsKeyPress(_input__WEBPACK_IMPORTED_MODULE_1__["EKey"].PG_UP)) {
                this._scroll -= 0x0010;
            }
            if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].IsKeyPress(_input__WEBPACK_IMPORTED_MODULE_1__["EKey"].F_5)) {
                this._system.TogglePausePlayer();
            }
            if (_input__WEBPACK_IMPORTED_MODULE_1__["Input"].IsKeyPress(_input__WEBPACK_IMPORTED_MODULE_1__["EKey"].F_8)) {
                this._system.Step();
                if (this._location < this._scroll || this._location > this._scroll + 1024 / this._rowHeight)
                    this._scroll = this._location;
            }
            if (this._scroll < 0)
                this._scroll = 0;
            if (this._scroll > this._data.length)
                this._scroll = this._data.length;
        }
    }
    BreakpointCheck(address) {
        if (this._enabled) {
            for (let i = 0; i < this._breakpoints.length; i++) {
                if (address === this._breakpoints[i].address) {
                    return true;
                }
            }
            return false;
        }
    }
    ScrollTo(address) {
        if (this._enabled) {
            this._scroll = this._FindRow(address);
        }
    }
    SetLocation(address, bus, cpu) {
        if (this._enabled) {
            this._location = this._FindRow(address);
            if (this._location === -1) {
                this._Traverse(address, bus, cpu);
                this._rows = [];
                this._Process();
            }
        }
    }
    _FindRow(address) {
        for (let i = 0; i < this._rows.length; i++) {
            if (this._rows[i].address === address) {
                return i;
            }
        }
        return -1;
    }
    _DrawStack(cpu, bus, context) {
        let spStart = 0x0100 + cpu.Register(_cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_0__["ERegisters"].SP).Read() + 1;
        let spEnd = 0x01FF;
        for (let i = spStart; i <= spEnd; i++) {
            context.fillText(this._ToHex(bus.Read(i, true), 2), this._registersX, this._stackY + (i - spStart) * this._rowHeight);
        }
    }
    _DrawPalette(ppu, bus, context) {
        let swatchSize = 16;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let c = ppu.GetColor(i, j);
                context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
                context.fillRect(this._registersX + 128 + j * swatchSize, this._paletteY + i * swatchSize, swatchSize, swatchSize);
            }
        }
        let selectedPalette = 0;
        let selectedPattern = 0;
        for (let nTileY = 0; nTileY < 16; nTileY++) {
            for (let nTileX = 0; nTileX < 16; nTileX++) {
                let nOffset = nTileY * 256 + nTileX * 16;
                for (let row = 0; row < 8; row++) {
                    let tileLsb = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0000, true);
                    let tileMsb = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0008, true);
                    for (let col = 0; col < 8; col++) {
                        let rawPixel = (tileLsb & 0x01) + (tileMsb & 0x01);
                        tileLsb >>>= 1;
                        tileMsb >>>= 1;
                        let c = ppu.GetColor(selectedPalette, rawPixel);
                        context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
                        context.fillRect(this._registersX + 128 + ((nTileX * 8 + (7 - col)) * 2), this._paletteY + 80 + ((nTileY * 8 + row) * 2), 2, 2);
                    }
                }
            }
        }
        // selectedPalette = 1;
        // selectedPattern = 1;
        // for(let nTileY = 0; nTileY < 16; nTileY++) {
        //     for(let nTileX = 0; nTileX < 16; nTileX++) {
        //         let nOffset = nTileY * 256 + nTileX * 16;
        //         for(let row = 0; row < 8; row++) {
        //             let tileLsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0000);
        //             let tileMsb: number = bus.Read(selectedPattern * 0x1000 + nOffset + row + 0x0008);
        //             for(let col = 0; col < 8; col++) {
        //                 let rawPixel = (tileLsb & 0x01) + (tileMsb & 0x01);
        //                 tileLsb >>>= 1;
        //                 tileMsb >>>= 1;
        //                 let c: Pixel = ppu.GetColor(selectedPalette, rawPixel);
        //                 context.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
        //                 context.fillRect(this._registersX + 300 + ((nTileX * 8 + (7-col)) * 8), this._paletteY + 80 + ((nTileY * 8 + row) * 8), 8, 8);
        //             }
        //         }
        //     }
        // }
    }
    _DrawStatus(register, context) {
        let names = "N V . B D I Z C";
        let bits = "";
        for (let i = 7; i >= 0; i--) {
            bits += register.Bit(i).toString() + " ";
        }
        context.fillText(names, this._registersX, this._statusY);
        context.fillText(bits, this._registersX, this._statusY + this._rowHeight);
    }
    _DrawDis(context) {
        context.fillStyle = "#36454F";
        context.fillRect(0, 0, this._tblWidth + this._registersWidth + 1200, this._tblHeight);
        let count = 1024 / this._rowHeight;
        context.font = "20px monospace";
        context.fillStyle = "white";
        for (let i = this._scroll; i < Math.min(this._scroll + count, this._rows.length); i++) {
            let r = this._rows[i];
            this._DrawRow(i - this._scroll, r, context);
        }
        for (let i = 0; i < this._breakpoints.length; i++) {
            this._DrawBreakpoint(this._breakpoints[i].row, context);
        }
    }
    _DrawLocation(context) {
        let y = this._location * this._rowHeight + this._rowHeight / 2 - (this._scroll * this._rowHeight);
        context.fillRect(12, y + 5, 8, 8);
    }
    _DrawBreakpoint(row, context) {
        let y = row * this._rowHeight + this._rowHeight / 2 - (this._scroll * this._rowHeight);
        context.fillStyle = "red";
        context.fillRect(10, y + 3, 12, 12);
        context.fillStyle = "white";
    }
    _DrawRow(index, row, context) {
        let rStartX = 32;
        let lStartX = 72 + rStartX;
        let lWidth = 100;
        let lHeight = 4;
        let tStartX = lStartX + lWidth + 4;
        let tWidth = context.measureText("UNIDENTIFIED").width;
        let rLStartX = tStartX + tWidth + 4;
        if (index == this._hover) {
            context.fillStyle = "gray";
            context.fillRect(rStartX, index * this._rowHeight + 4, this._tblWidth - rStartX * 2, this._rowHeight);
            context.fillStyle = "white";
        }
        switch (row.type) {
            case ERowType.UNI_START: {
                let lineY = index * this._rowHeight + this._rowHeight / 2 + 8;
                context.fillText(this._ToHex(row.address, 4), rStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(lStartX, lineY, lWidth, lHeight);
                context.fillText("UNIDENTIFIED", tStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(rLStartX, lineY, lWidth, lHeight);
                break;
            }
            case ERowType.UNI_MID: {
                context.fillText("....", 512 / 2 - 28, this._rowHeight * index + this._rowHeight);
                break;
            }
            case ERowType.UNI_END: {
                let lineY = index * this._rowHeight + this._rowHeight / 2 + 8;
                context.fillText(this._ToHex(row.address, 4), rStartX, this._rowHeight * index + this._rowHeight);
                context.fillRect(lStartX, lineY, lWidth * 2 + tWidth + 8, 4);
                break;
            }
            case ERowType.INSTRUCTION: {
                context.fillText(row.text, rStartX, this._rowHeight * index + this._rowHeight);
                break;
            }
        }
    }
    _DrawRegisters(cpu, context) {
        let registers = cpu.Registers();
        for (let i = 0; i < registers.length; i++) {
            this._DrawRegister(registers[i], i, context);
        }
        let text = `Cycles : ${cpu.Cycles()}`;
        context.fillText(text, this._registersX, registers.length * this._rowHeight + 32);
    }
    _DrawRegister(register, row, context) {
        let text = `${register.Name()} : ${this._ToHex(register.Read(), 2)}`;
        context.fillText(text, this._registersX, row * this._rowHeight + 32);
    }
    _Traverse(from, bus, cpu) {
        let offset = 0;
        while (true) {
            if (this._data[from + offset] !== undefined) {
                if (this._data[from + offset].instruction !== null)
                    break;
            }
            let d = bus.Read(from + offset, true);
            let ins = cpu.InstructionLookup(d);
            if (ins) {
                let ops = cpu.OperandLookup(from + offset + 1, ins);
                let data = {
                    instruction: ins,
                    address: from + offset,
                    ops: ops
                };
                this._data[from + offset] = data;
                if (this._branchOps.find(test => test === ins.mnem) !== undefined) {
                    let addr = 0;
                    if (ins.bytes === 3) {
                        addr = (ops[1] << 8) | ops[0];
                    }
                    else {
                        addr = ops[0];
                    }
                    this._Traverse(addr, bus, cpu);
                }
                if (ins.mnem === "JMP" || ins.mnem === "RTS" || ins.mnem === "RTI")
                    break;
                offset += ins.bytes - 1;
            }
            else {
                console.log(`UNDEFINED OP 0x${d.toString(16).toUpperCase()} at 0x${(from + offset).toString(16).toUpperCase()}`);
                break;
            }
            offset++;
        }
    }
    _Fill(to, bus, cpu) {
        for (let i = 0; i < to; i++) {
            if (this._data[i])
                continue;
            let d = bus.Read(i, true);
            this._data[i] = {
                address: i,
                instruction: null,
                ops: []
            };
        }
    }
    _Process() {
        let unidentified = false;
        let continued = false;
        for (let i = 0; i < this._data.length; i++) {
            let d = this._data[i];
            if (!d)
                continue;
            let ins = d.instruction;
            if (ins) {
                if (unidentified) {
                    this._rows.push({
                        text: "",
                        address: i - 1,
                        type: ERowType.UNI_END
                    });
                }
                let text = `${this._ToHex(i, 4)} ${ins.mnem}`;
                for (let j = 0; j < d.ops.length; j++) {
                    text += " " + this._ToHex(d.ops[j], 2);
                }
                this._rows.push({
                    text: text,
                    address: i,
                    type: ERowType.INSTRUCTION
                });
                i += ins.bytes - 1;
                unidentified = false;
                continued = false;
            }
            else if (!unidentified) {
                this._rows.push({
                    text: "",
                    address: i,
                    type: ERowType.UNI_START
                });
                unidentified = true;
            }
            else if (!continued) {
                this._rows.push({
                    text: "",
                    address: i,
                    type: ERowType.UNI_MID
                });
                continued = true;
            }
        }
    }
    _ToHex(number, length) {
        var str = '' + number.toString(16);
        while (str.length < length) {
            str = '0' + str;
        }
        return "0x" + str.toUpperCase();
    }
    set System(system) {
        this._system = system;
    }
}


/***/ }),

/***/ "./static/src/debug/logger.ts":
/*!************************************!*\
  !*** ./static/src/debug/logger.ts ***!
  \************************************/
/*! exports provided: Logger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logger", function() { return Logger; });
class Logger {
    WriteLine(text) {
        if (text.length === 0)
            return;
        this._log += text;
        this._log += '\r\n';
    }
    Save() {
        let el = document.createElement("a");
        el.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(this._log));
        el.setAttribute("download", "log_" + Date.now());
        el.style.display = "none";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }
}


/***/ }),

/***/ "./static/src/entry.ts":
/*!*****************************!*\
  !*** ./static/src/entry.ts ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ "./static/src/app.ts");

let app = new _app__WEBPACK_IMPORTED_MODULE_0__["App"]();
app.Initiate();
app.Run();


/***/ }),

/***/ "./static/src/gui/gui.ts":
/*!*******************************!*\
  !*** ./static/src/gui/gui.ts ***!
  \*******************************/
/*! exports provided: GUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUI", function() { return GUI; });
/* harmony import */ var _debug_disassembler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../debug/disassembler */ "./static/src/debug/disassembler.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../input */ "./static/src/input.ts");


class GUI {
    constructor() {
        this._canvas = document.getElementById("debugger");
        this._context = this._canvas.getContext('2d');
        this._dis = new _debug_disassembler__WEBPACK_IMPORTED_MODULE_0__["Disassembler"](this._canvas);
    }
    Update() {
        this._dis.Update();
        _input__WEBPACK_IMPORTED_MODULE_1__["Input"].Reset();
    }
    Draw(cpu, bus, ppu, ppuBus) {
        this._dis.Draw(cpu, bus, ppu, ppuBus, this._context);
    }
    get Disassembler() {
        return this._dis;
    }
}


/***/ }),

/***/ "./static/src/input.ts":
/*!*****************************!*\
  !*** ./static/src/input.ts ***!
  \*****************************/
/*! exports provided: EKey, Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EKey", function() { return EKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
var EKey;
(function (EKey) {
    EKey[EKey["UP"] = 87] = "UP";
    EKey[EKey["DOWN"] = 83] = "DOWN";
    EKey[EKey["LEFT"] = 65] = "LEFT";
    EKey[EKey["RIGHT"] = 68] = "RIGHT";
    EKey[EKey["SHIFT"] = 16] = "SHIFT";
    EKey[EKey["ENTER"] = 13] = "ENTER";
    EKey[EKey["M"] = 77] = "M";
    EKey[EKey["K"] = 75] = "K";
    EKey[EKey["N_1"] = 49] = "N_1";
    EKey[EKey["N_2"] = 50] = "N_2";
    EKey[EKey["N_3"] = 51] = "N_3";
    EKey[EKey["PG_DOWN"] = 34] = "PG_DOWN";
    EKey[EKey["PG_UP"] = 33] = "PG_UP";
    EKey[EKey["F_5"] = 116] = "F_5";
    EKey[EKey["F_8"] = 119] = "F_8";
})(EKey || (EKey = {}));
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
    if (ev.button === 0) {
        Input._mLeft = true;
    }
    else {
        Input._mRight = true;
    }
});
window.addEventListener("mouseup", (ev) => {
    if (ev.button === 0) {
        Input._mLeft = false;
    }
    else {
        Input._mRight = false;
    }
});
window.addEventListener("contextmenu", (ev) => {
    ev.preventDefault();
    return false;
});
class Input {
    static Reset() {
        Input._mLeft = false;
        Input._mDelta = 0;
        for (let i = 0; i < this._keys.length; i++) {
            if (this._keys[i] === 2)
                this._keys[i] = 1;
        }
    }
    static IsKeyDown(keyCode) {
        return Input._keys[keyCode] === 1;
    }
    static IsKeyPress(keyCode) {
        return Input._keys[keyCode] === 2;
    }
    static Mouse() {
        let delta = 0;
        if (Input._mDelta > 0)
            delta = 1;
        if (Input._mDelta < 0)
            delta = -1;
        return {
            x: Input._mx || 0,
            y: Input._my || 0,
            mLeft: Input._mLeft || false,
            mRight: Input._mRight || false,
            mDelta: delta
        };
    }
}
Input._keys = [];
;


/***/ }),

/***/ "./static/src/instructions/instruction_set.ts":
/*!****************************************************!*\
  !*** ./static/src/instructions/instruction_set.ts ***!
  \****************************************************/
/*! exports provided: InstructionSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstructionSet", function() { return InstructionSet; });
class InstructionSet {
    constructor(cpu, bus, alu) {
        this._instructions = [];
        this._cpu = cpu;
        this._bus = bus;
        this._alu = alu;
    }
    Lookup(opcode) {
        return this._instructions[opcode];
    }
    _LogNotImplemented(op, code) {
        throw (`${op.mnem}(${code.toString(16)}) NOT IMPLEMENTED`);
    }
}


/***/ }),

/***/ "./static/src/system.ts":
/*!******************************!*\
  !*** ./static/src/system.ts ***!
  \******************************/
/*! exports provided: System */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* harmony import */ var _component_clock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component/clock */ "./static/src/component/clock.ts");
/* harmony import */ var _component_oscilloscope__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component/oscilloscope */ "./static/src/component/oscilloscope.ts");
/* harmony import */ var _cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cpu/6502/cpu_6502 */ "./static/src/cpu/6502/cpu_6502.ts");
/* harmony import */ var _data_bus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/bus */ "./static/src/data/bus.ts");
/* harmony import */ var _component_ram__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./component/ram */ "./static/src/component/ram.ts");
/* harmony import */ var _data_ines__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data/ines */ "./static/src/data/ines.ts");
/* harmony import */ var _component_cartridge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./component/cartridge */ "./static/src/component/cartridge.ts");
/* harmony import */ var _cpu_6502_ppu__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cpu/6502/ppu */ "./static/src/cpu/6502/ppu.ts");
/* harmony import */ var _gui_gui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gui/gui */ "./static/src/gui/gui.ts");
/* harmony import */ var _debug_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./debug/logger */ "./static/src/debug/logger.ts");
/* harmony import */ var _component_dma__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./component/dma */ "./static/src/component/dma.ts");











class System {
    constructor() {
        this._components = [];
        this._clock = new _component_clock__WEBPACK_IMPORTED_MODULE_0__["Clock"](3000000);
        this._running = false;
        this._step = false;
        this._gui = new _gui_gui__WEBPACK_IMPORTED_MODULE_8__["GUI"]();
        this._tickCount = 0;
        this._log = new _debug_logger__WEBPACK_IMPORTED_MODULE_9__["Logger"]();
        this._tickTimer = 0;
        this._tickCount = 0;
        this._tickCounter = 0;
        this._lastFrame = 0;
        let loader = new _data_ines__WEBPACK_IMPORTED_MODULE_5__["INesLoader"]();
        loader.LoadAsync("\\rom\\smb.nes", (data) => {
            let cart = new _component_cartridge__WEBPACK_IMPORTED_MODULE_6__["Cartridge"](data);
            this._cpuBus = new _data_bus__WEBPACK_IMPORTED_MODULE_3__["Bus"]();
            this._ppuBus = new _data_bus__WEBPACK_IMPORTED_MODULE_3__["Bus"]();
            let oscilloscope = new _component_oscilloscope__WEBPACK_IMPORTED_MODULE_1__["Oscilliscope"]();
            let ram = new _component_ram__WEBPACK_IMPORTED_MODULE_4__["RAM"](8192);
            this._ppu = new _cpu_6502_ppu__WEBPACK_IMPORTED_MODULE_7__["PPU"](this._ppuBus);
            this._dma = new _component_dma__WEBPACK_IMPORTED_MODULE_10__["DMA"](this._cpuBus, this._ppu);
            this._cpu = new _cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_2__["CPU_6502"](this._cpuBus, this._dma);
            //this._components.push(oscilloscope);
            //this._components.push(ram);
            this._components.push(this._cpu);
            this._components.push(this._ppu);
            this._components.push(this._dma);
            //this._cpuBus.Connect(cpu, -1, -1);
            this._cpuBus.Connect(ram, 0x0000, 0x1FFF);
            this._cpuBus.Connect(this._ppu, 0x2000, 0x3FFF);
            this._cpuBus.Connect(this._dma, 0x4014, 0x4019);
            this._cpuBus.Connect(cart, 0x8000, 0xFFFF);
            this._ppuBus.Connect(cart, 0x0000, 0xFFFF);
            this._running = true;
            //this._ppuBus.Connect(cart.ChrRom(), 0x0000, 0x1FFF);
            this._cpu.Reset();
            this._gui.Disassembler.System = this;
            this._gui.Disassembler.Run(this._cpu.Register(_cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_2__["ERegisters"].PC).Read(), this._cpuBus, this._cpu);
            this._gui.Disassembler.ScrollTo(this._cpu.Register(_cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_2__["ERegisters"].PC).Read());
        });
        let btn = document.getElementById("save_log");
        btn.onclick = () => {
            this._log.Save();
        };
    }
    Update() {
        if (this._ppu) {
            if (this._ppu.FrameComplete) {
                this._ppu.FrameComplete = false;
                return;
            }
        }
        for (let component of this._components) {
            component.Update();
        }
        if (this._running || this._step) {
            if (!this._step) {
                let pulses = this._clock.Oscillate();
                for (let i = 0; i < pulses; i++) {
                    if (this._tickCount % 3 === 0) {
                        this._cpu.Pulse(this._tickCount, this._log);
                    }
                    this._ppu.Pulse();
                    this._dma.Pulse(this._tickCount);
                    // for(let component of this._components) {
                    //     if(this._tickCount % component.ClockDivide === 0) {
                    //         component.Pulse(this._tickCount, this._log);
                    //     }
                    // }                    
                    if (this._ppu.NMI) {
                        this._cpu.Nmi();
                        this._ppu.NMI = false;
                    }
                    // if(this._gui.Disassembler.BreakpointCheck(this._cpu.Register(ERegisters.PC).Read())) {
                    //     this._running = false;
                    //     break;
                    // }
                    this._tickCount++;
                    this._tickCounter++;
                }
            }
            else {
                for (let component of this._components) {
                    component.Pulse(this._tickCount, this._log);
                }
            }
            this._step = false;
        }
        if (this._components.length > 0) {
            this._gui.Disassembler.SetLocation(this._cpu.Register(_cpu_6502_cpu_6502__WEBPACK_IMPORTED_MODULE_2__["ERegisters"].PC).Read(), this._cpuBus, this._cpu);
            this._gui.Update();
        }
        let now = performance.now();
        let delta = now - this._lastFrame;
        this._lastFrame = now;
        if (delta > 100) {
            console.log("This update took: " + delta + "ms");
        }
        this._tickTimer += delta;
        if (this._tickTimer >= 1000) {
            this._tickTimer = 0;
            console.log("TPS: " + this._tickCounter);
            this._tickCounter = 0;
        }
    }
    Draw() {
        if (this._components[1]) {
            this._gui.Draw(this._cpu, this._cpuBus, this._ppu, this._ppuBus);
        }
    }
    Pause() {
        this._running = false;
    }
    TogglePausePlayer() {
        this._running = !this._running;
    }
    Start() {
        this._running = true;
    }
    Step() {
        console.log("Stepping");
        this._step = true;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9hbHUvYWx1LnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvYXBwLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvY29tcG9uZW50L2NhcnRyaWRnZS50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2NvbXBvbmVudC9jbG9jay50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2NvbXBvbmVudC9jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jb21wb25lbnQvZG1hLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvY29tcG9uZW50L29zY2lsbG9zY29wZS50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2NvbXBvbmVudC9yYW0udHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jb21wb25lbnQvcm9tLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvY3B1LzY1MDIvY3B1XzY1MDIudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jcHUvNjUwMi9jcHVfNjUwMl9hbHUudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jcHUvNjUwMi9jcHVfNjUwMl9pbnN0cnVjdGlvbnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jcHUvNjUwMi9wcHUudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9jcHUvY3B1LnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvZGF0YS9iaXRzZXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9kYXRhL2J1cy50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2RhdGEvaW5lcy50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2RhdGEvbWFwcGVyXzAwMC50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2RhdGEvbWVtb3J5X21hcHBlci50cyIsIndlYnBhY2s6Ly8vLi9zdGF0aWMvc3JjL2RhdGEvcGl4ZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9kYXRhL3JlZ2lzdGVyLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvZGVidWcvZGlzYXNzZW1ibGVyLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvZGVidWcvbG9nZ2VyLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvZW50cnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9ndWkvZ3VpLnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvaW5wdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3NyYy9pbnN0cnVjdGlvbnMvaW5zdHJ1Y3Rpb25fc2V0LnRzIiwid2VicGFjazovLy8uL3N0YXRpYy9zcmMvc3lzdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5RUE7QUFBQTtBQUFP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R0FBRyxNQUFNLENBQUMsQ0FBQztRQUM1RyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDdkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTFFLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFckMs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Q0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUzQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLGlEQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksaURBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxpREFBSyxDQUFDLEdB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QyxvQkFBb0IsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDcEQ7UUFHRCxJQUFJLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQztRQUd6QixJQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN6QjtJQUVMLENBQUM7SUFFTSxJQUFJO1FBQ1AsSUFBYyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNwRTtJQUNMLENBQUM7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVNLGlCQUFpQjtRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRU0sS0FBSztRQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxJQUFJO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0NBMkNKIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3RhdGljL3NyYy9lbnRyeS50c1wiKTtcbiIsIlxyXG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gXCIuLi9kYXRhL3JlZ2lzdGVyXCI7XHJcbmltcG9ydCB7IENQVSB9IGZyb20gXCIuLi9jcHUvY3B1XCI7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQUxVIHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2NwdTogQ1BVXHJcblxyXG4gICAgY29uc3RydWN0b3IoY3B1OiBDUFUpIHtcclxuICAgICAgICB0aGlzLl9jcHUgPSBjcHU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IEFkZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlcjtcclxuXHJcbn0iLCJpbXBvcnQgeyBTdG9wd2F0Y2ggfSBmcm9tIFwiLi9tZXRyaWMvc3RvcHdhdGNoXCI7XHJcbmltcG9ydCB7IFRpbWVyIH0gZnJvbSBcIi4vbWV0cmljL3RpbWVyXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudC9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2xvY2sgfSBmcm9tIFwiLi9jb21wb25lbnQvY2xvY2tcIjtcclxuaW1wb3J0IHsgT3NjaWxsaXNjb3BlIH0gZnJvbSBcIi4vY29tcG9uZW50L29zY2lsbG9zY29wZVwiO1xyXG5pbXBvcnQgeyBCaXRzZXQgfSBmcm9tIFwiLi9kYXRhL2JpdHNldFwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gXCIuL2RhdGEvcmVnaXN0ZXJcIjtcclxuaW1wb3J0IHsgU3lzdGVtIH0gZnJvbSBcIi4vc3lzdGVtXCI7XHJcbmltcG9ydCB7IEdVSSB9IGZyb20gXCIuL2d1aS9ndWlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG5cclxuICAgIHByaXZhdGUgX2ZyYW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2ZyYW1lRGVsdGE6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2ZyYW1lTGFzdFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9tb3RoZXJib2FyZDogU3lzdGVtO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgeyAgIFxyXG4gICAgICAgIHRoaXMuX21vdGhlcmJvYXJkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9mcmFtZUNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9mcmFtZURlbHRhID0gMDtcclxuICAgICAgICB0aGlzLl9mcmFtZUxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXRpYXRlKCkge1xyXG4gICAgICAgIHRoaXMuX21vdGhlcmJvYXJkID0gbmV3IFN5c3RlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSdW4oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMuX2ZyYW1lTGFzdFRpbWU7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVDb3VudCsrO1xyXG4gICAgICAgIHRoaXMuX2ZyYW1lRGVsdGEgKz0gZGVsdGE7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVMYXN0VGltZSA9IG5vdztcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZnJhbWVEZWx0YSA+IDEwMDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGUFM6IFwiICsgdGhpcy5fZnJhbWVDb3VudCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9mcmFtZURlbHRhID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX1RpY2soKTtcclxuICAgICAgICB0aGlzLl9EcmF3KCk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7dGhpcy5SdW4oKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9UaWNrKCkge1xyXG4gICAgICAgIHRoaXMuX21vdGhlcmJvYXJkLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0RyYXcoKSB7XHJcbiAgICAgICAgdGhpcy5fbW90aGVyYm9hcmQuRHJhdygpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE1hcHBlcjAwMCB9IGZyb20gXCIuLi9kYXRhL21hcHBlcl8wMDBcIjtcclxuaW1wb3J0IHsgTWFwcGVyIH0gZnJvbSBcIi4uL2RhdGEvbWVtb3J5X21hcHBlclwiO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuaW1wb3J0IHtST019IGZyb20gXCIuL3JvbVwiXHJcblxyXG5leHBvcnQgY2xhc3MgQ2FydHJpZGdlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY29uc3RhbnQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3ByZ1NpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2NoclNpemU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmdTdGFydDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY2hyU3RhcnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9wcmdDaHVua1NpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2NockNodW5rU2l6ZTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3ByZ1JvbTogUk9NO1xyXG4gICAgcHJpdmF0ZSBfY2hyUm9tOiBST007XHJcblxyXG4gICAgcHJpdmF0ZSBfbWFwcGVyOiBNYXBwZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IG51bWJlcltdKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3ByZ0NodW5rU2l6ZSA9IDE2Mzg0O1xyXG4gICAgICAgIHRoaXMuX2NockNodW5rU2l6ZSA9IDgxOTI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcHJnU2l6ZSA9IGRhdGFbNF07XHJcbiAgICAgICAgdGhpcy5fY2hyU2l6ZSA9IGRhdGFbNV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fcHJnU3RhcnQgPSAxNjtcclxuICAgICAgICB0aGlzLl9jaHJTdGFydCA9IHRoaXMuX3ByZ1N0YXJ0ICsgdGhpcy5fcHJnU2l6ZSAqIHRoaXMuX3ByZ0NodW5rU2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgcHJnRGF0YTogbnVtYmVyW10gPSBbXTsgICAgICAgIFxyXG4gICAgICAgIGxldCBwcmdMZW5ndGg6IG51bWJlciA9IHRoaXMuX3ByZ0NodW5rU2l6ZSAqIHRoaXMuX3ByZ1NpemU7XHJcbiAgICAgICAgbGV0IHByZ0luZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX3ByZ1N0YXJ0OyBpIDwgdGhpcy5fcHJnU3RhcnQrcHJnTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcHJnRGF0YVtwcmdJbmRleCsrXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZ1JvbSA9IG5ldyBST00ocHJnTGVuZ3RoLCBwcmdEYXRhKTsgICAgICAgIFxyXG5cclxuICAgICAgICBsZXQgY2hyRGF0YTogbnVtYmVyW10gPSBbXTsgICAgICAgIFxyXG4gICAgICAgIGxldCBjaHJMZW5ndGg6IG51bWJlciA9IHRoaXMuX2NockNodW5rU2l6ZSAqIHRoaXMuX2NoclNpemU7XHJcbiAgICAgICAgbGV0IGNockluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX2NoclN0YXJ0OyBpIDwgdGhpcy5fY2hyU3RhcnQrY2hyTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2hyRGF0YVtjaHJJbmRleCsrXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NoclJvbSA9IG5ldyBST00oY2hyTGVuZ3RoLCBjaHJEYXRhKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbWFwcGVyID0gbmV3IE1hcHBlcjAwMCh0aGlzLl9wcmdTaXplLCB0aGlzLl9jaHJTaXplKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFB1bHNlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVhZChhZGRyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtYXBwZWQgPSB0aGlzLl9tYXBwZXIuTWFwUmVhZChhZGRyKTtcclxuICAgICAgICBpZihtYXBwZWQgPj0gMCkge1xyXG4gICAgICAgICAgICBpZihhZGRyID49IDB4MDAwMCAmJiBhZGRyIDw9IDB4MUZGRikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NoclJvbS5SZWFkKG1hcHBlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoYWRkciA+PSAweDgwMDAgJiYgYWRkciA8PSAweEZGRkYpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmdSb20uUmVhZChtYXBwZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgV3JpdGUoYWRkcjogbnVtYmVyLCBkYXRhOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbWFwcGVkID0gdGhpcy5fbWFwcGVyLk1hcFdyaXRlKGFkZHIpO1xyXG4gICAgICAgIGlmKG1hcHBlZCA+PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3ByZ1JvbS5Xcml0ZShtYXBwZWQsIGRhdGEpO1xyXG4gICAgICAgIH0gXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFByZ1JvbSgpOiBST00ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcmdSb207XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoclJvbSgpOiBST00ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jaHJSb21cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDbG9jayB7XHJcblxyXG4gICAgcHJpdmF0ZSBfbGFzdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbXNBY2M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX292ZXJBY2M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2h6OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaHo6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2h6ID0gaHo7XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuX21zQWNjID0gMDtcclxuICAgICAgICB0aGlzLl9vdmVyQWNjID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3NjaWxsYXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9yZXR1cm4gNDE2NTA7XHJcbiAgICAgICAgLy9yZXR1cm4gNDE2NTA7XHJcblxyXG4gICAgICAgIGxldCBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLl9sYXN0O1xyXG4gICAgICAgIHRoaXMuX21zQWNjICs9IGRlbHRhO1xyXG4gICAgICAgIHRoaXMuX2xhc3QgPSBub3c7XHJcbiAgICAgICAgbGV0IHRhcmdldE1zID0gMTAwMCAvIHRoaXMuX2h6OyAgICAgICAgXHJcblxyXG4gICAgICAgIGxldCBtYXhIeiA9IDUwMDAwO1xyXG5cclxuICAgICAgICBpZihkZWx0YSA+PSB0YXJnZXRNcykge1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0UHVsc2VzID0gZGVsdGEgLyB0YXJnZXRNcztcclxuICAgICAgICAgICAgbGV0IG5QdWxzZXMgPSBNYXRoLnJvdW5kKHRhcmdldFB1bHNlcyk7XHJcbiAgICAgICAgICAgIGxldCBvdmVyc2hvb3QgPSB0YXJnZXRQdWxzZXMgLSBuUHVsc2VzO1xyXG4gICAgICAgICAgICB0aGlzLl9vdmVyQWNjICs9IG92ZXJzaG9vdDtcclxuICAgICAgICAgICAgaWYodGhpcy5fb3ZlckFjYyA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBuUHVsc2VzKys7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vdmVyQWNjIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fbXNBY2MgPSAwOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihkZWx0YSA+PSAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsb2NrIHRvb2sgdG9vIGxvbmc6IFwiICsgZGVsdGEgKyBcIm1zXCIpO1xyXG4gICAgICAgICAgICAgICAgblB1bHNlcyA9IDE7IC8vIHN0b3AgaXQgbG9ja2luZyBteSBicm93c2VyIHdoZW4gaW0gZGVidWdnaW5nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoblB1bHNlcyA+IG1heEh6KSBuUHVsc2VzID0gbWF4SHo7XHJcbiAgICAgICAgICAgIHJldHVybiBuUHVsc2VzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX21zQWNjID49IHRhcmdldE1zKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tc0FjYyAtPSB0YXJnZXRNcztcclxuICAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbn0iLCJpbXBvcnQgeyBCdXMgfSBmcm9tIFwiLi4vZGF0YS9idXNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2RlYnVnL2xvZ2dlclwiO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9idXNlczogQnVzW107XHJcbiAgICBwcm90ZWN0ZWQgX2Nsb2NrRGl2aWRlOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fYnVzZXMgPSBbXTtcclxuICAgICAgICB0aGlzLl9jbG9ja0RpdmlkZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpOiB2b2lkO1xyXG4gICAgcHVibGljIGFic3RyYWN0IFB1bHNlKGNsa0NvdW50OiBudW1iZXIsIGxvZ2dlcjogTG9nZ2VyKTogdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgUmVhZChhZGRyZXNzOiBudW1iZXIsIHJkT25seTogYm9vbGVhbik6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBXcml0ZShhZGRyZXNzOiBudW1iZXIsIHZhbHVlOiBudW1iZXIsIHJkT25seTogYm9vbGVhbik6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIENvbm5lY3QoYnVzOiBCdXMsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idXNlc1tpbmRleF0gPSBidXM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IENsb2NrRGl2aWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsb2NrRGl2aWRlO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IFBQVSB9IGZyb20gXCIuLi9jcHUvNjUwMi9wcHVcIjtcclxuaW1wb3J0IHsgQnVzIH0gZnJvbSBcIi4uL2RhdGEvYnVzXCI7XHJcbmltcG9ydCB7IEVLZXksIElucHV0IH0gZnJvbSBcIi4uL2lucHV0XCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIERNQSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYnVzOiBCdXM7XHJcbiAgICBwcml2YXRlIF9wcHU6IFBQVTtcclxuXHJcbiAgICBwcml2YXRlIF9jb250cm9sbGVyU3RhdGU6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSBfY29udHJvbGxlcjogbnVtYmVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBfZG1hUGFnZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZG1hQWRkcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfZG1hRGF0YTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2RtYUR1bW15OiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2RtYVRyYW5zZmVyOiBib29sZWFuO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1czogQnVzLCBwcHU6IFBQVSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY29udHJvbGxlclN0YXRlID0gW107XHJcbiAgICAgICAgdGhpcy5fY29udHJvbGxlciA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9kbWFQYWdlID0gMDtcclxuICAgICAgICB0aGlzLl9kbWFBZGRyID0gMDtcclxuICAgICAgICB0aGlzLl9kbWFEYXRhID0gMDtcclxuICAgICAgICB0aGlzLl9kbWFEdW1teSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZG1hVHJhbnNmZXIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2xvY2tEaXZpZGUgPSAzO1xyXG5cclxuICAgICAgICB0aGlzLl9idXMgPSBidXM7XHJcbiAgICAgICAgdGhpcy5fcHB1ID0gcHB1O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVhZChhZGRyZXNzOiBudW1iZXIsIHJkT25seTogYm9vbGVhbik6IG51bWJlciB7XHJcblxyXG4gICAgICAgIGxldCBkYXRhOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICBpZihhZGRyZXNzID49IDB4NDAxNiAmJiBhZGRyZXNzIDw9IDB4NDAxNykge1xyXG4gICAgICAgICAgICBkYXRhID0gKHRoaXMuX2NvbnRyb2xsZXJTdGF0ZVthZGRyZXNzICYgMHgwMDAxXSAmIDB4ODAgKSA+IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlclN0YXRlW2FkZHJlc3MgJiAweDAwMDFdIDw8PSAxO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sbGVyU3RhdGVbYWRkcmVzcyAmIDB4MDAwMV0gJj0gMHhGRjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgV3JpdGUoYWRkcmVzczogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICBpZihhZGRyZXNzID09PSAweDQwMTQpIHtcclxuICAgICAgICAgICAgdGhpcy5fZG1hUGFnZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9kbWFBZGRyID0gMHgwO1xyXG4gICAgICAgICAgICB0aGlzLl9kbWFUcmFuc2ZlciA9IHRydWU7XHJcbiAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoYWRkcmVzcyA+PSAweDQwMTYgJiYgYWRkcmVzcyA8PSAweDQwMTcpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlclN0YXRlW2FkZHJlc3MgJiAweDAwMDFdID0gdGhpcy5fY29udHJvbGxlclthZGRyZXNzICYgMHgwMDAxXTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jb250cm9sbGVyWzBdID0gMHgwMDtcclxuICAgICAgICBcclxuICAgICAgICBpZihJbnB1dC5Jc0tleURvd24oRUtleS5NKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sbGVyWzBdIHw9IDB4ODA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKElucHV0LklzS2V5RG93bihFS2V5LkspKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xsZXJbMF0gfD0gMHg0MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoSW5wdXQuSXNLZXlEb3duKEVLZXkuU0hJRlQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xsZXJbMF0gfD0gMHgyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoSW5wdXQuSXNLZXlEb3duKEVLZXkuRU5URVIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRyb2xsZXJbMF0gfD0gMHgxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoSW5wdXQuSXNLZXlEb3duKEVLZXkuTEVGVCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlclswXSB8PSAweDAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJbnB1dC5Jc0tleURvd24oRUtleS5SSUdIVCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlclswXSB8PSAweDAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJbnB1dC5Jc0tleURvd24oRUtleS5VUCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fY29udHJvbGxlclswXSB8PSAweDA4O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihJbnB1dC5Jc0tleURvd24oRUtleS5ET1dOKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9jb250cm9sbGVyWzBdIHw9IDB4MDQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFB1bHNlKGNsa0NvdW50OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZG1hVHJhbnNmZXIpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fZG1hRHVtbXkpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNsa0NvdW50ICUgIDIgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kbWFEdW1teSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYoY2xrQ291bnQgJSAyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG1hRGF0YSA9IHRoaXMuX2J1cy5SZWFkKCh0aGlzLl9kbWFQYWdlIDw8IDgpIHwgdGhpcy5fZG1hQWRkcik7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BwdS5PQU0odGhpcy5fZG1hQWRkciwgdGhpcy5fZG1hRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZG1hQWRkcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RtYUFkZHIgJT0gMjU2O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2RtYUFkZHIgPT0gMHgwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kbWFUcmFuc2ZlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9kbWFEdW1teSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBEbWFUcmFuc2ZlcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZG1hVHJhbnNmZXI7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3NjaWxsaXNjb3BlIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBwcml2YXRlIF9sYXN0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tc0FjYzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfcHVsc2VDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fcHVsc2VDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IDA7XHJcbiAgICAgICAgdGhpcy5fbXNBY2MgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7ICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMuX2xhc3Q7XHJcbiAgICAgICAgdGhpcy5fbXNBY2MgKz0gZGVsdGE7XHJcbiAgICAgICAgdGhpcy5fbGFzdCA9IG5vdztcclxuXHJcbiAgICAgICAgaWYodGhpcy5fbXNBY2MgPj0gMTAwMCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgTWVhc3VyZWQgaHo6ICR7dGhpcy5fcHVsc2VDb3VudH1gKTtcclxuICAgICAgICAgICAgdGhpcy5fcHVsc2VDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX21zQWNjID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQdWxzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wdWxzZUNvdW50Kys7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlYWQoYWRkcmVzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAweDAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBXcml0ZShhZGRyZXNzOiBudW1iZXIsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSQU0gZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgX2RhdGE6IG51bWJlcltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNpemU6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpXSA9IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlYWQoYWRkcmVzczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVthZGRyZXNzXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgV3JpdGUoYWRkcmVzczogbnVtYmVyLCBkYXRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kYXRhW2FkZHJlc3NdID0gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUHVsc2UoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJPTSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGF0YTogbnVtYmVyW107XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2l6ZTogbnVtYmVyLCBkYXRhOiBudW1iZXJbXSkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVtpXSA9IGRhdGFbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWFkKGFkZHJlc3M6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFbYWRkcmVzc107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFdyaXRlKGFkZHJlc3M6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUHVsc2UoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgUmVnaXN0ZXIgfSBmcm9tIFwiLi4vLi4vZGF0YS9yZWdpc3RlclwiO1xyXG5pbXBvcnQgeyBDUFUgfSBmcm9tIFwiLi4vY3B1XCI7XHJcbmltcG9ydCB7IENQVV82NTAyX0FMVSB9IGZyb20gXCIuL2NwdV82NTAyX2FsdVwiO1xyXG5pbXBvcnQgeyBDUFVfNjUwMl9JbnN0cnVjdGlvbnMgfSBmcm9tIFwiLi9jcHVfNjUwMl9pbnN0cnVjdGlvbnNcIjtcclxuaW1wb3J0IHsgQnVzIH0gZnJvbSBcIi4uLy4uL2RhdGEvYnVzXCI7XHJcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSBcIi4uLy4uL2luc3RydWN0aW9ucy9pbnN0cnVjdGlvbl9zZXRcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2RlYnVnL2xvZ2dlclwiO1xyXG5pbXBvcnQgeyBETUEgfSBmcm9tIFwiLi4vLi4vY29tcG9uZW50L2RtYVwiO1xyXG5cclxuZXhwb3J0IGVudW0gRVNzdGF0dXNCaXRzIHtcclxuICAgIEMsXHJcbiAgICBaLFxyXG4gICAgSSxcclxuICAgIEQsXHJcbiAgICBCLFxyXG4gICAgVU5VU0VELFxyXG4gICAgVixcclxuICAgIE4sXHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIEVSZWdpc3RlcnMge1xyXG4gICAgQSxcclxuICAgIFgsXHJcbiAgICBZLFxyXG4gICAgU1RBVFVTLFxyXG4gICAgU1AsXHJcbiAgICBQQ1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ1BVXzY1MDIgZXh0ZW5kcyBDUFUge1xyXG5cclxuICAgIHByaXZhdGUgX2FsdTogQ1BVXzY1MDJfQUxVO1xyXG4gICAgcHJpdmF0ZSBfaW5zdHJ1Y3Rpb25zOiBDUFVfNjUwMl9JbnN0cnVjdGlvbnM7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3ljbGVzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jeWNsZUNvdW50OiBudW1iZXI7XHJcblxyXG5cclxuICAgIHByaXZhdGUgX2RtYTogRE1BO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1czogQnVzLCBkbWE6IERNQSkge1xyXG4gICAgICAgIHN1cGVyKGJ1cyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FsdSA9IG5ldyBDUFVfNjUwMl9BTFUodGhpcyk7XHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zID0gbmV3IENQVV82NTAyX0luc3RydWN0aW9ucyh0aGlzLCB0aGlzLl9hbHUsIHRoaXMuX2J1cyk7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyc1tFUmVnaXN0ZXJzLkFdID0gbmV3IFJlZ2lzdGVyKDgsIFwiQVwiKTtcclxuICAgICAgICB0aGlzLl9yZWdpc3RlcnNbRVJlZ2lzdGVycy5YXSA9IG5ldyBSZWdpc3Rlcig4LCBcIlhcIik7XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJzW0VSZWdpc3RlcnMuWV0gPSBuZXcgUmVnaXN0ZXIoOCwgXCJZXCIpO1xyXG4gICAgICAgIHRoaXMuX3JlZ2lzdGVyc1tFUmVnaXN0ZXJzLlNUQVRVU10gPSBuZXcgUmVnaXN0ZXIoOCwgXCJTdGF0dXNcIik7XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJzW0VSZWdpc3RlcnMuU1BdID0gbmV3IFJlZ2lzdGVyKDgsIFwiU1BcIik7XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJzW0VSZWdpc3RlcnMuUENdID0gbmV3IFJlZ2lzdGVyKDE2LCBcIlBDXCIpOyAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuX2N5Y2xlcyA9IDA7XHJcbiAgICAgICAgdGhpcy5fY3ljbGVDb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2RtYSA9IGRtYTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2xvY2tEaXZpZGUgPSAzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5Xcml0ZSgweGZmKTtcclxuXHJcbiAgICAgICAgbGV0IGVudHJ5ID0gMHhGRkZDO1xyXG4gICAgICAgIGxldCBsbyA9IHRoaXMuX2J1cy5SZWFkKGVudHJ5KTtcclxuICAgICAgICBsZXQgaGkgPSB0aGlzLl9idXMuUmVhZChlbnRyeSsxKTtcclxuICAgICAgICBsZXQgcGNTdGFydCA9IChoaSA8PCA4KSB8IGxvO1xyXG5cclxuICAgICAgICB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLldyaXRlKHBjU3RhcnQpO1xyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLldyaXRlKDB4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFB1bHNlKGNsa0NvdW50OiBudW1iZXIsIGxvZ2dlcjogTG9nZ2VyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2RtYS5EbWFUcmFuc2Zlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9jeWNsZUNvdW50Kys7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2N5Y2xlcyA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY3ljbGVzLS07XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYzogbnVtYmVyID0gdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCk7XHJcbiAgICAgICAgbGV0IGRhdGE6IG51bWJlciA9IHRoaXMuX2J1cy5SZWFkKHBjKTtcclxuXHJcbiAgICAgICAgbGV0IG9wOiBJbnN0cnVjdGlvbiA9IHRoaXMuX2luc3RydWN0aW9ucy5Mb29rdXAoZGF0YSk7XHJcblxyXG4gICAgICAgIGlmKG9wKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBsZXQgbG9nTXNnID0gXCJcIjtcclxuICAgICAgICAgICAgLy8gbG9nTXNnID0gYCR7dGhpcy5fVG9IZXgocGMsIDQpfSBgO1xyXG4gICAgICAgICAgICAvLyBsb2dNc2cgKz0gYEE6JHt0aGlzLl9Ub0hleCh0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkuUmVhZCgpLCAyKX0gYDtcclxuICAgICAgICAgICAgLy8gbG9nTXNnICs9IGBYOiR7dGhpcy5fVG9IZXgodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSwgMil9IGA7XHJcbiAgICAgICAgICAgIC8vIGxvZ01zZyArPSBgWToke3RoaXMuX1RvSGV4KHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5SZWFkKCksIDIpfSBgO1xyXG4gICAgICAgICAgICAvLyBsb2dNc2cgKz0gYFNQOiR7dGhpcy5fVG9IZXgodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCksIDIpfSBgO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gbG9nZ2VyLldyaXRlTGluZShsb2dNc2cpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG9wZXJhbmRzOiBudW1iZXJbXSA9IHRoaXMuX0dldE9wZXJhbmRzKG9wLmJ5dGVzLTEpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGE6IG51bWJlciA9IG9wLmFkZHJlc3NlcihvcGVyYW5kcyk7XHJcbiAgICAgICAgICAgIG9wLm9wZXJhdGlvbihkYXRhKTtcclxuICAgICBcclxuICAgICAgICAgICAgdGhpcy5fY3ljbGVzID0gTWF0aC5tYXgob3AuZHVyYXRpb24tMSwgMCk7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRocm93KGBVTkRFRklORUQgT1AgMHgke2RhdGEudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9IGF0IDB4JHtwYy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSAgICBcclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgX1RvSGV4KG51bWJlciwgbGVuZ3RoKSB7XHJcbiAgIFxyXG4gICAgICAgIHZhciBzdHIgPSAnJyArIG51bWJlci50b1N0cmluZygxNik7XHJcbiAgICAgICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyID0gJzAnICsgc3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcIjB4XCIgKyBzdHIudG9VcHBlckNhc2UoKTtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBObWkoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuX2J1cy5Xcml0ZSgweDAxMDAgKyB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1ApLlJlYWQoKSwgKHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuUmVhZCgpID4+IDgpICYgMHgwMEZGKTtcclxuICAgICAgICB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1ApLldyaXRlKHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuUmVhZCgpLTEpO1xyXG4gICAgICAgIHRoaXMuX2J1cy5Xcml0ZSgweDAxMDAgKyB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1ApLlJlYWQoKSwgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCkgJiAweDAwRkYpO1xyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuV3JpdGUodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCktMSk7XHJcblxyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNsZWFyKEVTc3RhdHVzQml0cy5CKTtcclxuICAgICAgICB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5TZXQoRVNzdGF0dXNCaXRzLlVOVVNFRCk7XHJcbiAgICAgICAgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuU2V0KEVTc3RhdHVzQml0cy5JKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnVzLldyaXRlKDB4MDEwMCArIHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuUmVhZCgpLCB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5SZWFkKCkpO1xyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuV3JpdGUodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCktMSk7XHJcblxyXG4gICAgICAgIGxldCBhZGRyQWJzID0gMHhGRkZBO1xyXG4gICAgICAgIGxldCBsbyA9IHRoaXMuX2J1cy5SZWFkKGFkZHJBYnMpO1xyXG4gICAgICAgIGxldCBoaSA9IHRoaXMuX2J1cy5SZWFkKGFkZHJBYnMgKyAxKTtcclxuXHJcbiAgICAgICAgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZSgoaGkgPDwgOCkgfCBsbyk7XHJcbiAgICAgICAgdGhpcy5fY3ljbGVzID0gODtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVhZChhZGRyZXNzOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBXcml0ZShhZGRyZXNzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5zdHJ1Y3Rpb25Mb29rdXAoZGF0YTogbnVtYmVyKTogSW5zdHJ1Y3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0cnVjdGlvbnMuTG9va3VwKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVyYW5kTG9va3VwKGFkZHJlc3M6IG51bWJlciwgaW5zOiBJbnN0cnVjdGlvbik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fR2V0T3BlcmFuZHNTYWZlKGlucy5ieXRlcy0xLCBhZGRyZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ3ljbGVzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N5Y2xlQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRlc3RTdGF0dXModmFsdWU6IG51bWJlciwgaW5kZXg6IEVTc3RhdHVzQml0cyk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaChpbmRleCkge1xyXG4gICAgICAgICAgICBjYXNlIEVTc3RhdHVzQml0cy5aOiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLlosICh2YWx1ZSA9PT0gMCkgPyAxIDogMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIEVTc3RhdHVzQml0cy5OOiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lnbiA9ICh2YWx1ZSAmIDBiMTAwMDAwMDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5OLCAoc2lnbiA+IDApID8gMSA6IDApOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9HZXRPcGVyYW5kc1NhZmUobjogbnVtYmVyLCBhZGRyZXNzOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBieXRlOiBudW1iZXIgPSB0aGlzLl9idXMuUmVhZChhZGRyZXNzK2kpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChieXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9HZXRPcGVyYW5kcyhuOiBudW1iZXIpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcclxuICAgICAgICB0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLldyaXRlKCh0aGlzLlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLlJlYWQoKSsxKSAlIDB4RkZGRik7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYnl0ZTogbnVtYmVyID0gdGhpcy5fYnVzLlJlYWQodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCkpO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChieXRlKTtcclxuICAgICAgICAgICAgdGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZSgodGhpcy5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCkrMSkgJSAweEZGRkYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEFMVSB9IGZyb20gXCIuLi8uLi9hbHUvYWx1XCI7XHJcbmltcG9ydCB7IENQVV82NTAyLCBFUmVnaXN0ZXJzLCBFU3N0YXR1c0JpdHMgfSBmcm9tIFwiLi9jcHVfNjUwMlwiO1xyXG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gXCIuLi8uLi9kYXRhL3JlZ2lzdGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ1BVXzY1MDJfQUxVIGV4dGVuZHMgQUxVIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjcHU6IENQVV82NTAyKSB7XHJcbiAgICAgICAgc3VwZXIoY3B1KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5jcmVtZW50KGE6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IChhKzEpICUgMjU2OyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLlosIHRoaXMuX0NoZWNrWmVybyhyZXN1bHQpKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZShyZXN1bHQpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBEZWNyZW1lbnQoYTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gKGEtMSkgJSAyNTY7ICAgICAgICBcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKHJlc3VsdCkpO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5OLCB0aGlzLl9DaGVja05lZ2F0aXZlKHJlc3VsdCkpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9yKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYSB8IGI7ICAgICAgICBcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKHJlc3VsdCkpO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5OLCB0aGlzLl9DaGVja05lZ2F0aXZlKHJlc3VsdCkpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFhvcihhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGEgXiBiOyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLlosIHRoaXMuX0NoZWNrWmVybyhyZXN1bHQpKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZShyZXN1bHQpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBbmQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhICYgYjsgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5aLCB0aGlzLl9DaGVja1plcm8ocmVzdWx0KSk7XHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLk4sIHRoaXMuX0NoZWNrTmVnYXRpdmUocmVzdWx0KSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hpZnRSaWdodChhOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5DLCAoYSAmIDB4MDAwMSkgPiAwID8gMSA6IDApO1xyXG4gICAgICAgIGxldCB0ZW1wID0gYSA+PiAxO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5aLCB0aGlzLl9DaGVja1plcm8odGVtcCkpO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5OLCB0aGlzLl9DaGVja05lZ2F0aXZlKHRlbXApKTsgICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0ZW1wICYgMHgwMEZGO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaGlmdExlZnQoYTogbnVtYmVyKTogbnVtYmVyIHsgICBcclxuICAgICAgICBsZXQgdGVtcCA9IGEgPDwgMTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuQywgKHRlbXAgJiAweEZGMDApID4gMCA/IDEgOiAwKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKGEpKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZShhKSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGVtcCAmIDB4MDBGRjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUm90YXRlTGVmdChhOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjID0gdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5CaXQoRVNzdGF0dXNCaXRzLkMpOyAgICAgICAgXHJcbiAgICAgICAgbGV0IHRlbXAgPSAoYSA8PCAxKSB8IGMgICAgICAgICBcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuQywgKHRlbXAgJiAweEZGMDApID4gMCA/IDEgOiAwKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKHRlbXApKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZSh0ZW1wKSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGVtcCAmIDB4MDBGRjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUm90YXRlUmlnaHQoYTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYyA9IHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQml0KEVTc3RhdHVzQml0cy5DKTsgICAgICAgIFxyXG4gICAgICAgIGxldCB0ZW1wID0gKGMgPDwgNykgfCAoYSA+PiAxKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRlbXApO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5DLCAodGVtcCAmIDB4MDEpID4gMCA/IDEgOiAwKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKHRlbXApKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZSh0ZW1wKSk7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGVtcCAmIDB4MDBGRjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IGM6IG51bWJlciA9IHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQml0KEVTc3RhdHVzQml0cy5DKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gKGErYitjKSA7XHJcblxyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5DLCB0aGlzLl9DaGVja0NhcnJ5KHJlc3VsdCkpO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5aLCB0aGlzLl9DaGVja1plcm8ocmVzdWx0KSk7XHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLk4sIHRoaXMuX0NoZWNrTmVnYXRpdmUocmVzdWx0KSk7XHJcblxyXG4gICAgICAgIGxldCBvdmVyZmxvdyA9ICh+KGEgXiBiKSAmIChhIF4gcmVzdWx0KSkgJiAweDAwODA7XHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLlYsIG92ZXJmbG93KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAmIDB4MDBGRjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3VidHJhY3QoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBjOiBudW1iZXIgPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuQyk7XHJcbiAgICAgICAgYiBePSAweDAwRkY7XHJcbiAgICAgICAgYiAmPSAweDAwZmY7XHJcbiAgICAgICAgbGV0IHRlbXAgPSAoYStiK2MpO1xyXG4gICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5DLCB0aGlzLl9DaGVja0NhcnJ5KHRlbXApKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgdGhpcy5fQ2hlY2taZXJvKHRlbXApKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgdGhpcy5fQ2hlY2tOZWdhdGl2ZSh0ZW1wKSk7XHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLlYsICgodGVtcCBeIGEpICYgKHRlbXAgXiBiKSAmIDB4MDA4MCkgPiAwID8gMSA6IDApO1xyXG4gICAgICAgIHJldHVybiB0ZW1wICYgMHgwMEZGO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NhZmVCeXRlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKHZhbHVlIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gMjU2Kyh2YWx1ZSAlIDI1Nik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICUgMjU2O1xyXG4gICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ2hlY2taZXJvKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoKHZhbHVlICYgMHgwMEZGKSA9PT0gMCkgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9DaGVja05lZ2F0aXZlKHZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodmFsdWUgJiAweDgwKSA/IDEgOiAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0NoZWNrQ2FycnkodmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAmIDB4RkYwMCkgPiAwID8gMSA6IDA7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgSW5zdHJ1Y3Rpb25TZXQgfSBmcm9tIFwiLi4vLi4vaW5zdHJ1Y3Rpb25zL2luc3RydWN0aW9uX3NldFwiO1xyXG5pbXBvcnQgeyBDUFVfNjUwMiwgRVJlZ2lzdGVycywgRVNzdGF0dXNCaXRzIH0gZnJvbSBcIi4vY3B1XzY1MDJcIjtcclxuaW1wb3J0IHsgQ1BVXzY1MDJfQUxVIH0gZnJvbSBcIi4vY3B1XzY1MDJfYWx1XCI7XHJcbmltcG9ydCB7IEJ1cyB9IGZyb20gXCIuLi8uLi9kYXRhL2J1c1wiO1xyXG5pbXBvcnQgeyBSZWdpc3RlciB9IGZyb20gXCIuLi8uLi9kYXRhL3JlZ2lzdGVyXCI7XHJcbmltcG9ydCB7IENQVSB9IGZyb20gXCIuLi9jcHVcIjtcclxuXHJcbmNsYXNzIE9wUGFyYW1ldGVycyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfYWRkcmVzczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyOiBSZWdpc3RlcjtcclxuICAgIHByaXZhdGUgX2V4dHJhQ3ljbGVzOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYWRkcmVzczogbnVtYmVyLCB2YWx1ZTogbnVtYmVyLCBleHRyYUN5Y2xlczogbnVtYmVyLCByZWdpc3RlcjogUmVnaXN0ZXIgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5fYWRkcmVzcyA9IGFkZHJlc3M7XHJcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9yZWdpc3RlciA9IHJlZ2lzdGVyO1xyXG4gICAgICAgIHRoaXMuX2V4dHJhQ3ljbGVzID0gZXh0cmFDeWNsZXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBBZGRyZXNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZHJlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBSZWdpc3RlcigpOiBSZWdpc3RlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBFeHRyYUN5Y2xlcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9leHRyYUN5Y2xlcztcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ1BVXzY1MDJfSW5zdHJ1Y3Rpb25zIGV4dGVuZHMgSW5zdHJ1Y3Rpb25TZXQge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNwdTogQ1BVXzY1MDIsIGFsdTogQ1BVXzY1MDJfQUxVLCBidXM6IEJ1cykge1xyXG5cclxuICAgICAgICBzdXBlcihjcHUsIGJ1cywgYWx1KTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MDBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkJSS1wiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDcsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5CUkssXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgwMV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiT1JBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWEluZGV4ZWRJbmRpcmVjdCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLk9SQSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDA1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJPUkFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLk9SQSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDA2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBU0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFTTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDA4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJQSFBcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUEhQLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MDldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIk9SQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLk9SQSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDBBXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBU0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BY2N1bXVsYXRvcixcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFTTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDBEXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJPUkFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLk9SQSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDBFXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBU0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFTTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDEwXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJCUExcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLCBcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuUmVsYXRpdmUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5CUEwsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxQV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTk9QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMiwgXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5OT1AsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxMV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiT1JBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSwgXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0SW5kZXhlZFksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5PUkEsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxNV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiT1JBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSwgXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0SW5kZXhlZFksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5PUkEsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxNl0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQVNMXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2VYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFTTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDE4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJDTENcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ0xDLFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxOV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiT1JBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWUluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5PUkEsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxRF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiT1JBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5PUkEsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgxRV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQVNMXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5BU0wsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgyMF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiSlNSXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5KU1IsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgyMV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQU5EXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWEluZGV4ZWRJbmRpcmVjdCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFORCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDI0XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJCSVRcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkJJVCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDI1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBTkRcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFORCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDI2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJST0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlJPTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDI4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJQTFBcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUExQLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MjldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFORFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFORCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDJBXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJST0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BY2N1bXVsYXRvcixcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlJPTCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDJDXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJCSVRcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkJJVCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDJEXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBTkRcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFORCxcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MkVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlJPTFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9MLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MzBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkJNSVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlJlbGF0aXZlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQk1JLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MzFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFORFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDUsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0SW5kZXhlZFksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5BTkQsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHgzNV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQU5EXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2VYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFORCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDM2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJST0xcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9MLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MzhdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNFQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TRUNcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4MzldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFORFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1lJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQU5ELFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4M0VdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlJPTFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDcsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9MLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4M0RdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFORFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQU5EXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg0MF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiUlRJXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlJUSVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NDFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkVPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlhJbmRleGVkSW5kaXJlY3QsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5FT1JcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDQ1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJFT1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkVPUlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NDZdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxTUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDUsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTFNSXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg0OF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiUEhBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlBIQVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NDldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkVPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkVPUlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NEFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxTUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFjY3VtdWxhdG9yLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTFNSXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg0Q10gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiSk1QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5KTVBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDREXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJFT1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkVPUlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NEVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxTUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTFNSXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg1MF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQlZDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuUmVsYXRpdmUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5CVkMsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg1MV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiRU9SXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW5kaXJlY3RJbmRleGVkWSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkVPUlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NTVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkVPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5FT1JcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDU2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMU1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTFNSXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg1OF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ0xJXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNMSSxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDU5XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJFT1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNZSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkVPUlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NURdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkVPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuRU9SXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg1RV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTFNSXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MU1JcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDYwXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJSVFNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUlRTXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg2MV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQURDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWEluZGV4ZWRJbmRpcmVjdCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFEQyxcclxuICAgICAgICB9ICAgXHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDY1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBRENcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFEQyxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDY2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJST1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlJPUixcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDY4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJQTEFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUExBXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg2OV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQURDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1tZWRpYXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQURDLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NkFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlJPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFjY3VtdWxhdG9yLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9SLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NkNdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkpNUFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDUsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0LFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuSk1QXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NkRdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFEQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQURDLFxyXG4gICAgICAgIH0gIFxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg2RV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiUk9SXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5ST1IsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDcwXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJCVlNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5SZWxhdGl2ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkJWUyxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDcxXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJBRENcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbmRpcmVjdEluZGV4ZWRZLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQURDLFxyXG4gICAgICAgIH0gICBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg3NV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQURDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2VYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkFEQyxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDc2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJST1JcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9SLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NzhdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNFSVwiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TRUlcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4NzldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFEQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1lJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQURDLFxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4N0RdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkFEQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQURDLFxyXG4gICAgICAgIH0gICBcclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4N0VdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlJPUlwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDcsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuUk9SLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4ODFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNUQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlhJbmRleGVkSW5kaXJlY3QsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVEFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDg0XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTVFlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNUWVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4ODVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNUQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDMsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuU1RBXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg4Nl0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU1RYXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2UsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVFhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDg4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJERVlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuREVZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg4QV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiVFhBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlRYQVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4OENdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNUWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuU1RZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg4RF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU1RBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVEFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDhFXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTVFhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNUWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4OTBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkJDQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlJlbGF0aXZlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQkNDLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4OTFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNUQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0SW5kZXhlZFksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVEFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDk0XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTVFlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuU1RZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg5NV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU1RBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2VYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNUQVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4OTZdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNUWFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlWUluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVFhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDk4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJUWUFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuVFlBXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHg5OV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU1RBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWUluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TVEFcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4OUFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlRYU1wiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5UWFNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweDlEXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTVEFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA1LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNUQVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QTBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QTFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlhJbmRleGVkSW5kaXJlY3QsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEEyXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbW1lZGlhdGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MRFhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEE0XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhBNV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTERBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2UsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEE2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QThdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlRBWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltcGxpZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5UQVlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEE5XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMREFcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbW1lZGlhdGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEFBXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJUQVhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuVEFYXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEFDXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhBRF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTERBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEFFXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QjBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkJDU1wiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlJlbGF0aXZlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQkNTLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QjFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDUsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkluZGlyZWN0SW5kZXhlZFksXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEI0XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFlcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTERZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhCNV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTERBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2VYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEQVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QjZdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEWFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlWUluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MRFhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEI4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJDTFZcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ0xWLFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QjldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEQVwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1lJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTERBXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhCQV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiVFNYXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlRTWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QkNdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkxEWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuTERZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhCRF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTERBXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5MREFcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEJFXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJMRFhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNZSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkxEWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QzBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNQWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNQWVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QzFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNNUFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlhJbmRleGVkSW5kaXJlY3QsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5DTVBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4QzRdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNQWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDMsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ1BZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEM1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJDTVBcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNNUFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhDNl0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiREVDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2UsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5ERUNcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhDOF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiSU5ZXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLklOWVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhDOV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ01QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1tZWRpYXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ01QXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhDQV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiREVYXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkRFWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4Q0NdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNQWVwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ1BZXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhDRF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ01QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5DTVBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4Q0VdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkRFQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuREVDXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhEMF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQk5FXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuUmVsYXRpdmUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5CTkUsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhEMV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ01QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW5kaXJlY3RJbmRleGVkWSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNNUFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RDVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNNUFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5DTVBcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEQ2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJERUNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuREVDXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhEOF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ0xEXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNMRCxcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEQ5XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJDTVBcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNZSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNNUFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RERdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNNUFwiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1hJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ01QXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhERV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiREVDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNyxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5ERUNcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RTBdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNQWFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLkNQWFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RTFdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNCQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlhJbmRleGVkSW5kaXJlY3QsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TQkNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEU1XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTQkNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNCQ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RTldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNCQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDIsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkltbWVkaWF0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNCQ1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhFQV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiTk9QXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLk5PUFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RTRdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIkNQWFwiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDMsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuQ1BYXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhFNl0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiSU5DXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuWmVyb1BhZ2UsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5JTkNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEU4XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJJTlhcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDEsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyLFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5JbXBsaWVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuSU5YXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhFQ10gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQ1BYXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzb2x1dGUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5DUFhcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEVEXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJTQkNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA0LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNvbHV0ZSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNCQ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RUVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIklOQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDYsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic29sdXRlLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuSU5DXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhGMF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiQkVRXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuUmVsYXRpdmUsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5CRVEsXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhGMV0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU0JDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAyLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNSxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW5kaXJlY3RJbmRleGVkWSxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNCQ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RjVdID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNCQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMixcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLlplcm9QYWdlWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TQkNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEY2XSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJJTkNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDIsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA2LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5aZXJvUGFnZVhJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuSU5DXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhGOF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU0VEXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogMixcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuSW1wbGllZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLlNFRFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zWzB4RjldID0ge1xyXG4gICAgICAgICAgICBtbmVtOiBcIlNCQ1wiLFxyXG4gICAgICAgICAgICBieXRlczogMyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDQsXHJcbiAgICAgICAgICAgIGFkZHJlc3NlcjogdGhpcy5fQURSX01PREVTLkFic1lJbmRleGVkLFxyXG4gICAgICAgICAgICBvcGVyYXRpb246IHRoaXMuX09QRVJBVElPTlMuU0JDXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9pbnN0cnVjdGlvbnNbMHhGRF0gPSB7XHJcbiAgICAgICAgICAgIG1uZW06IFwiU0JDXCIsXHJcbiAgICAgICAgICAgIGJ5dGVzOiAzLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogNCxcclxuICAgICAgICAgICAgYWRkcmVzc2VyOiB0aGlzLl9BRFJfTU9ERVMuQWJzWEluZGV4ZWQsXHJcbiAgICAgICAgICAgIG9wZXJhdGlvbjogdGhpcy5fT1BFUkFUSU9OUy5TQkNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2luc3RydWN0aW9uc1sweEZFXSA9IHtcclxuICAgICAgICAgICAgbW5lbTogXCJJTkNcIixcclxuICAgICAgICAgICAgYnl0ZXM6IDMsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiA3LFxyXG4gICAgICAgICAgICBhZGRyZXNzZXI6IHRoaXMuX0FEUl9NT0RFUy5BYnNYSW5kZXhlZCxcclxuICAgICAgICAgICAgb3BlcmF0aW9uOiB0aGlzLl9PUEVSQVRJT05TLklOQ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQURSX01PREVTID0ge1xyXG5cclxuICAgICAgICBJbXBsaWVkOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKDAsIDAsIDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEFjY3VtdWxhdG9yOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKDAsIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKSwgMCwgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEltbWVkaWF0ZTogKG9wczogbnVtYmVyW10pOiBPcFBhcmFtZXRlcnMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9wUGFyYW1ldGVycyhvcHNbMF0sIG9wc1swXSwgMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQWJzb2x1dGU6IChvcHM6IG51bWJlcltdKTogT3BQYXJhbWV0ZXJzID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkZHIgPSAob3BzWzFdIDw8IDgpIHwgb3BzWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9wUGFyYW1ldGVycyhhZGRyLCB0aGlzLl9idXMuUmVhZChhZGRyLCB0cnVlKSwgMCk7XHJcbiAgICAgICAgfSwgICAgXHJcblxyXG4gICAgICAgIEFic1hJbmRleGVkOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IChvcHNbMV0gPDwgOCkgfCBvcHNbMF07XHJcbiAgICAgICAgICAgIGxldCBmaW5hbEFkZHJlc3MgPSAoYWRkcmVzcyArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSkgJSA2NTUzNjtcclxuXHJcbiAgICAgICAgICAgIGxldCBleHRyYUN5Y2xlcyA9IDA7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZigoZmluYWxBZGRyZXNzICYgMHhGRjAwKSAhPT0gKG9wc1sxXSA8PCA4KSkge1xyXG4gICAgICAgICAgICAgICAgZXh0cmFDeWNsZXMgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9wUGFyYW1ldGVycyhmaW5hbEFkZHJlc3MsIHRoaXMuX2J1cy5SZWFkKGZpbmFsQWRkcmVzcywgdHJ1ZSksIGV4dHJhQ3ljbGVzKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQWJzWUluZGV4ZWQ6IChvcHM6IG51bWJlcltdKTogT3BQYXJhbWV0ZXJzID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gKG9wc1sxXSA8PCA4KSB8IG9wc1swXTtcclxuICAgICAgICAgICAgbGV0IGZpbmFsQWRkcmVzcyA9IChhZGRyZXNzICsgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuWSkuUmVhZCgpKSAlIDY1NTM2O1xyXG5cclxuICAgICAgICAgICAgbGV0IGV4dHJhQ3ljbGVzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKChmaW5hbEFkZHJlc3MgJiAweEZGMDApICE9PSAob3BzWzFdIDw8IDgpKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYUN5Y2xlcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKGZpbmFsQWRkcmVzcywgdGhpcy5fYnVzLlJlYWQoZmluYWxBZGRyZXNzLCB0cnVlKSwgZXh0cmFDeWNsZXMpO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBYSW5kZXhlZEluZGlyZWN0OiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWRkcmVzcyA9IHRoaXMuX2J1cy5SZWFkKG9wc1swXSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgbG8gPSB0aGlzLl9idXMuUmVhZCgoYWRkcmVzcyArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSkgJiAweDAwRkYsIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgaGkgPSB0aGlzLl9idXMuUmVhZCgoYWRkcmVzcyArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSArIDEpICYgMHgwMEZGLCB0cnVlKTsgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYWRkciA9IChoaSA8PCA4KSB8IGxvO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcFBhcmFtZXRlcnMoYWRkciwgdGhpcy5fYnVzLlJlYWQoYWRkciwgdHJ1ZSksIDApO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBJbmRpcmVjdEluZGV4ZWRZOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYWRkcmVzczEgPSB0aGlzLl9idXMuUmVhZChvcHNbMF0sIHRydWUpO1xyXG4gICAgICAgICAgICBsZXQgYWRkcmVzczIgPSB0aGlzLl9idXMuUmVhZChvcHNbMF0rMSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZnVsbEFkZHJlc3MgPSAoYWRkcmVzczIgPDwgOCkgfCAoYWRkcmVzczEgKyB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5SZWFkKCkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGV4dHJhQ3ljbGVzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKChmdWxsQWRkcmVzcyAmIDB4RkYwMCkgIT0gKGFkZHJlc3MyIDw8IDgpKSB7XHJcbiAgICAgICAgICAgICAgICBleHRyYUN5Y2xlcyA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKGZ1bGxBZGRyZXNzLCB0aGlzLl9idXMuUmVhZChmdWxsQWRkcmVzcywgdHJ1ZSksIGV4dHJhQ3ljbGVzKTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSW5kaXJlY3Q6IChvcHM6IG51bWJlcltdKTogT3BQYXJhbWV0ZXJzID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBwdHIgPSAob3BzWzFdIDw8IDgpIHwgb3BzWzBdO1xyXG4gICAgICAgICAgICBsZXQgZmluYWxBZGRyZXNzID0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKG9wc1swXSA9PSAweDAwRkYpIHtcclxuICAgICAgICAgICAgICAgIGZpbmFsQWRkcmVzcyA9ICh0aGlzLl9idXMuUmVhZChwdHIgJiAweEZGMDAsIHRydWUpIDw8IDgpIHwgdGhpcy5fYnVzLlJlYWQocHRyLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbmFsQWRkcmVzcyA9ICh0aGlzLl9idXMuUmVhZChwdHIgKyAxLCB0cnVlKSA8PCA4KSB8IHRoaXMuX2J1cy5SZWFkKHB0ciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKGZpbmFsQWRkcmVzcywgdGhpcy5fYnVzLlJlYWQoZmluYWxBZGRyZXNzLCB0cnVlKSwgMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgWmVyb1BhZ2U6IChvcHM6IG51bWJlcltdKTogT3BQYXJhbWV0ZXJzID0+IHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcFBhcmFtZXRlcnMob3BzWzBdLCB0aGlzLl9idXMuUmVhZChvcHNbMF0sIHRydWUpLCAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBaZXJvUGFnZVhJbmRleGVkOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gKG9wc1swXSArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSkgJSAyNTY7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKGFkZHJlc3MsIHRoaXMuX2J1cy5SZWFkKGFkZHJlc3MsIHRydWUpLCAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBaZXJvUGFnZVlJbmRleGVkOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhZGRyZXNzID0gKG9wc1swXSArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlkpLlJlYWQoKSkgJSAyNTZcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcFBhcmFtZXRlcnMoYWRkcmVzcywgdGhpcy5fYnVzLlJlYWQoYWRkcmVzcywgdHJ1ZSksIDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFJlbGF0aXZlOiAob3BzOiBudW1iZXJbXSk6IE9wUGFyYW1ldGVycyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT3BQYXJhbWV0ZXJzKHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCksIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5SZWFkKCkgKyB0aGlzLl9Bc1NpZ25lZChvcHNbMF0pLCAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX09QRVJBVElPTlMgPSB7XHJcblxyXG4gICAgICAgIEFEQzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LkFkZCh0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5SZWFkKCksIGRhdGEuVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEFORDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LkFuZCh0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5SZWFkKCksIGRhdGEuVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEFTTDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LlNoaWZ0TGVmdChkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgaWYoZGF0YS5SZWdpc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5SZWdpc3Rlci5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVzLldyaXRlKGRhdGEuQWRkcmVzcywgcmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJDQzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuQykgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJDUzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuQykgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJFUTogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuWikgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJJVDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4geyAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBuOiBudW1iZXIgPSAoZGF0YS5WYWx1ZSAmIDBiMTAwMDAwMDApID4gMCA/IDE6IDA7XHJcbiAgICAgICAgICAgIGxldCB2OiBudW1iZXIgPSAoZGF0YS5WYWx1ZSAmIDBiMDEwMDAwMDApID4gMCA/IDE6IDA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuTiwgbik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5WLCB2KTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5SZWFkKCkgJiBkYXRhLlZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuWiwgKHJlc3VsdCAmIDB4MDBGRikgPT0gMHgwMCA/IDEgOiAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCTUk6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5CaXQoRVNzdGF0dXNCaXRzLk4pID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuV3JpdGUoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCTkU6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5CaXQoRVNzdGF0dXNCaXRzLlopID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuV3JpdGUoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCUEw6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5CaXQoRVNzdGF0dXNCaXRzLk4pID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuV3JpdGUoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBCUks6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhyb3coXCJCUksgbm90IGltcGxlbWVudGVkXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJWQzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuVikgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEJWUzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuVikgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENMQzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNsZWFyKEVTc3RhdHVzQml0cy5DKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDTEQ6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DbGVhcihFU3N0YXR1c0JpdHMuRCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ0xJOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2xlYXIoRVNzdGF0dXNCaXRzLkkpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENMVjogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNsZWFyKEVTc3RhdHVzQml0cy5WKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDTVA6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IGE6IG51bWJlciA9IHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKTtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSB0aGlzLl9Bc1NpZ25lZChhIC0gZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHRlbXAsIEVTc3RhdHVzQml0cy5aKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXModGVtcCwgRVNzdGF0dXNCaXRzLk4pO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNoYW5nZUJpdChFU3N0YXR1c0JpdHMuQywgYSA+PSBkYXRhLlZhbHVlID8gMSA6IDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIENQWDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuWCkuUmVhZCgpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcCA9IHRoaXMuX0FzU2lnbmVkKHggLSBkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXModGVtcCwgRVNzdGF0dXNCaXRzLlopO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyh0ZW1wLCBFU3N0YXR1c0JpdHMuTik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2hhbmdlQml0KEVTc3RhdHVzQml0cy5DLCB4ID49IGRhdGEuVmFsdWUgPyAxIDogMCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ1BZOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB5OiBudW1iZXIgPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5SZWFkKCk7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wID0gdGhpcy5fQXNTaWduZWQoeSAtIGRhdGEuVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyh0ZW1wLCBFU3N0YXR1c0JpdHMuWik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHRlbXAsIEVTc3RhdHVzQml0cy5OKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5DaGFuZ2VCaXQoRVNzdGF0dXNCaXRzLkMsIHkgPj0gZGF0YS5WYWx1ZSA/IDEgOiAwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBERUM6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FsdS5EZWNyZW1lbnQoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1cy5Xcml0ZShkYXRhLkFkZHJlc3MsIHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgREVYOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuRGVjcmVtZW50KHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgREVZOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuRGVjcmVtZW50KHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlkpLlJlYWQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlkpLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgRU9SOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuWG9yKHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKSwgZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgSU5DOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuSW5jcmVtZW50KGRhdGEuVmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9idXMuV3JpdGUoZGF0YS5BZGRyZXNzLCByZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIElOWDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LkluY3JlbWVudCh0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5YKS5SZWFkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5YKS5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIElOWTogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LkluY3JlbWVudCh0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5SZWFkKCkpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIEpNUDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuV3JpdGUoZGF0YS5BZGRyZXNzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBKU1I6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IGFkZHJlc3MgPSBkYXRhLkFkZHJlc3M7XHJcblxyXG4gICAgICAgICAgICBsZXQgcGNIaSA9ICgodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLlJlYWQoKSAtIDEpID4+IDgpICYgMHgwMEZGO1xyXG4gICAgICAgICAgICBsZXQgcGNMbyA9ICh0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuUmVhZCgpIC0gMSkgJiAweDAwRkZcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2gocGNIaSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2gocGNMbyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShhZGRyZXNzKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMREE6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXMoZGF0YS5WYWx1ZSwgRVNzdGF0dXNCaXRzLlopO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyhkYXRhLlZhbHVlLCBFU3N0YXR1c0JpdHMuTik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLldyaXRlKGRhdGEuVmFsdWUpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIExEWDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyhkYXRhLlZhbHVlLCBFU3N0YXR1c0JpdHMuWik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKGRhdGEuVmFsdWUsIEVTc3RhdHVzQml0cy5OKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuWCkuV3JpdGUoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgTERZOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKGRhdGEuVmFsdWUsIEVTc3RhdHVzQml0cy5aKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXMoZGF0YS5WYWx1ZSwgRVNzdGF0dXNCaXRzLk4pO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5Xcml0ZShkYXRhLlZhbHVlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBMU1I6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FsdS5TaGlmdFJpZ2h0KGRhdGEuVmFsdWUpO1xyXG4gICAgICAgICAgICBpZihkYXRhLlJlZ2lzdGVyKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLlJlZ2lzdGVyLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idXMuV3JpdGUoZGF0YS5BZGRyZXNzLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgTk9QOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIE9SQTogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1Lk9yKHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKSwgZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUEhBOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2godGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkuUmVhZCgpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBQSFA6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IGIgPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkJpdChFU3N0YXR1c0JpdHMuQik7XHJcbiAgICAgICAgICAgIGxldCB1ID0gdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5CaXQoRVNzdGF0dXNCaXRzLlVOVVNFRCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2godGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5SZWFkKCkgfCBiIHwgdSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuQ2xlYXIoRVNzdGF0dXNCaXRzLkIpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLkNsZWFyKEVTc3RhdHVzQml0cy5VTlVTRUQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFBMQTogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMuX1B1bGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkuV3JpdGUoYSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKGEsIEVTc3RhdHVzQml0cy5aKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXMoYSwgRVNzdGF0dXNCaXRzLk4pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFBMUDogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMuX1B1bGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5Xcml0ZShhKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5TZXQoRVNzdGF0dXNCaXRzLlVOVVNFRCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUk9MOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuUmVnaXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuUm90YXRlTGVmdChkYXRhLlJlZ2lzdGVyLlJlYWQoKSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhLlJlZ2lzdGVyLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LlJvdGF0ZUxlZnQoZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idXMuV3JpdGUoZGF0YS5BZGRyZXNzLCByZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgUk9SOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuUmVnaXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLl9hbHUuUm90YXRlUmlnaHQoZGF0YS5SZWdpc3Rlci5SZWFkKCkpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5SZWdpc3Rlci5Xcml0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuX2FsdS5Sb3RhdGVSaWdodChkYXRhLlZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1cy5Xcml0ZShkYXRhLkFkZHJlc3MsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBSVEk6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgYSA9IHRoaXMuX1B1bGwoKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5Xcml0ZShhKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5GbGlwKEVTc3RhdHVzQml0cy5CKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5GbGlwKEVTc3RhdHVzQml0cy5VTlVTRUQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHJldHVybkxvID0gdGhpcy5fUHVsbCgpO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuSGkgPSB0aGlzLl9QdWxsKCk7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5BZGRyID0gKHJldHVybkhpIDw8IDgpIHwgcmV0dXJuTG87XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuV3JpdGUocmV0dXJuQWRkcik7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFJUUzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHJldHVybkxvID0gdGhpcy5fUHVsbCgpO1xyXG4gICAgICAgICAgICBsZXQgcmV0dXJuSGkgPSB0aGlzLl9QdWxsKCk7XHJcbiAgICAgICAgICAgIGxldCByZXR1cm5BZGRyID0gKHJldHVybkhpIDw8IDgpIHwgcmV0dXJuTG87XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlBDKS5Xcml0ZShyZXR1cm5BZGRyICsgMSk7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFNCQzogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5fYWx1LlN1YnRyYWN0KHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKSwgZGF0YS5WYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLldyaXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgU0VDOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykuU2V0KEVTc3RhdHVzQml0cy5DKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBTRUQ6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKS5TZXQoRVNzdGF0dXNCaXRzLkQpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFNFSTogKGRhdGE6IE9wUGFyYW1ldGVycyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TVEFUVVMpLlNldChFU3N0YXR1c0JpdHMuSSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgU1RBOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1cy5Xcml0ZShkYXRhLkFkZHJlc3MsIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLkEpLlJlYWQoKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgU1RYOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1cy5Xcml0ZShkYXRhLkFkZHJlc3MsIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLlJlYWQoKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgU1RZOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1cy5Xcml0ZShkYXRhLkFkZHJlc3MsIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlkpLlJlYWQoKSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVEFYOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhID0gdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkuUmVhZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyhhLCBFU3N0YXR1c0JpdHMuWik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKGEsIEVTc3RhdHVzQml0cy5OKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuWCkuV3JpdGUoYSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVEFZOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBhID0gdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuQSkuUmVhZCgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuVGVzdFN0YXR1cyhhLCBFU3N0YXR1c0JpdHMuWik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKGEsIEVTc3RhdHVzQml0cy5OKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuWSkuV3JpdGUoYSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgVFNYOiAoZGF0YTogT3BQYXJhbWV0ZXJzKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzcCA9IHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHNwLCBFU3N0YXR1c0JpdHMuWik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHNwLCBFU3N0YXR1c0JpdHMuTik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlgpLldyaXRlKHNwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBUWEE6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5YKS5SZWFkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHgsIEVTc3RhdHVzQml0cy5aKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXMoeCwgRVNzdGF0dXNCaXRzLk4pO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5Xcml0ZSh4KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBUWFM6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IHggPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5YKS5SZWFkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5Xcml0ZSh4KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBUWUE6IChkYXRhOiBPcFBhcmFtZXRlcnMpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgbGV0IHkgPSB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5ZKS5SZWFkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5UZXN0U3RhdHVzKHksIEVTc3RhdHVzQml0cy5aKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1LlRlc3RTdGF0dXMoeSwgRVNzdGF0dXNCaXRzLk4pO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5BKS5Xcml0ZSh5KTtcclxuICAgICAgICB9LFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9Bc1NpZ25lZCh2YWx1ZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZih2YWx1ZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDI1Nit2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNpZ24gPSAodmFsdWUgJiAoMSA8PCA3KSkgPj4gNztcclxuICAgICAgICBpZihzaWduID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAtKDI1Nisofih2YWx1ZSkrMSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfUHVzaCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fYnVzLldyaXRlKDB4MDEwMCArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCksIHZhbHVlKTtcclxuICAgICAgICB0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuV3JpdGUodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1ApLlJlYWQoKS0xKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9QdWxsKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1ApLldyaXRlKHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCkrMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1cy5SZWFkKDB4MDEwMCArIHRoaXMuX2NwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNQKS5SZWFkKCkpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb21wb25lbnQvY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFBpeGVsIH0gZnJvbSBcIi4uLy4uL2RhdGEvcGl4ZWxcIjtcclxuaW1wb3J0IHsgQnVzIH0gZnJvbSBcIi4uLy4uL2RhdGEvYnVzXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyIH0gZnJvbSBcIi4uLy4uL2RhdGEvcmVnaXN0ZXJcIjtcclxuXHJcbmNsYXNzIE9iakF0dHJpYnV0ZUVudHJ5IHtcclxuICAgIFk6IG51bWJlciA9IDA7XHJcbiAgICBJRDogbnVtYmVyID0gMDtcclxuICAgIEFUVFJJQlVURTogbnVtYmVyID0gMDtcclxuICAgIFg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIFJlYWRCeXRlKGk6IG51bWJlcikge1xyXG4gICAgICAgIHN3aXRjaChpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlk7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLklEO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5BVFRSSUJVVEU7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLlg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBXcml0ZUJ5dGUoaTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3dpdGNoKGkpIHtcclxuICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ZID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5JRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHRoaXMuQVRUUklCVVRFID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5YID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBNYXNrIHsgICAgXHJcbiAgICBcclxuICAgIEVOSEFOQ0VfQkxVRTogbnVtYmVyID0gMDtcclxuICAgIEVOSEFOQ0VfR1JFRU46IG51bWJlciA9IDA7XHJcbiAgICBFTkhBTkNFX1JFRDogbnVtYmVyID0gMDtcclxuICAgIFJFTkRFUl9TUFJJVEVTOiBudW1iZXIgPSAwO1xyXG4gICAgUkVOREVSX0JBQ0tHUk9VTkQ6IG51bWJlciA9IDA7XHJcbiAgICBSRU5ERVJfU1BSSVRFU19MRUZUOiBudW1iZXIgPSAwO1xyXG4gICAgUkVOREVSX0JBQ0tHUk9VTkRfTEVGVDogbnVtYmVyID0gMDtcclxuICAgIEdSQVlTQ0FMRTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgRGF0YSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5HUkFZU0NBTEUgPDwgNykgfCBcclxuICAgICAgICAodGhpcy5SRU5ERVJfQkFDS0dST1VORF9MRUZUIDw8IDYpIHwgXHJcbiAgICAgICAgKHRoaXMuUkVOREVSX1NQUklURVNfTEVGVCA8PCA1KSB8IFxyXG4gICAgICAgICh0aGlzLlJFTkRFUl9CQUNLR1JPVU5EIDw8IDQpIHwgXHJcbiAgICAgICAgKHRoaXMuUkVOREVSX1NQUklURVMgPDwgMykgfCBcclxuICAgICAgICAodGhpcy5FTkhBTkNFX1JFRCA8PCAyKSB8IFxyXG4gICAgICAgICh0aGlzLkVOSEFOQ0VfR1JFRU4gPDwgMSkgfCBcclxuICAgICAgICAodGhpcy5FTkhBTkNFX0JMVUUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXQobjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5HUkFZU0NBTEUgPSAobiAmIDBiMDAwMDAwMDEpID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuUkVOREVSX0JBQ0tHUk9VTkRfTEVGVCA9IChuICYgMGIwMDAwMDAxMCkgPiAwID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5SRU5ERVJfU1BSSVRFU19MRUZUID0gKG4gJiAwYjAwMDAwMTAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLlJFTkRFUl9CQUNLR1JPVU5EID0gKG4gJiAwYjAwMDAxMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLlJFTkRFUl9TUFJJVEVTID0gKG4gJiAwYjAwMDEwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLkVOSEFOQ0VfUkVEID0gKG4gJiAwYjAwMTAwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLkVOSEFOQ0VfR1JFRU4gPSAobiAmIDBiMDEwMDAwMDApID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuRU5IQU5DRV9CTFVFID0gKG4gJiAwYjEwMDAwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIExvb3B5UmVnaXN0ZXIge1xyXG4gICAgQ09BUlNFX1g6IG51bWJlciA9IDA7XHJcbiAgICBDT0FSU0VfWTogbnVtYmVyID0gMDtcclxuICAgIE5BTUVUQUJMRV9YOiBudW1iZXIgPSAwO1xyXG4gICAgTkFNRVRBQkxFX1k6IG51bWJlciA9IDA7XHJcbiAgICBGSU5FX1k6IG51bWJlciA9IDA7XHJcbiAgICBcclxuICAgIHB1YmxpYyBEYXRhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkNPQVJTRV9YKSB8IFxyXG4gICAgICAgICh0aGlzLkNPQVJTRV9ZIDw8IDUpIHwgXHJcbiAgICAgICAgKHRoaXMuTkFNRVRBQkxFX1ggPDwgMTApIHxcclxuICAgICAgICAodGhpcy5OQU1FVEFCTEVfWSA8PCAxMSkgfFxyXG4gICAgICAgICh0aGlzLkZJTkVfWSA8PCAxMilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0KG46IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKG4gPiAweEZGRkYpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJITU06IFwiICsgbiApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNPQVJTRV9YID0gKG4gJiAwYjAwMDAwMDAwMDAwMTExMTEpO1xyXG4gICAgICAgIHRoaXMuQ09BUlNFX1kgPSAoKG4gJiAwYjAwMDAwMDExMTExMDAwMDApID4+IDUpO1xyXG4gICAgICAgIHRoaXMuTkFNRVRBQkxFX1ggPSAoKG4gJiAwYjAwMDAwMTAwMDAwMDAwMDApID4+IDEwKTtcclxuICAgICAgICB0aGlzLk5BTUVUQUJMRV9ZID0gKChuICYgMGIwMDAwMTAwMDAwMDAwMDAwKSA+PiAxMSk7XHJcbiAgICAgICAgdGhpcy5GSU5FX1kgPSAoKG4gJiAwYjAxMTEwMDAwMDAwMDAwMDApID4+IDEyKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFN0YXR1cyB7XHJcbiAgICBTUFJJVEVfT1ZFUkZMT1c6IG51bWJlciA9IDA7XHJcbiAgICBTUFJJVEVfWkVST19ISVQ6IG51bWJlciA9IDA7XHJcbiAgICBWRVJUSUNBTF9CTEFOSzogbnVtYmVyID0gMDtcclxuICAgIFBSRVZfV1JJVEVfTFNCOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHB1YmxpYyBEYXRhKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLlBSRVZfV1JJVEVfTFNCKSB8IFxyXG4gICAgICAgICh0aGlzLlNQUklURV9PVkVSRkxPVyA8PCA1KSB8IFxyXG4gICAgICAgICh0aGlzLlNQUklURV9aRVJPX0hJVCA8PCA2KSB8IFxyXG4gICAgICAgICh0aGlzLlZFUlRJQ0FMX0JMQU5LIDw8IDcpIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXQobjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QUkVWX1dSSVRFX0xTQiA9IChuICYgMGIwMDAxMTExMSk7XHJcbiAgICAgICAgdGhpcy5TUFJJVEVfT1ZFUkZMT1cgPSAobiAmIDBiMDAxMDAwMDApID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuU1BSSVRFX1pFUk9fSElUID0gKG4gJiAwYjAxMDAwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLlZFUlRJQ0FMX0JMQU5LID0gKG4gJiAwYjEwMDAwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIENvbnRyb2wge1xyXG5cclxuICAgIE5BTUVUQUJMRV9YOiBudW1iZXIgPSAwO1xyXG4gICAgTkFNRVRBQkxFX1k6IG51bWJlciA9IDA7XHJcbiAgICBJTkNSRU1FTlRfTU9ERTogbnVtYmVyID0gMDtcclxuICAgIFBBVFRFUk5fU1BSSVRFOiBudW1iZXIgPSAwO1xyXG4gICAgUEFUVEVSTl9CQUNLR1JPVU5EOiBudW1iZXIgPSAwO1xyXG4gICAgU1BSSVRFX1NJWkU6IG51bWJlciA9IDA7XHJcbiAgICBTTEFWRV9NT0RFOiBudW1iZXIgPSAwO1xyXG4gICAgRU5BQkxFX05NSTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgRGF0YSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5FTkFCTEVfTk1JIDw8IDcpIHwgXHJcbiAgICAgICAgKHRoaXMuU0xBVkVfTU9ERSA8PCA2KSB8IFxyXG4gICAgICAgICh0aGlzLlNQUklURV9TSVpFIDw8IDUpIHwgXHJcbiAgICAgICAgKHRoaXMuUEFUVEVSTl9CQUNLR1JPVU5EIDw8IDQpIHwgXHJcbiAgICAgICAgKHRoaXMuUEFUVEVSTl9TUFJJVEUgPDwgMykgfCBcclxuICAgICAgICAodGhpcy5JTkNSRU1FTlRfTU9ERSA8PCAyKSB8IFxyXG4gICAgICAgICh0aGlzLk5BTUVUQUJMRV9ZIDw8IDEpIHwgXHJcbiAgICAgICAgKHRoaXMuTkFNRVRBQkxFX1gpIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXQobjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FTkFCTEVfTk1JID0gKG4gJiAwYjEwMDAwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLlNMQVZFX01PREUgPSAobiAmIDBiMDEwMDAwMDApID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuU1BSSVRFX1NJWkUgPSAobiAmIDBiMDAxMDAwMDApID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuUEFUVEVSTl9CQUNLR1JPVU5EID0gKG4gJiAwYjAwMDEwMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLlBBVFRFUk5fU1BSSVRFID0gKG4gJiAwYjAwMDAxMDAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLklOQ1JFTUVOVF9NT0RFID0gKG4gJiAwYjAwMDAwMTAwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLk5BTUVUQUJMRV9ZID0gKG4gJiAwYjAwMDAwMDEwKSA+IDAgPyAxIDogMDtcclxuICAgICAgICB0aGlzLk5BTUVUQUJMRV9YID0gKG4gJiAwYjAwMDAwMDAxKSA+IDAgPyAxIDogMDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmludGVyZmFjZSBQaXhlbEluZm8ge1xyXG4gICAgY29sb3I6IFBpeGVsLFxyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQUFUgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgIHByaXZhdGUgX3RibE5hbWU6IG51bWJlcltdW107XHJcbiAgICBwcml2YXRlIF90YmxQYXR0ZXJuOiBudW1iZXJbXVtdO1xyXG4gICAgcHJpdmF0ZSBfdGJsUGFsZXR0ZTogbnVtYmVyW107XHJcblxyXG4gICAgcHJpdmF0ZSBfc2NyZWVuOiBQaXhlbFtdO1xyXG5cclxuICAgIHByaXZhdGUgX3NjYW5saW5lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jeWNsZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYnVzOiBCdXM7XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICAgIHByaXZhdGUgX2NvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuXHJcbiAgICBwcml2YXRlIF9tYXNrOiBNYXNrO1xyXG4gICAgcHJpdmF0ZSBfc3RhdHVzOiBTdGF0dXM7XHJcblxyXG4gICAgcHJpdmF0ZSBfdnJhbUFkZHI6IExvb3B5UmVnaXN0ZXI7XHJcbiAgICBwcml2YXRlIF90cmFtQWRkcjogTG9vcHlSZWdpc3RlcjtcclxuXHJcbiAgICBwcml2YXRlIF9jb250cm9sOiBDb250cm9sO1xyXG5cclxuICAgIHByaXZhdGUgX2JnU2hpZnRlclBhdHRlcm5MbzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYmdTaGlmdGVyUGF0dGVybkhpOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iZ1NoaWZ0ZXJBdHRyaWJMbzogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfYmdTaGlmdGVyQXR0cmliSGk6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9iZ05leHRUaWxlTHNiOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iZ05leHRUaWxlTXNiOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfYmdOZXh0VGlsZUF0dHJpYjogbnVtYmVyOyAgICBcclxuXHJcbiAgICBwcml2YXRlIF9iZ05leHRUaWxlSWQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9ubWk6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfZmluZVg6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9hZGRyZXNzTGF0Y2g6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9kcmF3QnVmZmVyOiBJbWFnZURhdGE7XHJcblxyXG4gICAgcHJpdmF0ZSBfcGFsU2NyZWVuOiBQaXhlbFtdO1xyXG5cclxuICAgIHByaXZhdGUgX3BwdURhdGFCdWZmZXI6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9waXhlbHM6IFBpeGVsSW5mb1tdO1xyXG5cclxuICAgIHByaXZhdGUgX3Nwcml0ZVNjYW5saW5lOiBPYmpBdHRyaWJ1dGVFbnRyeVtdO1xyXG5cclxuICAgIHByaXZhdGUgX29hbTogT2JqQXR0cmlidXRlRW50cnlbXTtcclxuICAgIHByaXZhdGUgX29hbUFkZHI6IG51bWJlcjtcclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgX3Nwcml0ZVplcm9IaXRQb3NzaWJsZTogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3Nwcml0ZVplcm9CZWluZ1JlbmRlcmVkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX3Nwcml0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9zcHJpdGVTaGlmdGVyUGF0dGVybkxvOiBudW1iZXJbXTtcclxuICAgIHByaXZhdGUgX3Nwcml0ZVNoaWZ0ZXJQYXR0ZXJuSGk6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgX2ZyYW1lQ29tcGxldGU6IGJvb2xlYW47XHJcblxyXG4gICAgcHJpdmF0ZSBfZHJhd0NvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9kcmF3VGltZXI6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3RpbWVMYXN0RnJhbWU6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9idWZmZXI6IEFycmF5QnVmZmVyO1xyXG4gICAgcHJpdmF0ZSBfZnJhbWVCdWZmZXJEYXRhMzI6IFVpbnQzMkFycmF5O1xyXG4gICAgcHJpdmF0ZSBfZnJhbWVCdWZmZXJEYXRhODogVWludDhDbGFtcGVkQXJyYXk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYnVzOiBCdXMpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2J1cyA9IGJ1cztcclxuICAgICAgICB0aGlzLl90YmxOYW1lID0gW107XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl90YmxOYW1lW2ldID0gW107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCAxMDI0OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RibE5hbWVbaV1bal0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3RibFBhdHRlcm4gPSBbXTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RibFBhdHRlcm5baV0gPSBbXTtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IDQwOTY7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGJsUGF0dGVybltpXVtqXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2RyYXdDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fZHJhd1RpbWVyID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lTGFzdEZyYW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fdGJsUGFsZXR0ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3NjcmVlbiA9IG5ldyBBcnJheSgweDQwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NyZWVuXCIpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpOyAgICAgICAgXHJcblxyXG4gICAgICAgIHRoaXMuX2NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIDEwMjQsIDc2OCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2N5Y2xlID0gMDtcclxuICAgICAgICB0aGlzLl9zY2FubGluZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX25taSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9maW5lWCA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX2ZyYW1lQ29tcGxldGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhd0J1ZmZlciA9IHRoaXMuX2NvbnRleHQuY3JlYXRlSW1hZ2VEYXRhKDI1NiwgMjQwKTtcclxuICAgICAgICB0aGlzLl9idWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy5fZHJhd0J1ZmZlci5kYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVCdWZmZXJEYXRhOCA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0aGlzLl9idWZmZXIpOyAgICBcclxuICAgICAgICB0aGlzLl9mcmFtZUJ1ZmZlckRhdGEzMiA9IG5ldyBVaW50MzJBcnJheSh0aGlzLl9idWZmZXIpOyAgICBcclxuXHJcbiAgICAgICAgdGhpcy5fY29udHJvbCA9IG5ldyBDb250cm9sKCk7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IG5ldyBNYXNrKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdHVzID0gbmV3IFN0YXR1cygpO1xyXG5cclxuICAgICAgICB0aGlzLl92cmFtQWRkciA9IG5ldyBMb29weVJlZ2lzdGVyKCk7XHJcbiAgICAgICAgdGhpcy5fdHJhbUFkZHIgPSBuZXcgTG9vcHlSZWdpc3RlcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9iZ1NoaWZ0ZXJQYXR0ZXJuSGkgPSAwO1xyXG4gICAgICAgIHRoaXMuX2JnU2hpZnRlckF0dHJpYkxvID0gMDtcclxuICAgICAgICB0aGlzLl9iZ1NoaWZ0ZXJBdHRyaWJIaSA9IDA7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9iZ05leHRUaWxlTHNiID0gMDtcclxuICAgICAgICB0aGlzLl9iZ05leHRUaWxlTXNiID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fYmdOZXh0VGlsZUF0dHJpYiA9IDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fYWRkcmVzc0xhdGNoID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5fc3ByaXRlWmVyb0hpdFBvc3NpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlWmVyb0JlaW5nUmVuZGVyZWQgPSBmYWxzZTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX3BwdURhdGFCdWZmZXIgPSAwO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgMjU2ICogMjQwICogNDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyYXdCdWZmZXIuZGF0YVtpXSA9IDI1NTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BpeGVscyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9zcHJpdGVTaGlmdGVyUGF0dGVybkhpID0gW107XHJcbiAgICAgICAgdGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5MbyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX3Nwcml0ZVNjYW5saW5lID0gW107XHJcbiAgICAgICAgdGhpcy5fb2FtID0gW107XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA2NDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX29hbVtpXSA9IG5ldyBPYmpBdHRyaWJ1dGVFbnRyeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb2FtQWRkciA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlbiA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgwMF0gPSBuZXcgUGl4ZWwoODQsIDg0LCA4NCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MDFdID0gbmV3IFBpeGVsKDAsIDMwLCAxMTYpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDAyXSA9IG5ldyBQaXhlbCg4LCAxNiwgMTQ0KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgwM10gPSBuZXcgUGl4ZWwoNDgsIDAsIDEzNik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MDRdID0gbmV3IFBpeGVsKDY4LCAwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDA1XSA9IG5ldyBQaXhlbCg5MiwgMCwgNDgpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDA2XSA9IG5ldyBQaXhlbCg4NCwgNCwgMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MDddID0gbmV3IFBpeGVsKDYwLCAyNCwgMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MDhdID0gbmV3IFBpeGVsKDMyLCA0MiwgMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MDldID0gbmV3IFBpeGVsKDgsIDU4LCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgwQV0gPSBuZXcgUGl4ZWwoMCwgNjQsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDBCXSA9IG5ldyBQaXhlbCgwLCA2MCwgMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MENdID0gbmV3IFBpeGVsKDAsIDUwLCA2MCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MERdID0gbmV3IFBpeGVsKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDBFXSA9IG5ldyBQaXhlbCgwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgwRl0gPSBuZXcgUGl4ZWwoMCwgMCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDEwXSA9IG5ldyBQaXhlbCgxNTIsIDE1MCwgMTUyKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgxMV0gPSBuZXcgUGl4ZWwoOCwgNzYsIDE5Nik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MTJdID0gbmV3IFBpeGVsKDQ4LCA1MCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgxM10gPSBuZXcgUGl4ZWwoOTIsIDMwLCAyMjgpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDE0XSA9IG5ldyBQaXhlbCgxMzYsIDIwLCAxNzYpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDE1XSA9IG5ldyBQaXhlbCgxNjAsIDIwLCAxMDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDE2XSA9IG5ldyBQaXhlbCgxNTIsIDM0LCAzMik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MTddID0gbmV3IFBpeGVsKDEyMCwgNjAsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDE4XSA9IG5ldyBQaXhlbCg4NCwgOTAsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDE5XSA9IG5ldyBQaXhlbCg0MCwgMTE0LCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgxQV0gPSBuZXcgUGl4ZWwoOCwgMTI0LCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgxQl0gPSBuZXcgUGl4ZWwoMCwgMTE4LCA0MCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MUNdID0gbmV3IFBpeGVsKDAsIDEwMiwgMTIwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgxRF0gPSBuZXcgUGl4ZWwoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MUVdID0gbmV3IFBpeGVsKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDFGXSA9IG5ldyBQaXhlbCgwLCAwLCAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MjBdID0gbmV3IFBpeGVsKDIzNiwgMjM4LCAyMzYpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDIxXSA9IG5ldyBQaXhlbCg3NiwgMTU0LCAyMzYpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDIyXSA9IG5ldyBQaXhlbCgxMjAsIDEyNCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyM10gPSBuZXcgUGl4ZWwoMTc2LCA5OCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyNF0gPSBuZXcgUGl4ZWwoMjI4LCA4NCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyNV0gPSBuZXcgUGl4ZWwoMjM2LCA4OCwgMTgwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyNl0gPSBuZXcgUGl4ZWwoMjM2LCAxMDYsIDEwMCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MjddID0gbmV3IFBpeGVsKDIxMiwgMTM2LCAzMik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MjhdID0gbmV3IFBpeGVsKDE2MCwgMTcwLCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyOV0gPSBuZXcgUGl4ZWwoMTE2LCAxOTYsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDJBXSA9IG5ldyBQaXhlbCg3NiwgMjA4LCAzMik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MkJdID0gbmV3IFBpeGVsKDU2LCAyMDQsIDEwOCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MkNdID0gbmV3IFBpeGVsKDU2LCAxODAsIDIwNCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MkRdID0gbmV3IFBpeGVsKDYwLCA2MCwgNjApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDJFXSA9IG5ldyBQaXhlbCgwLCAwLCAwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgyRl0gPSBuZXcgUGl4ZWwoMCwgMCwgMCk7XHJcblxyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDMwXSA9IG5ldyBQaXhlbCgyMzYsIDIzOCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgzMV0gPSBuZXcgUGl4ZWwoMTY4LCAyMDQsIDIzNik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MzJdID0gbmV3IFBpeGVsKDE4OCwgMTg4LCAyMzYpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDMzXSA9IG5ldyBQaXhlbCgyMTIsIDE3OCwgMjM2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgzNF0gPSBuZXcgUGl4ZWwoMjM2LCAxNzQsIDIzNik7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MzVdID0gbmV3IFBpeGVsKDIzNiwgMTc0LCAyMTIpO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDM2XSA9IG5ldyBQaXhlbCgyMzYsIDE4MCwgMTc2KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgzN10gPSBuZXcgUGl4ZWwoMjI4LCAxOTYsIDE0NCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4MzhdID0gbmV3IFBpeGVsKDIwNCwgMjEwLCAxMjApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDM5XSA9IG5ldyBQaXhlbCgxODAsIDIyMiwgMTIwKTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgzQV0gPSBuZXcgUGl4ZWwoMTY4LCAyMjYsIDE0NCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4M0JdID0gbmV3IFBpeGVsKDE1MiwgMjI2LCAxODApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDNDXSA9IG5ldyBQaXhlbCgxNjAsIDIxNCwgMjI4KTtcclxuICAgICAgICB0aGlzLl9wYWxTY3JlZW5bMHgzRF0gPSBuZXcgUGl4ZWwoMTYwLCAxNjIsIDE2MCk7XHJcbiAgICAgICAgdGhpcy5fcGFsU2NyZWVuWzB4M0VdID0gbmV3IFBpeGVsKDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX3BhbFNjcmVlblsweDNGXSA9IG5ldyBQaXhlbCgwLCAwLCAwKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUHVsc2UoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBJbmNyZW1lbnRTY3JvbGxYID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9tYXNrLlJFTkRFUl9CQUNLR1JPVU5EIHx8IHRoaXMuX21hc2suUkVOREVSX1NQUklURVMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9YID09PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9YID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5OQU1FVEFCTEVfWCA9ICh0aGlzLl92cmFtQWRkci5OQU1FVEFCTEVfWCA9PT0gMSkgPyAwIDogMTsgLy8gV0FTIEJJVFdJU0UgTk9UVEVEIEhNTVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5DT0FSU0VfWCsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgSW5jcmVtZW50U2Nyb2xsWSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fbWFzay5SRU5ERVJfQkFDS0dST1VORCB8fCB0aGlzLl9tYXNrLlJFTkRFUl9TUFJJVEVTKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl92cmFtQWRkci5GSU5FX1kgPCA3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdnJhbUFkZHIuRklORV9ZKys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLkZJTkVfWSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fdnJhbUFkZHIuQ09BUlNFX1kgPT0gMjkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdnJhbUFkZHIuQ09BUlNFX1kgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5OQU1FVEFCTEVfWSA9ICh0aGlzLl92cmFtQWRkci5OQU1FVEFCTEVfWSA9PT0gMSkgPyAwIDogMTsgLy8gV0FTIEJJVFdJU0UgTk9UVEVEIEhNTVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9ZID09IDMxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5DT0FSU0VfWSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5DT0FSU0VfWSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgVHJhbnNmZXJBZGRyZXNzWCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fbWFzay5SRU5ERVJfQkFDS0dST1VORCB8fCB0aGlzLl9tYXNrLlJFTkRFUl9TUFJJVEVTKSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdnJhbUFkZHIuTkFNRVRBQkxFX1ggPSB0aGlzLl90cmFtQWRkci5OQU1FVEFCTEVfWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9YID0gdGhpcy5fdHJhbUFkZHIuQ09BUlNFX1g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBUcmFuc2ZlckFkZHJlc3NZID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9tYXNrLlJFTkRFUl9CQUNLR1JPVU5EIHx8IHRoaXMuX21hc2suUkVOREVSX1NQUklURVMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLkZJTkVfWSA9IHRoaXMuX3RyYW1BZGRyLkZJTkVfWTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLk5BTUVUQUJMRV9ZID0gdGhpcy5fdHJhbUFkZHIuTkFNRVRBQkxFX1k7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5DT0FSU0VfWSA9IHRoaXMuX3RyYW1BZGRyLkNPQVJTRV9ZO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgTG9hZEJhY2tncm91bmRTaGlmdGVycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYmdTaGlmdGVyUGF0dGVybkxvID0gKHRoaXMuX2JnU2hpZnRlclBhdHRlcm5MbyAmIDB4RkYwMCkgfCB0aGlzLl9iZ05leHRUaWxlTHNiO1xyXG4gICAgICAgICAgICB0aGlzLl9iZ1NoaWZ0ZXJQYXR0ZXJuSGkgPSAodGhpcy5fYmdTaGlmdGVyUGF0dGVybkhpICYgMHhGRjAwKSB8IHRoaXMuX2JnTmV4dFRpbGVNc2I7XHJcbiAgICAgICAgICAgIHRoaXMuX2JnU2hpZnRlckF0dHJpYkxvID0gKHRoaXMuX2JnU2hpZnRlckF0dHJpYkxvICYgMHhGRjAwKSB8ICgodGhpcy5fYmdOZXh0VGlsZUF0dHJpYiAmIDBiMDEpID8gMHhGRiA6IDB4MDApO1xyXG4gICAgICAgICAgICB0aGlzLl9iZ1NoaWZ0ZXJBdHRyaWJIaSA9ICh0aGlzLl9iZ1NoaWZ0ZXJBdHRyaWJIaSAmIDB4RkYwMCkgfCAoKHRoaXMuX2JnTmV4dFRpbGVBdHRyaWIgJiAwYjEwKSA/IDB4RkYgOiAweDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBVcGRhdGVTaGlmdGVycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYodGhpcy5fbWFzay5SRU5ERVJfQkFDS0dST1VORCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmdTaGlmdGVyUGF0dGVybkxvID0gKHRoaXMuX2JnU2hpZnRlclBhdHRlcm5MbyA8PCAxKSAmIDB4RkZGRjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JnU2hpZnRlclBhdHRlcm5IaSA9ICh0aGlzLl9iZ1NoaWZ0ZXJQYXR0ZXJuSGkgPDwgMSkgJiAweEZGRkY7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZ1NoaWZ0ZXJBdHRyaWJMbyA9ICh0aGlzLl9iZ1NoaWZ0ZXJBdHRyaWJMbyA8PCAxKSAmIDB4RkZGRjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JnU2hpZnRlckF0dHJpYkhpID0gKHRoaXMuX2JnU2hpZnRlckF0dHJpYkhpIDw8IDEpICYgMHhGRkZGO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLl9tYXNrLlJFTkRFUl9TUFJJVEVTICYmIHRoaXMuX2N5Y2xlID49IDEgJiYgdGhpcy5fY3ljbGUgPCAyNTgpIHtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uWCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uWC0tO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5Mb1tpXSA9ICh0aGlzLl9zcHJpdGVTaGlmdGVyUGF0dGVybkxvW2ldIDw8IDEpICYgMHhGRjtcclxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVTaGlmdGVyUGF0dGVybkhpW2ldID0gKHRoaXMuX3Nwcml0ZVNoaWZ0ZXJQYXR0ZXJuSGlbaV0gPDwgMSkgJiAweEZGO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX3NjYW5saW5lID49IC0xICYmIHRoaXMuX3NjYW5saW5lIDwgMjQwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NjYW5saW5lID09PSAwICYmIHRoaXMuX2N5Y2xlID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3ljbGUgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NjYW5saW5lID09IC0xICYmIHRoaXMuX2N5Y2xlID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXR1cy5WRVJUSUNBTF9CTEFOSyA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzLlNQUklURV9PVkVSRkxPVyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0dXMuU1BSSVRFX1pFUk9fSElUID0gMDtcclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVTaGlmdGVyUGF0dGVybkxvW2ldID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVTaGlmdGVyUGF0dGVybkhpW2ldID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoKHRoaXMuX2N5Y2xlID49IDIgJiYgdGhpcy5fY3ljbGUgPCAyNTgpIHx8ICh0aGlzLl9jeWNsZSA+PSAzMjEgJiYgdGhpcy5fY3ljbGUgPCAzMzgpKSB7XHJcbiAgICAgICAgICAgICAgICBVcGRhdGVTaGlmdGVycygpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKCh0aGlzLl9jeWNsZSAtIDEpICUgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgTG9hZEJhY2tncm91bmRTaGlmdGVycygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iZ05leHRUaWxlSWQgPSB0aGlzLl9QcHVSZWFkKDB4MjAwMCB8ICh0aGlzLl92cmFtQWRkci5EYXRhKCkgJiAweDBGRkYpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iZ05leHRUaWxlQXR0cmliID0gdGhpcy5fUHB1UmVhZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDB4MjNDMCAgfCAodGhpcy5fdnJhbUFkZHIuTkFNRVRBQkxFX1kgPDwgMTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKHRoaXMuX3ZyYW1BZGRyLk5BTUVUQUJMRV9YIDw8IDEwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICgodGhpcy5fdnJhbUFkZHIuQ09BUlNFX1kgPj4gMikgPDwgMylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAodGhpcy5fdnJhbUFkZHIuQ09BUlNFX1ggPj4gMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl92cmFtQWRkci5DT0FSU0VfWSAmIDB4MDIpIHRoaXMuX2JnTmV4dFRpbGVBdHRyaWIgPj49IDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9YICYgMHgwMikgdGhpcy5fYmdOZXh0VGlsZUF0dHJpYiA+Pj0gMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmdOZXh0VGlsZUF0dHJpYiAmPSAweDAzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9iZ05leHRUaWxlTHNiID0gdGhpcy5fUHB1UmVhZCgodGhpcy5fY29udHJvbC5QQVRURVJOX0JBQ0tHUk9VTkQgPDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKCh0aGlzLl9iZ05leHRUaWxlSWQgPDwgNCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgKHRoaXMuX3ZyYW1BZGRyLkZJTkVfWSkgKyAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA2OiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYmdOZXh0VGlsZU1zYiA9IHRoaXMuX1BwdVJlYWQoKHRoaXMuX2NvbnRyb2wuUEFUVEVSTl9CQUNLR1JPVU5EIDw8IDEyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICgodGhpcy5fYmdOZXh0VGlsZUlkIDw8IDQpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArICh0aGlzLl92cmFtQWRkci5GSU5FX1kpICsgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNzogXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEluY3JlbWVudFNjcm9sbFgoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fY3ljbGUgPT09IDI1Nikge1xyXG4gICAgICAgICAgICAgICAgSW5jcmVtZW50U2Nyb2xsWSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2N5Y2xlID09PSAyNTcpIHtcclxuICAgICAgICAgICAgICAgIExvYWRCYWNrZ3JvdW5kU2hpZnRlcnMoKTtcclxuICAgICAgICAgICAgICAgIFRyYW5zZmVyQWRkcmVzc1goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9jeWNsZSA9PT0gMzM4IHx8IHRoaXMuX2N5Y2xlID09PSAzNDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JnTmV4dFRpbGVJZCA9IHRoaXMuX1BwdVJlYWQoMHgyMDAwIHwgKHRoaXMuX3ZyYW1BZGRyLkRhdGEoKSAmIDB4MEZGRikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NjYW5saW5lID09IC0xICYmIHRoaXMuX2N5Y2xlID49IDI4MCAmJiB0aGlzLl9jeWNsZSA8IDMwNSkge1xyXG4gICAgICAgICAgICAgICAgVHJhbnNmZXJBZGRyZXNzWSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLl9jeWNsZSA9PT0gMjU3ICYmIHRoaXMuX3NjYW5saW5lID49IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVTY2FubGluZVtpXSA9IG5ldyBPYmpBdHRyaWJ1dGVFbnRyeSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLkFUVFJJQlVURSA9IDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uWSA9IDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uWCA9IDB4RkY7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uSUQgPSAweEZGOyAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVNoaWZ0ZXJQYXR0ZXJuTG9baV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVNoaWZ0ZXJQYXR0ZXJuSGlbaV0gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuT0FNRW50cnkgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlWmVyb0hpdFBvc3NpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hpbGUobk9BTUVudHJ5IDwgNjQgJiYgdGhpcy5fc3ByaXRlQ291bnQgPCA5KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmID0gdGhpcy5fc2NhbmxpbmUgLSB0aGlzLl9vYW1bbk9BTUVudHJ5XS5ZO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZihkaWZmID49IDAgJiYgZGlmZiA8ICh0aGlzLl9jb250cm9sLlNQUklURV9TSVpFID8gMTYgOiA4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9zcHJpdGVDb3VudCA8IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5PQU1FbnRyeSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nwcml0ZVplcm9IaXRQb3NzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVTY2FubGluZVt0aGlzLl9zcHJpdGVDb3VudF0uQVRUUklCVVRFID0gdGhpcy5fb2FtW25PQU1FbnRyeV0uQVRUUklCVVRFO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbdGhpcy5fc3ByaXRlQ291bnRdLlggPSB0aGlzLl9vYW1bbk9BTUVudHJ5XS5YO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbdGhpcy5fc3ByaXRlQ291bnRdLlkgPSB0aGlzLl9vYW1bbk9BTUVudHJ5XS5ZO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2NhbmxpbmVbdGhpcy5fc3ByaXRlQ291bnRdLklEID0gdGhpcy5fb2FtW25PQU1FbnRyeV0uSUQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlQ291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgbk9BTUVudHJ5Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXR1cy5TUFJJVEVfT1ZFUkZMT1cgPSAodGhpcy5fc3ByaXRlQ291bnQgPiA4KSA/IDEgOiAwO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fY3ljbGUgPT09IDM0MCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVDb3VudDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGVQYXR0ZXJuQml0c0xvOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGVQYXR0ZXJuQml0c0hpOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGVQYXR0ZXJuQWRkckxvOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGVQYXR0ZXJuQWRkckhpOiBudW1iZXIgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9jb250cm9sLlNQUklURV9TSVpFID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZigodGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uQVRUUklCVVRFICYgMHg4MCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5BZGRyTG8gPSAodGhpcy5fY29udHJvbC5QQVRURVJOX1NQUklURSA8PCAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEIDw8IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICh0aGlzLl9zY2FubGluZSAtIHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLlkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVQYXR0ZXJuQWRkckxvID0gKHRoaXMuX2NvbnRyb2wuUEFUVEVSTl9TUFJJVEUgPDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICh0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5JRCA8PCA0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoNy0odGhpcy5fc2NhbmxpbmUgLSB0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5ZKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLkFUVFJJQlVURSAmIDB4ODApID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fc2NhbmxpbmUgLSB0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5ZIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5BZGRyTG8gPSAoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEICYgMHgwMSkgPDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEICYgMHhGRSkgPDwgNClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICgodGhpcy5fc2NhbmxpbmUgLSB0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5ZKSAmIDB4MDcpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5BZGRyTG8gPSAoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEICYgMHgwMSkgPDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoKCh0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5JRCAmIDB4RkUpKzEpIDw8IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoKHRoaXMuX3NjYW5saW5lIC0gdGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uWSkgJiAweDA3KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fc2NhbmxpbmUgLSB0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5ZIDwgOCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5BZGRyTG8gPSAoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEICYgMHgwMSkgPDwgMTIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoKCh0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5JRCAmIDB4RkUpKzEpIDw8IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoNyAtICh0aGlzLl9zY2FubGluZSAtIHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLlkpICYgMHgwNylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlUGF0dGVybkFkZHJMbyA9ICgodGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uSUQgJiAweDAxKSA8PCAxMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICgoKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLklEICYgMHhGRSkpIDw8IDQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfCAoNyAtICh0aGlzLl9zY2FubGluZSAtIHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLlkpICYgMHgwNylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVQYXR0ZXJuQWRkckhpID0gc3ByaXRlUGF0dGVybkFkZHJMbyArIDg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5CaXRzTG8gPSB0aGlzLl9QcHVSZWFkKHNwcml0ZVBhdHRlcm5BZGRyTG8pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZVBhdHRlcm5CaXRzSGkgPSB0aGlzLl9QcHVSZWFkKHNwcml0ZVBhdHRlcm5BZGRySGkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZigodGhpcy5fc3ByaXRlU2NhbmxpbmVbaV0uQVRUUklCVVRFICYgMHg0MCkgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmxpcGJ5dGUgPSAoYjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiID0gKGIgJiAweEYwKSA+PiA0IHwgKGIgJiAweDBGKSA8PCA0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYiA9IChiICYgMHhDQykgPj4gMiB8IChiICYgMHgzMykgPDwgMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIgPSAoYiAmIDB4QUEpID4+IDEgfCAoYiAmIDB4NTUpIDw8IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlUGF0dGVybkJpdHNMbyA9IGZsaXBieXRlKHNwcml0ZVBhdHRlcm5CaXRzTG8pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVQYXR0ZXJuQml0c0hpID0gZmxpcGJ5dGUoc3ByaXRlUGF0dGVybkJpdHNIaSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5Mb1tpXSA9IHNwcml0ZVBhdHRlcm5CaXRzTG87XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5IaVtpXSA9IHNwcml0ZVBhdHRlcm5CaXRzSGk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fc2NhbmxpbmUgPT09IDI0MCkge1xyXG4gICAgICAgICAgICAvLyBub3RoaW5nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX3NjYW5saW5lID49IDI0MSAmJiB0aGlzLl9zY2FubGluZSA8IDI2MSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9zY2FubGluZSA9PT0gMjQxICYmIHRoaXMuX2N5Y2xlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0dXMuVkVSVElDQUxfQkxBTksgPSAxO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY29udHJvbC5FTkFCTEVfTk1JKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm1pID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBsZXQgYmdQaXhlbCA9IDB4MDA7XHJcbiAgICAgICAgbGV0IGJnUGFsZXR0ZSA9IDB4MDA7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX21hc2suUkVOREVSX0JBQ0tHUk9VTkQpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBiaXRNdXg6IG51bWJlciA9IDB4ODAwMCA+PiB0aGlzLl9maW5lWDtcclxuXHJcbiAgICAgICAgICAgIGxldCBwMFBpeGVsOiBudW1iZXIgPSAodGhpcy5fYmdTaGlmdGVyUGF0dGVybkxvICYgYml0TXV4KSA+IDAgPyAxIDogMDtcclxuICAgICAgICAgICAgbGV0IHAxUGl4ZWw6IG51bWJlciA9ICh0aGlzLl9iZ1NoaWZ0ZXJQYXR0ZXJuSGkgJiBiaXRNdXgpID4gMCA/IDEgOiAwO1xyXG5cclxuICAgICAgICAgICAgYmdQaXhlbCA9IChwMVBpeGVsIDw8IDEpIHwgcDBQaXhlbDtcclxuXHJcbiAgICAgICAgICAgIGxldCBiZ1BhbDAgPSAodGhpcy5fYmdTaGlmdGVyQXR0cmliTG8gJiBiaXRNdXgpID4gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICBsZXQgYmdQYWwxID0gKHRoaXMuX2JnU2hpZnRlckF0dHJpYkhpICYgYml0TXV4KSA+IDAgPyAxIDogMDtcclxuXHJcbiAgICAgICAgICAgIGJnUGFsZXR0ZSA9IChiZ1BhbDEgPDwgMSkgfCBiZ1BhbDA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZnUGl4ZWwgPSAweDA7XHJcbiAgICAgICAgbGV0IGZnUGFsZXR0ZSA9IDB4MDtcclxuICAgICAgICBsZXQgZmdQcmlvcml0eSA9IDB4MDtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fbWFzay5SRU5ERVJfU1BSSVRFUykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fc3ByaXRlWmVyb0JlaW5nUmVuZGVyZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9zcHJpdGVDb3VudDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICBpZih0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5YID09PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZ1BpeGVsTG86IG51bWJlciA9ICgodGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5Mb1tpXSAmIDB4ODApID4gMCkgPyAxIDogMFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmZ1BpeGVsSGk6IG51bWJlciA9ICgodGhpcy5fc3ByaXRlU2hpZnRlclBhdHRlcm5IaVtpXSAmIDB4ODApID4gMCkgPyAxIDogMFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmZ1BpeGVsID0gKGZnUGl4ZWxIaSA8PCAxKSB8IGZnUGl4ZWxMbztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZmdQYWxldHRlID0gKHRoaXMuX3Nwcml0ZVNjYW5saW5lW2ldLkFUVFJJQlVURSAmIDB4MDMpICsgMHgwNDtcclxuICAgICAgICAgICAgICAgICAgICBmZ1ByaW9yaXR5ID0gKCh0aGlzLl9zcHJpdGVTY2FubGluZVtpXS5BVFRSSUJVVEUgJiAweDIwKSA9PT0gMCkgPyAxIDogMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZmdQaXhlbCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcHJpdGVaZXJvQmVpbmdSZW5kZXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGZpbmFsUGl4ZWw6IG51bWJlciA9IDB4MDtcclxuICAgICAgICBsZXQgZmluYWxQYWxldHRlOiBudW1iZXIgPSAweDA7XHJcblxyXG4gICAgICAgIGlmKGJnUGl4ZWwgPT09IDAgJiYgZmdQaXhlbCA9PT0gMCkge1xyXG4gICAgICAgICAgICBmaW5hbFBpeGVsID0gMHgwO1xyXG4gICAgICAgICAgICBmaW5hbFBhbGV0dGUgPSAweDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoYmdQaXhlbCA9PT0gMCAmJiBmZ1BpeGVsID4gMCkge1xyXG4gICAgICAgICAgICBmaW5hbFBpeGVsID0gZmdQaXhlbDtcclxuICAgICAgICAgICAgZmluYWxQYWxldHRlID0gZmdQYWxldHRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGJnUGl4ZWwgPiAwICYmIGZnUGl4ZWwgPT09IDApIHtcclxuICAgICAgICAgICAgZmluYWxQaXhlbCA9IGJnUGl4ZWw7XHJcbiAgICAgICAgICAgIGZpbmFsUGFsZXR0ZSA9IGJnUGFsZXR0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihiZ1BpeGVsID4gMCAmJiBmZ1BpeGVsID4gMCkge1xyXG5cclxuICAgICAgICAgICAgaWYoZmdQcmlvcml0eSkge1xyXG4gICAgICAgICAgICAgICAgZmluYWxQaXhlbCA9IGZnUGl4ZWw7XHJcbiAgICAgICAgICAgICAgICBmaW5hbFBhbGV0dGUgPSBmZ1BhbGV0dGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaW5hbFBpeGVsID0gYmdQaXhlbDtcclxuICAgICAgICAgICAgICAgIGZpbmFsUGFsZXR0ZSA9IGJnUGFsZXR0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fc3ByaXRlWmVyb0hpdFBvc3NpYmxlICYmIHRoaXMuX3Nwcml0ZVplcm9CZWluZ1JlbmRlcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9tYXNrLlJFTkRFUl9CQUNLR1JPVU5EX0xFRlQgJiYgdGhpcy5fbWFzay5SRU5ERVJfU1BSSVRFU19MRUZUKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5fbWFzay5SRU5ERVJfQkFDS0dST1VORF9MRUZUICYmIHRoaXMuX21hc2suUkVOREVSX1NQUklURVNfTEVGVCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZih0aGlzLl9jeWNsZSA+PSA5ICYmIHRoaXMuX2N5Y2xlIDwgMjU4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICB0aGlzLl9zdGF0dXMuU1BSSVRFX1pFUk9fSElUID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N5Y2xlID49IDEgJiYgdGhpcy5fY3ljbGUgPCAyNTgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0YXR1cy5TUFJJVEVfWkVST19ISVQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgeCA9ICh0aGlzLl9jeWNsZSAtIDEpO1xyXG4gICAgICAgIGxldCB5ID0gdGhpcy5fc2NhbmxpbmU7XHJcblxyXG4gICAgICAgIGxldCBjb2xvcjogUGl4ZWwgPSB0aGlzLkdldENvbG9yKGZpbmFsUGFsZXR0ZSwgZmluYWxQaXhlbCk7XHJcblxyXG4gICAgICAgIC8vIHRoaXMuX3BpeGVscy5wdXNoKHtcclxuICAgICAgICAvLyAgICAgY29sb3I6IGNvbG9yLFxyXG4gICAgICAgIC8vICAgICB4OiB4LFxyXG4gICAgICAgIC8vICAgICB5OiB5XHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgbGV0IGluZGV4ID0gKCh5ICogKHRoaXMuX2RyYXdCdWZmZXIud2lkdGggKiA0KSkgKyAoeCAqIDQpKTtcclxuXHJcbiAgICAgICAgdGhpcy5fZHJhd0J1ZmZlci5kYXRhW2luZGV4XSA9IGNvbG9yLnI7XHJcbiAgICAgICAgdGhpcy5fZHJhd0J1ZmZlci5kYXRhW2luZGV4KzFdID0gY29sb3IuZztcclxuICAgICAgICB0aGlzLl9kcmF3QnVmZmVyLmRhdGFbaW5kZXgrMl0gPSBjb2xvci5iO1xyXG5cclxuICAgICAgICB0aGlzLl9jeWNsZSsrO1xyXG5cclxuICAgICAgICBpZih0aGlzLl9jeWNsZSA+PSAzNDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fY3ljbGUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9zY2FubGluZSsrO1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fc2NhbmxpbmUgPj0gMjYxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2FubGluZSA9IC0xO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGxldCBibGl0UmVjdCA9ICh4LCB5LCBjb2xvcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vICAgICBmb3IobGV0IGkgPSB5OyBpIDw9IHk7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBmb3IobGV0IGogPSB4OyBqIDw9IHg7IGorKyApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX2RyYXdCdWZmZXIuZGF0YVsoKCh5K2kpICogKHRoaXMuX2RyYXdCdWZmZXIud2lkdGggKiA0KSkgKyAoKHgraikgKiA0KSldID0gY29sb3IucjtcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRoaXMuX2RyYXdCdWZmZXIuZGF0YVsoKCh5K2kpICogKHRoaXMuX2RyYXdCdWZmZXIud2lkdGggKiA0KSkgKyAoKHgraikgKiA0KSkrMV0gPSBjb2xvci5nO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdGhpcy5fZHJhd0J1ZmZlci5kYXRhWygoKHkraSkgKiAodGhpcy5fZHJhd0J1ZmZlci53aWR0aCAqIDQpKSArICgoeCtqKSAqIDQpKSsyXSA9IGNvbG9yLmI7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZyYW1lQ29tcGxldGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWx0YSA9IHBlcmZvcm1hbmNlLm5vdygpIC0gdGhpcy5fdGltZUxhc3RGcmFtZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdUaW1lciArPSBkZWx0YTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kcmF3VGltZXIgPiAxMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhd1RpbWVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBQVV9EUkFXUzogXCIgKyB0aGlzLl9kcmF3Q291bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYXdDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUxhc3RGcmFtZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9waXhlbHMubGVuZ3RoOyBpKz0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHA6IFBpeGVsSW5mbyA9IHRoaXMuX3BpeGVsc1tNYXRoLmZsb29yKGkpXTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgaW5kZXggPSAoKHAueSAqICh0aGlzLl9kcmF3QnVmZmVyLndpZHRoICogNCkpICsgKHAueCAqIDQpKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9kcmF3QnVmZmVyLmRhdGFbaW5kZXhdID0gcC5jb2xvci5yO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIHRoaXMuX2RyYXdCdWZmZXIuZGF0YVtpbmRleCsxXSA9IHAuY29sb3IuZztcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLl9kcmF3QnVmZmVyLmRhdGFbaW5kZXgrMl0gPSBwLmNvbG9yLmI7XHJcbiAgICAgICAgICAgICAgICAvLyB9ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wdXRJbWFnZURhdGEodGhpcy5fZHJhd0J1ZmZlciwgNjQsIDY0KTtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5fcGl4ZWxzID0gW107XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVhZChhZGRyZXNzOiBudW1iZXIsIHJkT25seTogYm9vbGVhbik6IG51bWJlciB7ICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IGRhdGE6IG51bWJlciA9IDA7XHJcbiAgICAgICAgYWRkcmVzcyAmPSAweDAwMDc7XHJcblxyXG4gICAgICAgIGlmKHJkT25seSkge1xyXG4gICAgICAgICAgICBzd2l0Y2goYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDAwMDA6IC8vIENvbnRyb2xcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fY29udHJvbC5EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDAwMTogLy8gTWFza1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9tYXNrLkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDAyOiAvLyBTdGF0dXNcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fc3RhdHVzLkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDAzOiAvLyBPQU0gQWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDAwMDQ6IC8vIE9BTSBEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDAwNTogLy8gU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDAwNjogLy8gUFBVIEFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDA3OiAvLyBQUFUgRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoKGFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDAwOiAvLyBDb250cm9sXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX2NvbnRyb2wuRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDAwMDE6IC8vIE1hc2tcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fbWFzay5EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDAwMjogLy8gU3RhdHVzXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX3N0YXR1cy5EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3RhdHVzLlZFUlRJQ0FMX0JMQU5LID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRyZXNzTGF0Y2ggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDAwMDM6IC8vIE9BTSBBZGRyZXNzXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDB4MDAwNDogLy8gT0FNIERhdGFcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKHRoaXMuX29hbUFkZHIgLyA0KTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5fb2FtQWRkciAlIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX29hbVtpbmRleF0uUmVhZEJ5dGUob2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDA1OiAvLyBTY3JvbGxcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMHgwMDA2OiAvLyBQUFUgQWRkcmVzc1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAweDAwMDc6IC8vIFBQVSBEYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGQ6IG51bWJlciA9IHRoaXMuX3ZyYW1BZGRyLkRhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fcHB1RGF0YUJ1ZmZlcjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcHVEYXRhQnVmZmVyID0gdGhpcy5fUHB1UmVhZChkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkID49IDB4M0YwMCkgZGF0YSA9IHRoaXMuX3BwdURhdGFCdWZmZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdnJhbUFkZHIuU2V0KGQgKyAodGhpcy5fY29udHJvbC5JTkNSRU1FTlRfTU9ERSA/IDMyIDogMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFdyaXRlKGFkZHJlc3M6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGFkZHJlc3MgJj0gMHgwMDA3O1xyXG5cclxuICAgICAgICBzd2l0Y2goYWRkcmVzcykge1xyXG4gICAgICAgICAgICBjYXNlIDB4MDAwMDogLy8gQ29udHJvbFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29udHJvbC5TZXQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbUFkZHIuTkFNRVRBQkxFX1ggPSB0aGlzLl9jb250cm9sLk5BTUVUQUJMRV9YO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbUFkZHIuTkFNRVRBQkxFX1kgPSB0aGlzLl9jb250cm9sLk5BTUVUQUJMRV9ZO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMHgwMDAxOiAvLyBNYXNrXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXNrLlNldCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAweDAwMDI6IC8vIFN0YXR1cyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDB4MDAwMzogLy8gT0FNIEFkZHJlc3NcclxuICAgICAgICAgICAgICAgIHRoaXMuX29hbUFkZHIgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDB4MDAwNDogLy8gT0FNIERhdGFcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IodGhpcy5fb2FtQWRkciAvIDQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuX29hbUFkZHIgJSA0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2FtW2luZGV4XS5Xcml0ZUJ5dGUob2Zmc2V0LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAweDAwMDU6IC8vIFNjcm9sbFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYWRkcmVzc0xhdGNoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmluZVggPSB2YWx1ZSAmIDB4MDc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbUFkZHIuQ09BUlNFX1ggPSB2YWx1ZSA+PiAzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZHJlc3NMYXRjaCA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW1BZGRyLkZJTkVfWSA9IHZhbHVlICYgMHgwNztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90cmFtQWRkci5DT0FSU0VfWSA9IHZhbHVlID4+IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkcmVzc0xhdGNoID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDB4MDAwNjogLy8gUFBVIEFkZHJlc3NcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2FkZHJlc3NMYXRjaCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RyYW1BZGRyLlNldCgoKHZhbHVlICYgMHgzRikgPDwgOCkgfCAodGhpcy5fdHJhbUFkZHIuRGF0YSgpICYgMHgwMEZGKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkcmVzc0xhdGNoID0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdHJhbUFkZHIuU2V0KCh0aGlzLl90cmFtQWRkci5EYXRhKCkgJiAweEZGMDApIHwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZyYW1BZGRyLlNldCh0aGlzLl90cmFtQWRkci5EYXRhKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZHJlc3NMYXRjaCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAweDAwMDc6IC8vIFBQVSBEYXRhXHJcbiAgICAgICAgICAgICAgICBsZXQgZDogbnVtYmVyID0gdGhpcy5fdnJhbUFkZHIuRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fUHB1V3JpdGUoZCwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl92cmFtQWRkci5TZXQoZCArICh0aGlzLl9jb250cm9sLklOQ1JFTUVOVF9NT0RFID8gMzIgOiAxKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3N0YXR1cy5QUkVWX1dSSVRFX0xTQiA9ICh2YWx1ZSAmIDBiMDAwMTExMTEpO1xyXG4gXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENvbG9yKHBhbGV0dGUsIHBpeGVsKTogUGl4ZWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYWxTY3JlZW5bdGhpcy5fUHB1UmVhZCgweDNGMDAgKyAoKHBhbGV0dGUgPDwgMikpICsgcGl4ZWwpICYgMHgzRl07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9BTShpbmRleDogbnVtYmVyLCBkYXRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbmV3SW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gNCk7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IGluZGV4ICUgNDtcclxuICAgICAgICB0aGlzLl9vYW1bbmV3SW5kZXhdLldyaXRlQnl0ZShvZmZzZXQsIGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1BwdVJlYWQoYWRkcmVzczogbnVtYmVyKTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgYWRkcmVzcyAmPSAweDNGRkY7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLl9idXMuUmVhZChhZGRyZXNzKTtcclxuXHJcbiAgICAgICAgaWYoZGF0YSA9PT0gLTEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKGFkZHJlc3MgPj0gMHgwMDAwICYmIGFkZHJlc3MgPD0gMHgxRkZGKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5fdGJsUGF0dGVyblsoYWRkcmVzcyAmIDB4MTAwMCkgPj4gMTJdW2FkZHJlc3MgJiAweDBGRkZdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoYWRkcmVzcyA+PSAweDIwMDAgJiYgYWRkcmVzcyA8PSAweDNFRkYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzICY9IDB4MEZGRjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDAwMDAgJiYgYWRkcmVzcyA8PSAweDAzRkYpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX3RibE5hbWVbMF1bYWRkcmVzcyAmIDB4MDNGRl07XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDA0MDAgJiYgYWRkcmVzcyA8PSAweDA3RkYpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX3RibE5hbWVbMV1bYWRkcmVzcyAmIDB4MDNGRl07XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDA4MDAgJiYgYWRkcmVzcyA8PSAweDBCRkYpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX3RibE5hbWVbMF1bYWRkcmVzcyAmIDB4MDNGRl07XHJcbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDBDMDAgJiYgYWRkcmVzcyA8PSAweDBGRkYpXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMuX3RibE5hbWVbMV1bYWRkcmVzcyAmIDB4MDNGRl07XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoYWRkcmVzcyA+PSAweDNGMDAgJiYgYWRkcmVzcyA8PSAweDNGRkYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzICY9IDB4MDAxRjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihhZGRyZXNzID09PSAweDAwMTApIGFkZHJlc3MgPSAweDAwMDA7XHJcbiAgICAgICAgICAgICAgICBpZihhZGRyZXNzID09PSAweDAwMTQpIGFkZHJlc3MgPSAweDAwMDQ7XHJcbiAgICAgICAgICAgICAgICBpZihhZGRyZXNzID09PSAweDAwMTgpIGFkZHJlc3MgPSAweDAwMDg7XHJcbiAgICAgICAgICAgICAgICBpZihhZGRyZXNzID09PSAweDAwMUMpIGFkZHJlc3MgPSAweDAwMEM7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLl90YmxQYWxldHRlW2FkZHJlc3NdICYgKHRoaXMuX21hc2suR1JBWVNDQUxFID8gMHgzMCA6IDB4M0YpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9QcHVXcml0ZShhZGRyZXNzOiBudW1iZXIsIGRhdGE6IG51bWJlcikge1xyXG5cclxuICAgICAgICBhZGRyZXNzICY9IDB4M0ZGRjtcclxuXHJcbiAgICAgICAgaWYoYWRkcmVzcyA+PSAweDAwMDAgJiYgYWRkcmVzcyA8PSAweDFGRkYpIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3RibFBhdHRlcm5bKGFkZHJlc3MgJiAweDEwMDApID4+IDEyXVthZGRyZXNzICYgMHgwRkZGXSA9IGRhdGE7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZihhZGRyZXNzID49IDB4MjAwMCAmJiBhZGRyZXNzIDw9IDB4M0VGRikge1xyXG5cclxuICAgICAgICAgICAgYWRkcmVzcyAmPSAweDBGRkY7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDAwMDAgJiYgYWRkcmVzcyA8PSAweDAzRkYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YmxOYW1lWzBdW2FkZHJlc3MgJiAweDAzRkZdID0gZGF0YTtcclxuICAgICAgICAgICAgaWYgKGFkZHJlc3MgPj0gMHgwNDAwICYmIGFkZHJlc3MgPD0gMHgwN0ZGKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGJsTmFtZVsxXVthZGRyZXNzICYgMHgwM0ZGXSA9IGRhdGE7XHJcbiAgICAgICAgICAgIGlmIChhZGRyZXNzID49IDB4MDgwMCAmJiBhZGRyZXNzIDw9IDB4MEJGRilcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RibE5hbWVbMF1bYWRkcmVzcyAmIDB4MDNGRl0gPSBkYXRhO1xyXG4gICAgICAgICAgICBpZiAoYWRkcmVzcyA+PSAweDBDMDAgJiYgYWRkcmVzcyA8PSAweDBGRkYpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YmxOYW1lWzFdW2FkZHJlc3MgJiAweDAzRkZdID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0gZWxzZSBpZihhZGRyZXNzID49IDB4M0YwMCAmJiBhZGRyZXNzIDw9IDB4M0ZGRikge1xyXG4gICAgICAgICAgICBhZGRyZXNzICY9IDB4MDAxRjtcclxuICAgICAgICAgICAgaWYgKGFkZHJlc3MgPT0gMHgwMDEwKSBhZGRyZXNzID0gMHgwMDAwO1xyXG4gICAgICAgICAgICBpZiAoYWRkcmVzcyA9PSAweDAwMTQpIGFkZHJlc3MgPSAweDAwMDQ7XHJcbiAgICAgICAgICAgIGlmIChhZGRyZXNzID09IDB4MDAxOCkgYWRkcmVzcyA9IDB4MDAwODtcclxuICAgICAgICAgICAgaWYgKGFkZHJlc3MgPT0gMHgwMDFDKSBhZGRyZXNzID0gMHgwMDBDO1xyXG4gICAgICAgICAgICB0aGlzLl90YmxQYWxldHRlW2FkZHJlc3NdID0gZGF0YTtcclxuICAgICAgICB9IFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0RyYXdQYXR0ZXJuKGk6IG51bWJlciwgcGFsZXR0ZTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgIFxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9WcmFtQWRkcigpOiBudW1iZXIge1xyXG4gICAgICAgIC8vIENPQVJTRV9YOiBudW1iZXIsXHJcbiAgICAgICAgLy8gQ09BUlNFX1k6IG51bWJlcixcclxuICAgICAgICAvLyBOQU1FVEFCTEVfWDogbnVtYmVyLFxyXG4gICAgICAgIC8vIE5BTUVUQUJMRV9ZOiBudW1iZXIsXHJcbiAgICAgICAgLy8gRklORV9ZOiBudW1iZXJcclxuXHJcbiAgICAgICAgbGV0IGIwXzQgPSB0aGlzLl92cmFtQWRkci5DT0FSU0VfWC50b1N0cmluZygyKTtcclxuICAgICAgICBsZXQgYjVfOSA9IHRoaXMuX3ZyYW1BZGRyLkNPQVJTRV9ZLnRvU3RyaW5nKDIpO1xyXG4gICAgICAgIGxldCBiMTAgPSB0aGlzLl92cmFtQWRkci5OQU1FVEFCTEVfWC50b1N0cmluZygyKTtcclxuICAgICAgICBsZXQgYjExID0gdGhpcy5fdnJhbUFkZHIuTkFNRVRBQkxFX1kudG9TdHJpbmcoMik7XHJcbiAgICAgICAgbGV0IGIxMl8xNCA9IHRoaXMuX3ZyYW1BZGRyLkZJTkVfWS50b1N0cmluZygyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGIxMl8xNCtiMTErYjEwK2I1XzkrYjBfNCwgMik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBGcmFtZUNvbXBsZXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9mcmFtZUNvbXBsZXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBGcmFtZUNvbXBsZXRlKHN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fZnJhbWVDb21wbGV0ZSA9IHN0YXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOTUkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25taTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgTk1JKHN0YXRlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fbm1pID0gc3RhdGU7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbXBvbmVudC9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXIgfSBmcm9tIFwiLi4vZGF0YS9yZWdpc3RlclwiO1xyXG5pbXBvcnQgeyBCdXMgfSBmcm9tIFwiLi4vZGF0YS9idXNcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4uL2RlYnVnL2xvZ2dlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENQVSBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgcHJvdGVjdGVkIF9yZWdpc3RlcnM6IFJlZ2lzdGVyW107XHJcbiAgICBwcm90ZWN0ZWQgX2J1czogQnVzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGJ1czogQnVzKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9idXMgPSBidXM7XHJcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFB1bHNlKGNsa0NvdW50OiBudW1iZXIsIGxvZ2dlcjogTG9nZ2VyKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWFkKGFkZHJlc3M6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDB4MDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFdyaXRlKGFkZHJlc3M6IG51bWJlciwgdmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RlcihpbmRleDogbnVtYmVyKTogUmVnaXN0ZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWdpc3RlcnNbaW5kZXhdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RlcnMoKTogUmVnaXN0ZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdGVycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVGVzdFN0YXR1cyh2YWx1ZTogbnVtYmVyLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxufSIsIlxyXG5leHBvcnQgY2xhc3MgQml0c2V0IHtcclxuXHJcbiAgICBwcml2YXRlIF9zaXplOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9iaXRzOiBudW1iZXJbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iaXRzID0gW107XHJcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXRzW2ldID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldExvdyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IGJpdHMgPSBuZXcgQml0c2V0KDgpO1xyXG4gICAgICAgIGJpdHMuU2V0KHZhbHVlKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2l6ZSAvIDI7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXRzW2ldID0gYml0cy5HZXRCaXQoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRIaWdoKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgYml0cyA9IG5ldyBCaXRzZXQoOCk7XHJcbiAgICAgICAgYml0cy5TZXQodmFsdWUpO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX3NpemUvMjsgaSA8IHRoaXMuX3NpemU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXRzW2ldID0gYml0cy5HZXRCaXQoaS10aGlzLl9zaXplLzIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Qml0KGluZGV4OiBudW1iZXIsIHZhbDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fc2l6ZS0xKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTZXRCaXQ6IEluZGV4ICR7aW5kZXh9IE91dCBvZiBib3VuZHNgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYml0c1tpbmRleF0gPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIERhdGEoKTogbnVtYmVyW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcm9tQml0c2V0KGJpdHNldDogQml0c2V0KTogdm9pZCB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpemU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXRzW2ldID0gYml0c2V0LkdldEJpdChpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldChkZWNpbWFsOiBudW1iZXIpOiB2b2lkIHsgICAgICAgIFxyXG4gICAgICAgIGxldCBiaXRTdHI6IHN0cmluZyA9IChkZWNpbWFsKS50b1N0cmluZygyKS5zcGxpdChcIlwiKS5yZXZlcnNlKCkuam9pbihcIlwiKTtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLl9zaXplLTE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGlmKGkgPCB0aGlzLl9zaXplLWJpdFN0ci5sZW5ndGgpIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYml0c1tpXSA9IDAgXHJcbiAgICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iaXRzW2ldID0gcGFyc2VJbnQoYml0U3RyW3RoaXMuX3NpemUtaS0xXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRCaXQoaW5kZXg6IG51bWJlcik6IG51bWJlciB7ICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5fYml0c1tpbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFzRGVjaW1hbCgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBiaXRTdHI6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpemU7IGkrKykgeyAgICAgICAgXHJcbiAgICAgICAgICAgIGJpdFN0ciA9IGJpdFN0ci5jb25jYXQodGhpcy5fYml0c1tpXS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KGJpdFN0ciwgMik7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQml0c2V0IH0gZnJvbSBcIi4vYml0c2V0XCI7XHJcbmltcG9ydCB7IFJBTSB9IGZyb20gXCIuLi9jb21wb25lbnQvcmFtXCI7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuLi9jb21wb25lbnQvY29tcG9uZW50XCI7XHJcblxyXG5pbnRlcmZhY2UgSUNvbm5lY3Rpb24ge1xyXG4gICAgY29tcG9uZW50OiBDb21wb25lbnQ7XHJcbiAgICBhZGRyTWluOiBudW1iZXI7XHJcbiAgICBhZGRyTWF4OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCdXMge1xyXG5cclxuICAgIHByaXZhdGUgX2Nvbm5lY3Rpb25zOiBJQ29ubmVjdGlvbltdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFdyaXRlKGFkZHJlc3M6IG51bWJlciwgdmFsdWU6IG51bWJlciwgcmRPbmx5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcclxuICAgICAgICBmb3IobGV0IGNvbm5lY3Rpb24gb2YgdGhpcy5fY29ubmVjdGlvbnMgKSB7XHJcbiAgICAgICAgICAgIGlmKGFkZHJlc3MgPj0gY29ubmVjdGlvbi5hZGRyTWluICYmIGFkZHJlc3MgPD0gY29ubmVjdGlvbi5hZGRyTWF4KSB7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jb21wb25lbnQuV3JpdGUoYWRkcmVzcywgdmFsdWUsIHJkT25seSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlYWQoYWRkcmVzczogbnVtYmVyLCByZE9ubHk6IGJvb2xlYW4gPSBmYWxzZSk6IG51bWJlciB7XHJcbiAgICAgICAgZm9yKGxldCBjb25uZWN0aW9uIG9mIHRoaXMuX2Nvbm5lY3Rpb25zICkge1xyXG4gICAgICAgICAgICBpZihhZGRyZXNzID49IGNvbm5lY3Rpb24uYWRkck1pbiAmJiBhZGRyZXNzIDw9IGNvbm5lY3Rpb24uYWRkck1heCkgeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25uZWN0aW9uLmNvbXBvbmVudC5SZWFkKGFkZHJlc3MsIHRydWUpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENvbm5lY3QoY29tcG9uZW50OiBDb21wb25lbnQsIGFkZHJNaW46IG51bWJlciwgYWRkck1heDogbnVtYmVyLCBtaXJyb3JMZW5ndGg/OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5wdXNoKHtcclxuICAgICAgICAgICAgY29tcG9uZW50OiBjb21wb25lbnQsXHJcbiAgICAgICAgICAgIGFkZHJNaW46IGFkZHJNaW4sXHJcbiAgICAgICAgICAgIGFkZHJNYXg6IGFkZHJNYXhcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBCaXRzZXQgfSBmcm9tIFwiLi9iaXRzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBJTmVzTG9hZGVyIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIExvYWRBc3luYyhzcmM6IHN0cmluZywgY2FsbGJhY2s6IEZ1bmN0aW9uKSB7XHJcblxyXG4gICAgICAgIGZldGNoKHNyYykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKS50aGVuKChidWZmZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlcik7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhieXRlcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSkgICAgICAgIFxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBNYXBwZXIgfSBmcm9tIFwiLi9tZW1vcnlfbWFwcGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWFwcGVyMDAwIGV4dGVuZHMgTWFwcGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9uUHJnQmFua3M6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX25DaHJCYW5rczogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5QcmdCYW5rczogbnVtYmVyLCBuQ2hyQmFua3M6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fblByZ0JhbmtzID0gblByZ0JhbmtzO1xyXG4gICAgICAgIHRoaXMuX25DaHJCYW5rcyA9IG5DaHJCYW5rcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgTWFwUmVhZChhZGRyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBtYXBwZWQgPSAtMTtcclxuXHJcbiAgICAgICAgaWYoYWRkciA+PSAweDAwMDAgJiYgYWRkciA8PSAweDFGRkYpIHtcclxuICAgICAgICAgICAgbWFwcGVkID0gYWRkcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGFkZHIgPj0gMHg4MDAwICYmIGFkZHIgPD0gMHhGRkZGKSB7XHJcbiAgICAgICAgICAgIG1hcHBlZCA9IGFkZHIgJiAodGhpcy5fblByZ0JhbmtzID4gMSA/IDB4N0ZGRiA6IDB4M0ZGRik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtYXBwZWQ7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBNYXBXcml0ZShhZGRyOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIC8vYWRkIGNhcnQgUkFNIG9wdGlvblxyXG4gICAgICAgIGxldCBtYXBwZWQgPSAtMTtcclxuICAgICAgICBpZihhZGRyID49IDB4ODAwMCAmJiBhZGRyIDw9IDB4RkZGRikge1xyXG4gICAgICAgICAgICBtYXBwZWQgPSBhZGRyICYgKHRoaXMuX25QcmdCYW5rcyA+IDEgPyAweDdGRkYgOiAweDNGRkYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWFwcGVkO1xyXG4gICAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBCdXMgfSBmcm9tIFwiLi9idXNcIjtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYXBwZXIge1xyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBNYXBSZWFkKGFkZHI6IG51bWJlcik6IG51bWJlcjtcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBNYXBXcml0ZShhZGRyOiBudW1iZXIpOiBudW1iZXI7XHJcblxyXG59XHJcbiIsIlxyXG5leHBvcnQgY2xhc3MgUGl4ZWwge1xyXG5cclxuICAgIHB1YmxpYyByOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZzogbnVtYmVyO1xyXG4gICAgcHVibGljIGI6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5yID0gcjtcclxuICAgICAgICB0aGlzLmcgPSBnO1xyXG4gICAgICAgIHRoaXMuYiA9IGI7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQml0c2V0IH0gZnJvbSBcIi4vYml0c2V0XCI7XHJcblxyXG5jbGFzcyBSZWdpc3Rlcl9vbGQge1xyXG5cclxuICAgIHByaXZhdGUgX3NpemU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX2JpdHM6IEJpdHNldDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzaXplOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9iaXRzID0gbmV3IEJpdHNldChzaXplKTtcclxuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVhZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iaXRzLkFzRGVjaW1hbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbmNyZW1lbnQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQWRkKDEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgRGVjcmVtZW50KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBkZWM6IG51bWJlciA9IHRoaXMuX2JpdHMuQXNEZWNpbWFsKCk7XHJcbiAgICAgICAgdGhpcy5fYml0cy5TZXQoLS1kZWMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGQobjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHJlc3VsdDogQml0c2V0ID0gbmV3IEJpdHNldCh0aGlzLl9zaXplKTtcclxuICAgICAgICBsZXQgb3RoZXI6IEJpdHNldCA9IG5ldyBCaXRzZXQodGhpcy5fc2l6ZSk7XHJcbiAgICAgICAgbGV0IGNhcnJ5OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIG90aGVyLlNldChuKTtcclxuICAgICAgICBmb3IobGV0IGkgPSB0aGlzLl9zaXplLTE7IGkgPj0wOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYoaSA9PT0gdGhpcy5fc2l6ZS0xKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQuU2V0Qml0KGksIHRoaXMuX2JpdHMuR2V0Qml0KGkpIF4gKG90aGVyLkdldEJpdChpKSkpO1xyXG4gICAgICAgICAgICAgICAgY2FycnkgPSB0aGlzLl9iaXRzLkdldEJpdChpKSAmIG90aGVyLkdldEJpdChpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBoYWxmID0gdGhpcy5fYml0cy5HZXRCaXQoaSkgXiAob3RoZXIuR2V0Qml0KGkpKTtcclxuICAgICAgICAgICAgICAgIGxldCBoYWxmQ2FycnkgPSB0aGlzLl9iaXRzLkdldEJpdChpKSAmIG90aGVyLkdldEJpdChpKTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5TZXRCaXQoaSwgaGFsZiBeIGNhcnJ5KTtcclxuICAgICAgICAgICAgICAgIGNhcnJ5ID0gY2FycnkgJiBoYWxmO1xyXG4gICAgICAgICAgICAgICAgY2FycnkgPSBjYXJyeSB8IGhhbGZDYXJyeTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9iaXRzID0gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiBjYXJyeSA9PT0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3IoYml0czogQml0c2V0KTogdm9pZCB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3NpemU7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9iaXRzW2ldIHw9IGJpdHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgWmVybygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9iaXRzLlNldCgwKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgZGF0YSgpOiBCaXRzZXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9iaXRzO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVyIHtcclxuXHJcbiAgICBfZGF0YTogbnVtYmVyO1xyXG4gICAgX2xlbmd0aDogbnVtYmVyO1xyXG4gICAgX25hbWU6IHN0cmluZztcclxuICAgIF9tYXNrOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IobGVuZ3RoOiBudW1iZXIsIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSAwO1xyXG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IGxlbmd0aDtcclxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9tYXNrID0gKCgyICoqIHRoaXMuX2xlbmd0aCktMSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBXcml0ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWUgJiB0aGlzLl9tYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWFkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoYW5nZUJpdChpbmRleDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYodmFsdWUgPT09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YSB8PSAxIDw8IGluZGV4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEgJj0gfigxIDw8IGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBCaXQoaW5kZXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLl9kYXRhICYgKCAxIDw8IGluZGV4KSkgPj4gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSB8PSAxIDw8IGluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhcihpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGF0YSAmPSB+KDEgPDwgaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGbGlwKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kYXRhIF49IDEgPDwgaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBDUFVfNjUwMiwgRVJlZ2lzdGVycyB9IGZyb20gXCIuLi9jcHUvNjUwMi9jcHVfNjUwMlwiO1xyXG5pbXBvcnQgeyBQUFUgfSBmcm9tIFwiLi4vY3B1LzY1MDIvcHB1XCI7XHJcbmltcG9ydCB7IENQVSB9IGZyb20gXCIuLi9jcHUvY3B1XCI7XHJcbmltcG9ydCB7IEJ1cyB9IGZyb20gXCIuLi9kYXRhL2J1c1wiO1xyXG5pbXBvcnQgeyBQaXhlbCB9IGZyb20gXCIuLi9kYXRhL3BpeGVsXCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyIH0gZnJvbSBcIi4uL2RhdGEvcmVnaXN0ZXJcIjtcclxuaW1wb3J0IHsgRUtleSwgSW5wdXQgfSBmcm9tIFwiLi4vaW5wdXRcIjtcclxuaW1wb3J0IHsgSW5zdHJ1Y3Rpb24gfSBmcm9tIFwiLi4vaW5zdHJ1Y3Rpb25zL2luc3RydWN0aW9uX3NldFwiO1xyXG5pbXBvcnQgeyBTeXN0ZW0gfSBmcm9tIFwiLi4vc3lzdGVtXCI7XHJcblxyXG5lbnVtIEVSb3dUeXBlIHtcclxuICAgIElOU1RSVUNUSU9OLFxyXG4gICAgVU5JX1NUQVJULFxyXG4gICAgVU5JX01JRCxcclxuICAgIFVOSV9FTkRcclxufVxyXG5cclxuaW50ZXJmYWNlIERhdGEge1xyXG4gICAgYWRkcmVzczogbnVtYmVyLFxyXG4gICAgaW5zdHJ1Y3Rpb246IEluc3RydWN0aW9uLFxyXG4gICAgb3BzOiBudW1iZXJbXTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFJvdyB7XHJcbiAgICB0ZXh0OiBzdHJpbmcsXHJcbiAgICBhZGRyZXNzOiBudW1iZXIsXHJcbiAgICB0eXBlOiBFUm93VHlwZVxyXG59XHJcblxyXG5pbnRlcmZhY2UgQnJlYWtwb2ludCB7XHJcbiAgICByb3c6IG51bWJlcixcclxuICAgIGFkZHJlc3M6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRGlzYXNzZW1ibGVyIHtcclxuXHJcbiAgICBwcml2YXRlIF9zeXN0ZW06IFN5c3RlbTtcclxuXHJcbiAgICBwcml2YXRlIF9yb3dIZWlnaHQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3Njcm9sbDogbnVtYmVyOyAgICBcclxuICAgIHByaXZhdGUgX2xvY2F0aW9uOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfdGJsV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3RibEhlaWdodDogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyc1g6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX3JlZ2lzdGVyc1dpZHRoOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfc3RhdHVzWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfaG92ZXI6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50OyAgICBcclxuXHJcbiAgICBwcml2YXRlIF9icmVha3BvaW50czogQnJlYWtwb2ludFtdO1xyXG5cclxuICAgIHByaXZhdGUgX3N0YWNrWTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX3BhbGV0dGVZOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfZW5hYmxlZDogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9icmFuY2hPcHM6IHN0cmluZ1tdID0gW1xyXG4gICAgICAgIFwiQkNDXCIsXHJcbiAgICAgICAgXCJCQ1NcIixcclxuICAgICAgICBcIkJFUVwiLFxyXG4gICAgICAgIFwiQk1JXCIsXHJcbiAgICAgICAgXCJCTkVcIixcclxuICAgICAgICBcIkJQTFwiLFxyXG4gICAgICAgIFwiQlZDXCIsXHJcbiAgICAgICAgXCJCVlNcIixcclxuICAgICAgICBcIkpNUFwiLFxyXG4gICAgICAgIFwiSlNSXCJcclxuICAgIF1cclxuXHJcbiAgICBwcml2YXRlIF9kYXRhOiBEYXRhW107ICAgIFxyXG4gICAgcHJpdmF0ZSBfcm93czogUm93W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG5cclxuICAgICAgICB0aGlzLl9jYW52YXMgPSBjYW52YXM7XHJcblxyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBbXTtcclxuICAgICAgICB0aGlzLl9yb3dzID0gW107XHJcbiAgICAgICAgdGhpcy5fcm93SGVpZ2h0ID0gMzI7XHJcbiAgICAgICAgdGhpcy5fc2Nyb2xsID0gMDtcclxuICAgICAgICB0aGlzLl9sb2NhdGlvbiA9IDA7XHJcbiAgICAgICAgdGhpcy5fdGJsV2lkdGggPSA1MTI7XHJcbiAgICAgICAgdGhpcy5fdGJsSGVpZ2h0ID0gMTAyNDtcclxuICAgICAgICB0aGlzLl9ob3ZlciA9IC0xO1xyXG5cclxuICAgICAgICB0aGlzLl9yZWdpc3RlcnNYID0gdGhpcy5fdGJsV2lkdGggKyAxNjtcclxuICAgICAgICB0aGlzLl9yZWdpc3RlcnNXaWR0aCA9IDI1NjtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhdHVzWSA9IDI1NjtcclxuXHJcbiAgICAgICAgdGhpcy5fc3RhY2tZID0gMzQwO1xyXG5cclxuICAgICAgICB0aGlzLl9wYWxldHRlWSA9IDQwMDtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9icmVha3BvaW50cyA9IFtdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUnVuKGZyb206IG51bWJlciwgYnVzOiBCdXMsIGNwdTogQ1BVXzY1MDIpIHtcclxuICAgICAgICB0aGlzLl9UcmF2ZXJzZShmcm9tLCBidXMsIGNwdSk7XHJcbiAgICAgICAgLy90aGlzLl9UcmF2ZXJzZSgweEY0RUQsIGJ1cywgY3B1KTtcclxuICAgICAgICB0aGlzLl9GaWxsKDB4RkZGRiwgYnVzLCBjcHUpO1xyXG4gICAgICAgIHRoaXMuX1Byb2Nlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRHJhdyhjcHU6IENQVSwgYnVzOiBCdXMsIHBwdTogUFBVLCBwcHVCdXM6IEJ1cywgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5fZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9EcmF3RGlzKGNvbnRleHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9EcmF3UmVnaXN0ZXJzKGNwdSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0RyYXdTdGF0dXMoY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuU1RBVFVTKSwgY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0RyYXdTdGFjayhjcHUsIGJ1cywgY29udGV4dCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0RyYXdQYWxldHRlKHBwdSwgcHB1QnVzLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5fRHJhd0xvY2F0aW9uKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYodGhpcy5fZW5hYmxlZCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IG14OiBudW1iZXIgPSBJbnB1dC5Nb3VzZSgpLnggLSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueDtcclxuICAgICAgICAgICAgbGV0IG15OiBudW1iZXIgPSBJbnB1dC5Nb3VzZSgpLnkgLSB0aGlzLl9jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkueTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKG14ID4gMCAmJiBteSA+IDAgJiYgbXggPCB0aGlzLl90YmxXaWR0aCAmJiBteSA8IHRoaXMuX3RibEhlaWdodCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBkZWx0YTogbnVtYmVyID0gSW5wdXQuTW91c2UoKS5tRGVsdGE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwgKz0gZGVsdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5faG92ZXIgPSBNYXRoLmZsb29yKG15IC8gdGhpcy5fcm93SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihJbnB1dC5Nb3VzZSgpLm1MZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvd0luZGV4OiBudW1iZXIgPSB0aGlzLl9ob3ZlciArIHRoaXMuX3Njcm9sbDtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcm93OiBSb3cgPSB0aGlzLl9yb3dzW3Jvd0luZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9icmVha3BvaW50cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93OiByb3dJbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogcm93LmFkZHJlc3NcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihJbnB1dC5Nb3VzZSgpLm1SaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByb3dJbmRleDogbnVtYmVyID0gdGhpcy5faG92ZXIgKyB0aGlzLl9zY3JvbGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJvdzogUm93ID0gdGhpcy5fcm93c1tyb3dJbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocm93KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnRzID0gdGhpcy5fYnJlYWtwb2ludHMuZmlsdGVyKChicCkgPT4geyBpZihicC5hZGRyZXNzICE9PSByb3cuYWRkcmVzcykgcmV0dXJuIGJwO30pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ob3ZlciA9IC0xO1xyXG4gICAgICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmKElucHV0LklzS2V5UHJlc3MoRUtleS5QR19ET1dOKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xsICs9IDB4MDAxMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihJbnB1dC5Jc0tleVByZXNzKEVLZXkuUEdfVVApKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGwgLT0gMHgwMDEwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihJbnB1dC5Jc0tleVByZXNzKEVLZXkuRl81KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3lzdGVtLlRvZ2dsZVBhdXNlUGxheWVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKElucHV0LklzS2V5UHJlc3MoRUtleS5GXzgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zeXN0ZW0uU3RlcCgpO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fbG9jYXRpb24gPCB0aGlzLl9zY3JvbGwgfHwgdGhpcy5fbG9jYXRpb24gPiB0aGlzLl9zY3JvbGwgKyAxMDI0IC8gdGhpcy5fcm93SGVpZ2h0KSB0aGlzLl9zY3JvbGwgPSB0aGlzLl9sb2NhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5fc2Nyb2xsIDwgMCkgdGhpcy5fc2Nyb2xsID0gMDtcclxuICAgICAgICAgICAgaWYodGhpcy5fc2Nyb2xsID4gdGhpcy5fZGF0YS5sZW5ndGgpIHRoaXMuX3Njcm9sbCA9IHRoaXMuX2RhdGEubGVuZ3RoO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCcmVha3BvaW50Q2hlY2soYWRkcmVzczogbnVtYmVyKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX2VuYWJsZWQpIHtcclxuXHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9icmVha3BvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYoYWRkcmVzcyA9PT0gdGhpcy5fYnJlYWtwb2ludHNbaV0uYWRkcmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2Nyb2xsVG8oYWRkcmVzczogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5fZW5hYmxlZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zY3JvbGwgPSB0aGlzLl9GaW5kUm93KGFkZHJlc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0TG9jYXRpb24oYWRkcmVzczogbnVtYmVyLCBidXM6IEJ1cywgY3B1OiBDUFVfNjUwMik6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuX2VuYWJsZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb24gPSB0aGlzLl9GaW5kUm93KGFkZHJlc3MpOyAgXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2xvY2F0aW9uID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVHJhdmVyc2UoYWRkcmVzcywgYnVzLCBjcHUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fUHJvY2VzcygpO1xyXG4gICAgICAgICAgICB9ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0ZpbmRSb3coYWRkcmVzczogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9yb3dzW2ldLmFkZHJlc3MgPT09IGFkZHJlc3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9EcmF3U3RhY2soY3B1OiBDUFUsIGJ1czogQnVzLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHNwU3RhcnQgPSAweDAxMDAgKyBjcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5TUCkuUmVhZCgpKzE7XHJcbiAgICAgICAgbGV0IHNwRW5kID0gMHgwMUZGO1xyXG5cclxuICAgICAgICBmb3IobGV0IGkgPSBzcFN0YXJ0OyBpIDw9IHNwRW5kOyBpKyspIHsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodGhpcy5fVG9IZXgoYnVzLlJlYWQoaSwgdHJ1ZSksIDIpLCB0aGlzLl9yZWdpc3RlcnNYLCB0aGlzLl9zdGFja1kgKyAoaSAtIHNwU3RhcnQpICogdGhpcy5fcm93SGVpZ2h0KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfRHJhd1BhbGV0dGUocHB1OiBQUFUsIGJ1czogQnVzLCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgbGV0IHN3YXRjaFNpemUgPSAxNjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgNDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYzogUGl4ZWwgPSBwcHUuR2V0Q29sb3IoaSwgaik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGByZ2IoJHtjLnJ9LCR7Yy5nfSwke2MuYn0pYDtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5fcmVnaXN0ZXJzWCArIDEyOCArIGogKiBzd2F0Y2hTaXplLCB0aGlzLl9wYWxldHRlWSArIGkgKiBzd2F0Y2hTaXplLCBzd2F0Y2hTaXplLCBzd2F0Y2hTaXplKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNlbGVjdGVkUGFsZXR0ZSA9IDA7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkUGF0dGVybiA9IDA7XHJcblxyXG4gICAgICAgIGZvcihsZXQgblRpbGVZID0gMDsgblRpbGVZIDwgMTY7IG5UaWxlWSsrKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgblRpbGVYID0gMDsgblRpbGVYIDwgMTY7IG5UaWxlWCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbk9mZnNldCA9IG5UaWxlWSAqIDI1NiArIG5UaWxlWCAqIDE2O1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCA4OyByb3crKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aWxlTHNiOiBudW1iZXIgPSBidXMuUmVhZChzZWxlY3RlZFBhdHRlcm4gKiAweDEwMDAgKyBuT2Zmc2V0ICsgcm93ICsgMHgwMDAwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGlsZU1zYjogbnVtYmVyID0gYnVzLlJlYWQoc2VsZWN0ZWRQYXR0ZXJuICogMHgxMDAwICsgbk9mZnNldCArIHJvdyArIDB4MDAwOCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgY29sID0gMDsgY29sIDwgODsgY29sKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCByYXdQaXhlbCA9ICh0aWxlTHNiICYgMHgwMSkgKyAodGlsZU1zYiAmIDB4MDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGlsZUxzYiA+Pj49IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbGVNc2IgPj4+PSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGM6IFBpeGVsID0gcHB1LkdldENvbG9yKHNlbGVjdGVkUGFsZXR0ZSwgcmF3UGl4ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBgcmdiKCR7Yy5yfSwke2MuZ30sJHtjLmJ9KWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5fcmVnaXN0ZXJzWCArIDEyOCArICgoblRpbGVYICogOCArICg3LWNvbCkpICogMiksIHRoaXMuX3BhbGV0dGVZICsgODAgKyAoKG5UaWxlWSAqIDggKyByb3cpICogMiksIDIsIDIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzZWxlY3RlZFBhbGV0dGUgPSAxO1xyXG4gICAgICAgIC8vIHNlbGVjdGVkUGF0dGVybiA9IDE7XHJcblxyXG4gICAgICAgIC8vIGZvcihsZXQgblRpbGVZID0gMDsgblRpbGVZIDwgMTY7IG5UaWxlWSsrKSB7XHJcbiAgICAgICAgLy8gICAgIGZvcihsZXQgblRpbGVYID0gMDsgblRpbGVYIDwgMTY7IG5UaWxlWCsrKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBsZXQgbk9mZnNldCA9IG5UaWxlWSAqIDI1NiArIG5UaWxlWCAqIDE2O1xyXG4gICAgICAgIC8vICAgICAgICAgZm9yKGxldCByb3cgPSAwOyByb3cgPCA4OyByb3crKykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCB0aWxlTHNiOiBudW1iZXIgPSBidXMuUmVhZChzZWxlY3RlZFBhdHRlcm4gKiAweDEwMDAgKyBuT2Zmc2V0ICsgcm93ICsgMHgwMDAwKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgdGlsZU1zYjogbnVtYmVyID0gYnVzLlJlYWQoc2VsZWN0ZWRQYXR0ZXJuICogMHgxMDAwICsgbk9mZnNldCArIHJvdyArIDB4MDAwOCk7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgY29sID0gMDsgY29sIDwgODsgY29sKyspIHtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCByYXdQaXhlbCA9ICh0aWxlTHNiICYgMHgwMSkgKyAodGlsZU1zYiAmIDB4MDEpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGlsZUxzYiA+Pj49IDE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRpbGVNc2IgPj4+PSAxO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGM6IFBpeGVsID0gcHB1LkdldENvbG9yKHNlbGVjdGVkUGFsZXR0ZSwgcmF3UGl4ZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBgcmdiKCR7Yy5yfSwke2MuZ30sJHtjLmJ9KWA7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QodGhpcy5fcmVnaXN0ZXJzWCArIDMwMCArICgoblRpbGVYICogOCArICg3LWNvbCkpICogOCksIHRoaXMuX3BhbGV0dGVZICsgODAgKyAoKG5UaWxlWSAqIDggKyByb3cpICogOCksIDgsIDgpO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9EcmF3U3RhdHVzKHJlZ2lzdGVyOiBSZWdpc3RlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBuYW1lczogc3RyaW5nID0gXCJOIFYgLiBCIEQgSSBaIENcIjtcclxuICAgICAgICBsZXQgYml0czogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gNzsgaSA+PSAwOyBpLS0pIHtcclxuXHJcbiAgICAgICAgICAgIGJpdHMgKz0gcmVnaXN0ZXIuQml0KGkpLnRvU3RyaW5nKCkgKyBcIiBcIjtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KG5hbWVzLCB0aGlzLl9yZWdpc3RlcnNYLCB0aGlzLl9zdGF0dXNZKTtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGJpdHMsIHRoaXMuX3JlZ2lzdGVyc1gsIHRoaXMuX3N0YXR1c1kgKyB0aGlzLl9yb3dIZWlnaHQpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9EcmF3RGlzKGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG5cclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzM2NDU0RlwiO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fdGJsV2lkdGggKyB0aGlzLl9yZWdpc3RlcnNXaWR0aCArIDEyMDAsIHRoaXMuX3RibEhlaWdodCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGNvdW50OiBudW1iZXIgPSAxMDI0IC8gdGhpcy5fcm93SGVpZ2h0O1xyXG5cclxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjIwcHggbW9ub3NwYWNlXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IHRoaXMuX3Njcm9sbDsgaSA8IE1hdGgubWluKHRoaXMuX3Njcm9sbCtjb3VudCwgdGhpcy5fcm93cy5sZW5ndGgpOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHI6IFJvdyA9IHRoaXMuX3Jvd3NbaV07XHJcbiAgICAgICAgICAgIHRoaXMuX0RyYXdSb3coaS10aGlzLl9zY3JvbGwsIHIsIGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2JyZWFrcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0RyYXdCcmVha3BvaW50KHRoaXMuX2JyZWFrcG9pbnRzW2ldLnJvdywgY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9EcmF3TG9jYXRpb24oY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHk6IG51bWJlciA9IHRoaXMuX2xvY2F0aW9uICogdGhpcy5fcm93SGVpZ2h0ICsgdGhpcy5fcm93SGVpZ2h0IC8gMiAtICh0aGlzLl9zY3JvbGwgKiB0aGlzLl9yb3dIZWlnaHQpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMTIsIHkrNSwgOCwgOCk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9EcmF3QnJlYWtwb2ludChyb3c6IG51bWJlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHk6IG51bWJlciA9IHJvdyAqIHRoaXMuX3Jvd0hlaWdodCArIHRoaXMuX3Jvd0hlaWdodCAvIDIgLSAodGhpcy5fc2Nyb2xsICogdGhpcy5fcm93SGVpZ2h0KTtcclxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgY29udGV4dC5maWxsUmVjdCgxMCwgeSszLCAxMiwgMTIpO1xyXG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0RyYXdSb3coaW5kZXg6IG51bWJlciwgcm93OiBSb3csIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xyXG5cclxuICAgICAgICBsZXQgclN0YXJ0WDogbnVtYmVyID0gMzI7XHJcblxyXG4gICAgICAgIGxldCBsU3RhcnRYOiBudW1iZXIgPSA3MiArIHJTdGFydFg7XHJcbiAgICAgICAgbGV0IGxXaWR0aDogbnVtYmVyID0gMTAwO1xyXG4gICAgICAgIGxldCBsSGVpZ2h0OiBudW1iZXIgPSA0O1xyXG4gICAgICAgIGxldCB0U3RhcnRYOiBudW1iZXIgPSBsU3RhcnRYICsgbFdpZHRoICsgNDtcclxuICAgICAgICBsZXQgdFdpZHRoID0gY29udGV4dC5tZWFzdXJlVGV4dChcIlVOSURFTlRJRklFRFwiKS53aWR0aDtcclxuICAgICAgICBsZXQgckxTdGFydFg6IG51bWJlciA9IHRTdGFydFggKyB0V2lkdGggKyA0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGluZGV4ID09IHRoaXMuX2hvdmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gXCJncmF5XCI7XHJcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoclN0YXJ0WCwgaW5kZXggKiB0aGlzLl9yb3dIZWlnaHQrNCwgdGhpcy5fdGJsV2lkdGggLSByU3RhcnRYICogMiwgdGhpcy5fcm93SGVpZ2h0KTtcclxuICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSBcIndoaXRlXCI7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIHN3aXRjaChyb3cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIEVSb3dUeXBlLlVOSV9TVEFSVDoge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpbmVZOiBudW1iZXIgPSBpbmRleCAqIHRoaXMuX3Jvd0hlaWdodCArIHRoaXMuX3Jvd0hlaWdodCAvIDIrODtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFRleHQodGhpcy5fVG9IZXgocm93LmFkZHJlc3MsIDQpLCByU3RhcnRYLCB0aGlzLl9yb3dIZWlnaHQgKiBpbmRleCArIHRoaXMuX3Jvd0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGxTdGFydFgsIGxpbmVZLCBsV2lkdGgsIGxIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChcIlVOSURFTlRJRklFRFwiLCB0U3RhcnRYLCB0aGlzLl9yb3dIZWlnaHQgKiBpbmRleCArIHRoaXMuX3Jvd0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxSZWN0KHJMU3RhcnRYLCBsaW5lWSwgbFdpZHRoLCBsSGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRVJvd1R5cGUuVU5JX01JRDoge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChcIi4uLi5cIiwgNTEyLzItMjgsIHRoaXMuX3Jvd0hlaWdodCAqIGluZGV4ICsgdGhpcy5fcm93SGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgRVJvd1R5cGUuVU5JX0VORDogeyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxldCBsaW5lWTogbnVtYmVyID0gaW5kZXggKiB0aGlzLl9yb3dIZWlnaHQgKyB0aGlzLl9yb3dIZWlnaHQgLyAyKzg7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRoaXMuX1RvSGV4KHJvdy5hZGRyZXNzLCA0KSwgclN0YXJ0WCwgdGhpcy5fcm93SGVpZ2h0ICogaW5kZXggKyB0aGlzLl9yb3dIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChsU3RhcnRYLCBsaW5lWSwgbFdpZHRoICogMiArIHRXaWR0aCArIDgsIDQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBFUm93VHlwZS5JTlNUUlVDVElPTjogeyAgICAgXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHJvdy50ZXh0LCByU3RhcnRYLCB0aGlzLl9yb3dIZWlnaHQgKiBpbmRleCArIHRoaXMuX3Jvd0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfRHJhd1JlZ2lzdGVycyhjcHU6IENQVSwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgbGV0IHJlZ2lzdGVyczogUmVnaXN0ZXJbXSA9IGNwdS5SZWdpc3RlcnMoKTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHJlZ2lzdGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLl9EcmF3UmVnaXN0ZXIocmVnaXN0ZXJzW2ldLCBpLCBjb250ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0ZXh0OiBzdHJpbmcgPSBgQ3ljbGVzIDogJHsoPENQVV82NTAyPmNwdSkuQ3ljbGVzKCl9YDtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHRoaXMuX3JlZ2lzdGVyc1gsIHJlZ2lzdGVycy5sZW5ndGggICogdGhpcy5fcm93SGVpZ2h0ICsgMzIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9EcmF3UmVnaXN0ZXIocmVnaXN0ZXI6IFJlZ2lzdGVyLCByb3c6IG51bWJlciwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgbGV0IHRleHQ6IHN0cmluZyA9IGAke3JlZ2lzdGVyLk5hbWUoKX0gOiAke3RoaXMuX1RvSGV4KHJlZ2lzdGVyLlJlYWQoKSwgMil9YDtcclxuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KHRleHQsIHRoaXMuX3JlZ2lzdGVyc1gsIHJvdyAqIHRoaXMuX3Jvd0hlaWdodCArIDMyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9UcmF2ZXJzZShmcm9tOiBudW1iZXIsIGJ1czogQnVzLCBjcHU6IENQVV82NTAyKSB7XHJcblxyXG4gICAgICAgIGxldCBvZmZzZXQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgICAgIHdoaWxlKHRydWUpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGFbZnJvbSArIG9mZnNldF0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fZGF0YVtmcm9tICsgb2Zmc2V0XS5pbnN0cnVjdGlvbiAhPT0gbnVsbCkgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBkOiBudW1iZXIgPSBidXMuUmVhZChmcm9tICsgb2Zmc2V0LCB0cnVlKTtcclxuICAgICAgICAgICAgbGV0IGluczogSW5zdHJ1Y3Rpb24gPSBjcHUuSW5zdHJ1Y3Rpb25Mb29rdXAoZCk7XHJcblxyXG4gICAgICAgICAgICBpZihpbnMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb3BzOiBudW1iZXJbXSA9IGNwdS5PcGVyYW5kTG9va3VwKGZyb20gKyBvZmZzZXQgKyAxLCBpbnMpOyAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGE6IERhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb246IGlucyxcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBmcm9tK29mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICBvcHM6IG9wcyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhW2Zyb20rb2Zmc2V0XSA9IGRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fYnJhbmNoT3BzLmZpbmQodGVzdCA9PiB0ZXN0ID09PSBpbnMubW5lbSkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBhZGRyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZihpbnMuYnl0ZXMgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkciA9IChvcHNbMV0gPDwgOCkgfCBvcHNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkciA9IG9wc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVHJhdmVyc2UoYWRkciwgYnVzLCBjcHUpO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihpbnMubW5lbSA9PT0gXCJKTVBcIiB8fCBpbnMubW5lbSA9PT0gXCJSVFNcIiB8fCBpbnMubW5lbSA9PT0gXCJSVElcIikgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGlucy5ieXRlcyAtMTtcclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVTkRFRklORUQgT1AgMHgke2QudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCl9IGF0IDB4JHsoZnJvbStvZmZzZXQpLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpfWApXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb2Zmc2V0Kys7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfRmlsbCh0bzogbnVtYmVyLCBidXM6IEJ1cywgY3B1OiBDUFVfNjUwMikge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0bzsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2RhdGFbaV0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBsZXQgZDogbnVtYmVyID0gYnVzLlJlYWQoaSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFbaV0gPSB7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBpLFxyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb246IG51bGwsXHJcbiAgICAgICAgICAgICAgICBvcHM6IFtdXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfUHJvY2VzcygpIHtcclxuICAgICAgICBcclxuICAgICAgbGV0IHVuaWRlbnRpZmllZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgICBsZXQgY29udGludWVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLl9kYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZDogRGF0YSA9IHRoaXMuX2RhdGFbaV07XHJcblxyXG4gICAgICAgICAgICBpZighZCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5zOiBJbnN0cnVjdGlvbiA9IGQuaW5zdHJ1Y3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihpbnMpIHtcclxuICAgICAgICAgICAgICAgIGlmKHVuaWRlbnRpZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvd3MucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGktMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRVJvd1R5cGUuVU5JX0VORFxyXG4gICAgICAgICAgICAgICAgICAgIH0pICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGV4dDogc3RyaW5nID0gYCR7dGhpcy5fVG9IZXgoaSwgNCl9ICR7aW5zLm1uZW19YDtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGQub3BzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIiBcIiArIHRoaXMuX1RvSGV4KGQub3BzW2pdLCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHRleHQsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogaSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBFUm93VHlwZS5JTlNUUlVDVElPTlxyXG4gICAgICAgICAgICAgICAgfSkgICAgXHJcbiAgICAgICAgICAgICAgICBpKz1pbnMuYnl0ZXMtMTtcclxuICAgICAgICAgICAgICAgIHVuaWRlbnRpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29udGludWVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZighdW5pZGVudGlmaWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3dzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkcmVzczogaSxcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBFUm93VHlwZS5VTklfU1RBUlRcclxuICAgICAgICAgICAgICAgIH0pICAgXHJcbiAgICAgICAgICAgICAgICB1bmlkZW50aWZpZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoIWNvbnRpbnVlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcm93cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGksXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogRVJvd1R5cGUuVU5JX01JRFxyXG4gICAgICAgICAgICAgICAgfSkgICBcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1RvSGV4KG51bWJlciwgbGVuZ3RoKSB7XHJcbiAgIFxyXG4gICAgICAgIHZhciBzdHIgPSAnJyArIG51bWJlci50b1N0cmluZygxNik7XHJcbiAgICAgICAgd2hpbGUgKHN0ci5sZW5ndGggPCBsZW5ndGgpIHtcclxuICAgICAgICAgICAgc3RyID0gJzAnICsgc3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgICAgIHJldHVybiBcIjB4XCIgKyBzdHIudG9VcHBlckNhc2UoKTtcclxuICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHNldCBTeXN0ZW0oc3lzdGVtOiBTeXN0ZW0pIHtcclxuICAgICAgICB0aGlzLl9zeXN0ZW0gPSBzeXN0ZW07XHJcbiAgICB9XHJcblxyXG59IiwiXHJcbmV4cG9ydCBjbGFzcyBMb2dnZXIge1xyXG5cclxuICAgIHByaXZhdGUgX2xvZzogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBXcml0ZUxpbmUodGV4dDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGV4dC5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLl9sb2cgKz0gdGV4dDtcclxuICAgICAgICB0aGlzLl9sb2cgKz0gJ1xcclxcbic7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNhdmUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBlbDogSFRNTEFuY2hvckVsZW1lbnQgPSA8SFRNTEFuY2hvckVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCAnZGF0YTp0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgsJyArIGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLl9sb2cpKTtcclxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBcImxvZ19cIiArIERhdGUubm93KCkpO1xyXG5cclxuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICAgICAgZWwuY2xpY2soKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTtcclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHtBcHB9IGZyb20gXCIuL2FwcFwiXHJcblxyXG5sZXQgYXBwID0gbmV3IEFwcCgpO1xyXG5hcHAuSW5pdGlhdGUoKTtcclxuYXBwLlJ1bigpOyIsImltcG9ydCB7IFBQVSB9IGZyb20gXCIuLi9jcHUvNjUwMi9wcHVcIjtcclxuaW1wb3J0IHsgQ1BVIH0gZnJvbSBcIi4uL2NwdS9jcHVcIjtcclxuaW1wb3J0IHsgQnVzIH0gZnJvbSBcIi4uL2RhdGEvYnVzXCI7XHJcbmltcG9ydCB7IERpc2Fzc2VtYmxlciB9IGZyb20gXCIuLi9kZWJ1Zy9kaXNhc3NlbWJsZXJcIjtcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi4vaW5wdXRcIjtcclxuaW1wb3J0IHsgR3VpRGVidWdnZXIgfSBmcm9tIFwiLi9ndWlfZGVidWdnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHVUkge1xyXG5cclxuICAgIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlIF9jb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfZGlzOiBEaXNhc3NlbWJsZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fY2FudmFzID0gPEhUTUxDYW52YXNFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVidWdnZXJcIik7XHJcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHRoaXMuX2RpcyA9IG5ldyBEaXNhc3NlbWJsZXIodGhpcy5fY2FudmFzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2Rpcy5VcGRhdGUoKTtcclxuICAgICAgICBJbnB1dC5SZXNldCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBEcmF3KGNwdTogQ1BVLCBidXM6IEJ1cywgcHB1OiBQUFUsIHBwdUJ1czogQnVzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZGlzLkRyYXcoY3B1LCBidXMsIHBwdSwgcHB1QnVzLCB0aGlzLl9jb250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgRGlzYXNzZW1ibGVyKCk6IERpc2Fzc2VtYmxlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpcztcclxuICAgIH1cclxuXHJcbn0iLCJcclxuZXhwb3J0IGVudW0gRUtleSB7XHJcbiAgICBVUCA9IDg3LFxyXG4gICAgRE9XTiA9IDgzLFxyXG4gICAgTEVGVCA9IDY1LFxyXG4gICAgUklHSFQgPSA2OCxcclxuICAgIFNISUZUID0gMTYsXHJcbiAgICBFTlRFUiA9IDEzLFxyXG4gICAgTSA9IDc3LFxyXG4gICAgSyA9IDc1LFxyXG4gICAgTl8xID0gNDksXHJcbiAgICBOXzIgPSA1MCxcclxuICAgIE5fMyA9IDUxLFxyXG4gICAgUEdfRE9XTiA9IDM0LFxyXG4gICAgUEdfVVAgPSAzMyxcclxuICAgIEZfNSA9IDExNixcclxuICAgIEZfOCA9IDExOVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNb3VzZSB7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICBtTGVmdDogYm9vbGVhbixcclxuICAgIG1SaWdodDogYm9vbGVhbixcclxuICAgIG1EZWx0YTogbnVtYmVyXHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZXYpID0+IHtcclxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBJbnB1dC5fa2V5c1tldi53aGljaF0gPSAyO1xyXG59KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXYpID0+IHtcclxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBJbnB1dC5fa2V5c1tldi53aGljaF0gPSAwO1xyXG59KTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIChldikgPT4ge1xyXG4gICAgbGV0IGdhbWVDYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpO1xyXG4gICAgbGV0IGdhbWVCb3VuZHMgPSBnYW1lQ2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgSW5wdXQuX214ID0gTWF0aC5yb3VuZChldi5jbGllbnRYIC0gZ2FtZUJvdW5kcy54KTtcclxuICAgIElucHV0Ll9teSA9IE1hdGgucm91bmQoZXYuY2xpZW50WSAtIGdhbWVCb3VuZHMueSk7XHJcbn0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIChldikgPT4ge1xyXG4gICAgSW5wdXQuX21EZWx0YSA9IGV2LmRlbHRhWTtcclxufSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChldikgPT4ge1xyXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmKGV2LmJ1dHRvbiA9PT0gMCkge1xyXG4gICAgICAgIElucHV0Ll9tTGVmdCA9IHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIElucHV0Ll9tUmlnaHQgPSB0cnVlO1xyXG4gICAgfVxyXG59KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIChldikgPT4ge1xyXG4gICAgaWYoZXYuYnV0dG9uID09PSAwKSB7XHJcbiAgICAgICAgSW5wdXQuX21MZWZ0ID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIElucHV0Ll9tUmlnaHQgPSBmYWxzZTtcclxuICAgIH1cclxufSk7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIChldikgPT4ge1xyXG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG5leHBvcnQgY2xhc3MgSW5wdXQge1xyXG5cclxuICAgIHN0YXRpYyBfa2V5czogbnVtYmVyW10gPSBbXTtcclxuICAgIHN0YXRpYyBfbXg6IG51bWJlcjtcclxuICAgIHN0YXRpYyBfbXk6IG51bWJlcjtcclxuICAgIHN0YXRpYyBfbUxlZnQ6IGJvb2xlYW47XHJcbiAgICBzdGF0aWMgX21SaWdodDogYm9vbGVhbjtcclxuICAgIHN0YXRpYyBfbURlbHRhOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBSZXNldCgpIHtcclxuICAgICAgICBJbnB1dC5fbUxlZnQgPSBmYWxzZTtcclxuICAgICAgICBJbnB1dC5fbURlbHRhID0gMDtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX2tleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fa2V5c1tpXSA9PT0gMikgdGhpcy5fa2V5c1tpXSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIElzS2V5RG93bihrZXlDb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIElucHV0Ll9rZXlzW2tleUNvZGVdID09PSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgSXNLZXlQcmVzcyhrZXlDb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIElucHV0Ll9rZXlzW2tleUNvZGVdID09PSAyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTW91c2UoKTogSU1vdXNlIHtcclxuICAgICAgICBsZXQgZGVsdGEgPSAwO1xyXG4gICAgICAgIGlmKElucHV0Ll9tRGVsdGEgPiAwKSBkZWx0YSA9IDE7XHJcbiAgICAgICAgaWYoSW5wdXQuX21EZWx0YSA8IDApIGRlbHRhID0gLTE7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogSW5wdXQuX214IHx8IDAsXHJcbiAgICAgICAgICAgIHk6IElucHV0Ll9teSB8fCAwLFxyXG4gICAgICAgICAgICBtTGVmdDogSW5wdXQuX21MZWZ0IHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBtUmlnaHQ6IElucHV0Ll9tUmlnaHQgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIG1EZWx0YTogZGVsdGFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufTsiLCJpbXBvcnQgeyBBTFUgfSBmcm9tIFwiLi4vYWx1L2FsdVwiO1xyXG5pbXBvcnQgeyBDUFVfNjUwMl9BTFUgfSBmcm9tIFwiLi4vY3B1LzY1MDIvY3B1XzY1MDJfYWx1XCI7XHJcbmltcG9ydCB7IENQVSB9IGZyb20gXCIuLi9jcHUvY3B1XCI7XHJcbmltcG9ydCB7IEJ1cyB9IGZyb20gXCIuLi9kYXRhL2J1c1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbnN0cnVjdGlvbiB7XHJcbiAgICBtbmVtOiBzdHJpbmcsXHJcbiAgICBvcGVyYXRpb246IEZ1bmN0aW9uLFxyXG4gICAgYWRkcmVzc2VyPzogRnVuY3Rpb24sXHJcbiAgICBieXRlczogbnVtYmVyLFxyXG4gICAgZHVyYXRpb246IG51bWJlclxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEluc3RydWN0aW9uU2V0IHtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2luc3RydWN0aW9uczogSW5zdHJ1Y3Rpb25bXTtcclxuICAgIHByb3RlY3RlZCBfY3B1OiBDUFU7XHJcbiAgICBwcm90ZWN0ZWQgX2J1czogQnVzO1xyXG4gICAgcHJvdGVjdGVkIF9hbHU6IENQVV82NTAyX0FMVTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjcHU6IENQVSwgYnVzOiBCdXMsIGFsdTogQ1BVXzY1MDJfQUxVKSB7XHJcbiAgICAgICAgdGhpcy5faW5zdHJ1Y3Rpb25zID0gW107XHJcbiAgICAgICAgdGhpcy5fY3B1ID0gY3B1O1xyXG4gICAgICAgIHRoaXMuX2J1cyA9IGJ1cztcclxuICAgICAgICB0aGlzLl9hbHUgPSBhbHU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIExvb2t1cChvcGNvZGU6IG51bWJlcik6IEluc3RydWN0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdHJ1Y3Rpb25zW29wY29kZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9Mb2dOb3RJbXBsZW1lbnRlZChvcDogSW5zdHJ1Y3Rpb24sIGNvZGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRocm93KGAke29wLm1uZW19KCR7Y29kZS50b1N0cmluZygxNil9KSBOT1QgSU1QTEVNRU5URURgKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxufSIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudC9jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2xvY2sgfSBmcm9tIFwiLi9jb21wb25lbnQvY2xvY2tcIjtcclxuaW1wb3J0IHsgT3NjaWxsaXNjb3BlIH0gZnJvbSBcIi4vY29tcG9uZW50L29zY2lsbG9zY29wZVwiO1xyXG5pbXBvcnQgeyBDUFVfNjUwMiwgRVJlZ2lzdGVycyB9IGZyb20gXCIuL2NwdS82NTAyL2NwdV82NTAyXCI7XHJcbmltcG9ydCB7IEJ1cyB9IGZyb20gXCIuL2RhdGEvYnVzXCI7XHJcbmltcG9ydCB7IFJBTSB9IGZyb20gXCIuL2NvbXBvbmVudC9yYW1cIjtcclxuaW1wb3J0IHsgSU5lc0xvYWRlciB9IGZyb20gXCIuL2RhdGEvaW5lc1wiO1xyXG5pbXBvcnQgeyBCaXRzZXQgfSBmcm9tIFwiLi9kYXRhL2JpdHNldFwiO1xyXG5pbXBvcnQgeyBDYXJ0cmlkZ2UgfSBmcm9tIFwiLi9jb21wb25lbnQvY2FydHJpZGdlXCI7XHJcbmltcG9ydCB7IFBQVSB9IGZyb20gXCIuL2NwdS82NTAyL3BwdVwiO1xyXG5pbXBvcnQgeyBHVUkgfSBmcm9tIFwiLi9ndWkvZ3VpXCI7XHJcbmltcG9ydCB7IEluc3RydWN0aW9uIH0gZnJvbSBcIi4vaW5zdHJ1Y3Rpb25zL2luc3RydWN0aW9uX3NldFwiO1xyXG5pbXBvcnQgeyBEaXNhc3NlbWJsZXIgfSBmcm9tIFwiLi9kZWJ1Zy9kaXNhc3NlbWJsZXJcIjtcclxuaW1wb3J0IHsgR3VpRGVidWdnZXIgfSBmcm9tIFwiLi9ndWkvZ3VpX2RlYnVnZ2VyXCI7XHJcbmltcG9ydCB7IENQVSB9IGZyb20gXCIuL2NwdS9jcHVcIjtcclxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIi4vZGVidWcvbG9nZ2VyXCI7XHJcbmltcG9ydCB7IERNQSB9IGZyb20gXCIuL2NvbXBvbmVudC9kbWFcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTeXN0ZW0geyAgICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50czogQ29tcG9uZW50W107XHJcbiAgICBwcml2YXRlIF9jcHVCdXM6IEJ1cztcclxuICAgIHByaXZhdGUgX3BwdUJ1czogQnVzO1xyXG4gICAgcHJpdmF0ZSBfY2xvY2s6IENsb2NrO1xyXG4gICAgcHJpdmF0ZSBfcnVubmluZzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3N0ZXA6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9ndWk6IEdVSVxyXG4gICAgcHJpdmF0ZSBfdGlja0NvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF90aWNrQ291bnRlcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbGFzdEZyYW1lOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbG9nOiBMb2dnZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfY3B1OiBDUFVfNjUwMjsgICAgXHJcbiAgICBwcml2YXRlIF9wcHU6IFBQVTtcclxuICAgIHByaXZhdGUgX2RtYTogRE1BO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIF90aWNrVGltZXI6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9jb21wb25lbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5fY2xvY2sgPSBuZXcgQ2xvY2soMzAwMDAwMCk7XHJcbiAgICAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9ndWkgPSBuZXcgR1VJKCk7XHJcbiAgICAgICAgdGhpcy5fdGlja0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9sb2cgPSBuZXcgTG9nZ2VyKCk7ICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5fdGlja1RpbWVyID0gMDtcclxuICAgICAgICB0aGlzLl90aWNrQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX3RpY2tDb3VudGVyID0gMDtcclxuICAgICAgICB0aGlzLl9sYXN0RnJhbWUgPSAwO1xyXG5cclxuICAgICAgICBsZXQgbG9hZGVyOiBJTmVzTG9hZGVyID0gbmV3IElOZXNMb2FkZXIoKTtcclxuXHJcbiAgICAgICAgbG9hZGVyLkxvYWRBc3luYyhcIlxcXFxyb21cXFxcc21iLm5lc1wiLCAoZGF0YTogbnVtYmVyW10pID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBjYXJ0OiBDYXJ0cmlkZ2UgPSBuZXcgQ2FydHJpZGdlKGRhdGEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fY3B1QnVzID0gbmV3IEJ1cygpOyAgICBcclxuICAgICAgICAgICAgdGhpcy5fcHB1QnVzID0gbmV3IEJ1cygpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG9zY2lsbG9zY29wZTogT3NjaWxsaXNjb3BlID0gbmV3IE9zY2lsbGlzY29wZSgpO1xyXG4gICAgICAgICAgICBsZXQgcmFtOiBSQU0gPSBuZXcgUkFNKDgxOTIpOyAgICBcclxuICAgICAgICAgICAgdGhpcy5fcHB1ID0gbmV3IFBQVSh0aGlzLl9wcHVCdXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9kbWEgPSBuZXcgRE1BKHRoaXMuX2NwdUJ1cywgdGhpcy5fcHB1KTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1ID0gbmV3IENQVV82NTAyKHRoaXMuX2NwdUJ1cywgdGhpcy5fZG1hKTtcclxuXHJcbiAgICAgICAgICAgIC8vdGhpcy5fY29tcG9uZW50cy5wdXNoKG9zY2lsbG9zY29wZSk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fY29tcG9uZW50cy5wdXNoKHJhbSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMucHVzaCh0aGlzLl9jcHUpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb21wb25lbnRzLnB1c2godGhpcy5fcHB1KTtcclxuICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50cy5wdXNoKHRoaXMuX2RtYSk7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuX2NwdUJ1cy5Db25uZWN0KGNwdSwgLTEsIC0xKTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1QnVzLkNvbm5lY3QocmFtLCAweDAwMDAsIDB4MUZGRik7XHJcbiAgICAgICAgICAgIHRoaXMuX2NwdUJ1cy5Db25uZWN0KHRoaXMuX3BwdSwgMHgyMDAwLCAweDNGRkYpO1xyXG4gICAgICAgICAgICB0aGlzLl9jcHVCdXMuQ29ubmVjdCh0aGlzLl9kbWEsIDB4NDAxNCwgMHg0MDE5KTtcclxuICAgICAgICAgICAgdGhpcy5fY3B1QnVzLkNvbm5lY3QoY2FydCwgMHg4MDAwLCAweEZGRkYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcHB1QnVzLkNvbm5lY3QoY2FydCwgMHgwMDAwLCAweEZGRkYpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAvL3RoaXMuX3BwdUJ1cy5Db25uZWN0KGNhcnQuQ2hyUm9tKCksIDB4MDAwMCwgMHgxRkZGKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX2NwdS5SZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fZ3VpLkRpc2Fzc2VtYmxlci5TeXN0ZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9ndWkuRGlzYXNzZW1ibGVyLlJ1bih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuUmVhZCgpLCB0aGlzLl9jcHVCdXMsIHRoaXMuX2NwdSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2d1aS5EaXNhc3NlbWJsZXIuU2Nyb2xsVG8odGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLlJlYWQoKSk7ICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgYnRuOiBIVE1MQnV0dG9uRWxlbWVudCA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhdmVfbG9nXCIpO1xyXG4gICAgICAgIGJ0bi5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9sb2cuU2F2ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuX3BwdSkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9wcHUuRnJhbWVDb21wbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHB1LkZyYW1lQ29tcGxldGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yKGxldCBjb21wb25lbnQgb2YgdGhpcy5fY29tcG9uZW50cykgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb21wb25lbnQuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9ydW5uaW5nIHx8IHRoaXMuX3N0ZXApIHtcclxuXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9zdGVwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHB1bHNlcyA9IHRoaXMuX2Nsb2NrLk9zY2lsbGF0ZSgpOyAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwdWxzZXM7IGkrKykgeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fdGlja0NvdW50ICUgMyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcHUuUHVsc2UodGhpcy5fdGlja0NvdW50LCB0aGlzLl9sb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcHUuUHVsc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kbWEuUHVsc2UodGhpcy5fdGlja0NvdW50KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yKGxldCBjb21wb25lbnQgb2YgdGhpcy5fY29tcG9uZW50cykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZih0aGlzLl90aWNrQ291bnQgJSBjb21wb25lbnQuQ2xvY2tEaXZpZGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbXBvbmVudC5QdWxzZSh0aGlzLl90aWNrQ291bnQsIHRoaXMuX2xvZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9ICAgICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcHB1Lk5NSSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jcHUuTm1pKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BwdS5OTUkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYodGhpcy5fZ3VpLkRpc2Fzc2VtYmxlci5CcmVha3BvaW50Q2hlY2sodGhpcy5fY3B1LlJlZ2lzdGVyKEVSZWdpc3RlcnMuUEMpLlJlYWQoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy5fcnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpY2tDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpY2tDb3VudGVyKys7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGNvbXBvbmVudCBvZiB0aGlzLl9jb21wb25lbnRzKSB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LlB1bHNlKHRoaXMuX3RpY2tDb3VudCwgdGhpcy5fbG9nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9zdGVwID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLl9jb21wb25lbnRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3VpLkRpc2Fzc2VtYmxlci5TZXRMb2NhdGlvbih0aGlzLl9jcHUuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuUmVhZCgpLCB0aGlzLl9jcHVCdXMsIHRoaXMuX2NwdSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2d1aS5VcGRhdGUoKTtcclxuICAgICAgICB9ICAgICAgXHJcblxyXG4gICAgICAgIGxldCBub3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuXHJcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy5fbGFzdEZyYW1lO1xyXG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IG5vdztcclxuXHJcblxyXG4gICAgICAgIGlmKGRlbHRhID4gMTAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGhpcyB1cGRhdGUgdG9vazogXCIgKyBkZWx0YSArIFwibXNcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdGhpcy5fdGlja1RpbWVyICs9IGRlbHRhO1xyXG5cclxuXHJcbiAgICAgICAgaWYodGhpcy5fdGlja1RpbWVyID49IDEwMDApIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlja1RpbWVyID0gMDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJUUFM6IFwiICsgdGhpcy5fdGlja0NvdW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl90aWNrQ291bnRlciA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRHJhdygpOiB2b2lkIHtcclxuICAgICAgICBpZigoPENQVV82NTAyPnRoaXMuX2NvbXBvbmVudHNbMV0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2d1aS5EcmF3KHRoaXMuX2NwdSwgdGhpcy5fY3B1QnVzLCB0aGlzLl9wcHUsIHRoaXMuX3BwdUJ1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYXVzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ydW5uaW5nID0gZmFsc2U7ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVG9nZ2xlUGF1c2VQbGF5ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcnVubmluZyA9ICF0aGlzLl9ydW5uaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ydW5uaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RlcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlN0ZXBwaW5nXCIpO1xyXG4gICAgICAgIHRoaXMuX3N0ZXAgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBVcGRhdGVHdWkoZ3VpOiBHVUkpIHtcclxuXHJcbiAgICAvLyAgICAgaWYodGhpcy5fY29tcG9uZW50cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgLy8gICAgICAgICBsZXQgcGNOb3c6IG51bWJlciA9ICg8Q1BVXzY1MDI+dGhpcy5fY29tcG9uZW50c1syXSkuUmVnaXN0ZXIoRVJlZ2lzdGVycy5QQykuUmVhZCgpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5fbGFzdFBjICE9PSBwY05vdykge1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIC8vZ3VpLkRlYnVnZ2VyLkNsZWFyRGlzYXNzZW1ibGVyKCk7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGNwdTogQ1BVXzY1MDIgPSAoPENQVV82NTAyPnRoaXMuX2NvbXBvbmVudHNbMl0pO1xyXG4gICAgLy8gICAgICAgICAgICAgbGV0IGRhdGE6IG51bWJlciA9IHRoaXMuX2NwdUJ1cy5SZWFkKHBjTm93KTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBpZihkYXRhICE9PSBudWxsKSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgbGV0IGluczogSW5zdHJ1Y3Rpb24gPSBjcHUuSW5zdHJ1Y3Rpb25Mb29rdXAoZGF0YSk7ICAgICAgICAgICAgICBcclxuICAgIC8vICAgICAgICAgICAgICAgICBsZXQgb3BzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmKGlucykgeyAgICAgICAgICAgICAgICAgIFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBvcHMgPSBjcHUuT3BlcmFuZExvb2t1cChwY05vdysxLCBpbnMpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgICAgICBndWkuRGVidWdnZXIuQWRkRGlzYXNzZW1ibGVyUm93KGZhbHNlLCBwY05vdywgZGF0YSwgaW5zLCBvcHMpO1xyXG4gICAgLy8gICAgICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgICAgIGd1aS5EZWJ1Z2dlci5DbGVhclJlZ2lzdGVycygpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjcHUuUmVnaXN0ZXJzKCkubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgICAgICAgICBndWkuRGVidWdnZXIuQWRkUmVnaXN0ZXJSb3coY3B1LlJlZ2lzdGVyKGkpKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgICAgICBndWkuRGVidWdnZXIuQ2xlYXJTdGF0dXMoKTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBndWkuRGVidWdnZXIuQWRkU3RhdHVzUm93KGNwdS5SZWdpc3RlcihFUmVnaXN0ZXJzLlNUQVRVUykpO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuX2xhc3RQYyA9IHBjTm93O1xyXG5cclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgfVxyXG5cclxuICAgIC8vIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6IiJ9