class Canvas {
    constructor(fullscreen = true) {
        this.fullscreen = fullscreen;
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
    }
    getCanvas() { return this.canvas; }
    isFullscreen() { return this.fullscreen; }
    resizeCanvas(gl) {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        const cw = this.canvas.width;
        const ch = this.canvas.height;
        const diff = Math.abs(cw - ch) / 2;
        let viewX = 0;
        let viewY = 0;
        const viewSize = (this.fullscreen) ? Math.max(cw, ch) : Math.min(cw, ch);
        if (this.fullscreen) {
            if (cw > ch) {
                viewY -= diff;
            }
            else if (cw < ch) {
                viewX -= diff;
            }
        }
        else {
            if (cw > ch) {
                viewX += diff;
            }
            else if (cw < ch) {
                viewY += diff;
            }
        }
        gl.viewport(viewX, viewY, viewSize, viewSize);
    }
}
export { Canvas };
