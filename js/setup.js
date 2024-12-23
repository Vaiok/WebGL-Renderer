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
const extractShaderData = (vertShader, fragShader) => {
    const attributes = [...vertShader.matchAll(/attribute\s+(\w+)\s+(\w+)\s*;/g)];
    const uniforms = [
        ...vertShader.matchAll(/uniform\s+(\w+)\s+(\w+)\s*;/g),
        ...fragShader.matchAll(/uniform\s+(\w+)\s+(\w+)\s*;/g)
    ];
    let duplicates = [];
    for (let i = 0; i < uniforms.length - 1; i++) {
        for (let j = i + 1; j < uniforms.length; j++) {
            if (uniforms[i][0] === uniforms[j][0]) {
                duplicates.push(uniforms[j]);
            }
        }
    }
    for (const duplicate of duplicates) {
        const index = uniforms.lastIndexOf(duplicate);
        if (index !== -1) {
            uniforms.splice(index, 1);
        }
    }
    return { attributes, uniforms };
};
const setupWebGL = (canvas) => {
    const gl = canvas.getContext('webgl');
    if (!gl) {
        throw new Error('WebGL not supported');
    }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const shaderData = extractShaderData(vertexShaderSource, fragmentShaderSource);
    const box = new Cube(0, 0, 0, 100, 100, 100, [
        [0, 0], [0, 1], [1, 0],
        [0, 1], [1, 1], [1, 0],
    ], [
        [0, 0, -1], [0, 0, 1],
        [0, -1, 0], [0, 1, 0],
        [-1, 0, 0], [1, 0, 0]
    ]);
    const programInfo = {
        program,
        attributes: [],
        uniforms: []
    };
    for (const attribute of shaderData.attributes) {
        const name = attribute[2];
        const location = gl.getAttribLocation(program, name);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const methodName = `get${name[2].toUpperCase()}${name.slice(3)}s`;
        gl.bufferData(gl.ARRAY_BUFFER, box[methodName](), gl.STATIC_DRAW);
        const size = attribute[1] === 'vec3' ? 3 : attribute[1] === 'vec2' ? 2 : 1;
        programInfo.attributes.push({ name, location, buffer, size, type: 'FLOAT' });
    }
    for (const uniform of shaderData.uniforms) {
        const name = uniform[2];
        const location = gl.getUniformLocation(program, name);
        programInfo.uniforms.push({ name, location, data: null, type: uniform[1] });
        if (uniform[1] === 'sampler2D') {
            const textureData = new Uint8Array([
                255, 0, 0, 255, 0, 0, 255, 255,
                0, 255, 0, 255, 255, 255, 0, 255
            ]);
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, textureData);
            gl.generateMipmap(gl.TEXTURE_2D);
            programInfo.uniforms[programInfo.uniforms.length - 1].data = texture;
        }
    }
    return { gl, programInfo };
};
export { setupWebGL };
