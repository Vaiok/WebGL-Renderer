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
    constructor(width: number, height: number, depth: number, colors: number[][]) {
        const w = width/2, h = height/2, d = depth/2;
        this.positions = new Float32Array([
            // Front face
            -w,  h, -d, -w, -h, -d,  w,  h, -d,
            -w, -h, -d,  w, -h, -d,  w,  h, -d,
            // Back face
            -w,  h,  d,  w,  h,  d, -w, -h,  d,
             w,  h,  d,  w, -h,  d, -w, -h,  d,
            // Top face
            -w,  h, -d,  w,  h, -d, -w,  h,  d,
             w,  h, -d,  w,  h,  d, -w,  h,  d,
            // Bottom face
            -w, -h, -d, -w, -h,  d,  w, -h, -d,
            -w, -h,  d,  w, -h,  d,  w, -h, -d,
            // Right face
             w,  h, -d,  w, -h, -d,  w,  h,  d,
             w, -h, -d,  w, -h,  d,  w,  h,  d,
            // Left face
            -w,  h, -d, -w,  h,  d, -w, -h, -d,
            -w,  h,  d, -w, -h,  d, -w, -h, -d,
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