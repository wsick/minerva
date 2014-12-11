interface IMatrix4Static {

}

module minerva {
    /// NOTE:
    ///     [m11, m12, m13, m14,
    //       m21, m22, m23, m24,
    //       m31, m32, m33, m34,
    //       m41, m42, m43, m44]

    var FLOAT_EPSILON = 0.000001;
    var createTypedArray: (length: number) => number[];

    if (typeof Float32Array !== "undefined") {
        createTypedArray = function (length: number): number[] {
            return <number[]><any>new Float32Array(length);
        };
    } else {
        createTypedArray = function (length: number): number[] {
            return <number[]>new Array(length);
        };
    }

    export var mat4: IMatrix4Static = {};
}

var mat4 = minerva.mat4;