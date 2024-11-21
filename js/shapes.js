class Triangle {
    constructor(width, height, color) {
        const w = width / 2, h = height / 2;
        this.positions = new Float32Array([
            0, h, 0,
            -w, -h, 0,
            w, -h, 0,
        ]);
        this.colors = new Uint8Array([
            ...color,
            ...color,
            ...color,
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
class Cube {
    constructor(width, height, depth, colors) {
        const w = width / 2, h = height / 2, d = depth / 2;
        this.positions = new Float32Array([
            -w, h, -d, -w, -h, -d, w, h, -d,
            -w, -h, -d, w, -h, -d, w, h, -d,
            -w, h, d, w, h, d, -w, -h, d,
            w, h, d, w, -h, d, -w, -h, d,
            -w, h, -d, w, h, -d, -w, h, d,
            w, h, -d, w, h, d, -w, h, d,
            -w, -h, -d, -w, -h, d, w, -h, -d,
            -w, -h, d, w, -h, d, w, -h, -d,
            w, h, -d, w, -h, -d, w, h, d,
            w, -h, -d, w, -h, d, w, h, d,
            -w, h, -d, -w, h, d, -w, -h, -d,
            -w, h, d, -w, -h, d, -w, -h, -d,
        ]);
        this.colors = new Uint8Array([
            ...colors[0], ...colors[0], ...colors[0],
            ...colors[0], ...colors[0], ...colors[0],
            ...colors[1], ...colors[1], ...colors[1],
            ...colors[1], ...colors[1], ...colors[1],
            ...colors[2], ...colors[2], ...colors[2],
            ...colors[2], ...colors[2], ...colors[2],
            ...colors[3], ...colors[3], ...colors[3],
            ...colors[3], ...colors[3], ...colors[3],
            ...colors[4], ...colors[4], ...colors[4],
            ...colors[4], ...colors[4], ...colors[4],
            ...colors[5], ...colors[5], ...colors[5],
            ...colors[5], ...colors[5], ...colors[5],
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle, Cube };
