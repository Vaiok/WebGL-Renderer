import { vertexShaderSource, fragmentShaderSource } from './shaders.js';
import { Cube } from './shapes.js';
const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    if (!shader) {
        throw new Error('Shader creation failed');
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader log: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        throw new Error('Shader compilation failed');
    }
    return shader;
};
const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    if (!program) {
        throw new Error('Program creation failed');
    }
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
const setupWebGL = (canvas) => {
    const gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('WebGL not supported');
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const worldUnifLoc = gl.getUniformLocation(program, 'u_world');
    const viewUnifLoc = gl.getUniformLocation(program, 'u_view');
    const invTransUnifLoc = gl.getUniformLocation(program, 'u_inverseTranspose');
    const lightDirUnifLoc = gl.getUniformLocation(program, 'u_revLightDir');
    const lightPosUnifLoc = gl.getUniformLocation(program, 'u_lightPosition');
    const ambLightColorUnifLoc = gl.getUniformLocation(program, 'u_ambientLightColor');
    const dirLightColorUnifLoc = gl.getUniformLocation(program, 'u_dirLightColor');
    const pointLightColorUnifLoc = gl.getUniformLocation(program, 'u_pointLightColor');
    const positionAttrLoc = gl.getAttribLocation(program, 'a_position');
    const colorAttrLoc = gl.getAttribLocation(program, 'a_color');
    const normalAttrLoc = gl.getAttribLocation(program, 'a_normal');
    const box = new Cube(0, 0, 0, 100, 100, 100, [
        [0, 255, 255], [255, 0, 0],
        [255, 0, 255], [0, 255, 0],
        [255, 255, 0], [0, 0, 255],
    ], [
        [0, 0, -1], [0, 0, 1],
        [0, -1, 0], [0, 1, 0],
        [-1, 0, 0], [1, 0, 0]
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, box.getPositions(), gl.STATIC_DRAW);
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, box.getColors(), gl.STATIC_DRAW);
    const normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, box.getNormals(), gl.STATIC_DRAW);
    return {
        gl, program,
        worldUnifLoc, viewUnifLoc, invTransUnifLoc,
        lightDirUnifLoc, lightPosUnifLoc,
        ambLightColorUnifLoc, dirLightColorUnifLoc, pointLightColorUnifLoc,
        positionAttrLoc, colorAttrLoc, normalAttrLoc,
        positionBuffer, colorBuffer, normalBuffer
    };
};
export { setupWebGL };
