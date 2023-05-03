import { ESstatusBits } from "../cpu/6502/cpu_6502";
import { Register } from "../data/register";
import { Instruction } from "../instructions/instruction_set";

export class GuiDebugger {

    private _instructionsLoaded: boolean;

    constructor() {

        this._instructionsLoaded = false;

        this._BuildDisassembler();
        this._BuildRegisters();
    }

    public AddDisassemblerRow(bp: boolean, addr: number, data: number, instruction: Instruction, ops: number[]) {

        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("disassembly");

        let tr: HTMLTableRowElement = document.createElement("tr");

        let tdBp: HTMLTableDataCellElement = document.createElement("td");
        let tdAddr: HTMLTableDataCellElement = document.createElement("td");
        let tdData: HTMLTableDataCellElement = document.createElement("td");
        let tdInstruction: HTMLTableDataCellElement = document.createElement("td");

        tdAddr.innerText = "0x" + addr.toString(16).toUpperCase();
        tdData.innerText = data.toString(16).toUpperCase();

        if(instruction) {
            tdInstruction.innerText = `${instruction.mnem} `;
            for(let i = 0; i < ops.length; i++) {
                tdInstruction.innerText += `0x${ops[i].toString(16).toUpperCase()} `;
            }
        } else {
            tdInstruction.innerText = `!NOT FOUND!`;
        }

        tr.appendChild(tdBp);
        tr.appendChild(tdAddr);
        tr.appendChild(tdData);
        tr.appendChild(tdInstruction);

        table.tBodies[0].append(tr);

    }

    public AddRegisterRow(register: Register) {

        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("registers");

        let tr: HTMLTableRowElement = document.createElement("tr");

        let tdName: HTMLTableDataCellElement = document.createElement("td");
        let tdData: HTMLTableDataCellElement = document.createElement("td");

        tdName.innerText = register.Name();
        tdData.innerText = "0x" + register.Read().toString(16).toUpperCase();

        tr.appendChild(tdName);
        tr.appendChild(tdData);

        table.tBodies[0].append(tr);

    }

    public AddStatusRow(register: Register) {

        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("status");

        let tr: HTMLTableRowElement = document.createElement("tr");

        let tds: HTMLTableDataCellElement[] = []

        for(let i = 0; i < 8; i++) {

            let tdData: HTMLTableDataCellElement = document.createElement("td");
            tds.push(tdData);
            tr.appendChild(tdData);

        }

        tds[0].innerText = register.Bit(ESstatusBits.N).toString();
        tds[1].innerText = register.Bit(ESstatusBits.V).toString();
        tds[2].innerText = register.Bit(ESstatusBits.UNUSED).toString();
        tds[3].innerText = register.Bit(ESstatusBits.B).toString();
        tds[4].innerText = register.Bit(ESstatusBits.D).toString();
        tds[5].innerText = register.Bit(ESstatusBits.I).toString();
        tds[6].innerText = register.Bit(ESstatusBits.Z).toString();
        tds[7].innerText = register.Bit(ESstatusBits.C).toString();

        table.tBodies[0].append(tr);

    }

    public ClearDisassembler() {
        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("disassembly");
        table.tBodies[0].innerHTML = "";
    }

    public ClearRegisters() {
        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("registers");
        table.tBodies[0].innerHTML = "";
    }

    public ClearStatus() {
        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("status");
        table.tBodies[0].innerHTML = "";
    }

    private _BuildDisassembler() {

        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("disassembly");

        let colBreakpoint: HTMLTableDataCellElement = document.createElement("td");
        let colAddress: HTMLTableDataCellElement = document.createElement("td");
        let colInstruction: HTMLTableDataCellElement = document.createElement("td");

        colBreakpoint.innerText = "";
        colAddress.innerText = "Address";
        colInstruction.innerText = "Instruction";

        colBreakpoint.style.width = "32px";
        colBreakpoint.style.height = "32px";

        table.tHead.appendChild(colBreakpoint);
        table.tHead.appendChild(colAddress);
        table.tHead.appendChild(colInstruction);

    }


    private _BuildRegisters() {
        
        let table: HTMLTableElement = <HTMLTableElement>document.getElementById("registers");

        let colName: HTMLTableDataCellElement = document.createElement("td");
        let colData: HTMLTableDataCellElement = document.createElement("td");

        colName.innerText = "Register";
        colData.innerText = "Value";
        colName.style.height = "32px";

        table.tHead.appendChild(colName);
        table.tHead.appendChild(colData);

    }

    get InstructionsLoaded(): boolean {
        return this._instructionsLoaded;
    }

    set InstructionsLoaded(state: boolean) {
        this._instructionsLoaded = state;
    }

}