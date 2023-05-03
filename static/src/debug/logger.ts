
export class Logger {

    private _log: string;

    public WriteLine(text: string): void {
        if(text.length === 0) return;
        this._log += text;
        this._log += '\r\n';
    }

    public Save(): void {

        let el: HTMLAnchorElement = <HTMLAnchorElement>document.createElement("a");
        el.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(this._log));
        el.setAttribute("download", "log_" + Date.now());

        el.style.display = "none";
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);

    }

}