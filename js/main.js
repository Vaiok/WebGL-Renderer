import { Canvas } from './canvas.js';
import { setupWebGL } from './setup.js';
import { renderWebGL } from './render.js';
const canvas = new Canvas();
const glData = setupWebGL(canvas.getCanvas());
canvas.resizeCanvas(glData.gl);
const rotation = [0];
requestAnimationFrame(() => renderWebGL(glData, canvas.isFullscreen(), rotation));
window.addEventListener('resize', () => {
    canvas.resizeCanvas(glData.gl);
});
