import { vertexShaderSource, fragmentShaderSource } from './shaders.js';
import { Triangle } from './shapes.js';

const createShader = (
    gl: WebGLRenderingContext, type: number, source: string
): WebGLShader => {
    const shader = gl.createShader(type);
    if (!shader) { throw new Error('Shader creation failed'); }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader log: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error('Shader compilation failed');
    }
    return shader;
};
const createProgram = (
    gl: WebGLRenderingContext,
    vertexShader: WebGLShader, fragmentShader: WebGLShader
): WebGLProgram => {
    const program = gl.createProgram();
    if (!program) { throw new Error('Program creation failed'); }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program log: ' + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        throw new Error('Program linking failed');
    }
    return program;
};

const setupWebGL = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext('webgl');
    if (!gl) { throw new Error('WebGL not supported'); }
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
}

export { setupWebGL };