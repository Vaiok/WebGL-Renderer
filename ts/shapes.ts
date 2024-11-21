const colorMap: { [key: string]: number[] } = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue': [0, 0, 255],
};

class Triangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(width: number, height: number, color: string = 'red') {
        this.positions = new Float32Array([
            0, height/2, 0,
            -width/2, -height/2, 0,
            width/2, -height/2, 0,
        ]);
        this.colors = new Uint8Array([
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

class Rectangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(width: number, height: number, color: string = 'red') {
        this.positions = new Float32Array([
            -width/2, height/2,  0,
            -width/2, -height/2, 0,
            width/2,  height/2,  0,
            -width/2, -height/2, 0,
            width/2,  -height/2, 0,
            width/2,  height/2,  0,
        ]);
        this.colors = new Uint8Array([
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

export { Triangle, Rectangle };