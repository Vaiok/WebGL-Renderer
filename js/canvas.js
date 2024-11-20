const createCanvas = () => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas;
};
const resizeCanvas = (canvas, gl) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const bigger = Math.max(canvas.width, canvas.height);
    const diff = Math.abs(canvas.width - canvas.height) / 2;
    let viewX = 0;
    let viewY = 0;
    if (canvas.width > canvas.height) {
        viewY -= diff;
    }
    else if (canvas.width < canvas.height) {
        viewX -= diff;
    }
    gl.viewport(viewX, viewY, bigger, bigger);
};
export { createCanvas, resizeCanvas };
