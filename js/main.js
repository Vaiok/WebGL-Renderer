import { createCanvas, resizeCanvas } from './canvas.js';
import { setupWebGL } from './setup.js';
import { renderWebGL } from './render.js';
const canvas = createCanvas();
const glData = setupWebGL(canvas);
resizeCanvas(canvas, glData.gl);
renderWebGL(glData);
window.addEventListener('resize', () => {
    resizeCanvas(canvas, glData.gl);
    renderWebGL(glData);
});
