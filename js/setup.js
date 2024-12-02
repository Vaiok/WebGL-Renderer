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
    const box = new Cube(0, 0, 0, 100, 100, 100, [
        [0, 255, 255], [255, 0, 0],
        [255, 0, 255], [0, 255, 0],
        [255, 255, 0], [0, 0, 255],
    ], [
        [0, 0, -1], [0, 0, 1],
        [0, -1, 0], [0, 1, 0],
        [-1, 0, 0], [1, 0, 0]
    ]);
    const programInfo = {
        program,
        attributes: [
            { name: 'a_position', location: null, buffer: null, size: 3, type: 'FLOAT' },
            { name: 'a_color', location: null, buffer: null, size: 3, type: 'UNSIGNED_BYTE' },
            { name: 'a_normal', location: null, buffer: null, size: 3, type: 'FLOAT' }
        ],
        uniforms: [
            { name: 'u_world', location: null, data: null, type: 'Matrix4fv' },
            { name: 'u_view', location: null, data: null, type: 'Matrix4fv' },
            { name: 'u_inverseTranspose', location: null, data: null, type: 'Matrix4fv' },
            { name: 'u_revLightDir', location: null, data: [0, 1, 0], type: '3fv' },
            { name: 'u_spotLightDir', location: null, data: [0, 0, 1], type: '3fv' },
            { name: 'u_pointLightPosition', location: null, data: null, type: '3fv' },
            { name: 'u_spotLightPosition', location: null, data: null, type: '3fv' },
            { name: 'u_ambientLightColor', location: null, data: [0.2, 0.2, 0.2], type: '3fv' },
            { name: 'u_dirLightColor', location: null, data: [0.6, 0.4, 0.2], type: '3fv' },
            { name: 'u_pointLightColor', location: null, data: [0.4, 0.5, 0.6], type: '3fv' },
            { name: 'u_spotLightColor', location: null, data: [1.0, 1.0, 1.0], type: '3fv' },
            { name: 'u_spotOuterSize', location: null, data: null, type: '1f' },
            { name: 'u_spotInnerSize', location: null, data: null, type: '1f' }
        ]
    };
    for (const attribute of programInfo.attributes) {
        attribute.location = gl.getAttribLocation(program, attribute.name);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const methodName = `get${attribute.name[2].toUpperCase()}${attribute.name.slice(3)}s`;
        gl.bufferData(gl.ARRAY_BUFFER, box[methodName](), gl.STATIC_DRAW);
        attribute.buffer = buffer;
    }
    for (const uniform of programInfo.uniforms) {
        uniform.location = gl.getUniformLocation(program, uniform.name);
    }
    return { gl, programInfo };
};
export { setupWebGL };
