import { WebGLData } from "./setup.js";
import { Mat4 } from "./matrixMath.js";

const renderWebGL = (glData: WebGLData, fullscreen: boolean, rotation: number[]): void => {
    const { gl, programInfo } = glData;
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    rotation[0] += 0.002;
    const viewSize = (fullscreen) ? Math.max(gl.canvas.width, gl.canvas.height) : Math.min(gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(programInfo.program);
    for (const attribute of programInfo.attributes) {
        if (attribute.location === null) { throw new Error(`${attribute.name} attribute location is null`); }
        if (attribute.buffer === null) { throw new Error(`${attribute.name} buffer is null`); }
        gl.enableVertexAttribArray(attribute.location);
        gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
        const normalized = attribute.type === 'UNSIGNED_BYTE';
        gl.vertexAttribPointer(attribute.location, attribute.size, gl[attribute.type], normalized, 0, 0);
    }
    programInfo.uniforms[3].data = [0, viewSize/8, -viewSize/8]; // Point light position
    programInfo.uniforms[4].data = [0, 0, -viewSize/12]; // Spot light position
    programInfo.uniforms[5].data = [0, 1, 0]; // Directional light reverse direction
    programInfo.uniforms[6].data = [0, 0, 1]; // Spot light direction
    programInfo.uniforms[7].data = [0.2, 0.2, 0.2]; // Ambient light color
    programInfo.uniforms[8].data = [0.6, 0.4, 0.2]; // Directional light color
    programInfo.uniforms[9].data = [0.4, 0.5, 0.6]; // Point light color
    programInfo.uniforms[10].data = [1.0, 1.0, 1.0]; // Spot light color
    programInfo.uniforms[11].data = 0.7; // Spot light outer size
    programInfo.uniforms[12].data = 0.9; // Spot light inner size
    if (programInfo.uniforms[12].data <= programInfo.uniforms[11].data) {
        throw new Error('Spot light inner size must be greater than outer size');
    }
    const view = Mat4.perspective(Math.PI / 4, 1, viewSize * 5);
    for (let offset = -1; offset <= 1; offset += 1) {
        let camera = Mat4.lookAt([0, 0, -viewSize], [0, 0, 0], [0, 1, 0]);
        camera = Mat4.inverse(camera);
        let world = Mat4.identity();
        world = Mat4.multMat(world, Mat4.translate(offset * viewSize / 3, 0, 0));
        world = Mat4.multMat(world, Mat4.rotateY(rotation[0]*5));
        world = Mat4.multMat(world, Mat4.rotateX(rotation[0]*4));
        world = Mat4.multMat(world, Mat4.rotateZ(rotation[0]*6));
        camera = Mat4.multMat(camera, world);
        camera = Mat4.multMat(view, camera);
        programInfo.uniforms[0].data = world;
        programInfo.uniforms[1].data = camera;
        programInfo.uniforms[2].data = Mat4.transpose(Mat4.inverse(world));
        for (const uniform of programInfo.uniforms) {
            if (uniform.location === null) { throw new Error(`${uniform.name} uniform location is null`); }
            if (uniform.type === 'Matrix4fv') {
                if (!(uniform.data instanceof Array)) { throw new Error(`${uniform.name} uniform data is not an array`); }
                gl.uniformMatrix4fv(uniform.location, false, uniform.data);
            } else if (uniform.type === '3fv') {
                if (!(uniform.data instanceof Array)) { throw new Error(`${uniform.name} uniform data is not an array`); }
                gl.uniform3fv(uniform.location, uniform.data);
            } else if (uniform.type === '1f') {
                if (typeof uniform.data !== 'number') { throw new Error(`${uniform.name} uniform data is not a number`); }
                gl.uniform1f(uniform.location, uniform.data);
            }
        }
        gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
    }
    requestAnimationFrame(() => renderWebGL(glData, fullscreen, rotation));
};

export { renderWebGL };