import { Mat4 } from "./matrixMath.js";
const renderWebGL = (glData, rotation) => {
    const { gl, program, transformUniformLocation, positionAttributeLocation, colorAttributeLocation, positionBuffer, colorBuffer } = glData;
    if (!positionBuffer) {
        throw new Error('Position buffer is null');
    }
    if (!colorBuffer) {
        throw new Error('Color buffer is null');
    }
    if (!transformUniformLocation) {
        throw new Error('Transform uniform location is null');
    }
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    rotation[0] += 0.01;
    const bigger = Math.max(gl.canvas.width, gl.canvas.height);
    const camera = Mat4.perspective(Math.PI / 4, 1, bigger * 5);
    let transform = Mat4.lookAt([0, 0, -bigger / 2], [0, 0, 0], [0, 1, 0]);
    transform = Mat4.inverse(transform);
    transform = Mat4.multMat(transform, Mat4.rotateY(rotation[0]));
    transform = Mat4.multMat(transform, Mat4.rotateX(rotation[0]));
    transform = Mat4.multMat(transform, Mat4.rotateZ(rotation[0]));
    transform = Mat4.multMat(camera, transform);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniformMatrix4fv(transformUniformLocation, false, transform);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
    requestAnimationFrame(() => renderWebGL(glData, rotation));
};
export { renderWebGL };
