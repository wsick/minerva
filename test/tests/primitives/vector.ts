module tests.primitives.vector {
    QUnit.module("primitives.vector");

    import Vector = minerva.Vector;

    QUnit.test("Vector", (assert) => {
        var EPSILON = 1e-10;

        function close (a: number, b: number, message: string) {
            assert.ok(Math.abs(a - b) < EPSILON, message + "(" + a + "," + b + ")");
        }

        function vecEqual (v1: number[], v2: number[], message: string) {
            close(v1[0], v2[0], message + ".1");
            close(v1[1], v2[1], message + ".2");
        }

        //normalize
        var n = Vector.normalize([2, 2]);
        vecEqual(n, [Math.SQRT2 / 2, Math.SQRT2 / 2], "#1");
        n = Vector.normalize([0, 5]);
        vecEqual(n, [0.0, 1.0], "#2");


        //reverse
        var r = Vector.reverse([-3, -5]);
        vecEqual(r, [3, 5], "#3");
        r = Vector.reverse([6, 2]);
        vecEqual(r, [-6, -2], "#4");


        //orthogonal
        var o = Vector.orthogonal([1, 1]);
        vecEqual(o, [-1, 1], "#5");
        o = Vector.orthogonal([-1, 1]);
        vecEqual(o, [-1, -1], "#6");
        o = Vector.orthogonal([-1, -1]);
        vecEqual(o, [1, -1], "#7");
        o = Vector.orthogonal([1, -1]);
        vecEqual(o, [1, 1], "#8");


        //rotate
        var rt2_2 = Math.SQRT2 / 2;
        var t = Vector.rotate([1, 0], Math.PI / 4);
        vecEqual(t, [rt2_2, rt2_2], "#9");
        t = Vector.rotate([rt2_2, rt2_2], Math.PI / 4);
        vecEqual(t, [0, 1], "#10");
        t = Vector.rotate([0, 1], Math.PI / 4);
        vecEqual(t, [-rt2_2, rt2_2], "#11");
        t = Vector.rotate([-rt2_2, rt2_2], Math.PI / 4);
        vecEqual(t, [-1, 0], "#12");
        t = Vector.rotate([-1, 0], Math.PI / 4);
        vecEqual(t, [-rt2_2, -rt2_2], "#13");


        //angle between
        var b = Vector.angleBetween([1, 0], [rt2_2, rt2_2]);
        close(b, Math.PI / 4, "#14");
        b = Vector.angleBetween([1, 0], [-rt2_2, rt2_2]);
        close(b, 3 * Math.PI / 4, "#15");
        b = Vector.angleBetween([1, 0], [-rt2_2, -rt2_2]);
        close(b, 3 * Math.PI / 4, "#16");
    });
}