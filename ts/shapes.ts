class Triangle {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(width: number, height: number, color: number[]) {
        const w = width/2, h = height/2;
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
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

class Cube {
    private positions: Float32Array;
    private colors: Uint8Array;
    constructor(
        x: number, y: number, z: number,
        width: number, height: number, depth: number,
        colors: number[][]
    ) {
        const w = width/2, h = height/2, d = depth/2;
        const ntl = [x-w, y+h, z-d];
        const ntr = [x+w, y+h, z-d];
        const nbl = [x-w, y-h, z-d];
        const nbr = [x+w, y-h, z-d];
        const ftl = [x-w, y+h, z+d];
        const ftr = [x+w, y+h, z+d];
        const fbl = [x-w, y-h, z+d];
        const fbr = [x+w, y-h, z+d];
        this.positions = new Float32Array([
            // Front face
            ...ntl, ...nbl, ...ntr,
            ...nbl, ...nbr, ...ntr,
            // Back face
            ...ftl, ...ftr, ...fbl,
            ...ftr, ...fbr, ...fbl,
            // Top face
            ...ntl, ...ntr, ...ftl,
            ...ntr, ...ftr, ...ftl, 
            // Bottom face
            ...nbl, ...fbl, ...nbr,
            ...fbl, ...fbr, ...nbr,
            // Right face
            ...ntr, ...nbr, ...ftr,
            ...nbr, ...fbr, ...ftr,
            // Left face
            ...ntl, ...ftl, ...nbl,
            ...ftl, ...fbl, ...nbl,
        ]);
        this.colors = new Uint8Array([
            // Front face
            ...colors[0], ...colors[0], ...colors[0],
            ...colors[0], ...colors[0], ...colors[0],
            // Back face
            ...colors[1], ...colors[1], ...colors[1],
            ...colors[1], ...colors[1], ...colors[1],
            // Top face
            ...colors[2], ...colors[2], ...colors[2],
            ...colors[2], ...colors[2], ...colors[2],
            // Bottom face
            ...colors[3], ...colors[3], ...colors[3],
            ...colors[3], ...colors[3], ...colors[3],
            // Right face
            ...colors[4], ...colors[4], ...colors[4],
            ...colors[4], ...colors[4], ...colors[4],
            // Left face
            ...colors[5], ...colors[5], ...colors[5],
            ...colors[5], ...colors[5], ...colors[5],
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getColors(): Uint8Array { return this.colors }
}

export { Triangle, Cube };