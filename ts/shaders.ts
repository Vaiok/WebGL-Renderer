const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    attribute vec3 a_normal;
    uniform mat4 u_world;
    uniform mat4 u_view;
    uniform mat4 u_inverseTranspose;
    uniform vec3 u_lightPosition;
    varying vec3 v_color;
    varying vec3 v_normal;
    varying vec3 v_surfaceToLight;
    void main() {
        v_color = a_color;
        v_normal = (u_inverseTranspose * vec4(a_normal, 0.0)).xyz;
        vec3 surfacePosition = (u_world * vec4(a_position, 1.0)).xyz;
        v_surfaceToLight = u_lightPosition - surfacePosition;
        gl_Position = u_view * vec4(a_position, 1.0);
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    varying vec3 v_normal;
    varying vec3 v_surfaceToLight;
    uniform vec3 u_revLightDir;
    uniform vec3 u_ambientLightColor;
    uniform vec3 u_dirLightColor;
    uniform vec3 u_pointLightColor;
    void main() {
        float directionLight = dot(normalize(v_normal), normalize(u_revLightDir));
        float pointLight = dot(normalize(v_normal), normalize(v_surfaceToLight));
        gl_FragColor = vec4(v_color, 1.0);
        gl_FragColor.rgb *= u_ambientLightColor +
                            directionLight * u_dirLightColor +
                            pointLight * u_pointLightColor;
    }
`;

export { vertexShaderSource, fragmentShaderSource };