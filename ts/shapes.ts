class Triangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor() {
        this.positions = new Float32Array([
            0, 50, 0,
            -50, -50, 0,
            50, -50, 0,
        ]);
        this.colors = new Uint8Array([
            255, 0, 0,
            0, 255, 0,
            0, 0, 255,
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

export { Triangle };