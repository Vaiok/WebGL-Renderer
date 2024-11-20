class Triangle {
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
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle };
