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
    constructor(x, y, z, width, height, depth, colors, normals) {
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
            ...ntl, ...nbl, ...ntr,
            ...nbl, ...nbr, ...ntr,
            ...ftl, ...ftr, ...fbl,
            ...ftr, ...fbr, ...fbl,
            ...nbl, ...fbl, ...nbr,
            ...fbl, ...fbr, ...nbr,
            ...ntl, ...ntr, ...ftl,
            ...ntr, ...ftr, ...ftl,
            ...ntl, ...ftl, ...nbl,
            ...ftl, ...fbl, ...nbl,
            ...ntr, ...nbr, ...ftr,
            ...nbr, ...fbr, ...ftr,
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
        this.normals = new Float32Array([
            ...normals[0], ...normals[0], ...normals[0],
            ...normals[0], ...normals[0], ...normals[0],
            ...normals[1], ...normals[1], ...normals[1],
            ...normals[1], ...normals[1], ...normals[1],
            ...normals[2], ...normals[2], ...normals[2],
            ...normals[2], ...normals[2], ...normals[2],
            ...normals[3], ...normals[3], ...normals[3],
            ...normals[3], ...normals[3], ...normals[3],
            ...normals[4], ...normals[4], ...normals[4],
            ...normals[4], ...normals[4], ...normals[4],
            ...normals[5], ...normals[5], ...normals[5],
            ...normals[5], ...normals[5], ...normals[5],
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
    getNormals() { return this.normals; }
}
export { Triangle, Cube };
