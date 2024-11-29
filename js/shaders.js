const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    attribute vec3 a_normal;
    uniform mat4 u_view;
    uniform mat4 u_inverseTranspose;
    varying vec3 v_color;
    varying vec3 v_normal;
    void main() {
        v_color = a_color;
        v_normal = (u_inverseTranspose * vec4(a_normal, 0.0)).xyz;
        gl_Position = u_view * vec4(a_position, 1.0);
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    varying vec3 v_normal;
    uniform vec3 u_revLightDir;
    void main() {
        float light = dot(normalize(v_normal), normalize(u_revLightDir));
        gl_FragColor = vec4(v_color, 1.0);
        gl_FragColor.rgb *= light;
    }
`;
export { vertexShaderSource, fragmentShaderSource };
