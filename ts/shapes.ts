class Triangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(width: number, height: number, color: number[]) {
        this.positions = new Float32Array([
            0, height/2, 0,
            -width/2, -height/2, 0,
            width/2, -height/2, 0,
        ]);
        this.colors = new Uint8Array([
            ...color,
            ...color,
            ...color,
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

class Rectangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(width: number, height: number, color: number[]) {
        this.positions = new Float32Array([
            -width/2, height/2,  0,
            -width/2, -height/2, 0,
            width/2,  height/2,  0,
            -width/2, -height/2, 0,
            width/2,  -height/2, 0,
            width/2,  height/2,  0,
        ]);
        this.colors = new Uint8Array([
            ...color,
            ...color,
            ...color,
            ...color,
            ...color,
            ...color,
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

export { Triangle, Rectangle };