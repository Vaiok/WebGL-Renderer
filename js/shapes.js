const colorMap = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue': [0, 0, 255],
};
class Triangle {
    constructor(width, height, color) {
        this.positions = new Float32Array([
            0, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, -height / 2, 0,
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
class Rectangle {
    constructor(width, height, color) {
        this.positions = new Float32Array([
            -width / 2, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, -height / 2, 0,
            width / 2, height / 2, 0,
        ]);
        this.colors = new Uint8Array([
            ...color,
            ...color,
            ...color,
            ...color,
            ...color,
            ...color,
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle, Rectangle };
