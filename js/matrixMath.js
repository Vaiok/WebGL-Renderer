class Vec3 {
    static add(a, b) {
        return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    }
    static sub(a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    }
    static cross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }
    static normalize(v) {
        const len = Math.hypot(v[0], v[1], v[2]);
        if (len === 0) {
            return [0, 0, 0];
        }
        else {
            return [v[0] / len, v[1] / len, v[2] / len];
        }
    }
}
class Mat4 {
    static multVec(m, v) {
        return [
            m[0] * v[0] + m[4] * v[1] + m[8] * v[2] + m[12] * v[3],
            m[1] * v[0] + m[5] * v[1] + m[9] * v[2] + m[13] * v[3],
            m[2] * v[0] + m[6] * v[1] + m[10] * v[2] + m[14] * v[3],
            m[3] * v[0] + m[7] * v[1] + m[11] * v[2] + m[15] * v[3]
        ];
    }
    static multMat(a, b) {
        return [
            a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
            a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
            a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
            a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
            a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
            a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
            a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
            a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
            a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
            a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
            a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
            a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
            a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
            a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
            a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
            a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
        ];
    }
    static identity() {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    static ortho(l, r, b, t, n, f) {
        return [
            2 / (r - l), 0, 0, 0,
            0, 2 / (t - b), 0, 0,
            0, 0, 2 / (f - n), 0,
            (r + l) / (l - r), (t + b) / (b - t), (f + n) / (n - f), 1
        ];
    }
    static perspective(fov, near, far) {
        const f = 1.0 / Math.tan(fov / 2);
        const nf = 1 / (far - near);
        return [
            f, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (far + near) * nf, 1,
            0, 0, -(2 * far * near) * nf, 0
        ];
    }
    static translate(tx, ty, tz) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1
        ];
    }
    static scale(sx, sy, sz) {
        return [
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ];
    }
    static rotateX(radians) {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ];
    }
    static rotateY(radians) {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ];
    }
    static rotateZ(radians) {
        const c = Math.cos(radians);
        const s = Math.sin(radians);
        return [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
    }
    static inverse(m) {
        const m00 = m[0], m01 = m[1], m02 = m[2], m03 = m[3];
        const m10 = m[4], m11 = m[5], m12 = m[6], m13 = m[7];
        const m20 = m[8], m21 = m[9], m22 = m[10], m23 = m[11];
        const m30 = m[12], m31 = m[13], m32 = m[14], m33 = m[15];
        const c00 = m11 * m22 * m33 + m12 * m23 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 - m13 * m22 * m31;
        const c01 = m10 * m22 * m33 + m12 * m23 * m30 + m13 * m20 * m32 - m10 * m23 * m32 - m12 * m20 * m33 - m13 * m22 * m30;
        const c02 = m10 * m21 * m33 + m11 * m23 * m30 + m13 * m20 * m31 - m10 * m23 * m31 - m11 * m20 * m33 - m13 * m21 * m30;
        const c03 = m10 * m21 * m32 + m11 * m22 * m30 + m12 * m20 * m31 - m10 * m22 * m31 - m11 * m20 * m32 - m12 * m21 * m30;
        const c10 = m01 * m22 * m33 + m02 * m23 * m31 + m03 * m21 * m32 - m01 * m23 * m32 - m02 * m21 * m33 - m03 * m22 * m31;
        const c11 = m00 * m22 * m33 + m02 * m23 * m30 + m03 * m20 * m32 - m00 * m23 * m32 - m02 * m20 * m33 - m03 * m22 * m30;
        const c12 = m00 * m21 * m33 + m01 * m23 * m30 + m03 * m20 * m31 - m00 * m23 * m31 - m01 * m20 * m33 - m03 * m21 * m30;
        const c13 = m00 * m21 * m32 + m01 * m22 * m30 + m02 * m20 * m31 - m00 * m22 * m31 - m01 * m20 * m32 - m02 * m21 * m30;
        const c20 = m01 * m12 * m33 + m02 * m13 * m31 + m03 * m11 * m32 - m01 * m13 * m32 - m02 * m11 * m33 - m03 * m12 * m31;
        const c21 = m00 * m12 * m33 + m02 * m13 * m30 + m03 * m10 * m32 - m00 * m13 * m32 - m02 * m10 * m33 - m03 * m12 * m30;
        const c22 = m00 * m11 * m33 + m01 * m13 * m30 + m03 * m10 * m31 - m00 * m13 * m31 - m01 * m10 * m33 - m03 * m11 * m30;
        const c23 = m00 * m11 * m32 + m01 * m12 * m30 + m02 * m10 * m31 - m00 * m12 * m31 - m01 * m10 * m32 - m02 * m11 * m30;
        const c30 = m01 * m12 * m23 + m02 * m13 * m21 + m03 * m11 * m22 - m01 * m13 * m22 - m02 * m11 * m23 - m03 * m12 * m21;
        const c31 = m00 * m12 * m23 + m02 * m13 * m20 + m03 * m10 * m22 - m00 * m13 * m22 - m02 * m10 * m23 - m03 * m12 * m20;
        const c32 = m00 * m11 * m23 + m01 * m13 * m20 + m03 * m10 * m21 - m00 * m13 * m21 - m01 * m10 * m23 - m03 * m11 * m20;
        const c33 = m00 * m11 * m22 + m01 * m12 * m20 + m02 * m10 * m21 - m00 * m12 * m21 - m01 * m10 * m22 - m02 * m11 * m20;
        const det = 1 / (m00 * c00 - m01 * c01 + m02 * c02 - m03 * c03);
        return [
            c00 * det, -c10 * det, c20 * det, -c30 * det,
            -c01 * det, c11 * det, -c21 * det, c31 * det,
            c02 * det, -c12 * det, c22 * det, -c32 * det,
            -c03 * det, c13 * det, -c23 * det, c33 * det
        ];
    }
    static lookAt(eye, center, up) {
        const z = Vec3.normalize(Vec3.sub(center, eye));
        const x = Vec3.normalize(Vec3.cross(up, z));
        const y = Vec3.cross(z, x);
        return [
            x[0], x[1], x[2], 0,
            y[0], y[1], y[2], 0,
            z[0], z[1], z[2], 0,
            eye[0], eye[1], eye[2], 1
        ];
    }
}
export { Vec3, Mat4 };
