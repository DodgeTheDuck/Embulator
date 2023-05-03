
export class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public Add(other: Vector): void {
        this.x += other.x;
        this.y += other.y;
    }

    public Div(other: number): void {
        this.x /= other;
        this.y /= other;
    }

    public Mult(other: number): void {
        this.x *= other;
        this.y *= other;
    }

    public Length(): number {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    public Distance(other: Vector): number {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    }

    public Inverse(): Vector {
        return new Vector(-this.x, -this.y);
    }

    public Zero(): void {
        this.x = 0;
        this.y = 0;
    }

    static Add(left: Vector, right: Vector): Vector {
        return new Vector(left.x+right.x, left.y+right.y);
    }

}