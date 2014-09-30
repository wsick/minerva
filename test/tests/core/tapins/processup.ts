/// <reference path="../../../qunit" />
/// <reference path="../../../lib/minerva/minerva" />

module minerva.core.processup.tapins.tests {
    QUnit.module("Process Up Pipe Tapins");

    import Rect = minerva.Rect;
    import Size = minerva.Size;
    import Point = minerva.Point;
    import Thickness = minerva.Thickness;
    import DirtyFlags = minerva.DirtyFlags;

    var mock = {
        input: function (): processup.IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,
                actualWidth: 0,
                actualHeight: 0,
                effectPadding: new Thickness(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                extents: new Rect(),
                extentsWithChildren: new Rect(),
                globalBoundsWithChildren: new Rect(),
                surfaceBoundsWithChildren: new Rect(),
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                dirtyFlags: 0,
                dirtyRegion: new Rect(),
                forceInvalidate: false
            };
        },
        state: function (): processup.IState {
            return {
                actualSize: new Size(),
                invalidateSubtreePaint: false,
                hasNewBounds: false,
                hasInvalidate: false
            };
        },
        output: function (): processup.IOutput {
            return {
                extents: new Rect(),
                extentsWithChildren: new Rect(),
                globalBoundsWithChildren: new Rect(),
                surfaceBoundsWithChildren: new Rect(),
                dirtyFlags: 0,
                dirtyRegion: new Rect(),
                forceInvalidate: false
            };
        },
        visualOwner: function () {
            return {
                boundsUpdated: false,
                dirty: new Rect(),
                updateBounds() {
                    this.boundsUpdated = true;
                },
                invalidate(region: Rect) {
                    Rect.union(this.dirty, region);
                }
            };
        }
    };

    QUnit.test("calcActualSize", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var vo = null;
        assert.ok(tapins.calcActualSize(input, state, output, vo));
        assert.deepEqual(state.actualSize, new Size());

        input.dirtyFlags |= DirtyFlags.Bounds;
        input.actualWidth = 150;
        input.actualHeight = 200;
        input.minWidth = 175;
        input.maxHeight = 175;
        assert.ok(tapins.calcActualSize(input, state, output, vo));
        assert.deepEqual(state.actualSize, new Size(175, 175));
    });

    QUnit.test("calcExtents", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var vo = null;
        assert.ok(tapins.calcExtents(input, state, output, vo));
        assert.deepEqual(output.extents, new Rect());
        assert.deepEqual(output.extentsWithChildren, new Rect());

        input.dirtyFlags |= DirtyFlags.Bounds;
        state.actualSize = new Size(150, 300);
        assert.ok(tapins.calcExtents(input, state, output, vo));
        assert.deepEqual(output.extents, new Rect(0, 0, 150, 300));
        assert.deepEqual(output.extentsWithChildren, new Rect(0, 0, 150, 300));

        //TODO: Test extents, extentsWithChildren when implementing visual children
    });

    QUnit.test("calcPaintBounds", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var vo = null;
        input.extentsWithChildren = new Rect(0, 0, 150, 300);
        assert.ok(tapins.calcPaintBounds(input, state, output, vo));
        assert.deepEqual(output.globalBoundsWithChildren, new Rect());
        assert.deepEqual(output.surfaceBoundsWithChildren, new Rect());

        input.dirtyFlags |= DirtyFlags.Bounds;
        input.effectPadding = new Thickness(5, 10, 5, 10);
        mat4.createScale(2, 4, 6, input.absoluteProjection);
        assert.ok(tapins.calcPaintBounds(input, state, output, vo));
        assert.deepEqual(output.globalBoundsWithChildren, new Rect(-5, -10, 160, 320));
        assert.deepEqual(output.surfaceBoundsWithChildren, new Rect(-10, -40, 320, 1280));
    });

    QUnit.test("processBounds", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vo = mock.visualOwner();

        input.dirtyFlags |= DirtyFlags.Bounds;
        output.extentsWithChildren = new Rect(0, 0, 100, 100);
        assert.ok(tapins.processBounds(input, state, output, vo));
        assert.ok(!vo.boundsUpdated);
        assert.deepEqual(vo.dirty, new Rect(0, 0, 0, 0));
        assert.ok(state.hasNewBounds);

        input.forceInvalidate = true;
        assert.ok(tapins.processBounds(input, state, output, vo));
        assert.ok(state.hasNewBounds);
        assert.ok(!output.forceInvalidate);

        vo = mock.visualOwner();
        output.globalBoundsWithChildren = new Rect(0, 0, 100, 100);
        input.surfaceBoundsWithChildren = new Rect(10, 10, 50, 50);
        assert.ok(tapins.processBounds(input, state, output, vo));
        assert.ok(vo.boundsUpdated);
        assert.deepEqual(vo.dirty, new Rect(10, 10, 50, 50));
        assert.ok(state.hasNewBounds);
    });

    QUnit.test("processNewBounds", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vo = mock.visualOwner();

        input.dirtyFlags |= DirtyFlags.NewBounds;
        state.hasNewBounds = false;
        output.surfaceBoundsWithChildren = new Rect(0, 0, 50, 50);
        output.dirtyRegion = new Rect(25, 25, 50, 50);
        assert.ok(tapins.processNewBounds(input, state, output, vo));
        assert.strictEqual(output.dirtyFlags, DirtyFlags.Invalidate);
        assert.ok(state.hasInvalidate);
        assert.deepEqual(output.dirtyRegion, new Rect(0, 0, 75, 75));

        input.dirtyFlags = 0;
        state.hasNewBounds = true;
        output.surfaceBoundsWithChildren = new Rect(0, 0, 50, 50);
        output.dirtyRegion = new Rect(25, 25, 50, 50);
        assert.ok(tapins.processNewBounds(input, state, output, vo));
        assert.strictEqual(output.dirtyFlags, DirtyFlags.Invalidate);
        assert.ok(state.hasInvalidate);
        assert.deepEqual(output.dirtyRegion, new Rect(0, 0, 75, 75));
    });

    QUnit.test("processInvalidate", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vo = mock.visualOwner();

        state.hasInvalidate = true;
        vo.dirty = new Rect(0, 0, 25, 25);
        output.dirtyRegion = new Rect(50, 50, 100, 100);
        assert.ok(tapins.processInvalidate(input, state, output, vo));
        assert.deepEqual(output.dirtyRegion, new Rect(0, 0, 0, 0));
        assert.deepEqual(vo.dirty, new Rect(0, 0, 150, 150));
    });
}