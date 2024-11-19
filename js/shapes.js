class Triangle {
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
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle };
