import { vertexShaderSource, fragmentShaderSource } from './shaders.js';
import { Cube, MethodName } from './shapes.js';

type AttributeType = 'FLOAT' | 'UNSIGNED_BYTE';
type UniformType = '1f' | '3fv' | 'Matrix4fv';
interface ShaderData {
    attributes: RegExpExecArray[],
    uniforms: RegExpExecArray[]
}
interface AttributeData {
    name: string,
    location: number | null,
    buffer: WebGLBuffer | null,
    size: number,
    type: AttributeType,
}
interface UniformData {
    name: string,
    location: WebGLUniformLocation | null,
    data: number[] | number | null,
    type: UniformType
}
interface ProgramInfo {
    program: WebGLProgram,
    attributes: AttributeData[],
    uniforms: UniformData[],
}
interface WebGLData {
    gl: WebGLRenderingContext,
    programInfo: ProgramInfo,
}

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
const extractShaderData = (vertShader: string, fragShader: string): ShaderData => {
    const attributes = [...vertShader.matchAll(/attribute\s+(\w+)\s+(\w+)\s*;/g)];
    const uniforms = [
        ...vertShader.matchAll(/uniform\s+(\w+)\s+(\w+)\s*;/g),
        ...fragShader.matchAll(/uniform\s+(\w+)\s+(\w+)\s*;/g)
    ];
    return {attributes, uniforms};
};
const setupWebGL = (canvas: HTMLCanvasElement): WebGLData => {
    const gl = canvas.getContext('webgl');
    if (!gl) { throw new Error('WebGL not supported'); }
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);
    const shaderData = extractShaderData(vertexShaderSource, fragmentShaderSource);
    const box = new Cube(
        0, 0, 0, 100, 100, 100, 
        [
            [0, 255, 255], [255, 0, 0],
            [255, 0, 255], [0, 255, 0],
            [255, 255, 0], [0, 0, 255],
        ],
        [
            [0, 0, -1], [0, 0, 1],
            [0, -1, 0], [0, 1, 0],
            [-1, 0, 0], [1, 0, 0]
        ]
    );
    const programInfo: ProgramInfo = {
        program,
        attributes: [],
        uniforms: []
    };
    for (const attribute of shaderData.attributes) {
        const name = attribute[2];
        const location = gl.getAttribLocation(program, name);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const methodName = `get${name[2].toUpperCase()}${name.slice(3)}s` as MethodName;
        gl.bufferData(gl.ARRAY_BUFFER, box[methodName](), gl.STATIC_DRAW);
        const size = attribute[1] === 'vec3' ? 3 : 1;
        const type = name === 'a_color' ? 'UNSIGNED_BYTE' : 'FLOAT';
        programInfo.attributes.push({ name, location, buffer, size, type });
    }
    for (const uniform of shaderData.uniforms) {
        const name = uniform[2];
        const location = gl.getUniformLocation(program, name);
        const type = uniform[1] === 'vec3' ? '3fv' : uniform[1] === 'float' ? '1f' : 'Matrix4fv';
        programInfo.uniforms.push({ name, location, data: null, type });
    }

    return { gl, programInfo };
}

export { setupWebGL, WebGLData };