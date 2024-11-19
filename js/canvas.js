const createCanvas = () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas;
};
const resizeCanvas = (canvas, gl) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
};
export { createCanvas, resizeCanvas };
