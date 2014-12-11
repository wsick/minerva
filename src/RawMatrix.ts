/*
module mat4 {

    export function transformVec4 (mat: number[], vec: number[], dest?: number[]): number[] {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
        dest[0] = mat[0] * x + mat[1] * y + mat[2] * z + mat[3] * w;
        dest[1] = mat[4] * x + mat[5] * y + mat[6] * z + mat[7] * w;
        dest[2] = mat[8] * x + mat[9] * y + mat[10] * z + mat[11] * w;
        dest[3] = mat[12] * x + mat[13] * y + mat[14] * z + mat[15] * w;

        return dest;
    }

    export function toAffineMat3 (mat: number[], dest?: number[]): number[] {
        if (!dest) {
            dest = mat3.create();
        }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[3];
        dest[3] = mat[4];
        dest[4] = mat[5];
        dest[5] = mat[7];
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;

        return dest;
    }

    export function clone (mat: number[]): number[] {
        if (typeof Float32Array !== "undefined")
            return <number[]><any>new Float32Array(mat);
        return mat.slice(0);
    }

    export function str (mat: number[]): string {
        return "[" + mat[0] + ", " + mat[1] + ", " + mat[2] + ", " + mat[3]
            + ", " + mat[4] + ", " + mat[5] + ", " + mat[6] + ", " + mat[7]
            + ", " + mat[8] + ", " + mat[9] + ", " + mat[10] + ", " + mat[11]
            + ", " + mat[12] + ", " + mat[13] + ", " + mat[14] + ", " + mat[15] + "]";
    }

    export function createTranslate (x: number, y: number, z: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;

        dest[12] = x;
        dest[13] = y;
        dest[14] = z;
        dest[15] = 1;
        return dest;
    }

    export function createScale (x: number, y: number, z: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }
        dest[0] = x;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = y;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = 0;
        dest[10] = z;
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }

    export function createPerspective (fieldOfViewY: number, aspectRatio: number, zNearPlane: number, zFarPlane: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }

        var height = 1.0 / Math.tan(fieldOfViewY / 2.0);
        var width = height / aspectRatio;
        var d = zNearPlane - zFarPlane;

        dest[0] = width;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = height;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = 0;
        dest[10] = zFarPlane / d;
        dest[11] = -1.0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = zNearPlane * zFarPlane / d;
        dest[15] = 0.0;
        return dest;
    }

    export function createViewport (width: number, height: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }
        dest[0] = width / 2.0;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = -height / 2.0;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;

        dest[12] = width / 2.0;
        dest[13] = height / 2.0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }

    export function createRotateX (theta: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }

        var s = Math.sin(theta);
        var c = Math.cos(theta);

        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = c;
        dest[6] = s;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = -s;
        dest[10] = c;
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }

    export function createRotateY (theta: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }

        var s = Math.sin(theta);
        var c = Math.cos(theta);

        dest[0] = c;
        dest[1] = 0;
        dest[2] = -s;
        dest[3] = 0;

        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = s;
        dest[9] = 0;
        dest[10] = c;
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }

    export function createRotateZ (theta: number, dest?: number[]): number[] {
        if (!dest) {
            dest = mat4.create();
        }

        var s = Math.sin(theta);
        var c = Math.cos(theta);

        dest[0] = c;
        dest[1] = s;
        dest[2] = 0;
        dest[3] = 0;

        dest[4] = -s;
        dest[5] = c;
        dest[6] = 0;
        dest[7] = 0;

        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }

    export function translate (mat: number[], x: number, y: number, z: number): number[] {
        mat[12] += x;
        mat[13] += y;
        mat[14] += z;
        return mat;
    }

    export function scale (mat: number[], x: number, y: number, z: number): number[] {
        mat[0] *= x;
        mat[4] *= x;
        mat[8] *= x;
        mat[12] *= x;
        mat[1] *= y;
        mat[5] *= y;
        mat[9] *= y;
        mat[13] *= y;
        mat[2] *= z;
        mat[6] *= z;
        mat[10] *= z;
        mat[14] *= z;
        return mat;
    }
}
*/