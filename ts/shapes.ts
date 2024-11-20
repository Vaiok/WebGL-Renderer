class Triangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor() {
        this.positions = new Float32Array([
            0, 0.5, 0,
            -0.5, -0.5, 0,
            0.5, -0.5, 0,
        ]);
        this.colors = new Uint8Array([
            255, 0, 0,
            0, 255, 0,
            0, 0, 255,
        ]);
    }
    public getPositions() { return this.positions }
    public getColors() { return this.colors }
}

export { Triangle };