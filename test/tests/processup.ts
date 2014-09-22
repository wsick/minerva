/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

module tests.processup {
    QUnit.module("Process Up Pipe");

    import processup = minerva.def.processup;
    import tapins = minerva.def.processup.tapins;
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
                hasNewBounds: false
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
        assert.ok(tapins.calcActualSize(input,state,output,vo));
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
        assert.ok(tapins.calcPaintBounds(input, state, output, vo));
        assert.deepEqual(output.globalBoundsWithChildren, new Rect());
        assert.deepEqual(output.surfaceBoundsWithChildren, new Rect());

        ok(false);
    });

    QUnit.test("processBounds", (assert) => {
        ok(true);
    });

    QUnit.test("processNewBounds", (assert) => {
        ok(true);
    });

    QUnit.test("processInvalidate", (assert) => {
        ok(true);
    });
}