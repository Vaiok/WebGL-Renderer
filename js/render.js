import { Mat4 } from "./matrixMath.js";
const renderWebGL = (glData, rotation) => {
    const { gl, program, viewUnifLoc, invTransUnifLoc, lightDirUnifLoc, positionAttrLoc, colorAttrLoc, normalAttrLoc, positionBuffer, colorBuffer, normalBuffer } = glData;
    if (!positionBuffer) {
        throw new Error('Position buffer is null');
    }
    if (!colorBuffer) {
        throw new Error('Color buffer is null');
    }
    if (!viewUnifLoc) {
        throw new Error('Transform uniform location is null');
    }
    if (!lightDirUnifLoc) {
        throw new Error('Light direction uniform location is null');
    }
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    rotation[0] += 0.01;
    const bigger = Math.max(gl.canvas.width, gl.canvas.height);
    const view = Mat4.perspective(Math.PI / 4, 1, bigger * 5);
    let camera = Mat4.lookAt([0, 0, -bigger / 2], [0, 0, 0], [0, 1, 0]);
    camera = Mat4.inverse(camera);
    let world = Mat4.identity();
    world = Mat4.multMat(world, Mat4.rotateY(rotation[0]));
    world = Mat4.multMat(world, Mat4.rotateX(rotation[0]));
    world = Mat4.multMat(world, Mat4.rotateZ(rotation[0]));
    camera = Mat4.multMat(camera, world);
    camera = Mat4.multMat(view, camera);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniformMatrix4fv(viewUnifLoc, false, camera);
    gl.uniformMatrix4fv(invTransUnifLoc, false, Mat4.transpose(Mat4.inverse(world)));
    gl.uniform3fv(lightDirUnifLoc, [0, 0, -1]);
    gl.enableVertexAttribArray(positionAttrLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttrLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttrLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(colorAttrLoc, 3, gl.UNSIGNED_BYTE, true, 0, 0);
    gl.enableVertexAttribArray(normalAttrLoc);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(normalAttrLoc, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
    requestAnimationFrame(() => renderWebGL(glData, rotation));
};
export { renderWebGL };
