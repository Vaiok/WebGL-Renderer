const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas;
};
const resizeCanvas = (canvas: HTMLCanvasElement, gl: WebGLRenderingContext) => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
};

export { createCanvas, resizeCanvas };