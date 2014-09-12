var minerva;
(function (minerva) {
    minerva.version = '0.1.0';
})(minerva || (minerva = {}));
var vec2;
(function (vec2) {
    var arrayType = (typeof Float32Array !== "undefined") ? Float32Array : Array;

    function createFrom(x, y) {
        var dest = new arrayType(2);
        dest[0] = x;
        dest[1] = y;
        return dest;
    }
    vec2.createFrom = createFrom;
})(vec2 || (vec2 = {}));
var vec4;
(function (vec4) {
    var arrayType = (typeof Float32Array !== "undefined") ? Float32Array : Array;

    function create(vec) {
        var dest = new arrayType(4);
        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            dest[2] = vec[2];
            dest[3] = vec[3];
        } else {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 0;
        }
        return dest;
    }
    vec4.create = create;

    function createFrom(x, y, z, w) {
        var dest = new arrayType(4);
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = w;
        return dest;
    }
    vec4.createFrom = createFrom;
})(vec4 || (vec4 = {}));

var mat3;
(function (mat3) {
    var arrayType = (typeof Float32Array !== "undefined") ? Float32Array : Array;

    function create(mat) {
        var dest = new arrayType(9);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
        } else {
            dest[0] = dest[1] = dest[2] = dest[3] = dest[4] = dest[5] = dest[6] = dest[7] = dest[8] = 0;
        }

        return dest;
    }
    mat3.create = create;

    function inverse(mat, dest) {
        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a12 = mat[5], a20 = mat[6], a21 = mat[7], a22 = mat[8], b01 = a22 * a11 - a12 * a21, b11 = -a22 * a10 + a12 * a20, b21 = a21 * a10 - a11 * a20, d = a00 * b01 + a01 * b11 + a02 * b21, id;

        if (!d) {
            return null;
        }
        id = 1 / d;

        if (!dest) {
            dest = create();
        }

        dest[0] = b01 * id;
        dest[1] = (-a22 * a01 + a02 * a21) * id;
        dest[2] = (a12 * a01 - a02 * a11) * id;
        dest[3] = b11 * id;
        dest[4] = (a22 * a00 - a02 * a20) * id;
        dest[5] = (-a12 * a00 + a02 * a10) * id;
        dest[6] = b21 * id;
        dest[7] = (-a21 * a00 + a01 * a20) * id;
        dest[8] = (a11 * a00 - a01 * a10) * id;
        return dest;
    }
    mat3.inverse = inverse;

    function multiply(mat, mat2, dest) {
        if (!dest) {
            dest = mat;
        }

        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a10 = mat[3], a11 = mat[4], a12 = mat[5], a20 = mat[6], a21 = mat[7], a22 = mat[8], b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b10 = mat2[3], b11 = mat2[4], b12 = mat2[5], b20 = mat2[6], b21 = mat2[7], b22 = mat2[8];

        dest[0] = b00 * a00 + b01 * a10 + b02 * a20;
        dest[1] = b00 * a01 + b01 * a11 + b02 * a21;
        dest[2] = b00 * a02 + b01 * a12 + b02 * a22;

        dest[3] = b10 * a00 + b11 * a10 + b12 * a20;
        dest[4] = b10 * a01 + b11 * a11 + b12 * a21;
        dest[5] = b10 * a02 + b11 * a12 + b12 * a22;

        dest[6] = b20 * a00 + b21 * a10 + b22 * a20;
        dest[7] = b20 * a01 + b21 * a11 + b22 * a21;
        dest[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return dest;
    }
    mat3.multiply = multiply;

    function set(mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        return dest;
    }
    mat3.set = set;

    function identity(dest) {
        if (!dest) {
            dest = mat3.create();
        }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 1;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    }
    mat3.identity = identity;

    function str(mat) {
        return "[" + mat[0] + ", " + mat[1] + ", " + mat[2] + ", " + mat[3] + ", " + mat[4] + ", " + mat[5] + ", " + mat[6] + ", " + mat[7] + ", " + mat[8] + "]";
    }
    mat3.str = str;

    function clone(mat) {
        if (typeof Float32Array !== "undefined")
            return new Float32Array(mat);
        return mat.slice(0);
    }
    mat3.clone = clone;

    function toAffineMat4(mat, dest) {
        if (!dest) {
            dest = mat4.create();
        }
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = 0;
        dest[3] = mat[2];
        dest[4] = mat[3];
        dest[5] = mat[4];
        dest[6] = 0;
        dest[7] = mat[5];
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
    mat3.toAffineMat4 = toAffineMat4;

    function transformVec2(mat, vec, dest) {
        if (!dest)
            dest = vec;
        var x = vec[0], y = vec[1];
        dest[0] = x * mat[0] + y * mat[3] + mat[2];
        dest[1] = x * mat[1] + y * mat[4] + mat[5];
        return dest;
    }
    mat3.transformVec2 = transformVec2;

    function translate(mat, x, y) {
        mat[2] += x;
        mat[5] += y;
        return mat;
    }
    mat3.translate = translate;

    function createTranslate(x, y, dest) {
        if (!dest) {
            dest = mat3.create();
        }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = x;
        dest[3] = 0;
        dest[4] = 1;
        dest[5] = y;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    }
    mat3.createTranslate = createTranslate;

    function scale(mat, x, y) {
        mat[0] *= x;
        mat[1] *= x;
        mat[2] *= x;

        mat[3] *= y;
        mat[4] *= y;
        mat[5] *= y;
        return mat;
    }
    mat3.scale = scale;

    function createScale(x, y, dest) {
        if (!dest) {
            dest = mat3.create();
        }
        dest[0] = x;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = y;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    }
    mat3.createScale = createScale;

    function createRotate(angleRad, dest) {
        if (!dest) {
            dest = mat3.create();
        }
        var c = Math.cos(angleRad);
        var s = Math.sin(angleRad);
        dest[0] = c;
        dest[1] = -s;
        dest[2] = 0;
        dest[3] = s;
        dest[4] = c;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    }
    mat3.createRotate = createRotate;

    function createSkew(angleRadX, angleRadY, dest) {
        if (!dest) {
            dest = mat3.create();
        }
        dest[0] = 1;
        dest[1] = Math.tan(angleRadY);
        dest[2] = 0;
        dest[3] = Math.tan(angleRadX);
        dest[4] = 1;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    }
    mat3.createSkew = createSkew;
})(mat3 || (mat3 = {}));

var mat4;
(function (mat4) {
    var arrayType = (typeof Float32Array !== "undefined") ? Float32Array : Array;
    var FLOAT_EPSILON = 0.000001;

    function create(mat) {
        var dest = new arrayType(16);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        return dest;
    }
    mat4.create = create;

    function set(mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    }
    mat4.set = set;

    function equal(a, b) {
        return a === b || (Math.abs(a[0] - b[0]) < FLOAT_EPSILON && Math.abs(a[1] - b[1]) < FLOAT_EPSILON && Math.abs(a[2] - b[2]) < FLOAT_EPSILON && Math.abs(a[3] - b[3]) < FLOAT_EPSILON && Math.abs(a[4] - b[4]) < FLOAT_EPSILON && Math.abs(a[5] - b[5]) < FLOAT_EPSILON && Math.abs(a[6] - b[6]) < FLOAT_EPSILON && Math.abs(a[7] - b[7]) < FLOAT_EPSILON && Math.abs(a[8] - b[8]) < FLOAT_EPSILON && Math.abs(a[9] - b[9]) < FLOAT_EPSILON && Math.abs(a[10] - b[10]) < FLOAT_EPSILON && Math.abs(a[11] - b[11]) < FLOAT_EPSILON && Math.abs(a[12] - b[12]) < FLOAT_EPSILON && Math.abs(a[13] - b[13]) < FLOAT_EPSILON && Math.abs(a[14] - b[14]) < FLOAT_EPSILON && Math.abs(a[15] - b[15]) < FLOAT_EPSILON);
    }
    mat4.equal = equal;

    function identity(dest) {
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
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    }
    mat4.identity = identity;

    function inverse(mat, dest) {
        if (!dest) {
            dest = mat;
        }

        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3], a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7], a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11], a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06), invDet;

        if (!d) {
            return null;
        }
        invDet = 1 / d;

        dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return dest;
    }
    mat4.inverse = inverse;

    function multiply(mat, mat2, dest) {
        if (!dest) {
            dest = mat;
        }

        var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
        var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
        var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
        var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

        var b0 = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
        dest[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        dest[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        dest[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        dest[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mat2[4];
        b1 = mat2[5];
        b2 = mat2[6];
        b3 = mat2[7];
        dest[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        dest[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        dest[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        dest[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mat2[8];
        b1 = mat2[9];
        b2 = mat2[10];
        b3 = mat2[11];
        dest[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        dest[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        dest[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        dest[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = mat2[12];
        b1 = mat2[13];
        b2 = mat2[14];
        b3 = mat2[15];
        dest[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        dest[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        dest[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        dest[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return dest;
    }
    mat4.multiply = multiply;

    function transformVec4(mat, vec, dest) {
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
    mat4.transformVec4 = transformVec4;

    function toAffineMat3(mat, dest) {
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
    mat4.toAffineMat3 = toAffineMat3;

    function clone(mat) {
        if (typeof Float32Array !== "undefined")
            return new Float32Array(mat);
        return mat.slice(0);
    }
    mat4.clone = clone;

    function str(mat) {
        return "[" + mat[0] + ", " + mat[1] + ", " + mat[2] + ", " + mat[3] + ", " + mat[4] + ", " + mat[5] + ", " + mat[6] + ", " + mat[7] + ", " + mat[8] + ", " + mat[9] + ", " + mat[10] + ", " + mat[11] + ", " + mat[12] + ", " + mat[13] + ", " + mat[14] + ", " + mat[15] + "]";
    }
    mat4.str = str;

    function createTranslate(x, y, z, dest) {
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
    mat4.createTranslate = createTranslate;

    function createScale(x, y, z, dest) {
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
    mat4.createScale = createScale;

    function createPerspective(fieldOfViewY, aspectRatio, zNearPlane, zFarPlane, dest) {
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
    mat4.createPerspective = createPerspective;

    function createViewport(width, height, dest) {
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
    mat4.createViewport = createViewport;

    function createRotateX(theta, dest) {
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
    mat4.createRotateX = createRotateX;

    function createRotateY(theta, dest) {
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
    mat4.createRotateY = createRotateY;

    function createRotateZ(theta, dest) {
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
    mat4.createRotateZ = createRotateZ;

    function translate(mat, x, y, z) {
        mat[12] += x;
        mat[13] += y;
        mat[14] += z;
        return mat;
    }
    mat4.translate = translate;

    function scale(mat, x, y, z) {
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
    mat4.scale = scale;
})(mat4 || (mat4 = {}));
var minerva;
(function (minerva) {
    var Rect = (function () {
        function Rect(x, y, width, height) {
            if (typeof x === "undefined") { x = 0; }
            if (typeof y === "undefined") { y = 0; }
            if (typeof width === "undefined") { width = 0; }
            if (typeof height === "undefined") { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rect.copyTo = function (src, dest) {
            dest.x = src.x;
            dest.y = src.y;
            dest.width = src.width;
            dest.height = src.height;
        };

        Rect.roundOut = function (r) {
            var x = Math.floor(r.x);
            var y = Math.floor(r.y);
            r.width = Math.ceil(r.x + r.width) - x;
            r.height = Math.ceil(r.y + r.height) - y;
            r.x = x;
            r.y = y;
        };

        Rect.intersection = function (dest, rect2) {
            var x = Math.max(dest.x, rect2.x);
            var y = Math.max(dest.y, rect2.y);
            dest.width = Math.max(0, Math.min(dest.x + dest.width, rect2.x + rect2.width) - x);
            dest.height = Math.max(0, Math.min(dest.y + dest.height, rect2.y + rect2.height) - y);
            dest.x = x;
            dest.y = y;
        };
        return Rect;
    })();
    minerva.Rect = Rect;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        var Pipe = (function () {
            function Pipe() {
                this.$$names = [];
                this.$$tapins = [];
            }
            Pipe.prototype.addTapin = function (name, tapin) {
                this.$$names.push(name);
                this.$$tapins.push(tapin);
                return this;
            };

            Pipe.prototype.addTapinBefore = function (name, tapin, before) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !before ? -1 : names.indexOf(before);
                if (index === -1) {
                    names.unshift(name);
                    tapins.unshift(tapin);
                } else {
                    names.splice(index, 0, name);
                    tapins.splice(index, 0, tapin);
                }
                return this;
            };

            Pipe.prototype.addTapinAfter = function (name, tapin, after) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = !after ? -1 : names.indexOf(after);
                if (index === -1 || index === names.length - 1) {
                    names.push(name);
                    tapins.push(tapin);
                } else {
                    names.splice(index + 1, 0, name);
                    tapins.splice(index + 1, 0, tapin);
                }
                return this;
            };

            Pipe.prototype.replaceTapin = function (name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                tapins[index] = tapin;
                return this;
            };

            Pipe.prototype.removeTapin = function (name) {
                var names = this.$$names;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                names.splice(index, 1);
                this.$$tapins.splice(index, 1);
                return this;
            };

            Pipe.prototype.run = function (assets, state, output) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 3); _i++) {
                    contexts[_i] = arguments[_i + 3];
                }
                this.initState(state);
                this.initOutput(output);
                contexts.unshift(output);
                contexts.unshift(state);
                contexts.unshift(assets);
                for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                    if (!tapins[i].apply(this, contexts))
                        return false;
                }
                return true;
            };

            Pipe.prototype.initState = function (state) {
            };

            Pipe.prototype.initOutput = function (output) {
            };
            return Pipe;
        })();
        def.Pipe = Pipe;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (RenderContext) {
                function init(ctx) {
                    ctx.currentTransform = mat3.identity();
                    ctx.$$transforms = [];
                }
                RenderContext.init = init;

                function save(ctx) {
                    var ct = ctx.currentTransform;
                    ctx.$$transforms.push(ct);
                    ctx.currentTransform = !ct ? mat3.identity() : mat3.create(ct);
                    ctx.save();
                }
                RenderContext.save = save;

                function restore(ctx) {
                    ctx.currentTransform = ctx.$$transforms.pop();
                    ctx.restore();
                }
                RenderContext.restore = restore;

                function scale(ctx, x, y) {
                    var ct = ctx.currentTransform;
                    mat3.scale(ct, x, y);
                }
                RenderContext.scale = scale;

                function pretransformMatrix(ctx, mat) {
                    var ct = ctx.currentTransform;
                    mat3.multiply(mat, ct, ct);
                    ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
                }
                RenderContext.pretransformMatrix = pretransformMatrix;

                function clipGeometry(ctx, geom) {
                    geom.Draw(ctx);
                    ctx.clip();
                }
                RenderContext.clipGeometry = clipGeometry;
            })(render.RenderContext || (render.RenderContext = {}));
            var RenderContext = render.RenderContext;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            var RenderPipe = (function (_super) {
                __extends(RenderPipe, _super);
                function RenderPipe() {
                    _super.call(this);
                    this.addTapin('validate', render.tapins.validate).addTapin('validateRegion', render.tapins.validateRegion).addTapin('prepareContext', render.tapins.prepareContext).addTapin('applyClip', render.tapins.applyClip).addTapin('preRender', render.tapins.preRender).addTapin('doRender', render.tapins.doRender).addTapin('postRender', render.tapins.postRender).addTapin('renderChildren', render.tapins.renderChildren).addTapin('restoreContext', render.tapins.restoreContext);
                }
                RenderPipe.prototype.initState = function (state) {
                    if (!state.RenderRegion)
                        state.RenderRegion = new minerva.Rect();
                };
                return RenderPipe;
            })(def.Pipe);
            render.RenderPipe = RenderPipe;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.applyClip = function (assets, state, output, ctx, region) {
                    var clip = assets.Clip;
                    if (clip)
                        render.RenderContext.clipGeometry(ctx, clip);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.doRender = function (assets, state, output, ctx, region) {
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.postRender = function (assets, state, output, ctx, region) {
                    var effect = assets.Effect;
                    if (!effect)
                        return true;
                    effect.PostRender(ctx);
                    render.RenderContext.restore(ctx);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.preRender = function (assets, state, output, ctx, region) {
                    var effect = assets.Effect;
                    if (!effect)
                        return true;
                    render.RenderContext.save(ctx);
                    effect.PreRender(ctx);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.prepareContext = function (assets, state, output, ctx, region) {
                    render.RenderContext.save(ctx);
                    render.RenderContext.pretransformMatrix(ctx, assets.RenderXform);
                    ctx.globalAlpha = assets.TotalOpacity;
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.renderChildren = function (assets, state, output, ctx, region) {
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.restoreContext = function (assets, state, output, ctx, region) {
                    render.RenderContext.restore(ctx);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.validate = function (assets, state, output, ctx, region) {
                    if (!assets.TotalIsRenderVisible)
                        return false;
                    if ((assets.TotalOpacity * 255) < 0.5)
                        return false;
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (def) {
        (function (render) {
            (function (tapins) {
                tapins.validateRegion = function (assets, state, output, ctx, region) {
                    var r = state.RenderRegion;
                    minerva.Rect.copyTo(assets.SurfaceBoundsWithChildren, r);
                    minerva.Rect.roundOut(r);
                    minerva.Rect.intersection(r, region);
                    return r.width > 0 && r.height > 0;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(def.render || (def.render = {}));
        var render = def.render;
    })(minerva.def || (minerva.def = {}));
    var def = minerva.def;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        var IPipe = (function () {
            function IPipe() {
            }
            return IPipe;
        })();
        layout.IPipe = IPipe;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        var NO_PIPE = new minerva.def.Pipe();

        var Updater = (function () {
            function Updater() {
                this.TotalIsRenderVisible = true;
                this.TotalOpacity = 1.0;
                this.SurfaceBoundsWithChildren = new minerva.Rect();
                this.RenderXform = mat3.identity();
                this.Clip = null;
                this.Effect = null;
                this.$$render = {
                    def: NO_PIPE,
                    assets: this,
                    state: {
                        RenderRegion: null
                    },
                    output: null
                };
            }
            Updater.prototype.setRenderPipe = function (pipedef) {
                this.$$render.def = pipedef || NO_PIPE;
            };

            Updater.prototype.render = function (ctx, region) {
                var pipe = this.$$render;
                pipe.def.run(pipe.assets, pipe.state, pipe.output, ctx, region);
            };
            return Updater;
        })();
        layout.Updater = Updater;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
//# sourceMappingURL=minerva.js.map
