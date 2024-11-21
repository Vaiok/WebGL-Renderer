import { Mat4 } from "./matrixMath.js";
const renderWebGL = ({ gl, program, transformUniformLocation, positionAttributeLocation, colorAttributeLocation, positionBuffer, colorBuffer }) => {
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
    const bigger = Math.max(gl.canvas.width, gl.canvas.height) / 2;
    const ortho = Mat4.ortho(-bigger, bigger, -bigger, bigger, -bigger, bigger);
    let transform = Mat4.multMat4(ortho, Mat4.translate(0.5, 0.5, 0.5));
    transform = Mat4.multMat4(transform, Mat4.rotateX(Math.PI / 4));
    transform = Mat4.multMat4(transform, Mat4.rotateZ(Math.PI / 4));
    transform = Mat4.multMat4(transform, Mat4.rotateY(Math.PI / 4));
    transform = Mat4.multMat4(transform, Mat4.scale(0.5, 0.5, 0.5));
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
};
export { renderWebGL };
