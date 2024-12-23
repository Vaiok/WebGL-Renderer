type MethodName = 'getPositions' | 'getTexcoords' | 'getNormals';

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
    private texcoords: Float32Array;
    private normals: Float32Array;
    constructor(
        x: number, y: number, z: number,
        width: number, height: number, depth: number,
        texcoords: number[][], normals: number[][]
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
            // Back face
            ...ntl, ...nbl, ...ntr,
            ...nbl, ...nbr, ...ntr,
            // Front face
            ...ftl, ...ftr, ...fbl,
            ...ftr, ...fbr, ...fbl,
            // Bottom face
            ...nbl, ...fbl, ...nbr,
            ...fbl, ...fbr, ...nbr,
            // Top face
            ...ntl, ...ntr, ...ftl,
            ...ntr, ...ftr, ...ftl, 
            // Left face
            ...ntl, ...ftl, ...nbl,
            ...ftl, ...fbl, ...nbl,
            // Right face
            ...ntr, ...nbr, ...ftr,
            ...nbr, ...fbr, ...ftr,
        ]);
        this.texcoords = new Float32Array([
            // Back face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
            // Front face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
            // Bottom face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
            // Top face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
            // Left face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
            // Right face
            ...texcoords[0], ...texcoords[1], ...texcoords[2],
            ...texcoords[3], ...texcoords[4], ...texcoords[5],
        ]);
        this.normals = new Float32Array([
            // Back face
            ...normals[0], ...normals[0], ...normals[0],
            ...normals[0], ...normals[0], ...normals[0],
            // Front face
            ...normals[1], ...normals[1], ...normals[1],
            ...normals[1], ...normals[1], ...normals[1],
            // Bottom face
            ...normals[2], ...normals[2], ...normals[2],
            ...normals[2], ...normals[2], ...normals[2],
            // Top face
            ...normals[3], ...normals[3], ...normals[3],
            ...normals[3], ...normals[3], ...normals[3],
            // Left face
            ...normals[4], ...normals[4], ...normals[4],
            ...normals[4], ...normals[4], ...normals[4],
            // Right face
            ...normals[5], ...normals[5], ...normals[5],
            ...normals[5], ...normals[5], ...normals[5],
        ]);
    }
    public getPositions(): Float32Array { return this.positions }
    public getTexcoords(): Float32Array { return this.texcoords }
    public getNormals(): Float32Array { return this.normals }
}

export { Triangle, Cube, MethodName };