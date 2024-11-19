import { createShader, createProgram, vertexShaderSource, fragmentShaderSource } from './shaders.js';
import { Triangle } from './shapes.js';
const setupWebGL = (canvas) => {
    const gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('WebGL not supported');
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const colorAttributeLocation = gl.getAttribLocation(program, 'a_color');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const triangle = new Triangle();
    gl.bufferData(gl.ARRAY_BUFFER, triangle.getPositions(), gl.STATIC_DRAW);
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangle.getColors(), gl.STATIC_DRAW);
    return {
        gl, program,
        positionAttributeLocation, colorAttributeLocation,
        positionBuffer, colorBuffer
    };
};
export { setupWebGL };
