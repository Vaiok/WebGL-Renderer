class Triangle {
    private positions: Float32Array;
    private colors: Float32Array;
    constructor() {
        this.positions = new Float32Array([
            0.0, 0.0, 0.0,
            0.0, 0.5, 0.0,
            0.7, 0.0, 0.0,
        ]);
        this.colors = new Float32Array([
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0,
        ]);
    }
    public getPositions() { return this.positions }
    public getColors() { return this.colors }
}

export { Triangle };