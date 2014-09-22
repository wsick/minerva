/// <reference path="../../qunit.d.ts" />
/// <reference path="../../lib/minerva/minerva" />

module tests.primitives.rect {
    QUnit.module("Rect");

    import Size = minerva.Size;
    import Point = minerva.Point;
    import Rect =  minerva.Rect;

    QUnit.test("copyTo", (assert) => {
        var origr = new Rect(10, 10, 150, 300);
        var copyr = new Rect(0, 0, 80, 120);
        Rect.copyTo(origr, copyr);
        assert.deepEqual(copyr, new Rect(10, 10, 150, 300));
    });

    QUnit.test("isEqual", (assert) => {
        assert.ok(!Rect.isEqual(new Rect(10, 10, 150, 300), new Rect(0, 0, 80, 120)));
        assert.ok(Rect.isEqual(new Rect(0, 0, 80, 100), new Rect(0, 0, 80, 100)));
    });

    QUnit.test("isEmpty", (assert) => {
        var r1 = new Rect();
        assert.ok(Rect.isEmpty(r1));

        r1 = new Rect(1, 1, 1, 0);
        assert.ok(Rect.isEmpty(r1));

        r1 = new Rect(1, 1, 0, 1);
        assert.ok(Rect.isEmpty(r1));

        r1 = new Rect(1, 1, 1, 1);
        assert.ok(!Rect.isEmpty(r1));
    });

    QUnit.test("roundOut", (assert) => {
        var r = new Rect(0.25, 0.75, 100.4, 199.8);
        Rect.roundOut(r);
        assert.deepEqual(r, new Rect(0, 0, 101, 201));
    });

    QUnit.test("intersection", (assert) => {
        var r1 = new Rect(0, 0, 100, 100);
        var r2 = new Rect(50, 50, 100, 100);
        Rect.intersection(r1, r2);
        assert.deepEqual(r1, new Rect(50, 50, 50, 50), "r1 should be the intersection");
        assert.deepEqual(r2, new Rect(50, 50, 100, 100), "r2 should remain unchanged");

        r1 = new Rect(0, 0, 100, 100);
        r2 = new Rect(50, 50, 25, 25);
        Rect.intersection(r1, r2);
        assert.deepEqual(r1, new Rect(50, 50, 25, 25), "r1 should be the intersection");
        assert.deepEqual(r2, new Rect(50, 50, 25, 25), "r2 should remain unchanged");

        r1 = new Rect(50, 50, 25, 25);
        r2 = new Rect(0, 0, 100, 100);
        Rect.intersection(r1, r2);
        assert.deepEqual(r1, new Rect(50, 50, 25, 25), "r1 should be the intersection");
        assert.deepEqual(r2, new Rect(0, 0, 100, 100), "r2 should remain unchanged");
    });

    QUnit.test("union", (assert) => {
        var r1 = new Rect();
        var r2 = new Rect(0, 0, 100, 100);
        Rect.union(r1, r2);
        assert.deepEqual(r1, new Rect(0, 0, 100, 100));

        r1 = new Rect(50, 50, 100, 100);
        r2 = new Rect();
        Rect.union(r1, r2);
        assert.deepEqual(r1, new Rect(50, 50, 100, 100));

        r1 = new Rect(50, 50, 100, 100);
        r2 = new Rect(75, 75, 100, 100);
        Rect.union(r1, r2);
        assert.deepEqual(r1, new Rect(50, 50, 125, 125));

        r1 = new Rect(50, 50, 100, 100);
        r2 = new Rect(0, 0, 200, 100);
        Rect.union(r1, r2);
        assert.deepEqual(r1, new Rect(0, 0, 200, 150));
    });

    QUnit.test("isContainedIn", (assert) => {
        var r1 = new Rect(0, 0, 100, 100);
        var r2 = new Rect(50, 50, 25, 25);
        assert.ok(!Rect.isContainedIn(r1, r2));

        r1 = new Rect(50, 50, 25, 25);
        r2 = new Rect(0, 0, 100, 100);
        assert.ok(Rect.isContainedIn(r1, r2));
    });
}