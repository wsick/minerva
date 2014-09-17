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

    QUnit.test("isContainedIn", (assert) => {
        var r1 = new Rect(0, 0, 100, 100);
        var r2 = new Rect(50, 50, 25, 25);
        assert.ok(!Rect.isContainedIn(r1, r2));

        r1 = new Rect(50, 50, 25, 25);
        r2 = new Rect(0, 0, 100, 100);
        assert.ok(Rect.isContainedIn(r1, r2));
    });

    /*

     var r = rect.fromSize(size.fromRaw(50, 100));
     strictEqual(r.X, 0, "FromSize should properly set x.");
     strictEqual(r.Y, 0, "FromSize should properly set y.");
     strictEqual(r.Width, 50, "FromSize should properly set width.");
     strictEqual(r.Height, 100, "FromSize should properly set height.");

     var r1 = new rect();
     var r2 = new rect();
     rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 0, 1);
     ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
     rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 0, 1, 0);
     ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
     rect.set(r1, 0, 0, 0, 0); rect.set(r2, 0, 1, 0, 0);
     ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
     rect.set(r1, 0, 0, 0, 0); rect.set(r2, 1, 0, 0, 0);
     ok(!rect.isEqual(r1, r2), "Rects should not be equal.");
     rect.set(r1, 1, 1, 1, 1); rect.set(r2, 1, 1, 1, 1);
     ok(rect.isEqual(r1, r2), "Rects should be equal.");

     rect.clear(r1);
     strictEqual(r1.X, 0, "X should be 0 when cleared.");
     strictEqual(r1.Y, 0, "Y should be 0 when cleared.");
     strictEqual(r1.Width, 0, "Width should be 0 when cleared.");
     strictEqual(r1.Height, 0, "Height should be 0 when cleared.");

     r1.X = 5;
     r1.Y = 5;
     rect.growBy(r1, 5, 5, 5, 5);
     rect.set(r2, 0, 0, 10, 10);
     ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");

     rect.growByThickness(r1, new Thickness(5, 5, 5, 5));
     rect.set(r2, -5, -5, 20, 20);
     ok(rect.isEqual(r1, r2), "Rect should grow by 10,10.");

     rect.shrinkByThickness(r1, new Thickness(5, 5, 5, 5));
     rect.set(r2, 0, 0, 10, 10);
     ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

     rect.shrinkBy(r1, 5, 5, 5, 5);
     rect.set(r2, 5, 5, 0, 0);
     ok(rect.isEqual(r1, r2), "Rect should shrink by 10,10.");

     rect.set(r1, 75, 75, 25, 25);
     rect.set(r2, 50, 50, 50, 50);
     rect.extendTo(r1, 50, 50);
     ok(rect.isEqual(r1, r2), "Rect should now include 50,50 increasing total size to 50,50.");

     rect.set(r1, 50, 50, 25, 25);
     rect.set(r2, 50, 50, 50, 50);
     rect.extendTo(r1, 100, 100);
     ok(rect.isEqual(r1, r2), "Rect should now include 100,100 increasing total size to 50,50.");

     rect.set(r1, 50, 50, 50, 50);
     rect.set(r2, 50, 50, 50, 50);
     rect.extendTo(r1, 75, 75);
     ok(rect.isEqual(r1, r2), "Rect should now be unchanged including 75,75.");

     var r3 = new rect();

     rect.set(r3, 50, 50, 25, 25);
     rect.set(r1, 25, 25, 50, 50);
     rect.set(r2, 50, 50, 50, 50);
     rect.intersection(r1, r2);
     ok(rect.isEqual(r1, r3), "Intersection of 25,25,50,50 and 50,50,50,50 should be 50,50,25,25");

     rect.set(r3, 25, 25, 75, 75);
     rect.set(r1, 25, 25, 50, 50);
     rect.set(r2, 50, 50, 50, 50);
     rect.union(r1, r2);
     ok(rect.isEqual(r1, r3), "Union of 25,25,50,50 and 50,50,50,50 should be 25,25,75,75");
     */
}