class Triangle {
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
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle };
