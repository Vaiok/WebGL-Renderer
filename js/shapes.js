const colorMap = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue': [0, 0, 255],
};
class Triangle {
    constructor(width, height, color = 'red') {
        this.positions = new Float32Array([
            0, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, -height / 2, 0,
        ]);
        this.colors = new Uint8Array([
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
class Rectangle {
    constructor(width, height, color = 'red') {
        this.positions = new Float32Array([
            -width / 2, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, height / 2, 0,
            -width / 2, -height / 2, 0,
            width / 2, -height / 2, 0,
            width / 2, height / 2, 0,
        ]);
        this.colors = new Uint8Array([
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
            ...colorMap[color],
        ]);
    }
    getPositions() { return this.positions; }
    getColors() { return this.colors; }
}
export { Triangle, Rectangle };
