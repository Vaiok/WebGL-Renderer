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
    constructor(x, y, z, width, height, depth, colors) {
        const w = width / 2, h = height / 2, d = depth / 2;
        const ntl = [x - w, y + h, z - d];
        const ntr = [x + w, y + h, z - d];
        const nbl = [x - w, y - h, z - d];
        const nbr = [x + w, y - h, z - d];
        const ftl = [x - w, y + h, z + d];
        const ftr = [x + w, y + h, z + d];
        const fbl = [x - w, y - h, z + d];
        const fbr = [x + w, y - h, z + d];
        this.positions = new Float32Array([
            ...ntl, ...ntr, ...nbl,
            ...nbl, ...ntr, ...nbr,
            ...ftl, ...fbl, ...ftr,
            ...ftr, ...fbl, ...fbr,
            ...ntl, ...ftl, ...ntr,
            ...ntr, ...ftl, ...ftr,
            ...nbl, ...nbr, ...fbl,
            ...fbl, ...nbr, ...fbr,
            ...ntr, ...ftr, ...nbr,
            ...nbr, ...ftr, ...fbr,
            ...ntl, ...nbl, ...ftl,
            ...ftl, ...nbl, ...fbl,
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
