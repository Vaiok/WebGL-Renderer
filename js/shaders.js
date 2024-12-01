const vertexShaderSource = `
    attribute vec3 a_position;
    attribute vec3 a_color;
    attribute vec3 a_normal;
    uniform mat4 u_world;
    uniform mat4 u_view;
    uniform mat4 u_inverseTranspose;
    uniform vec3 u_pointLightPosition;
    uniform vec3 u_spotLightPosition;
    varying vec3 v_color;
    varying vec3 v_normal;
    varying vec3 v_surfaceToPointLight;
    varying vec3 v_surfaceToSpotLight;
    void main() {
        vec4 position = vec4(a_position, 1.0);
        v_color = a_color;
        v_normal = (u_inverseTranspose * vec4(a_normal, 0.0)).xyz;
        vec3 surfacePosition = (u_world * position).xyz;
        v_surfaceToPointLight = u_pointLightPosition - surfacePosition;
        v_surfaceToSpotLight = u_spotLightPosition - surfacePosition;
        gl_Position = u_view * position;
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    varying vec3 v_normal;
    varying vec3 v_surfaceToPointLight;
    varying vec3 v_surfaceToSpotLight;
    uniform vec3 u_revLightDir;
    uniform vec3 u_spotLightDir;
    uniform vec3 u_ambientLightColor;
    uniform vec3 u_dirLightColor;
    uniform vec3 u_pointLightColor;
    uniform vec3 u_spotLightColor;
    uniform float u_spotOuterSize;
    uniform float u_spotInnerSize;
    void main() {
        vec3 normal = normalize(v_normal);
        vec3 surfaceToSpotLight = normalize(v_surfaceToSpotLight);
        float directionLight = dot(normal, normalize(u_revLightDir));
        float pointLight = dot(normal, normalize(v_surfaceToPointLight));
        float spotAngle = dot(surfaceToSpotLight, normalize(-u_spotLightDir));
        float spotPower = smoothstep(u_spotOuterSize, u_spotInnerSize, spotAngle);
        float spotLight = spotPower * dot(normal, surfaceToSpotLight);
        gl_FragColor = vec4(v_color, 1.0);
        gl_FragColor.rgb *= u_ambientLightColor +
                            directionLight * u_dirLightColor +
                            pointLight * u_pointLightColor +
                            spotLight * u_spotLightColor;
    }
`;
export { vertexShaderSource, fragmentShaderSource };
