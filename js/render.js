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
    let transform = Mat4.multMat4(Mat4.identity(), Mat4.translate(0, 0, 0));
    transform = Mat4.multMat4(transform, Mat4.rotateX(0));
    transform = Mat4.multMat4(transform, Mat4.rotateZ(0));
    transform = Mat4.multMat4(transform, Mat4.rotateY(0));
    transform = Mat4.multMat4(transform, Mat4.scale(1, 1, 1));
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniformMatrix4fv(transformUniformLocation, false, transform);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
};
export { renderWebGL };
