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
const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    void main() {
        v_color = a_color;
        gl_Position = vec4(a_position, 1.0);
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    void main() {
        gl_FragColor = vec4(v_color, 1.0);
    }
`;

export { createShader, createProgram, vertexShaderSource, fragmentShaderSource };