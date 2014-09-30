var minerva;
(function (minerva) {
    minerva.version = '0.1.0';
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (HorizontalAlignment) {
        HorizontalAlignment[HorizontalAlignment["Left"] = 0] = "Left";
        HorizontalAlignment[HorizontalAlignment["Center"] = 1] = "Center";
        HorizontalAlignment[HorizontalAlignment["Right"] = 2] = "Right";
        HorizontalAlignment[HorizontalAlignment["Stretch"] = 3] = "Stretch";
    })(minerva.HorizontalAlignment || (minerva.HorizontalAlignment = {}));
    var HorizontalAlignment = minerva.HorizontalAlignment;
    (function (VerticalAlignment) {
        VerticalAlignment[VerticalAlignment["Top"] = 0] = "Top";
        VerticalAlignment[VerticalAlignment["Center"] = 1] = "Center";
        VerticalAlignment[VerticalAlignment["Bottom"] = 2] = "Bottom";
        VerticalAlignment[VerticalAlignment["Stretch"] = 3] = "Stretch";
    })(minerva.VerticalAlignment || (minerva.VerticalAlignment = {}));
    var VerticalAlignment = minerva.VerticalAlignment;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var CornerRadius = (function () {
        function CornerRadius(topLeft, topRight, bottomRight, bottomLeft) {
            this.topLeft = topLeft == null ? 0 : topLeft;
            this.topRight = topRight == null ? 0 : topRight;
            this.bottomRight = bottomRight == null ? 0 : bottomRight;
            this.bottomLeft = bottomLeft == null ? 0 : bottomLeft;
        }
        CornerRadius.isEmpty = function (cr) {
            return cr.topLeft === 0 && cr.topRight === 0 && cr.bottomRight === 0 && cr.bottomLeft === 0;
        };

        CornerRadius.isEqual = function (cr1, cr2) {
            return cr1.topLeft === cr2.topLeft && cr1.topRight === cr2.topRight && cr1.bottomRight === cr2.bottomRight && cr1.bottomLeft === cr2.bottomLeft;
        };

        CornerRadius.clear = function (dest) {
            dest.topLeft = dest.topRight = dest.bottomRight = dest.bottomLeft = 0;
        };

        CornerRadius.copyTo = function (cr2, dest) {
            dest.topLeft = cr2.topLeft;
            dest.topRight = cr2.topRight;
            dest.bottomRight = cr2.bottomRight;
            dest.bottomLeft = cr2.bottomLeft;
        };
        return CornerRadius;
    })();
    minerva.CornerRadius = CornerRadius;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (PenLineJoin) {
        PenLineJoin[PenLineJoin["Miter"] = 0] = "Miter";
        PenLineJoin[PenLineJoin["Bevel"] = 1] = "Bevel";
        PenLineJoin[PenLineJoin["Round"] = 2] = "Round";
    })(minerva.PenLineJoin || (minerva.PenLineJoin = {}));
    var PenLineJoin = minerva.PenLineJoin;

    (function (PenLineCap) {
        PenLineCap[PenLineCap["Flat"] = 0] = "Flat";
        PenLineCap[PenLineCap["Square"] = 1] = "Square";
        PenLineCap[PenLineCap["Round"] = 2] = "Round";
        PenLineCap[PenLineCap["Triangle"] = 3] = "Triangle";
    })(minerva.PenLineCap || (minerva.PenLineCap = {}));
    var PenLineCap = minerva.PenLineCap;

    (function (FillRule) {
        FillRule[FillRule["EvenOdd"] = 0] = "EvenOdd";
        FillRule[FillRule["NonZero"] = 1] = "NonZero";
    })(minerva.FillRule || (minerva.FillRule = {}));
    var FillRule = minerva.FillRule;

    (function (Stretch) {
        Stretch[Stretch["None"] = 0] = "None";
        Stretch[Stretch["Fill"] = 1] = "Fill";
        Stretch[Stretch["Uniform"] = 2] = "Uniform";
        Stretch[Stretch["UniformToFill"] = 3] = "UniformToFill";
    })(minerva.Stretch || (minerva.Stretch = {}));
    var Stretch = minerva.Stretch;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (DirtyFlags) {
        DirtyFlags[DirtyFlags["Transform"] = 1 << 0] = "Transform";
        DirtyFlags[DirtyFlags["LocalTransform"] = 1 << 1] = "LocalTransform";
        DirtyFlags[DirtyFlags["LocalProjection"] = 1 << 2] = "LocalProjection";
        DirtyFlags[DirtyFlags["Clip"] = 1 << 3] = "Clip";
        DirtyFlags[DirtyFlags["LocalClip"] = 1 << 4] = "LocalClip";
        DirtyFlags[DirtyFlags["LayoutClip"] = 1 << 5] = "LayoutClip";
        DirtyFlags[DirtyFlags["RenderVisibility"] = 1 << 6] = "RenderVisibility";
        DirtyFlags[DirtyFlags["HitTestVisibility"] = 1 << 7] = "HitTestVisibility";
        DirtyFlags[DirtyFlags["Measure"] = 1 << 8] = "Measure";
        DirtyFlags[DirtyFlags["Arrange"] = 1 << 9] = "Arrange";
        DirtyFlags[DirtyFlags["ChildrenZIndices"] = 1 << 10] = "ChildrenZIndices";
        DirtyFlags[DirtyFlags["Bounds"] = 1 << 20] = "Bounds";
        DirtyFlags[DirtyFlags["NewBounds"] = 1 << 21] = "NewBounds";
        DirtyFlags[DirtyFlags["Invalidate"] = 1 << 22] = "Invalidate";
        DirtyFlags[DirtyFlags["InUpDirtyList"] = 1 << 30] = "InUpDirtyList";
        DirtyFlags[DirtyFlags["InDownDirtyList"] = 1 << 31] = "InDownDirtyList";

        DirtyFlags[DirtyFlags["DownDirtyState"] = DirtyFlags.Transform | DirtyFlags.LocalTransform | DirtyFlags.LocalProjection | DirtyFlags.Clip | DirtyFlags.LocalClip | DirtyFlags.LayoutClip | DirtyFlags.RenderVisibility | DirtyFlags.HitTestVisibility | DirtyFlags.ChildrenZIndices] = "DownDirtyState";
        DirtyFlags[DirtyFlags["UpDirtyState"] = DirtyFlags.Bounds | DirtyFlags.NewBounds | DirtyFlags.Invalidate] = "UpDirtyState";

        DirtyFlags[DirtyFlags["PropagateDown"] = DirtyFlags.RenderVisibility | DirtyFlags.HitTestVisibility | DirtyFlags.Transform | DirtyFlags.LayoutClip] = "PropagateDown";
    })(minerva.DirtyFlags || (minerva.DirtyFlags = {}));
    var DirtyFlags = minerva.DirtyFlags;
    (function (UIFlags) {
        UIFlags[UIFlags["None"] = 0] = "None";

        UIFlags[UIFlags["RenderVisible"] = 0x02] = "RenderVisible";
        UIFlags[UIFlags["HitTestVisible"] = 0x04] = "HitTestVisible";
        UIFlags[UIFlags["TotalRenderVisible"] = 0x08] = "TotalRenderVisible";
        UIFlags[UIFlags["TotalHitTestVisible"] = 0x10] = "TotalHitTestVisible";

        UIFlags[UIFlags["MeasureHint"] = 0x800] = "MeasureHint";
        UIFlags[UIFlags["ArrangeHint"] = 0x1000] = "ArrangeHint";
        UIFlags[UIFlags["SizeHint"] = 0x2000] = "SizeHint";
        UIFlags[UIFlags["Hints"] = UIFlags.MeasureHint | UIFlags.ArrangeHint | UIFlags.SizeHint] = "Hints";
    })(minerva.UIFlags || (minerva.UIFlags = {}));
    var UIFlags = minerva.UIFlags;
    (function (ShapeFlags) {
        ShapeFlags[ShapeFlags["None"] = 0] = "None";
        ShapeFlags[ShapeFlags["Empty"] = 1] = "Empty";
        ShapeFlags[ShapeFlags["Normal"] = 2] = "Normal";
        ShapeFlags[ShapeFlags["Degenerate"] = 4] = "Degenerate";
        ShapeFlags[ShapeFlags["Radii"] = 8] = "Radii";
    })(minerva.ShapeFlags || (minerva.ShapeFlags = {}));
    var ShapeFlags = minerva.ShapeFlags;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (WalkDirection) {
        WalkDirection[WalkDirection["Forward"] = 0] = "Forward";
        WalkDirection[WalkDirection["Reverse"] = 1] = "Reverse";
        WalkDirection[WalkDirection["ZForward"] = 2] = "ZForward";
        WalkDirection[WalkDirection["ZReverse"] = 3] = "ZReverse";
    })(minerva.WalkDirection || (minerva.WalkDirection = {}));
    var WalkDirection = minerva.WalkDirection;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Point = (function () {
        function Point(x, y) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
        }
        return Point;
    })();
    minerva.Point = Point;
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
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }
        Rect.isEqual = function (rect1, rect2) {
            return rect1.x === rect2.x && rect1.y === rect2.y && rect1.width === rect2.width && rect1.height === rect2.height;
        };

        Rect.isEmpty = function (src) {
            return src.width === 0 || src.height === 0;
        };

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

        Rect.union = function (dest, rect2) {
            if (rect2.width <= 0 || rect2.height <= 0)
                return;
            if (dest.width <= 0 || dest.height <= 0) {
                Rect.copyTo(rect2, dest);
                return;
            }

            var x = Math.min(dest.x, rect2.x);
            var y = Math.min(dest.y, rect2.y);
            dest.width = Math.max(dest.x + dest.width, rect2.x + rect2.width) - x;
            dest.height = Math.max(dest.y + dest.height, rect2.y + rect2.height) - y;
            dest.x = x;
            dest.y = y;
        };

        Rect.isContainedIn = function (src, test) {
            var sl = src.x;
            var st = src.y;
            var sr = src.x + src.width;
            var sb = src.y + src.height;

            var tl = test.x;
            var tt = test.y;
            var tr = test.x + test.width;
            var tb = test.y + test.height;

            if (sl < tl || st < tt || sl > tr || st > tb)
                return false;
            if (sr < tl || sb < tt || sr > tr || sb > tb)
                return false;
            return true;
        };

        Rect.clipmask = function (clip) {
            var mask = 0;

            if (-clip[0] + clip[3] < 0)
                mask |= (1 << 0);
            if (clip[0] + clip[3] < 0)
                mask |= (1 << 1);
            if (-clip[1] + clip[3] < 0)
                mask |= (1 << 2);
            if (clip[1] + clip[3] < 0)
                mask |= (1 << 3);
            if (clip[2] + clip[3] < 0)
                mask |= (1 << 4);
            if (-clip[2] + clip[3] < 0)
                mask |= (1 << 5);

            return mask;
        };

        Rect.transform4 = function (dest, projection) {
            if (!projection)
                return;

            var x = dest.x;
            var y = dest.y;
            var width = dest.width;
            var height = dest.height;

            var p1 = vec4.createFrom(x, y, 0.0, 1.0);
            var p2 = vec4.createFrom(x + width, y, 0.0, 1.0);
            var p3 = vec4.createFrom(x + width, y + height, 0.0, 1.0);
            var p4 = vec4.createFrom(x, y + height, 0.0, 1.0);

            mat4.transformVec4(projection, p1);
            mat4.transformVec4(projection, p2);
            mat4.transformVec4(projection, p3);
            mat4.transformVec4(projection, p4);

            var vs = 65536.0;
            var vsr = 1.0 / vs;
            p1[0] *= vsr;
            p1[1] *= vsr;
            p2[0] *= vsr;
            p2[1] *= vsr;
            p3[0] *= vsr;
            p3[1] *= vsr;
            p4[0] *= vsr;
            p4[1] *= vsr;

            var cm1 = Rect.clipmask(p1);
            var cm2 = Rect.clipmask(p2);
            var cm3 = Rect.clipmask(p3);
            var cm4 = Rect.clipmask(p4);

            if ((cm1 | cm2 | cm3 | cm4) !== 0) {
                if ((cm1 & cm2 & cm3 & cm4) === 0) {
                    dest.x = dest.y = dest.width = dest.height = 0;
                }
            } else {
                var p1w = 1.0 / p1[3];
                var p2w = 1.0 / p2[3];
                var p3w = 1.0 / p3[3];
                var p4w = 1.0 / p4[3];
                p1[0] *= p1w * vs;
                p1[1] *= p1w * vs;
                p2[0] *= p2w * vs;
                p2[1] *= p2w * vs;
                p3[0] *= p3w * vs;
                p3[1] *= p3w * vs;
                p4[0] *= p4w * vs;
                p4[1] *= p4w * vs;

                dest.x = p1[0];
                dest.y = p1[1];
                dest.width = 0;
                dest.height = 0;
                Rect.extendTo(dest, p2[0], p2[1]);
                Rect.extendTo(dest, p3[0], p3[1]);
                Rect.extendTo(dest, p4[0], p4[1]);
            }
        };

        Rect.extendTo = function (dest, x, y) {
            var rx = dest.x;
            var ry = dest.y;
            var rw = dest.width;
            var rh = dest.height;

            if (x < rx || x > (rx + rw))
                rw = Math.max(Math.abs(x - rx), Math.abs(x - rx - rw));
            if (y < ry || y > (ry + rh))
                rh = Math.max(Math.abs(y - ry), Math.abs(y - ry - rh));

            dest.x = Math.min(rx, x);
            dest.y = Math.min(ry, y);
            dest.width = rw;
            dest.height = rh;
        };

        Rect.shrink = function (dest, left, top, right, bottom) {
            dest.x += left;
            dest.y += top;
            dest.width -= left + right;
            dest.height -= top + bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };
        return Rect;
    })();
    minerva.Rect = Rect;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Size = (function () {
        function Size(width, height) {
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }
        Size.copyTo = function (src, dest) {
            dest.width = src.width;
            dest.height = src.height;
        };

        Size.isEqual = function (size1, size2) {
            return size1.width === size2.width && size1.height === size2.height;
        };

        Size.min = function (dest, size2) {
            dest.width = Math.min(dest.width, size2.width);
            dest.height = Math.min(dest.height, size2.height);
        };
        return Size;
    })();
    minerva.Size = Size;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    var Thickness = (function () {
        function Thickness(left, top, right, bottom) {
            this.left = left == null ? 0 : left;
            this.top = top == null ? 0 : top;
            this.right = right == null ? 0 : right;
            this.bottom = bottom == null ? 0 : bottom;
        }
        Thickness.add = function (dest, t2) {
            dest.left += t2.left;
            dest.top += t2.top;
            dest.right += t2.right;
            dest.bottom += t2.bottom;
        };

        Thickness.copyTo = function (thickness, dest) {
            dest.left = thickness.left;
            dest.top = thickness.top;
            dest.right = thickness.right;
            dest.bottom = thickness.bottom;
        };

        Thickness.isEmpty = function (thickness) {
            return thickness.left === 0 && thickness.top === 0 && thickness.right === 0 && thickness.bottom === 0;
        };

        Thickness.isBalanced = function (thickness) {
            return thickness.left === thickness.top && thickness.left === thickness.right && thickness.left === thickness.bottom;
        };

        Thickness.shrinkSize = function (thickness, dest) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w -= thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h -= thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        };

        Thickness.shrinkRect = function (thickness, dest) {
            dest.x += thickness.left;
            dest.y += thickness.top;
            dest.width -= thickness.left + thickness.right;
            dest.height -= thickness.top + thickness.bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };

        Thickness.shrinkCornerRadius = function (thickness, dest) {
            dest.topLeft = Math.max(dest.topLeft - Math.max(thickness.left, thickness.top) * 0.5, 0);
            dest.topRight = Math.max(dest.topRight - Math.max(thickness.right, thickness.top) * 0.5, 0);
            dest.bottomRight = Math.max(dest.bottomRight - Math.max(thickness.right, thickness.bottom) * 0.5, 0);
            dest.bottomLeft = Math.max(dest.bottomLeft - Math.max(thickness.left, thickness.bottom) * 0.5, 0);
        };

        Thickness.growSize = function (thickness, dest) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w += thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h += thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        };

        Thickness.growRect = function (thickness, dest) {
            dest.x -= thickness.left;
            dest.y -= thickness.top;
            dest.width += thickness.left + thickness.right;
            dest.height += thickness.top + thickness.bottom;
            if (dest.width < 0)
                dest.width = 0;
            if (dest.height < 0)
                dest.height = 0;
        };

        Thickness.growCornerRadius = function (thickness, dest) {
            dest.topLeft = dest.topLeft ? Math.max(dest.topLeft + Math.max(thickness.left, thickness.top) * 0.5, 0) : 0;
            dest.topRight = dest.topRight ? Math.max(dest.topRight + Math.max(thickness.right, thickness.top) * 0.5, 0) : 0;
            dest.bottomRight = dest.bottomRight ? Math.max(dest.bottomRight + Math.max(thickness.right, thickness.bottom) * 0.5, 0) : 0;
            dest.bottomLeft = dest.bottomLeft ? Math.max(dest.bottomLeft + Math.max(thickness.left, thickness.bottom) * 0.5, 0) : 0;
        };
        return Thickness;
    })();
    minerva.Thickness = Thickness;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (Visibility) {
        Visibility[Visibility["Visible"] = 0] = "Visible";
        Visibility[Visibility["Collapsed"] = 1] = "Collapsed";
    })(minerva.Visibility || (minerva.Visibility = {}));
    var Visibility = minerva.Visibility;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    function singleton(type) {
        var x = type;
        if (!x.$$instance)
            x.$$instance = new x();
        return x.$$instance;
    }
    minerva.singleton = singleton;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (pipe) {
        var ITriPipe = (function () {
            function ITriPipe() {
            }
            return ITriPipe;
        })();
        pipe.ITriPipe = ITriPipe;

        function createTriPipe(pipedef) {
            return {
                def: pipedef,
                state: pipedef.createState(),
                output: pipedef.createOutput()
            };
        }
        pipe.createTriPipe = createTriPipe;
    })(minerva.pipe || (minerva.pipe = {}));
    var pipe = minerva.pipe;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (pipe) {
        var PipeDef = (function () {
            function PipeDef() {
                this.$$names = [];
                this.$$tapins = [];
            }
            PipeDef.prototype.addTapin = function (name, tapin) {
                this.$$names.push(name);
                this.$$tapins.push(tapin);
                return this;
            };

            PipeDef.prototype.addTapinBefore = function (before, name, tapin) {
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

            PipeDef.prototype.addTapinAfter = function (after, name, tapin) {
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

            PipeDef.prototype.replaceTapin = function (name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                tapins[index] = tapin;
                return this;
            };

            PipeDef.prototype.removeTapin = function (name) {
                var names = this.$$names;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                names.splice(index, 1);
                this.$$tapins.splice(index, 1);
                return this;
            };

            PipeDef.prototype.run = function (data) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    contexts[_i] = arguments[_i + 1];
                }
                contexts.unshift(data);

                this.prepare.apply(this, contexts);

                var flag = true;
                for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                    if (!tapins[i].apply(this, contexts)) {
                        flag = false;
                        break;
                    }
                }

                this.flush.apply(this, contexts);

                return flag;
            };

            PipeDef.prototype.prepare = function (data) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    contexts[_i] = arguments[_i + 1];
                }
            };

            PipeDef.prototype.flush = function (data) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 1); _i++) {
                    contexts[_i] = arguments[_i + 1];
                }
            };
            return PipeDef;
        })();
        pipe.PipeDef = PipeDef;
    })(minerva.pipe || (minerva.pipe = {}));
    var pipe = minerva.pipe;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (pipe) {
        var TriPipeDef = (function () {
            function TriPipeDef() {
                this.$$names = [];
                this.$$tapins = [];
            }
            TriPipeDef.prototype.addTapin = function (name, tapin) {
                this.$$names.push(name);
                this.$$tapins.push(tapin);
                return this;
            };

            TriPipeDef.prototype.addTapinBefore = function (before, name, tapin) {
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

            TriPipeDef.prototype.addTapinAfter = function (after, name, tapin) {
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

            TriPipeDef.prototype.replaceTapin = function (name, tapin) {
                var names = this.$$names;
                var tapins = this.$$tapins;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                tapins[index] = tapin;
                return this;
            };

            TriPipeDef.prototype.removeTapin = function (name) {
                var names = this.$$names;
                var index = names.indexOf(name);
                if (index === -1)
                    throw new Error("Could not replace pipe tap-in. No pipe tap-in named `" + name + "`.");
                names.splice(index, 1);
                this.$$tapins.splice(index, 1);
                return this;
            };

            TriPipeDef.prototype.run = function (input, state, output) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 3); _i++) {
                    contexts[_i] = arguments[_i + 3];
                }
                contexts.unshift(output);
                contexts.unshift(state);
                contexts.unshift(input);

                this.prepare.apply(this, contexts);

                var flag = true;
                for (var i = 0, tapins = this.$$tapins, len = tapins.length; i < len; i++) {
                    if (!tapins[i].apply(this, contexts)) {
                        flag = false;
                        break;
                    }
                }

                this.flush.apply(this, contexts);

                return flag;
            };

            TriPipeDef.prototype.createState = function () {
                return null;
            };

            TriPipeDef.prototype.createOutput = function () {
                return null;
            };

            TriPipeDef.prototype.prepare = function (input, state, output) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 3); _i++) {
                    contexts[_i] = arguments[_i + 3];
                }
            };

            TriPipeDef.prototype.flush = function (input, state, output) {
                var contexts = [];
                for (var _i = 0; _i < (arguments.length - 3); _i++) {
                    contexts[_i] = arguments[_i + 3];
                }
            };
            return TriPipeDef;
        })();
        pipe.TriPipeDef = TriPipeDef;
    })(minerva.pipe || (minerva.pipe = {}));
    var pipe = minerva.pipe;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        var NO_VO = {
            updateBounds: function () {
            },
            invalidate: function (region) {
            }
        };

        function getVisualOwner(updater) {
            var tree = updater.tree;
            if (tree.visualParent)
                return tree.visualParent;
            if (tree.isTop && tree.surface)
                return tree.surface;
            return NO_VO;
        }

        var Updater = (function () {
            function Updater() {
                this.$$measure = null;
                this.$$measureBinder = null;
                this.$$arrange = null;
                this.$$arrangeBinder = null;
                this.$$sizing = null;
                this.$$processdown = null;
                this.$$processup = null;
                this.$$render = null;
                this.$$inDownDirty = false;
                this.$$inUpDirty = false;
                this.assets = {
                    width: NaN,
                    height: NaN,
                    minWidth: 0.0,
                    minHeight: 0.0,
                    maxWidth: Number.POSITIVE_INFINITY,
                    maxHeight: Number.POSITIVE_INFINITY,
                    useLayoutRounding: true,
                    margin: new minerva.Thickness(),
                    horizontalAlignment: 3 /* Stretch */,
                    verticalAlignment: 3 /* Stretch */,
                    clip: null,
                    effect: null,
                    visibility: 0 /* Visible */,
                    opacity: 1.0,
                    isHitTestVisible: true,
                    renderTransform: mat3.identity(),
                    renderTransformOrigin: new minerva.Point(),
                    projection: null,
                    effectPadding: new minerva.Thickness(),
                    previousConstraint: new minerva.Size(),
                    desiredSize: new minerva.Size(),
                    hiddenDesire: new minerva.Size(),
                    renderSize: new minerva.Size(),
                    lastRenderSize: new minerva.Size(),
                    layoutSlot: new minerva.Rect(),
                    layoutClip: new minerva.Rect(),
                    compositeLayoutClip: null,
                    actualWidth: 0,
                    actualHeight: 0,
                    z: NaN,
                    totalIsRenderVisible: true,
                    totalOpacity: 1.0,
                    totalIsHitTestVisible: true,
                    totalHasRenderProjection: false,
                    extents: new minerva.Rect(),
                    extentsWithChildren: new minerva.Rect(),
                    surfaceBoundsWithChildren: new minerva.Rect(),
                    globalBoundsWithChildren: new minerva.Rect(),
                    layoutXform: mat3.identity(),
                    carrierXform: mat3.identity(),
                    renderXform: mat3.identity(),
                    absoluteXform: mat3.identity(),
                    carrierProjection: mat4.identity(),
                    localProjection: mat4.identity(),
                    absoluteProjection: mat4.identity(),
                    dirtyRegion: new minerva.Rect(),
                    dirtyFlags: 0,
                    uiFlags: 2 /* RenderVisible */ | 4 /* HitTestVisible */,
                    forceInvalidate: false
                };
                this.tree = null;
                this.setMeasureBinder().setArrangeBinder();
            }
            Updater.prototype.onSizeChanged = function (oldSize, newSize) {
            };

            Updater.prototype.setTree = function (tree) {
                this.tree = tree || new layout.UpdaterTree();
                return this;
            };

            Updater.prototype.setVisualParent = function (visualParent) {
                this.tree.visualParent = visualParent;
                return this;
            };

            Updater.prototype.walkDeep = function (dir) {
                var last = undefined;
                var walkList = [this];
                dir = dir || 0 /* Forward */;
                var revdir = (dir === 0 /* Forward */ || dir === 2 /* ZForward */) ? dir + 1 : dir - 1;

                return {
                    current: undefined,
                    step: function () {
                        if (last) {
                            for (var subwalker = last.tree.walk(revdir); subwalker.step();) {
                                walkList.unshift(subwalker.current);
                            }
                        }

                        this.current = last = walkList.shift();
                        return this.current !== undefined;
                    },
                    skipBranch: function () {
                        last = undefined;
                    }
                };
            };

            Updater.prototype.setMeasurePipe = function (pipedef) {
                var def = pipedef || new layout.measure.MeasurePipeDef();
                this.$$measure = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.setMeasureBinder = function (mb) {
                this.$$measureBinder = mb || new layout.measure.MeasureBinder();
                return this;
            };

            Updater.prototype.setArrangePipe = function (pipedef) {
                var def = pipedef || new layout.arrange.ArrangePipeDef();
                this.$$arrange = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.setArrangeBinder = function (ab) {
                this.$$arrangeBinder = ab || new layout.arrange.ArrangeBinder();
                return this;
            };

            Updater.prototype.setSizingPipe = function (pipedef) {
                var def = pipedef;
                if (!def)
                    def = new layout.sizing.SizingPipeDef();
                this.$$sizing = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.setProcessDownPipe = function (pipedef) {
                var def = pipedef;
                if (!def)
                    def = new layout.processdown.ProcessDownPipeDef();
                this.$$processdown = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.setProcessUpPipe = function (pipedef) {
                var def = pipedef;
                if (!def)
                    def = new layout.processup.ProcessUpPipeDef();
                this.$$processup = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.setRenderPipe = function (pipedef) {
                var def = pipedef || new layout.render.RenderPipeDef();
                this.$$render = minerva.pipe.createTriPipe(def);
                return this;
            };

            Updater.prototype.doMeasure = function () {
                this.$$measureBinder.bind(this);
            };

            Updater.prototype.measure = function (availableSize) {
                var pipe = this.$$measure;
                var output = pipe.output;
                var success = pipe.def.run(this.assets, pipe.state, output, this.tree, availableSize);
                if (output.newUpDirty)
                    Updater.$$addUpDirty(this);
                if (output.newDownDirty)
                    Updater.$$addDownDirty(this);
                if (output.newUiFlags)
                    Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
                return success;
            };

            Updater.prototype.doArrange = function () {
                this.$$arrangeBinder.bind(this);
            };

            Updater.prototype.arrange = function (finalRect) {
                var pipe = this.$$arrange;
                var output = pipe.output;
                var success = pipe.def.run(this.assets, pipe.state, output, this.tree, finalRect);
                if (output.newUpDirty)
                    Updater.$$addUpDirty(this);
                if (output.newDownDirty)
                    Updater.$$addDownDirty(this);
                if (output.newUiFlags)
                    Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
                return success;
            };

            Updater.prototype.sizing = function (oldSize, newSize) {
                var pipe = this.$$sizing;
                var assets = this.assets;
                if (assets.lastRenderSize)
                    minerva.Size.copyTo(assets.lastRenderSize, oldSize);
                var success = pipe.def.run(assets, pipe.state, pipe.output, this.tree);
                minerva.Size.copyTo(pipe.output.actualSize, newSize);
                assets.lastRenderSize = undefined;
                return success;
            };

            Updater.prototype.processDown = function () {
                if (!this.$$inDownDirty)
                    return true;
                var vp = this.tree.visualParent;
                if (vp && vp.$$inDownDirty) {
                    return false;
                }

                var pipe = this.$$processdown;
                var success = pipe.def.run(this.assets, pipe.state, pipe.output, vp ? vp.assets : null);
                this.$$inDownDirty = false;
                if (pipe.output.newUpDirty)
                    Updater.$$addUpDirty(this);
                return success;
            };

            Updater.prototype.processUp = function () {
                if (!this.$$inUpDirty)
                    return true;

                var pipe = this.$$processup;
                var success = pipe.def.run(this.assets, pipe.state, pipe.output, getVisualOwner(this));
                this.$$inUpDirty = false;
                return success;
            };

            Updater.prototype.render = function (ctx, region) {
                var pipe = this.$$render;
                return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region, this.tree);
            };

            Updater.prototype.invalidateMeasure = function () {
                this.assets.dirtyFlags |= minerva.DirtyFlags.Measure;
                Updater.$$propagateUiFlagsUp(this, 2048 /* MeasureHint */);
            };

            Updater.prototype.invalidateArrange = function () {
                this.assets.dirtyFlags |= minerva.DirtyFlags.Arrange;
                Updater.$$propagateUiFlagsUp(this, 4096 /* ArrangeHint */);
            };

            Updater.prototype.updateBounds = function (forceRedraw) {
                var assets = this.assets;
                assets.dirtyFlags |= minerva.DirtyFlags.Bounds;
                Updater.$$addUpDirty(this);
                if (forceRedraw === true)
                    assets.forceInvalidate = true;
            };

            Updater.prototype.invalidate = function (region) {
                var assets = this.assets;
                if (!assets.totalIsRenderVisible || (assets.totalOpacity * 255) < 0.5)
                    return;
                assets.dirtyFlags |= minerva.DirtyFlags.Invalidate;
                Updater.$$addUpDirty(this);
                minerva.Rect.union(assets.dirtyRegion, region);
            };

            Updater.prototype.findChildInList = function (list) {
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].tree.visualParent === this)
                        return i;
                }
                return -1;
            };

            Updater.$$addUpDirty = function (updater) {
                var surface = updater.tree.surface;
                if (surface && !updater.$$inUpDirty) {
                    surface.addUpDirty(updater);
                    updater.$$inUpDirty = true;
                }
            };

            Updater.$$addDownDirty = function (updater) {
                var surface = updater.tree.surface;
                if (surface && !updater.$$inDownDirty) {
                    surface.addDownDirty(updater);
                    updater.$$inDownDirty = true;
                }
            };

            Updater.$$propagateUiFlagsUp = function (updater, flags) {
                updater.assets.uiFlags |= flags;
                var vpu = updater;
                while ((vpu = vpu.tree.visualParent) != null && (vpu.assets.uiFlags & flags) === 0) {
                    vpu.assets.uiFlags |= flags;
                }
            };
            return Updater;
        })();
        layout.Updater = Updater;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        var UpdaterTree = (function () {
            function UpdaterTree() {
                this.isTop = false;
                this.surface = null;
                this.visualParent = null;
                this.isContainer = false;
                this.isLayoutContainer = false;
            }
            UpdaterTree.prototype.walk = function (direction) {
                return {
                    current: undefined,
                    step: function () {
                        return false;
                    }
                };
            };
            return UpdaterTree;
        })();
        layout.UpdaterTree = UpdaterTree;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (helpers) {
            function coerceSize(size, assets) {
                var cw = Math.max(assets.minWidth, size.width);
                var ch = Math.max(assets.minHeight, size.height);

                if (!isNaN(assets.width))
                    cw = assets.width;

                if (!isNaN(assets.height))
                    ch = assets.height;

                cw = Math.max(Math.min(cw, assets.maxWidth), assets.minWidth);
                ch = Math.max(Math.min(ch, assets.maxHeight), assets.minHeight);

                if (assets.useLayoutRounding) {
                    cw = Math.round(cw);
                    ch = Math.round(ch);
                }

                size.width = cw;
                size.height = ch;
            }
            helpers.coerceSize = coerceSize;

            function copyGrowTransform4(dest, src, thickness, projection) {
                minerva.Rect.copyTo(src, dest);
                minerva.Thickness.growRect(thickness, dest);
                if (projection)
                    minerva.Rect.transform4(dest, projection);
            }
            helpers.copyGrowTransform4 = copyGrowTransform4;
        })(layout.helpers || (layout.helpers = {}));
        var helpers = layout.helpers;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            var ArrangeBinder = (function () {
                function ArrangeBinder() {
                }
                ArrangeBinder.prototype.bind = function (updater) {
                    var assets = updater.assets;
                    var tree = updater.tree;
                    var last = assets.layoutSlot || undefined;
                    if (!tree.visualParent) {
                        last = new minerva.Rect();
                        this.expandViewport(last, assets, tree);
                        this.shiftViewport(last, assets, tree);
                    }

                    if (last) {
                        return updater.arrange(last);
                    } else if (tree.visualParent) {
                        tree.visualParent.invalidateArrange();
                    }
                    return false;
                };

                ArrangeBinder.prototype.expandViewport = function (viewport, assets, tree) {
                    if (tree.isLayoutContainer) {
                        minerva.Size.copyTo(assets.desiredSize, viewport);
                        if (tree.surface) {
                            var measure = assets.previousConstraint;
                            if (measure) {
                                viewport.width = Math.max(viewport.width, measure.width);
                                viewport.height = Math.max(viewport.height, measure.height);
                            } else {
                                viewport.width = tree.surface.width;
                                viewport.height = tree.surface.height;
                            }
                        }
                    } else {
                        viewport.width = assets.actualWidth;
                        viewport.height = assets.actualHeight;
                    }
                };

                ArrangeBinder.prototype.shiftViewport = function (viewport, assets, tree) {
                };
                return ArrangeBinder;
            })();
            arrange.ArrangeBinder = ArrangeBinder;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            var ArrangePipeDef = (function (_super) {
                __extends(ArrangePipeDef, _super);
                function ArrangePipeDef() {
                    _super.call(this);
                    this.addTapin('applyRounding', arrange.tapins.applyRounding).addTapin('validateFinalRect', arrange.tapins.validateFinalRect).addTapin('validateVisibility', arrange.tapins.validateVisibility).addTapin('checkNeedArrange', arrange.tapins.checkNeedArrange).addTapin('invalidateFuture', arrange.tapins.invalidateFuture).addTapin('calcStretched', arrange.tapins.calcStretched).addTapin('prepareOverride', arrange.tapins.prepareOverride).addTapin('doOverride', arrange.tapins.doOverride).addTapin('completeOverride', arrange.tapins.completeOverride).addTapin('calcFlip', arrange.tapins.calcFlip).addTapin('calcVisualOffset', arrange.tapins.calcVisualOffset).addTapin('buildLayoutClip', arrange.tapins.buildLayoutClip).addTapin('buildLayoutXform', arrange.tapins.buildLayoutXform).addTapin('buildRenderSize', arrange.tapins.buildRenderSize);
                }
                ArrangePipeDef.prototype.createState = function () {
                    return {
                        finalRect: new minerva.Rect(),
                        finalSize: new minerva.Size(),
                        framework: new minerva.Size(),
                        stretched: new minerva.Size(),
                        constrained: new minerva.Size(),
                        visualOffset: new minerva.Point(),
                        flipHorizontal: false
                    };
                };

                ArrangePipeDef.prototype.createOutput = function () {
                    return {
                        error: null,
                        dirtyFlags: 0,
                        uiFlags: 0,
                        layoutSlot: new minerva.Rect(),
                        arrangedSize: new minerva.Size(),
                        layoutXform: mat3.identity(),
                        layoutClip: new minerva.Rect(),
                        renderSize: new minerva.Size(),
                        lastRenderSize: null,
                        newUpDirty: 0,
                        newDownDirty: 0,
                        newUiFlags: 0
                    };
                };

                ArrangePipeDef.prototype.prepare = function (input, state, output) {
                    output.dirtyFlags = input.dirtyFlags;
                    output.uiFlags = input.uiFlags;
                    minerva.Rect.copyTo(input.layoutSlot, output.layoutSlot);
                    minerva.Rect.copyTo(input.layoutClip, output.layoutClip);
                    minerva.Size.copyTo(input.renderSize, output.renderSize);
                    output.lastRenderSize = null;
                };

                ArrangePipeDef.prototype.flush = function (input, state, output) {
                    var newDirty = output.dirtyFlags & ~input.dirtyFlags;
                    output.newUpDirty = newDirty & minerva.DirtyFlags.UpDirtyState;
                    output.newDownDirty = newDirty & minerva.DirtyFlags.DownDirtyState;
                    output.newUiFlags = output.uiFlags & ~input.uiFlags;
                    input.dirtyFlags = output.dirtyFlags;
                    input.uiFlags = output.uiFlags;
                    minerva.Rect.copyTo(output.layoutSlot, input.layoutSlot);
                    minerva.Rect.copyTo(output.layoutClip, input.layoutClip);
                    minerva.Size.copyTo(output.renderSize, input.renderSize);
                    if (output.lastRenderSize)
                        input.lastRenderSize = output.lastRenderSize;
                };
                return ArrangePipeDef;
            })(minerva.pipe.TriPipeDef);
            arrange.ArrangePipeDef = ArrangePipeDef;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.applyRounding = function (input, state, output, tree, finalRect) {
                    var fr = state.finalRect;
                    if (input.useLayoutRounding) {
                        fr.x = Math.round(finalRect.x);
                        fr.y = Math.round(finalRect.y);
                        fr.width = Math.round(finalRect.width);
                        fr.height = Math.round(finalRect.height);
                    } else {
                        minerva.Rect.copyTo(finalRect, fr);
                    }
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                var testRect = new minerva.Rect();
                var fwClip = new minerva.Rect();

                tapins.buildLayoutClip = function (input, state, output, tree, finalRect) {
                    if (tree.isTop)
                        return true;

                    var layoutClip = output.layoutClip;
                    var vo = state.visualOffset;

                    minerva.Rect.copyTo(state.finalRect, output.layoutClip);
                    layoutClip.x = Math.max(layoutClip.x - vo.x, 0);
                    layoutClip.y = Math.max(layoutClip.y - vo.y, 0);

                    if (input.useLayoutRounding) {
                        layoutClip.x = Math.round(layoutClip.x);
                        layoutClip.y = Math.round(layoutClip.y);
                    }

                    testRect.x = 0;
                    testRect.y = 0;
                    minerva.Size.copyTo(output.arrangedSize, testRect);
                    if (!minerva.Rect.isContainedIn(testRect, layoutClip) || !minerva.Size.isEqual(state.constrained, output.arrangedSize)) {
                        fwClip.width = Number.POSITIVE_INFINITY;
                        fwClip.height = Number.POSITIVE_INFINITY;
                        layout.helpers.coerceSize(fwClip, input);
                        minerva.Rect.intersection(layoutClip, fwClip);
                    } else {
                        layoutClip.x = layoutClip.y = layoutClip.width = layoutClip.height = 0;
                    }

                    if (!minerva.Rect.isEqual(output.layoutClip, input.layoutClip)) {
                        output.dirtyFlags |= minerva.DirtyFlags.LayoutClip;
                    }

                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.buildLayoutXform = function (input, state, output, tree, finalRect) {
                    var vo = state.visualOffset;
                    var layoutXform = mat3.createTranslate(vo.x, vo.y, output.layoutXform);
                    if (state.flipHorizontal) {
                        mat3.translate(layoutXform, output.arrangedSize.width, 0);
                        mat3.scale(layoutXform, -1, 1);
                    }
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.buildRenderSize = function (input, state, output, tree, finalRect) {
                    minerva.Size.copyTo(output.arrangedSize, output.renderSize);
                    if (!minerva.Size.isEqual(input.renderSize, output.renderSize)) {
                        if (input.lastRenderSize.width <= 0 && input.lastRenderSize.height <= 0) {
                            minerva.Size.copyTo(input.renderSize, output.lastRenderSize);
                            output.uiFlags |= 8192 /* SizeHint */;
                        }
                    }
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.calcFlip = function (input, state, output, tree, finalRect) {
                    state.flipHorizontal = false;
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.calcStretched = function (input, state, output, tree, finalRect) {
                    var fr = state.finalRect;
                    minerva.Rect.copyTo(fr, output.layoutSlot);

                    minerva.Thickness.shrinkRect(input.margin, fr);

                    var stretched = state.stretched;
                    stretched.width = fr.width;
                    stretched.height = fr.height;
                    layout.helpers.coerceSize(stretched, input);

                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.calcVisualOffset = function (input, state, output, tree, finalRect) {
                    var vo = state.visualOffset;
                    var fr = state.finalRect;
                    var constrained = state.constrained;
                    vo.x = fr.x;
                    vo.y = fr.y;

                    if (!tree.isTop) {
                        switch (input.horizontalAlignment) {
                            case 0 /* Left */:
                                break;
                            case 2 /* Right */:
                                vo.x += fr.width - constrained.width;
                                break;
                            case 1 /* Center */:
                                vo.x += (fr.width - constrained.width) * 0.5;
                                break;
                            default:
                                vo.x += Math.max((fr.width - constrained.width) * 0.5, 0);
                                break;
                        }

                        switch (input.verticalAlignment) {
                            case 0 /* Top */:
                                break;
                            case 2 /* Bottom */:
                                vo.y += fr.height - constrained.height;
                                break;
                            case 1 /* Center */:
                                vo.y += (fr.height - constrained.height) * 0.5;
                                break;
                            default:
                                vo.y += Math.max((fr.height - constrained.height) * 0.5, 0);
                                break;
                        }
                    }

                    if (input.useLayoutRounding) {
                        vo.x = Math.round(vo.x);
                        vo.y = Math.round(vo.y);
                    }

                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.checkNeedArrange = function (input, state, output, tree, finalRect) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Arrange) > 0)
                        return true;
                    return !minerva.Rect.isEqual(output.layoutSlot, state.finalRect);
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.completeOverride = function (input, state, output, tree, finalRect) {
                    output.dirtyFlags &= ~minerva.DirtyFlags.Arrange;

                    var as = output.arrangedSize;
                    if (input.horizontalAlignment === 3 /* Stretch */)
                        as.width = Math.max(as.width, state.framework.width);

                    if (input.verticalAlignment === 3 /* Stretch */)
                        as.height = Math.max(as.height, state.framework.height);

                    if (input.useLayoutRounding) {
                        as.width = Math.round(as.width);
                        as.height = Math.round(as.height);
                    }

                    var constrained = state.constrained;
                    minerva.Size.copyTo(as, constrained);
                    layout.helpers.coerceSize(constrained, input);
                    constrained.width = Math.min(constrained.width, as.width);
                    constrained.height = Math.min(constrained.height, as.height);
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.doOverride = function (input, state, output, tree, finalRect) {
                    output.arrangedSize.width = 0;
                    output.arrangedSize.height = 0;
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.invalidateFuture = function (input, state, output, tree, finalRect) {
                    var lc = output.layoutClip;
                    lc.x = lc.y = lc.width = lc.height = 0;
                    output.dirtyFlags |= minerva.DirtyFlags.LocalTransform;
                    output.dirtyFlags |= minerva.DirtyFlags.LocalProjection;
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.prepareOverride = function (input, state, output, tree, finalRect) {
                    var framework = state.framework;
                    framework.width = 0;
                    framework.height = 0;
                    layout.helpers.coerceSize(framework, input);

                    if (input.horizontalAlignment === 3 /* Stretch */)
                        framework.width = Math.max(framework.width, state.stretched.width);

                    if (input.verticalAlignment === 3 /* Stretch */)
                        framework.height = Math.max(framework.height, state.stretched.height);

                    var fs = state.finalSize;
                    var hd = input.hiddenDesire;
                    fs.width = Math.max(hd.width, framework.width);
                    fs.height = Math.max(hd.height, framework.height);

                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.validateFinalRect = function (input, state, output, tree, finalRect) {
                    var fr = state.finalRect;
                    if (fr.width < 0 || fr.height < 0 || !isFinite(fr.width) || !isFinite(fr.height) || isNaN(fr.width) || isNaN(fr.height)) {
                        output.error = "Invalid arguments to Arrange.";
                        return false;
                    }
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (arrange) {
            (function (tapins) {
                tapins.validateVisibility = function (input, state, output, tree, finalRect) {
                    if (input.visibility !== 0 /* Visible */) {
                        minerva.Rect.copyTo(state.finalRect, output.layoutSlot);
                        return false;
                    }
                    return true;
                };
            })(arrange.tapins || (arrange.tapins = {}));
            var tapins = arrange.tapins;
        })(layout.arrange || (layout.arrange = {}));
        var arrange = layout.arrange;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            var DraftPipeDef = (function (_super) {
                __extends(DraftPipeDef, _super);
                function DraftPipeDef() {
                    _super.call(this);
                    this.addTapin('flushPrevious', draft.tapins.flushPrevious).addTapin('determinePhase', draft.tapins.determinePhase).addTapin('prepareMeasure', draft.tapins.prepareMeasure).addTapin('measure', draft.tapins.measure).addTapin('prepareArrange', draft.tapins.prepareArrange).addTapin('arrange', draft.tapins.arrange).addTapin('prepareSizing', draft.tapins.prepareSizing).addTapin('sizing', draft.tapins.sizing).addTapin('notifyResize', draft.tapins.notifyResize);
                }
                DraftPipeDef.prototype.prepare = function (data) {
                };

                DraftPipeDef.prototype.flush = function (data) {
                };
                return DraftPipeDef;
            })(minerva.pipe.PipeDef);
            draft.DraftPipeDef = DraftPipeDef;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.arrange = function (data) {
                    if (data.flag !== 4096 /* ArrangeHint */)
                        return true;

                    if (data.arrangeList.length <= 0)
                        return false;

                    var updater;
                    while ((updater = data.arrangeList.shift()) != null) {
                        updater.doArrange();
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.determinePhase = function (data) {
                    data.flag = 0 /* None */;
                    var assets = data.assets;
                    if (assets.visibility !== 0 /* Visible */)
                        return true;

                    if ((assets.uiFlags & 2048 /* MeasureHint */) > 0) {
                        data.flag = 2048 /* MeasureHint */;
                    } else if ((assets.uiFlags & 4096 /* ArrangeHint */) > 0) {
                        data.flag = 4096 /* ArrangeHint */;
                    } else if ((assets.uiFlags & 8192 /* SizeHint */) > 0) {
                        data.flag = 8192 /* SizeHint */;
                    } else {
                        return false;
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.flushPrevious = function (data) {
                    var updater;
                    while ((updater = data.arrangeList.shift()) != null) {
                        layout.Updater.$$propagateUiFlagsUp(updater, 4096 /* ArrangeHint */);
                    }
                    while ((updater = data.sizingList.shift()) != null) {
                        layout.Updater.$$propagateUiFlagsUp(updater, 8192 /* SizeHint */);
                    }
                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.measure = function (data) {
                    if (data.flag !== 2048 /* MeasureHint */)
                        return true;

                    if (data.measureList.length <= 0)
                        return false;

                    var updater;
                    while ((updater = data.measureList.shift()) != null) {
                        updater.doMeasure();
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.notifyResize = function (data) {
                    if (data.flag !== 8192 /* SizeHint */)
                        return true;
                    if (data.sizingUpdates.length <= 0)
                        return true;

                    var update;
                    while ((update = data.sizingUpdates.pop()) != null) {
                        update.updater.onSizeChanged(update.oldSize, update.newSize);
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.prepareArrange = function (data) {
                    if (data.flag !== 4096 /* ArrangeHint */)
                        return true;

                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== 0 /* Visible */) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & 4096 /* ArrangeHint */) === 0) {
                            walker.skipBranch();
                            continue;
                        }

                        assets.uiFlags &= ~4096 /* ArrangeHint */;
                        if ((assets.dirtyFlags & minerva.DirtyFlags.Arrange) > 0)
                            data.arrangeList.push(walker.current);
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.prepareMeasure = function (data) {
                    if (data.flag !== 2048 /* MeasureHint */)
                        return true;

                    var last = data.assets.previousConstraint;
                    if (data.tree.isContainer && (!last || (!minerva.Size.isEqual(last, data.surfaceSize)))) {
                        data.assets.dirtyFlags |= minerva.DirtyFlags.Measure;
                        minerva.Size.copyTo(data.surfaceSize, data.assets.previousConstraint);
                    }

                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== 0 /* Visible */) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & 2048 /* MeasureHint */) === 0) {
                            walker.skipBranch();
                            continue;
                        }

                        assets.uiFlags &= ~2048 /* MeasureHint */;
                        if ((assets.dirtyFlags & minerva.DirtyFlags.Measure) > 0)
                            data.measureList.push(walker.current);
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.prepareSizing = function (data) {
                    if (data.flag !== 8192 /* SizeHint */)
                        return true;

                    for (var walker = data.updater.walkDeep(); walker.step();) {
                        var assets = walker.current.assets;
                        if (assets.visibility !== 0 /* Visible */) {
                            walker.skipBranch();
                            continue;
                        }
                        if ((assets.uiFlags & 8192 /* SizeHint */) === 0) {
                            walker.skipBranch();
                            continue;
                        }

                        assets.uiFlags &= ~8192 /* SizeHint */;
                        if (assets.lastRenderSize !== undefined)
                            data.sizingList.push(walker.current);
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (draft) {
            (function (tapins) {
                tapins.sizing = function (data) {
                    if (data.flag !== 8192 /* SizeHint */)
                        return true;

                    if (data.sizingList.length <= 0)
                        return false;

                    var updater;
                    var oldSize = new minerva.Size();
                    var newSize = new minerva.Size();
                    while ((updater = data.sizingList.pop()) != null) {
                        updater.sizing(oldSize, newSize);
                        if (!minerva.Size.isEqual(oldSize, new minerva.Size)) {
                            data.sizingUpdates.push({
                                updater: updater,
                                oldSize: oldSize,
                                newSize: newSize
                            });
                            oldSize = new minerva.Size();
                            newSize = new minerva.Size();
                        }
                    }

                    return true;
                };
            })(draft.tapins || (draft.tapins = {}));
            var tapins = draft.tapins;
        })(layout.draft || (layout.draft = {}));
        var draft = layout.draft;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            var MeasureBinder = (function () {
                function MeasureBinder() {
                }
                MeasureBinder.prototype.bind = function (updater) {
                    var assets = updater.assets;
                    var last = assets.previousConstraint;
                    var old = new minerva.Size();
                    var tree = updater.tree;

                    if (!tree.surface && !last && !tree.visualParent && tree.isLayoutContainer)
                        last = new minerva.Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

                    var success = false;
                    if (last) {
                        minerva.Size.copyTo(assets.desiredSize, old);
                        success = updater.measure(last);
                        if (minerva.Size.isEqual(old, assets.desiredSize))
                            return success;
                    }

                    if (tree.visualParent)
                        tree.visualParent.invalidateMeasure();

                    assets.dirtyFlags &= ~minerva.DirtyFlags.Measure;
                    return success;
                };
                return MeasureBinder;
            })();
            measure.MeasureBinder = MeasureBinder;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            var MeasurePipeDef = (function (_super) {
                __extends(MeasurePipeDef, _super);
                function MeasurePipeDef() {
                    _super.call(this);
                    this.addTapin('validate', measure.tapins.validate).addTapin('validateVisibility', measure.tapins.validateVisibility).addTapin('applyTemplate', measure.tapins.applyTemplate).addTapin('checkNeedMeasure', measure.tapins.checkNeedMeasure).addTapin('invalidateFuture', measure.tapins.invalidateFuture).addTapin('prepareOverride', measure.tapins.prepareOverride).addTapin('doOverride', measure.tapins.doOverride).addTapin('completeOverride', measure.tapins.completeOverride).addTapin('finishDesired', measure.tapins.finishDesired);
                }
                MeasurePipeDef.prototype.createState = function () {
                    return {
                        availableSize: new minerva.Size()
                    };
                };

                MeasurePipeDef.prototype.createOutput = function () {
                    return {
                        error: null,
                        previousConstraint: new minerva.Size(),
                        desiredSize: new minerva.Size(),
                        hiddenDesire: new minerva.Size(),
                        dirtyFlags: 0,
                        uiFlags: 0,
                        newUpDirty: 0,
                        newDownDirty: 0,
                        newUiFlags: 0
                    };
                };

                MeasurePipeDef.prototype.prepare = function (input, state, output) {
                    output.dirtyFlags = input.dirtyFlags;
                    minerva.Size.copyTo(input.previousConstraint, output.previousConstraint);
                    minerva.Size.copyTo(input.hiddenDesire, output.hiddenDesire);
                };

                MeasurePipeDef.prototype.flush = function (input, state, output) {
                    var newDirty = output.dirtyFlags & ~input.dirtyFlags;
                    output.newUpDirty = newDirty & minerva.DirtyFlags.UpDirtyState;
                    output.newDownDirty = newDirty & minerva.DirtyFlags.DownDirtyState;
                    output.newUiFlags = output.uiFlags & ~input.uiFlags;
                    input.dirtyFlags = output.dirtyFlags;
                    input.uiFlags = output.uiFlags;
                    minerva.Size.copyTo(output.previousConstraint, input.previousConstraint);
                    minerva.Size.copyTo(output.hiddenDesire, input.hiddenDesire);
                    minerva.Size.copyTo(output.desiredSize, input.desiredSize);
                };
                return MeasurePipeDef;
            })(minerva.pipe.TriPipeDef);
            measure.MeasurePipeDef = MeasurePipeDef;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.applyTemplate = function (input, state, output, tree, availableSize) {
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.checkNeedMeasure = function (input, state, output, tree, availableSize) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Measure) > 0)
                        return true;
                    var pc = input.previousConstraint;
                    if (!pc || pc.width !== availableSize.width || pc.height !== availableSize.height) {
                        minerva.Size.copyTo(pc, output.previousConstraint);
                        return true;
                    }
                    return false;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.completeOverride = function (input, state, output, tree, availableSize) {
                    output.dirtyFlags &= ~minerva.DirtyFlags.Measure;
                    minerva.Size.copyTo(output.desiredSize, output.hiddenDesire);
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.doOverride = function (input, state, output, tree, availableSize) {
                    output.desiredSize.width = 0;
                    output.desiredSize.height = 0;
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.finishDesired = function (input, state, output, tree, availableSize) {
                    var ds = output.desiredSize;
                    layout.helpers.coerceSize(ds, input);
                    minerva.Thickness.growSize(input.margin, ds);
                    ds.width = Math.min(ds.width, availableSize.width);
                    ds.height = Math.min(ds.height, availableSize.height);
                    if (input.useLayoutRounding) {
                        ds.width = Math.round(ds.width);
                        ds.height = Math.round(ds.height);
                    }
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.invalidateFuture = function (input, state, output, tree, availableSize) {
                    output.dirtyFlags |= minerva.DirtyFlags.Arrange;
                    output.uiFlags |= 4096 /* ArrangeHint */;
                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.prepareOverride = function (input, state, output, tree, availableSize) {
                    minerva.Size.copyTo(availableSize, state.availableSize);
                    minerva.Thickness.shrinkSize(input.margin, state.availableSize);
                    layout.helpers.coerceSize(state.availableSize, input);
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.validate = function (input, state, output, tree, availableSize) {
                    if (isNaN(availableSize.width) || isNaN(availableSize.height)) {
                        output.error = "Cannot call Measure using a size with NaN values.";
                        return false;
                    }
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (measure) {
            (function (tapins) {
                tapins.validateVisibility = function (input, state, output, tree, availableSize) {
                    if (input.visibility !== 0 /* Visible */) {
                        minerva.Size.copyTo(availableSize, output.previousConstraint);
                        return false;
                    }
                    return true;
                };
            })(measure.tapins || (measure.tapins = {}));
            var tapins = measure.tapins;
        })(layout.measure || (layout.measure = {}));
        var measure = layout.measure;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            var ProcessDownPipeDef = (function (_super) {
                __extends(ProcessDownPipeDef, _super);
                function ProcessDownPipeDef() {
                    _super.call(this);
                    this.addTapin('processRenderVisibility', processdown.tapins.processRenderVisibility).addTapin('processHitTestVisibility', processdown.tapins.processHitTestVisibility).addTapin('calcXformOrigin', processdown.tapins.calcXformOrigin).addTapin('processLocalXform', processdown.tapins.processLocalXform).addTapin('processLocalProjection', processdown.tapins.processLocalProjection).addTapin('calcRenderXform', processdown.tapins.calcRenderXform).addTapin('calcLocalProjection', processdown.tapins.calcLocalProjection).addTapin('calcAbsoluteXform', processdown.tapins.calcAbsoluteXform).addTapin('calcAbsoluteProjection', processdown.tapins.calcAbsoluteProjection).addTapin('processXform', processdown.tapins.processXform).addTapin('processLayoutClip', processdown.tapins.processLayoutClip).addTapin('processZIndices', processdown.tapins.processZIndices);
                }
                ProcessDownPipeDef.prototype.createState = function () {
                    return {
                        xformOrigin: new minerva.Point(),
                        localXform: mat3.identity(),
                        renderAsProjection: mat4.identity()
                    };
                };

                ProcessDownPipeDef.prototype.createOutput = function () {
                    return {
                        totalIsRenderVisible: false,
                        totalOpacity: 1.0,
                        totalIsHitTestVisible: false,
                        z: NaN,
                        compositeLayoutClip: null,
                        renderXform: mat3.identity(),
                        absoluteXform: mat3.identity(),
                        localProjection: mat4.identity(),
                        absoluteProjection: mat4.identity(),
                        totalHasRenderProjection: false,
                        dirtyFlags: 0,
                        newUpDirty: 0
                    };
                };

                ProcessDownPipeDef.prototype.prepare = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & (minerva.DirtyFlags.LocalProjection | minerva.DirtyFlags.LocalTransform)) > 0) {
                        input.dirtyFlags |= minerva.DirtyFlags.Transform;
                    }
                    output.dirtyFlags = input.dirtyFlags;
                    output.totalIsRenderVisible = input.totalIsRenderVisible;
                    output.totalOpacity = input.totalOpacity;
                    output.totalIsHitTestVisible = input.totalIsHitTestVisible;
                    output.z = input.z;
                    minerva.Rect.copyTo(input.compositeLayoutClip, output.compositeLayoutClip);
                    mat3.set(input.renderXform, output.renderXform);
                    mat3.set(input.absoluteXform, output.absoluteXform);
                    mat4.set(input.localProjection, output.localProjection);
                    mat4.set(input.absoluteProjection, output.absoluteProjection);
                    output.totalHasRenderProjection = input.totalHasRenderProjection;
                };

                ProcessDownPipeDef.prototype.flush = function (input, state, output, vpinput) {
                    output.newUpDirty = (output.dirtyFlags & ~input.dirtyFlags) & minerva.DirtyFlags.UpDirtyState;
                    input.dirtyFlags = output.dirtyFlags & ~minerva.DirtyFlags.DownDirtyState;
                    input.totalIsRenderVisible = output.totalIsRenderVisible;
                    input.totalOpacity = output.totalOpacity;
                    input.totalIsHitTestVisible = output.totalIsHitTestVisible;
                    input.z = output.z;
                    minerva.Rect.copyTo(output.compositeLayoutClip, input.compositeLayoutClip);
                    mat3.set(output.renderXform, input.renderXform);
                    mat3.set(output.absoluteXform, input.absoluteXform);
                    mat4.set(output.localProjection, input.localProjection);
                    mat4.set(output.absoluteProjection, input.absoluteProjection);
                    input.totalHasRenderProjection = output.totalHasRenderProjection;
                };
                return ProcessDownPipeDef;
            })(minerva.pipe.TriPipeDef);
            processdown.ProcessDownPipeDef = ProcessDownPipeDef;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.calcAbsoluteProjection = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;

                    var abs = output.absoluteProjection;

                    if (vpinput)
                        mat4.multiply(output.localProjection, vpinput.absoluteProjection, abs);
                    else
                        mat4.set(output.localProjection, abs);

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.calcAbsoluteXform = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;

                    var abs = output.absoluteXform;

                    if (vpinput)
                        mat3.multiply(output.renderXform, vpinput.absoluteXform, abs);
                    else
                        mat3.set(output.renderXform, abs);

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.calcLocalProjection = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;

                    output.totalHasRenderProjection = vpinput ? vpinput.totalHasRenderProjection : false;

                    var lp = output.localProjection;
                    mat4.multiply(input.carrierProjection, state.renderAsProjection, lp);
                    var projection = input.projection;
                    if (projection) {
                        mat4.multiply(lp, input.projection.getTransform(), lp);
                        output.totalHasRenderProjection = true;
                    }

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.calcRenderXform = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;

                    var rx = output.renderXform;
                    mat3.set(input.carrierXform, rx);
                    mat3.multiply(rx, input.layoutXform, rx);
                    mat3.multiply(rx, state.localXform, rx);
                    mat3.toAffineMat4(rx, state.renderAsProjection);

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.calcXformOrigin = function (input, state, output, vpinput) {
                    var xo = state.xformOrigin;
                    var userxo = input.renderTransformOrigin;
                    if (!userxo) {
                        xo.x = 0;
                        xo.y = 0;
                    } else {
                        xo.x = input.actualWidth * userxo.x;
                        xo.y = input.actualHeight * userxo.y;
                    }
                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processHitTestVisibility = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.HitTestVisibility) === 0)
                        return true;

                    if (vpinput) {
                        output.totalIsHitTestVisible = vpinput.totalIsHitTestVisible && input.isHitTestVisible;
                    } else {
                        output.totalIsHitTestVisible = input.isHitTestVisible;
                    }

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processLayoutClip = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LayoutClip) === 0)
                        return true;

                    var lc = input.layoutClip;
                    var vpc = vpinput ? vpinput.compositeLayoutClip : null;
                    if (!lc) {
                        if (!vpc) {
                            output.compositeLayoutClip = null;
                        } else {
                            output.compositeLayoutClip = new minerva.Rect(vpc.x, vpc.y, vpc.width, vpc.height);
                        }
                    } else {
                        output.compositeLayoutClip = new minerva.Rect(lc.x, lc.y, lc.width, lc.height);
                        if (vpc)
                            minerva.Rect.intersection(output.compositeLayoutClip, vpc);
                    }

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processLocalProjection = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LocalProjection) === 0)
                        return true;

                    var projection = input.projection;
                    output.z = projection ? projection.getDistanceFromXYPlane(input.actualWidth, input.actualHeight) : NaN;

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processLocalXform = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.LocalTransform) === 0)
                        return true;

                    var local = mat3.identity(state.localXform);
                    var render = input.renderTransform;
                    if (!render)
                        return true;

                    var origin = state.xformOrigin;
                    mat3.translate(local, origin.x, origin.y);
                    mat3.multiply(local, render, local);
                    mat3.translate(local, -origin.x, -origin.y);

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processRenderVisibility = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.RenderVisibility) === 0)
                        return true;

                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;

                    if (vpinput) {
                        output.totalOpacity = vpinput.totalOpacity * input.opacity;
                        output.totalIsRenderVisible = vpinput.totalIsRenderVisible && (input.visibility === 0 /* Visible */);
                    } else {
                        output.totalOpacity = input.opacity;
                        output.totalIsRenderVisible = input.visibility === 0 /* Visible */;
                    }

                    if (input.totalIsRenderVisible !== output.totalIsRenderVisible)
                        output.dirtyFlags |= minerva.DirtyFlags.NewBounds;

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processXform = function (input, state, output, vpinput) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Transform) === 0)
                        return true;

                    if (!mat4.equal(input.localProjection, output.localProjection)) {
                        output.dirtyFlags |= minerva.DirtyFlags.NewBounds;
                    }

                    output.dirtyFlags |= minerva.DirtyFlags.Bounds;

                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.processZIndices = function (input, state, output, vpinput) {
                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processdown) {
            (function (tapins) {
                tapins.propagateDirtyToChildren = function (input, state, output, vpinput) {
                    return true;
                };
            })(processdown.tapins || (processdown.tapins = {}));
            var tapins = processdown.tapins;
        })(layout.processdown || (layout.processdown = {}));
        var processdown = layout.processdown;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            var ProcessUpPipeDef = (function (_super) {
                __extends(ProcessUpPipeDef, _super);
                function ProcessUpPipeDef() {
                    _super.call(this);
                    this.addTapin('calcActualSize', processup.tapins.calcActualSize).addTapin('calcExtents', processup.tapins.calcExtents).addTapin('calcPaintBounds', processup.tapins.calcPaintBounds).addTapin('processBounds', processup.tapins.processBounds).addTapin('processNewBounds', processup.tapins.processNewBounds).addTapin('processInvalidate', processup.tapins.processInvalidate);
                }
                ProcessUpPipeDef.prototype.createState = function () {
                    return {
                        invalidateSubtreePaint: false,
                        actualSize: new minerva.Size(),
                        hasNewBounds: false,
                        hasInvalidate: false
                    };
                };

                ProcessUpPipeDef.prototype.createOutput = function () {
                    return {
                        extents: new minerva.Rect(),
                        extentsWithChildren: new minerva.Rect(),
                        globalBoundsWithChildren: new minerva.Rect(),
                        surfaceBoundsWithChildren: new minerva.Rect(),
                        dirtyFlags: 0,
                        dirtyRegion: new minerva.Rect(),
                        forceInvalidate: false
                    };
                };

                ProcessUpPipeDef.prototype.prepare = function (input, state, output, vo) {
                    output.dirtyFlags = input.dirtyFlags;
                    minerva.Rect.copyTo(input.extents, output.extents);
                    minerva.Rect.copyTo(input.extentsWithChildren, output.extentsWithChildren);
                    minerva.Rect.copyTo(input.globalBoundsWithChildren, output.globalBoundsWithChildren);
                    minerva.Rect.copyTo(input.surfaceBoundsWithChildren, output.surfaceBoundsWithChildren);
                    minerva.Rect.copyTo(input.dirtyRegion, output.dirtyRegion);
                    output.forceInvalidate = input.forceInvalidate;
                };

                ProcessUpPipeDef.prototype.flush = function (input, state, output, vo) {
                    input.dirtyFlags = output.dirtyFlags & ~minerva.DirtyFlags.UpDirtyState;
                    minerva.Rect.copyTo(output.extents, input.extents);
                    minerva.Rect.copyTo(output.extentsWithChildren, input.extentsWithChildren);
                    minerva.Rect.copyTo(output.globalBoundsWithChildren, input.globalBoundsWithChildren);
                    minerva.Rect.copyTo(output.surfaceBoundsWithChildren, input.surfaceBoundsWithChildren);
                    minerva.Rect.copyTo(output.dirtyRegion, input.dirtyRegion);
                    input.forceInvalidate = output.forceInvalidate;
                };
                return ProcessUpPipeDef;
            })(minerva.pipe.TriPipeDef);
            processup.ProcessUpPipeDef = ProcessUpPipeDef;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.calcActualSize = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;

                    var as = state.actualSize;
                    as.width = input.actualWidth;
                    as.height = input.actualHeight;
                    layout.helpers.coerceSize(as, input);
                    if (isNaN(as.width))
                        as.width = 0;
                    if (isNaN(as.height))
                        as.height = 0;

                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.calcExtents = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;

                    var e = output.extents;
                    var ewc = output.extentsWithChildren;
                    e.x = ewc.x = 0;
                    e.y = ewc.y = 0;
                    var as = state.actualSize;
                    e.width = ewc.width = as.width;
                    e.height = ewc.height = as.height;

                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.calcPaintBounds = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;

                    layout.helpers.copyGrowTransform4(output.globalBoundsWithChildren, input.extentsWithChildren, input.effectPadding, input.localProjection);
                    layout.helpers.copyGrowTransform4(output.surfaceBoundsWithChildren, input.extentsWithChildren, input.effectPadding, input.absoluteProjection);

                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.processBounds = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Bounds) === 0)
                        return true;
                    state.hasNewBounds = false;
                    if (!minerva.Rect.isEqual(input.globalBoundsWithChildren, output.globalBoundsWithChildren)) {
                        vo.updateBounds();
                        vo.invalidate(input.surfaceBoundsWithChildren);
                        state.hasNewBounds = true;
                    } else if (!minerva.Rect.isEqual(input.extentsWithChildren, output.extentsWithChildren) || input.forceInvalidate) {
                        state.hasNewBounds = true;
                    }
                    output.forceInvalidate = false;
                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.processInvalidate = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.Invalidate) === 0 && !state.hasInvalidate)
                        return true;
                    var dirty = output.dirtyRegion;
                    vo.invalidate(dirty);
                    dirty.x = dirty.y = dirty.width = dirty.height = 0;
                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (processup) {
            (function (tapins) {
                tapins.processNewBounds = function (input, state, output, vo) {
                    if ((input.dirtyFlags & minerva.DirtyFlags.NewBounds) === 0 && !state.hasNewBounds)
                        return true;
                    output.dirtyFlags |= minerva.DirtyFlags.Invalidate;
                    state.hasInvalidate = true;
                    minerva.Rect.union(output.dirtyRegion, output.surfaceBoundsWithChildren);
                    return true;
                };
            })(processup.tapins || (processup.tapins = {}));
            var tapins = processup.tapins;
        })(layout.processup || (layout.processup = {}));
        var processup = layout.processup;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            var ARC_TO_BEZIER = 0.55228475;
            var caps = [
                "butt",
                "square",
                "round",
                "butt"
            ];
            var joins = [
                "miter",
                "bevel",
                "round"
            ];
            var RenderContext = (function () {
                function RenderContext(ctx) {
                    this.$$transforms = [];
                    this.currentTransform = mat3.identity();
                    Object.defineProperty(this, 'raw', { value: ctx, writable: false });
                    Object.defineProperty(this, 'currentTransform', { value: mat3.identity(), writable: false });
                    Object.defineProperty(this, 'hasFillRule', { value: RenderContext.hasFillRule, writable: false });
                }
                Object.defineProperty(RenderContext, "hasFillRule", {
                    get: function () {
                        if (navigator.appName === "Microsoft Internet Explorer") {
                            var version = getIEVersion();
                            return version < 0 || version > 10;
                        }
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });

                RenderContext.prototype.save = function () {
                    this.$$transforms.push(mat3.clone(this.currentTransform));
                    this.raw.save();
                };

                RenderContext.prototype.restore = function () {
                    var old = this.$$transforms.pop();
                    if (old)
                        mat3.set(old, this.currentTransform);
                    this.raw.restore();
                };

                RenderContext.prototype.setTransform = function (m11, m12, m21, m22, dx, dy) {
                    mat3.set([m11, m12, dx, m21, m22, dy, 0, 0, 1], this.currentTransform);
                    this.raw.setTransform(m11, m12, m21, m22, dx, dy);
                };

                RenderContext.prototype.resetTransform = function () {
                    mat3.identity(this.currentTransform);
                    var raw = this.raw;
                    if (raw.resetTransform)
                        raw.resetTransform();
                };

                RenderContext.prototype.transform = function (m11, m12, m21, m22, dx, dy) {
                    var ct = this.currentTransform;
                    mat3.multiply(ct, mat3.create([m11, m12, dx, m21, m22, dy, 0, 0, 1]), ct);
                    this.raw.transform(m11, m12, m21, m22, dx, dy);
                };

                RenderContext.prototype.scale = function (x, y) {
                    mat3.scale(this.currentTransform, x, y);
                    this.raw.scale(x, y);
                };

                RenderContext.prototype.rotate = function (angle) {
                    var ct = this.currentTransform;
                    var r = mat3.createRotate(angle);
                    mat3.multiply(ct, r, ct);
                    this.raw.rotate(angle);
                };

                RenderContext.prototype.translate = function (x, y) {
                    mat3.translate(this.currentTransform, x, y);
                    this.raw.translate(x, y);
                };

                RenderContext.prototype.transformMatrix = function (mat) {
                    var ct = this.currentTransform;
                    mat3.multiply(ct, mat, ct);
                    this.raw.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
                };

                RenderContext.prototype.pretransformMatrix = function (mat) {
                    var ct = this.currentTransform;
                    mat3.multiply(mat, ct, ct);
                    this.raw.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
                };

                RenderContext.prototype.clipGeometry = function (geom) {
                    geom.Draw(this);
                    this.raw.clip();
                };

                RenderContext.prototype.clipRect = function (rect) {
                    var raw = this.raw;
                    raw.beginPath();
                    raw.rect(rect.x, rect.y, rect.width, rect.height);
                    raw.clip();
                };

                RenderContext.prototype.fillEx = function (brush, region, fillRule) {
                    var raw = this.raw;
                    brush.setupBrush(raw, region);
                    raw.fillStyle = brush.toHtml5Object();
                    if (!fillRule)
                        return raw.fill();
                    var fr = fillRule === 0 /* EvenOdd */ ? "evenodd" : "nonzero";
                    raw.fillRule = raw.msFillRule = fr;
                    raw.fill(fr);
                };

                RenderContext.prototype.drawRectEx = function (extents, cr) {
                    var raw = this.raw;
                    if (!cr || minerva.CornerRadius.isEmpty(cr)) {
                        raw.rect(extents.x, extents.y, extents.width, extents.height);
                        return;
                    }

                    var top_adj = Math.max(cr.topLeft + cr.topRight - extents.width, 0) / 2;
                    var bottom_adj = Math.max(cr.bottomLeft + cr.bottomRight - extents.width, 0) / 2;
                    var left_adj = Math.max(cr.topLeft + cr.bottomLeft - extents.height, 0) / 2;
                    var right_adj = Math.max(cr.topRight + cr.bottomRight - extents.height, 0) / 2;

                    var tlt = cr.topLeft - top_adj;
                    raw.moveTo(extents.x + tlt, extents.y);

                    var trt = cr.topRight - top_adj;
                    var trr = cr.topRight - right_adj;
                    raw.lineTo(extents.x + extents.width - trt, extents.y);
                    raw.bezierCurveTo(extents.x + extents.width - trt + trt * ARC_TO_BEZIER, extents.y, extents.x + extents.width, extents.y + trr - trr * ARC_TO_BEZIER, extents.x + extents.width, extents.y + trr);

                    var brr = cr.bottomRight - right_adj;
                    var brb = cr.bottomRight - bottom_adj;
                    raw.lineTo(extents.x + extents.width, extents.y + extents.height - brr);
                    raw.bezierCurveTo(extents.x + extents.width, extents.y + extents.height - brr + brr * ARC_TO_BEZIER, extents.x + extents.width + brb * ARC_TO_BEZIER - brb, extents.y + extents.height, extents.x + extents.width - brb, extents.y + extents.height);

                    var blb = cr.bottomLeft - bottom_adj;
                    var bll = cr.bottomLeft - left_adj;
                    raw.lineTo(extents.x + blb, extents.y + extents.height);
                    raw.bezierCurveTo(extents.x + blb - blb * ARC_TO_BEZIER, extents.y + extents.height, extents.x, extents.y + extents.height - bll + bll * ARC_TO_BEZIER, extents.x, extents.y + extents.height - bll);

                    var tll = cr.topLeft - left_adj;
                    raw.lineTo(extents.x, extents.y + tll);
                    raw.bezierCurveTo(extents.x, extents.y + tll - tll * ARC_TO_BEZIER, extents.x + tlt - tlt * ARC_TO_BEZIER, extents.y, extents.x + tlt, extents.y);
                };

                RenderContext.prototype.setupStroke = function (pars) {
                    if (!pars || !(pars.thickness > 0))
                        return false;
                    var raw = this.raw;
                    raw.lineWidth = pars.thickness;
                    raw.lineCap = caps[pars.startCap || pars.endCap || 0] || caps[0];
                    raw.lineJoin = joins[pars.join || 0] || joins[0];
                    raw.miterLimit = pars.miterLimit;
                    return true;
                };

                RenderContext.prototype.strokeEx = function (brush, pars, region) {
                    if (!region || !this.setupStroke(pars))
                        return;
                    var raw = this.raw;
                    brush.setupBrush(raw, region);
                    raw.strokeStyle = brush.toHtml5Object();
                    raw.stroke();
                };
                return RenderContext;
            })();
            render.RenderContext = RenderContext;

            function getIEVersion() {
                var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
                if (re.exec(navigator.userAgent) != null)
                    return parseFloat(RegExp.$1);
                return -1;
            }
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            var RenderPipeDef = (function (_super) {
                __extends(RenderPipeDef, _super);
                function RenderPipeDef() {
                    _super.call(this);
                    this.addTapin('validate', render.tapins.validate).addTapin('validateRegion', render.tapins.validateRegion).addTapin('prepareContext', render.tapins.prepareContext).addTapin('applyClip', render.tapins.applyClip).addTapin('preRender', render.tapins.preRender).addTapin('doRender', render.tapins.doRender).addTapin('postRender', render.tapins.postRender).addTapin('renderChildren', render.tapins.renderChildren).addTapin('restoreContext', render.tapins.restoreContext);
                }
                RenderPipeDef.prototype.createState = function () {
                    return {
                        renderRegion: new minerva.Rect()
                    };
                };

                RenderPipeDef.prototype.createOutput = function () {
                    return {};
                };
                return RenderPipeDef;
            })(minerva.pipe.TriPipeDef);
            render.RenderPipeDef = RenderPipeDef;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.applyClip = function (input, state, output, ctx, region, tree) {
                    var clip = input.clip;
                    if (clip)
                        ctx.clipGeometry(clip);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.doRender = function (input, state, output, ctx, region, tree) {
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.postRender = function (input, state, output, ctx, region, tree) {
                    var effect = input.effect;
                    if (!effect)
                        return true;
                    effect.PostRender(ctx);
                    ctx.restore();
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.preRender = function (input, state, output, ctx, region, tree) {
                    var effect = input.effect;
                    if (!effect)
                        return true;
                    ctx.save();
                    effect.PreRender(ctx);
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.prepareContext = function (input, state, output, ctx, region, tree) {
                    ctx.save();
                    ctx.pretransformMatrix(input.renderXform);
                    ctx.raw.globalAlpha = input.totalOpacity;
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.renderChildren = function (input, state, output, ctx, region, tree) {
                    for (var walker = tree.walk(2 /* ZForward */); walker.step();) {
                        walker.current.render(ctx, state.renderRegion);
                    }
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.restoreContext = function (input, state, output, ctx, region, tree) {
                    ctx.restore();
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.validate = function (input, state, output, ctx, region, tree) {
                    if (!input.totalIsRenderVisible)
                        return false;
                    if ((input.totalOpacity * 255) < 0.5)
                        return false;
                    return true;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (render) {
            (function (tapins) {
                tapins.validateRegion = function (input, state, output, ctx, region, tree) {
                    var r = state.renderRegion;
                    minerva.Rect.copyTo(input.surfaceBoundsWithChildren, r);
                    minerva.Rect.roundOut(r);
                    minerva.Rect.intersection(r, region);
                    return r.width > 0 && r.height > 0;
                };
            })(render.tapins || (render.tapins = {}));
            var tapins = render.tapins;
        })(layout.render || (layout.render = {}));
        var render = layout.render;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (sizing) {
            var SizingPipeDef = (function (_super) {
                __extends(SizingPipeDef, _super);
                function SizingPipeDef() {
                    _super.call(this);
                    this.addTapin('calcUseRender', sizing.tapins.calcUseRender).addTapin('computeActual', sizing.tapins.computeActual);
                }
                SizingPipeDef.prototype.createState = function () {
                    return {
                        useRender: false
                    };
                };

                SizingPipeDef.prototype.createOutput = function () {
                    return {
                        actualSize: new minerva.Size()
                    };
                };

                SizingPipeDef.prototype.prepare = function (input, state, output, tree) {
                };

                SizingPipeDef.prototype.flush = function (input, state, output, tree) {
                    var as = output.actualSize;
                    input.actualWidth = as.width;
                    input.actualHeight = as.height;
                };
                return SizingPipeDef;
            })(minerva.pipe.TriPipeDef);
            sizing.SizingPipeDef = SizingPipeDef;
        })(layout.sizing || (layout.sizing = {}));
        var sizing = layout.sizing;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (sizing) {
            (function (tapins) {
                tapins.calcUseRender = function (input, state, output, tree) {
                    state.useRender = true;
                    return true;
                };
            })(sizing.tapins || (sizing.tapins = {}));
            var tapins = sizing.tapins;
        })(layout.sizing || (layout.sizing = {}));
        var sizing = layout.sizing;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (layout) {
        (function (sizing) {
            (function (tapins) {
                tapins.computeActual = function (input, state, output, tree) {
                    var as = output.actualSize;
                    as.width = as.height = 0;
                    if (input.visibility !== 0 /* Visible */) {
                        return true;
                    }

                    if (state.useRender) {
                        minerva.Size.copyTo(input.renderSize, as);
                        return true;
                    }

                    layout.helpers.coerceSize(as, input);
                    return true;
                };
            })(sizing.tapins || (sizing.tapins = {}));
            var tapins = sizing.tapins;
        })(layout.sizing || (layout.sizing = {}));
        var sizing = layout.sizing;
    })(minerva.layout || (minerva.layout = {}));
    var layout = minerva.layout;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (arrange) {
                var ArrangePipeDef = (function (_super) {
                    __extends(ArrangePipeDef, _super);
                    function ArrangePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', preOverride).replaceTapin('doOverride', doOverride);
                    }
                    ArrangePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        state.childRect = new minerva.Rect();
                        return state;
                    };
                    return ArrangePipeDef;
                })(minerva.layout.arrange.ArrangePipeDef);
                arrange.ArrangePipeDef = ArrangePipeDef;

                function preOverride(input, state, output, tree, finalRect) {
                    if (!tree.child)
                        return true;
                    var tb = state.totalBorder;
                    minerva.Thickness.copyTo(input.padding, tb);
                    minerva.Thickness.add(tb, input.borderThickness);

                    var cr = state.childRect;
                    cr.x = cr.y = 0;
                    minerva.Size.copyTo(state.finalSize, cr);
                    minerva.Thickness.shrinkSize(tb, cr);
                    return true;
                }
                arrange.preOverride = preOverride;

                function doOverride(input, state, output, tree, finalRect) {
                    if (tree.child)
                        tree.child.arrange(state.childRect);
                    return true;
                }
                arrange.doOverride = doOverride;
            })(border.arrange || (border.arrange = {}));
            var arrange = border.arrange;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            var BorderTree = (function (_super) {
                __extends(BorderTree, _super);
                function BorderTree() {
                    _super.apply(this, arguments);
                    this.isLayoutContainer = true;
                    this.isContainer = true;
                    this.child = undefined;
                }
                BorderTree.prototype.walk = function (direction) {
                    var visited = false;
                    var _this = this;
                    return {
                        current: undefined,
                        step: function () {
                            this.current = !visited ? _this.child : undefined;
                            visited = true;
                            return this.current !== undefined;
                        }
                    };
                };
                return BorderTree;
            })(minerva.layout.UpdaterTree);
            border.BorderTree = BorderTree;

            var BorderUpdater = (function (_super) {
                __extends(BorderUpdater, _super);
                function BorderUpdater() {
                    _super.call(this);
                    this.setTree(new BorderTree()).setProcessDownPipe().setProcessUpPipe().setMeasurePipe(minerva.singleton(border.measure.MeasurePipeDef)).setArrangePipe(minerva.singleton(border.arrange.ArrangePipeDef)).setRenderPipe(minerva.singleton(minerva.layout.render.RenderContext.hasFillRule ? border.render.RenderPipeDef : border.render.ShimRenderPipeDef));

                    var assets = this.assets;
                    assets.padding = new minerva.Thickness();
                    assets.borderThickness = new minerva.Thickness();
                }
                return BorderUpdater;
            })(minerva.layout.Updater);
            border.BorderUpdater = BorderUpdater;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (measure) {
                var MeasurePipeDef = (function (_super) {
                    __extends(MeasurePipeDef, _super);
                    function MeasurePipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doOverride', 'preOverride', preOverride).replaceTapin('doOverride', doOverride).addTapinAfter('doOverride', 'postOverride', postOverride);
                    }
                    MeasurePipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.totalBorder = new minerva.Thickness();
                        return state;
                    };
                    return MeasurePipeDef;
                })(minerva.layout.measure.MeasurePipeDef);
                measure.MeasurePipeDef = MeasurePipeDef;

                function preOverride(input, state, output, tree, availableSize) {
                    var tb = state.totalBorder;
                    minerva.Thickness.copyTo(input.padding, tb);
                    minerva.Thickness.add(tb, input.borderThickness);
                    minerva.Thickness.shrinkSize(tb, state.availableSize);
                    return true;
                }
                measure.preOverride = preOverride;

                function doOverride(input, state, output, tree, availableSize) {
                    var ds = output.desiredSize;
                    if (tree.child) {
                        tree.child.measure(state.availableSize);
                        minerva.Size.copyTo(tree.child.assets.desiredSize, ds);
                    }
                    return true;
                }
                measure.doOverride = doOverride;

                function postOverride(input, state, output, tree, availableSize) {
                    minerva.Thickness.growSize(state.totalBorder, output.desiredSize);
                    minerva.Size.min(output.desiredSize, state.availableSize);
                    return true;
                }
                measure.postOverride = postOverride;
            })(border.measure || (border.measure = {}));
            var measure = border.measure;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                var RenderPipeDef = (function (_super) {
                    __extends(RenderPipeDef, _super);
                    function RenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcShouldRender', render.tapins.calcShouldRender).addTapinBefore('doRender', 'calcInnerOuter', render.tapins.calcInnerOuter).replaceTapin('doRender', render.tapins.doRender);
                    }
                    RenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.fillExtents = new minerva.Rect();
                        state.innerCornerRadius = new minerva.CornerRadius();
                        state.outerCornerRadius = new minerva.CornerRadius();
                        return state;
                    };
                    return RenderPipeDef;
                })(minerva.layout.render.RenderPipeDef);
                render.RenderPipeDef = RenderPipeDef;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                var ShimRenderPipeDef = (function (_super) {
                    __extends(ShimRenderPipeDef, _super);
                    function ShimRenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcBalanced', render.tapins.shim.calcBalanced).addTapinBefore('doRender', 'invalidatePattern', render.tapins.shim.invalidatePattern).addTapinBefore('doRender', 'createPattern', render.tapins.shim.createPattern).replaceTapin('doRender', render.tapins.shim.doRender);
                    }
                    ShimRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.middleCornerRadius = new minerva.CornerRadius();
                        state.strokeExtents = new minerva.Rect();
                        state.pattern = null;
                        state.oldMetrics = null;
                        return state;
                    };
                    return ShimRenderPipeDef;
                })(render.RenderPipeDef);
                render.ShimRenderPipeDef = ShimRenderPipeDef;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    function calcInnerOuter(input, state, output, ctx, region, tree) {
                        if (!state.shouldRender)
                            return true;

                        minerva.Rect.copyTo(input.extents, state.fillExtents);

                        var bt = input.borderThickness;
                        minerva.Thickness.shrinkRect(bt, state.fillExtents);

                        var ia = state.innerCornerRadius;
                        minerva.CornerRadius.copyTo(input.cornerRadius, ia);
                        minerva.Thickness.shrinkCornerRadius(bt, ia);

                        var oa = state.outerCornerRadius;
                        minerva.CornerRadius.copyTo(input.cornerRadius, oa);
                        minerva.Thickness.growCornerRadius(bt, oa);

                        return true;
                    }
                    tapins.calcInnerOuter = calcInnerOuter;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    function calcShouldRender(input, state, output, ctx, region, tree) {
                        state.shouldRender = false;
                        if (!input.backgroundBrush && !input.borderBrush)
                            return true;
                        if (minerva.Rect.isEmpty(input.extents))
                            return true;
                        var fillOnly = !input.borderBrush || !input.borderThickness || minerva.Thickness.isEmpty(input.borderThickness);
                        if (fillOnly && !input.backgroundBrush)
                            return true;
                        state.shouldRender = true;
                        return true;
                    }
                    tapins.calcShouldRender = calcShouldRender;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    function doRender(input, state, output, ctx, region, tree) {
                        if (!state.shouldRender)
                            return true;
                        ctx.save();

                        var borderBrush = input.borderBrush;
                        var extents = input.extents;
                        var fillExtents = state.fillExtents;
                        var raw = ctx.raw;
                        if (borderBrush && !minerva.Rect.isEmpty(extents)) {
                            raw.beginPath();
                            ctx.drawRectEx(extents, state.outerCornerRadius);
                            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
                            ctx.fillEx(borderBrush, extents, 0 /* EvenOdd */);
                        }
                        var backgroundBrush = input.backgroundBrush;
                        if (backgroundBrush && !minerva.Rect.isEmpty(fillExtents)) {
                            raw.beginPath();
                            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
                            ctx.fillEx(backgroundBrush, fillExtents);
                        }

                        ctx.restore();
                        return true;
                    }
                    tapins.doRender = doRender;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    (function (shim) {
                        function calcBalanced(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender || minerva.Thickness.isEmpty(input.borderThickness))
                                return true;

                            if (minerva.Thickness.isBalanced(input.borderThickness)) {
                                var icr = state.innerCornerRadius;
                                var ocr = state.outerCornerRadius;
                                var mcr = state.middleCornerRadius;
                                mcr.topLeft = (icr.topLeft + ocr.topLeft) / 2.0;
                                mcr.topRight = (icr.topRight + ocr.topRight) / 2.0;
                                mcr.bottomRight = (icr.bottomRight + ocr.bottomRight) / 2.0;
                                mcr.bottomLeft = (icr.bottomLeft + ocr.bottomLeft) / 2.0;
                                minerva.Rect.copyTo(input.extents, state.strokeExtents);
                                var bt = input.borderThickness;
                                minerva.Rect.shrink(state.strokeExtents, bt.left / 2.0, bt.top / 2.0, bt.right / 2.0, bt.bottom / 2.0);
                            }

                            return true;
                        }
                        shim.calcBalanced = calcBalanced;
                    })(tapins.shim || (tapins.shim = {}));
                    var shim = tapins.shim;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    (function (shim) {
                        function createPattern(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender || minerva.Thickness.isBalanced(input.borderThickness))
                                return true;

                            if (!state.pattern) {
                                state.pattern = createBorderPattern(input.borderBrush, input.extents, state.fillExtents, state.outerCornerRadius, state.innerCornerRadius);
                            }

                            return true;
                        }
                        shim.createPattern = createPattern;

                        var tempCtx;

                        function createBorderPattern(borderBrush, extents, fillExtents, oa, ia) {
                            tempCtx = tempCtx || new minerva.layout.render.RenderContext(document.createElement('canvas').getContext('2d'));
                            var raw = tempCtx.raw;
                            minerva.Size.copyTo(extents, raw.canvas);
                            raw.beginPath();
                            tempCtx.drawRectEx(extents, oa);
                            tempCtx.fillEx(borderBrush, extents);
                            raw.globalCompositeOperation = "xor";
                            raw.beginPath();
                            tempCtx.drawRectEx(fillExtents, ia);
                            raw.fill();
                            return raw.createPattern(raw.canvas, "no-repeat");
                        }
                    })(tapins.shim || (tapins.shim = {}));
                    var shim = tapins.shim;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    (function (shim) {
                        function doRender(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender)
                                return true;
                            ctx.save();

                            var raw = ctx.raw;
                            if (minerva.Thickness.isBalanced(input.borderThickness)) {
                                raw.beginPath();
                                ctx.drawRectEx(state.strokeExtents, state.middleCornerRadius);
                                ctx.strokeEx(input.borderBrush, { thickness: input.borderThickness.left, endCap: 0, startCap: 0, miterLimit: 0, join: 0 }, state.strokeExtents);
                            } else {
                                raw.beginPath();
                                raw.fillStyle = state.pattern;
                                ctx.drawRectEx(input.extents, state.outerCornerRadius);
                                raw.fill();
                            }

                            ctx.restore();
                            return true;
                        }
                        shim.doRender = doRender;
                    })(tapins.shim || (tapins.shim = {}));
                    var shim = tapins.shim;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (controls) {
        (function (border) {
            (function (render) {
                (function (tapins) {
                    (function (shim) {
                        function invalidatePattern(input, state, output, ctx, region, tree) {
                            if (!state.shouldRender)
                                return true;

                            if (minerva.Thickness.isEmpty(input.borderThickness)) {
                                state.pattern = null;
                                return true;
                            }

                            if (!state.oldMetrics) {
                                state.oldMetrics = {};
                                setOldMetrics(input, state, state.oldMetrics);
                                state.pattern = null;
                                return true;
                            }

                            if (didMetricsChange(input, state, state.oldMetrics))
                                state.pattern = null;

                            setOldMetrics(input, state, state.oldMetrics);
                            return true;
                        }
                        shim.invalidatePattern = invalidatePattern;

                        function setOldMetrics(input, state, metrics) {
                            metrics.borderBrush = input.borderBrush;
                            metrics.borderThickness = input.borderThickness;
                            metrics.extents = input.extents;
                            metrics.fillExtents = state.fillExtents;
                            metrics.outerCornerRadius = state.outerCornerRadius;
                            metrics.innerCornerRadius = state.innerCornerRadius;
                        }

                        function didMetricsChange(input, state, metrics) {
                            return metrics.borderBrush !== input.borderBrush || !minerva.Rect.isEqual(metrics.extents, input.extents) || !minerva.Rect.isEqual(metrics.fillExtents, state.fillExtents) || !minerva.CornerRadius.isEqual(metrics.outerCornerRadius, state.outerCornerRadius) || !minerva.CornerRadius.isEqual(metrics.innerCornerRadius, state.innerCornerRadius);
                        }
                    })(tapins.shim || (tapins.shim = {}));
                    var shim = tapins.shim;
                })(render.tapins || (render.tapins = {}));
                var tapins = render.tapins;
            })(border.render || (border.render = {}));
            var render = border.render;
        })(controls.border || (controls.border = {}));
        var border = controls.border;
    })(minerva.controls || (minerva.controls = {}));
    var controls = minerva.controls;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (engine) {
        var Surface = (function () {
            function Surface() {
                this.$$layout = new minerva.layout.draft.DraftPipeDef();
                this.$$canvas = null;
                this.$$ctx = null;
                this.$$layers = [];
                this.$$downDirty = [];
                this.$$upDirty = [];
                this.$$dirtyRegion = null;
            }
            Object.defineProperty(Surface.prototype, "width", {
                get: function () {
                    return this.$$canvas.offsetWidth;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Surface.prototype, "height", {
                get: function () {
                    return this.$$canvas.offsetHeight;
                },
                enumerable: true,
                configurable: true
            });

            Surface.prototype.updateBounds = function () {
            };

            Surface.prototype.invalidate = function (region) {
                region = region || new minerva.Rect(0, 0, this.$$canvas.offsetWidth, this.$$canvas.offsetHeight);
                if (!this.$$dirtyRegion)
                    this.$$dirtyRegion = new minerva.Rect(region.x, region.y, region.width, region.height);
                else
                    minerva.Rect.union(this.$$dirtyRegion, region);
            };

            Surface.prototype.render = function () {
                var region = this.$$dirtyRegion;
                if (!region || minerva.Rect.isEmpty(region))
                    return;
                this.$$dirtyRegion = null;
                minerva.Rect.roundOut(region);

                var ctx = this.$$ctx;
                ctx.raw.clearRect(region.x, region.y, region.width, region.height);
                ctx.save();
                ctx.clipRect(region);
                for (var layers = this.$$layers, i = 0, len = layers.length; i < len; i++) {
                    layers[i].render(ctx, region);
                }
                ctx.restore();
            };

            Surface.prototype.addUpDirty = function (updater) {
                this.$$upDirty.push(updater);
            };

            Surface.prototype.addDownDirty = function (updater) {
                this.$$downDirty.push(updater);
            };

            Surface.prototype.updateLayout = function () {
                var pass = {
                    count: 0,
                    maxCount: 250,
                    updater: null,
                    assets: null,
                    tree: null,
                    flag: 0 /* None */,
                    measureList: [],
                    arrangeList: [],
                    sizingList: [],
                    surfaceSize: new minerva.Size(this.$$canvas.offsetWidth, this.$$canvas.offsetHeight),
                    sizingUpdates: []
                };
                var updated = false;
                var layersUpdated = true;
                while (pass.count < pass.maxCount && layersUpdated) {
                    layersUpdated = engine.draft(this.$$layers, this.$$layout, pass);
                    updated = engine.process(this.$$downDirty, this.$$upDirty) || layersUpdated || updated;
                }

                if (pass.count >= pass.maxCount) {
                    console.error("[MINERVA] Aborting infinite update loop");
                }

                return updated;
            };
            return Surface;
        })();
        engine.Surface = Surface;
    })(minerva.engine || (minerva.engine = {}));
    var engine = minerva.engine;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (engine) {
        function draft(layers, draftPipe, pass) {
            var updated = false;
            for (var i = 0, len = layers.length; i < len; i++) {
                pass.updater = layers[i];
                if ((pass.updater.assets.uiFlags & minerva.UIFlags.Hints) === 0)
                    continue;
                pass.tree = pass.updater.tree;
                pass.assets = pass.updater.assets;
                while (pass.count < pass.maxCount) {
                    if (draftPipe.run(pass))
                        updated = true;
                    pass.count++;
                }
            }
            return updated;
        }
        engine.draft = draft;
    })(minerva.engine || (minerva.engine = {}));
    var engine = minerva.engine;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (engine) {
        function process(down, up) {
            var updated = down.length > 0 || up.length > 0;
            processDown(down);
            processUp(up);
            return updated;
        }
        engine.process = process;

        function processDown(list) {
            for (var updater = list[0]; updater != null;) {
                if (updater.processDown()) {
                    list.shift();
                } else {
                    list.push(list.shift());
                }
            }
            if (list.length > 0) {
                console.warn("[MINERVA] Finished DownDirty pass, not empty.");
            }
        }

        function processUp(list) {
            for (var updater = list[0]; updater != null;) {
                var childIndex = updater.findChildInList(list);
                if (childIndex > -1) {
                    list.splice(childIndex + 1, 0, list.shift());
                } else if (updater.processUp()) {
                    list.shift();
                }
            }
            if (list.length > 0) {
                console.warn("[MINERVA] Finished UpDirty pass, not empty.");
            }
        }
    })(minerva.engine || (minerva.engine = {}));
    var engine = minerva.engine;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (shapes) {
        (function (shape) {
            (function (arrange) {
                var ShapeArrangePipeDef = (function (_super) {
                    __extends(ShapeArrangePipeDef, _super);
                    function ShapeArrangePipeDef() {
                        _super.call(this);
                    }
                    return ShapeArrangePipeDef;
                })(minerva.layout.arrange.ArrangePipeDef);
                arrange.ShapeArrangePipeDef = ShapeArrangePipeDef;
            })(shape.arrange || (shape.arrange = {}));
            var arrange = shape.arrange;
        })(shapes.shape || (shapes.shape = {}));
        var shape = shapes.shape;
    })(minerva.shapes || (minerva.shapes = {}));
    var shapes = minerva.shapes;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (shapes) {
        (function (shape) {
            (function (measure) {
                var ShapeMeasurePipeDef = (function (_super) {
                    __extends(ShapeMeasurePipeDef, _super);
                    function ShapeMeasurePipeDef() {
                        _super.call(this);
                    }
                    return ShapeMeasurePipeDef;
                })(minerva.layout.measure.MeasurePipeDef);
                measure.ShapeMeasurePipeDef = ShapeMeasurePipeDef;
            })(shape.measure || (shape.measure = {}));
            var measure = shape.measure;
        })(shapes.shape || (shapes.shape = {}));
        var shape = shapes.shape;
    })(minerva.shapes || (minerva.shapes = {}));
    var shapes = minerva.shapes;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (shapes) {
        (function (shape) {
            (function (render) {
                var ShapeRenderPipeDef = (function (_super) {
                    __extends(ShapeRenderPipeDef, _super);
                    function ShapeRenderPipeDef() {
                        _super.call(this);
                        this.addTapinBefore('doRender', 'calcShouldDraw', calcShouldDraw).addTapinBefore('doRender', 'buildPath', buildPath).addTapinBefore('doRender', 'buildStroke', buildStroke).addTapinBefore('doRender', 'prepareDraw', prepareDraw).replaceTapin('doRender', draw).addTapinAfter('doRender', 'finishDraw', finishDraw);
                    }
                    ShapeRenderPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.shouldDraw = false;
                        state.strokePars = {
                            thickness: 0,
                            startCap: 0 /* Flat */,
                            endCap: 0 /* Flat */,
                            join: 0 /* Miter */,
                            miterLimit: 10
                        };
                        return state;
                    };

                    ShapeRenderPipeDef.prototype.createOutput = function () {
                        var output = _super.prototype.createOutput.call(this);
                        output.path = null;
                        return output;
                    };

                    ShapeRenderPipeDef.prototype.prepare = function (input, state, output, ctx, region) {
                        output.path = input.path;
                    };

                    ShapeRenderPipeDef.prototype.flush = function (input, state, output, ctx, region) {
                        input.path = output.path;
                    };
                    return ShapeRenderPipeDef;
                })(minerva.layout.render.RenderPipeDef);
                render.ShapeRenderPipeDef = ShapeRenderPipeDef;

                function calcShouldDraw(input, state, output, ctx, region) {
                    state.shouldDraw = false;
                    if ((input.shapeFlags & 1 /* Empty */) === 0)
                        return true;
                    if (!input.fill && !input.stroke)
                        return true;
                    state.shouldDraw = true;
                    return true;
                }

                function buildPath(input, state, output, ctx, region) {
                    if (!state.shouldDraw)
                        return true;
                    return true;
                }

                function buildStroke(input, state, output, ctx, region) {
                    if (!state.shouldDraw)
                        return true;
                    var sp = state.strokePars;
                    sp.thickness = !input.stroke ? 0.0 : input.strokeThickness;
                    sp.startCap = input.strokeStartLineCap;
                    sp.endCap = input.strokeEndLineCap;
                    sp.join = input.strokeLineJoin;
                    sp.miterLimit = input.strokeMiterLimit;
                    return true;
                }

                function prepareDraw(input, state, output, ctx, region) {
                    if (!state.shouldDraw)
                        return true;
                    ctx.save();
                    ctx.pretransformMatrix(input.stretchXform);
                }

                function draw(input, state, output, ctx, region) {
                    if (!state.shouldDraw)
                        return true;
                    if (output.path)
                        output.path.draw(ctx);
                    if (input.fill)
                        ctx.fillEx(input.fill, input.extents, input.fillRule);
                    ctx.strokeEx(input.stroke, state.strokePars, input.extents);
                }

                function finishDraw(input, state, output, ctx, region) {
                    if (!state.shouldDraw)
                        return true;
                    ctx.restore();
                }
            })(shape.render || (shape.render = {}));
            var render = shape.render;
        })(shapes.shape || (shapes.shape = {}));
        var shape = shapes.shape;
    })(minerva.shapes || (minerva.shapes = {}));
    var shapes = minerva.shapes;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (shapes) {
        (function (shape) {
            (function (sizing) {
                var ShapeSizingPipeDef = (function (_super) {
                    __extends(ShapeSizingPipeDef, _super);
                    function ShapeSizingPipeDef() {
                        _super.call(this);
                        this.addTapinAfter('computeActual', 'calcShouldStretch', calcShouldStretch).addTapinAfter('calcShouldStretch', 'stretchActual', stretchActual);
                    }
                    ShapeSizingPipeDef.prototype.createState = function () {
                        var state = _super.prototype.createState.call(this);
                        state.shouldStretch = false;
                        return state;
                    };
                    return ShapeSizingPipeDef;
                })(minerva.layout.sizing.SizingPipeDef);
                sizing.ShapeSizingPipeDef = ShapeSizingPipeDef;

                function calcShouldStretch(input, state, output, tree) {
                    state.shouldStretch = false;

                    if (!tree.surface)
                        return true;

                    var nb = input.naturalBounds;
                    if (nb.width <= 0 && nb.height <= 0)
                        return true;

                    if (input.stretch === 0 /* None */ && !minerva.Rect.isEmpty(nb)) {
                        minerva.Size.copyTo(nb, output.actualSize);
                        return true;
                    }

                    state.shouldStretch = true;
                    return true;
                }

                function stretchActual(input, state, output, tree) {
                    if (!state.shouldStretch)
                        return true;

                    var nb = input.naturalBounds;
                    var as = output.actualSize;
                    if (!isFinite(as.width))
                        as.width = nb.width;
                    if (!isFinite(as.height))
                        as.height = nb.height;

                    var sx = 1.0;
                    var sy = 1.0;
                    if (nb.width > 0)
                        sx = as.width / nb.width;
                    if (nb.height > 0)
                        sy = as.height / nb.height;

                    switch (input.stretch) {
                        case 2 /* Uniform */:
                            sx = sy = Math.min(sx, sy);
                            break;
                        case 3 /* UniformToFill */:
                            sx = sy = Math.max(sx, sy);
                            break;
                        default:
                            break;
                    }

                    as.width = Math.min(as.width, nb.width * sx);
                    as.height = Math.min(as.height, nb.height * sy);
                }
            })(shape.sizing || (shape.sizing = {}));
            var sizing = shape.sizing;
        })(shapes.shape || (shapes.shape = {}));
        var shape = shapes.shape;
    })(minerva.shapes || (minerva.shapes = {}));
    var shapes = minerva.shapes;
})(minerva || (minerva = {}));
var minerva;
(function (minerva) {
    (function (shapes) {
        (function (shape) {
            var ShapeUpdater = (function (_super) {
                __extends(ShapeUpdater, _super);
                function ShapeUpdater() {
                    _super.call(this);
                    this.setMeasurePipe(minerva.singleton(shape.measure.ShapeMeasurePipeDef)).setArrangePipe(minerva.singleton(shape.arrange.ShapeArrangePipeDef)).setRenderPipe(minerva.singleton(shape.render.ShapeRenderPipeDef)).setSizingPipe(minerva.singleton(shape.sizing.ShapeSizingPipeDef));

                    var assets = this.assets;

                    assets.naturalBounds = new minerva.Rect();
                    assets.shapeFlags = 0 /* None */;
                    assets.stretchXform = mat3.identity();

                    assets.path = null;

                    assets.stretch = 0 /* None */;
                    assets.fill = null;
                    assets.fillRule = 0 /* EvenOdd */;
                    assets.stroke = null;
                    assets.strokeThickness = 0;
                    assets.strokeStartLineCap = 0 /* Flat */;
                    assets.strokeEndLineCap = 0 /* Flat */;
                    assets.strokeLineJoin = 0 /* Miter */;
                    assets.strokeMiterLimit = 10;
                }
                return ShapeUpdater;
            })(minerva.layout.Updater);
            shape.ShapeUpdater = ShapeUpdater;
        })(shapes.shape || (shapes.shape = {}));
        var shape = shapes.shape;
    })(minerva.shapes || (minerva.shapes = {}));
    var shapes = minerva.shapes;
})(minerva || (minerva = {}));
//# sourceMappingURL=minerva.js.map
