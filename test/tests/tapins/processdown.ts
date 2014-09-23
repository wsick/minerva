/// <reference path="../../qunit" />
/// <reference path="../../lib/minerva/minerva" />

module minerva.tests.processdown.tapins {
    QUnit.module("Process Down Pipe Tapins");

    import processdown = minerva.def.processdown;
    import tapins = minerva.def.processdown.tapins;
    import Rect = minerva.Rect;
    import Size = minerva.Size;
    import Point = minerva.Point;
    import Thickness = minerva.Thickness;
    import DirtyFlags = minerva.DirtyFlags;
    import Visibility = minerva.Visibility;

    var mock = {
        input: function (): processdown.IInput {
            return {
                visibility: Visibility.Visible,
                opacity: 1.0,
                isHitTestVisible: true,
                renderTransform: mat3.identity(),
                renderTransformOrigin: new Point(),
                projection: null,
                actualWidth: 0,
                actualHeight: 0,
                surfaceBoundsWithChildren: new Rect(),
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                totalIsHitTestVisible: true,
                z: NaN,
                layoutClip: new Rect(),
                compositeLayoutClip: new Rect(),
                layoutXform: mat3.identity(),
                carrierXform: mat3.identity(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                carrierProjection: mat4.identity(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                totalHasRenderProjection: false,
                dirtyFlags: 0
            };
        },
        state: function (): processdown.IState {
            return {
                xformOrigin: new Point(),
                localXform: mat3.identity(),
                renderAsProjection: mat4.identity()
            };
        },
        output: function (): processdown.IOutput {
            return {
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                totalIsHitTestVisible: true,
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
        }
    };

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    QUnit.test("processRenderVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 1.0);
        assert.strictEqual(output.totalIsRenderVisible, true);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.dirtyFlags |= DirtyFlags.RenderVisibility;
        input.opacity = 0.5;
        vpinput.totalOpacity = 0.5;
        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 0.25);
        assert.strictEqual(output.totalIsRenderVisible, true);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.opacity = 1.0;
        vpinput.totalOpacity = 1.0;
        vpinput.totalIsRenderVisible = false;
        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 1.0);
        assert.strictEqual(output.totalIsRenderVisible, false);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);
    });

    QUnit.test("processHitTestVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        input.dirtyFlags |= DirtyFlags.HitTestVisibility;
        input.isHitTestVisible = false;
        assert.ok(tapins.processHitTestVisibility(input, state, output, null));
        assert.ok(!output.totalIsHitTestVisible);

        input.isHitTestVisible = true;
        assert.ok(tapins.processHitTestVisibility(input, state, output, null));
        assert.ok(output.totalIsHitTestVisible);

        assert.ok(tapins.processHitTestVisibility(input, state, output, vpinput));
        assert.ok(output.totalIsHitTestVisible);

        vpinput.totalIsHitTestVisible = false;
        assert.ok(tapins.processHitTestVisibility(input, state, output, vpinput));
        assert.ok(!output.totalIsHitTestVisible);
    });

    QUnit.test("calcXformOrigin", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcXformOrigin(input, state, output, vpinput));
        assert.deepEqual(state.xformOrigin, new Point(0, 0));

        input.renderTransformOrigin = new Point(0.5, 0.75);
        input.actualWidth = 100;
        input.actualHeight = 200;
        assert.ok(tapins.calcXformOrigin(input, state, output, vpinput));
        assert.deepEqual(state.xformOrigin, new Point(50, 150));
    });

    QUnit.test("processLocalXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processLocalXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(state.localXform), [1, 0, 0, 0, 1, 0, 0, 0, 1]);

        input.dirtyFlags |= DirtyFlags.LocalTransform;
        input.renderTransform = [1, 0, 5, 0, 2, 0, 0, 0, 1];
        state.xformOrigin = new Point(50, 100);
        assert.ok(tapins.processLocalXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(state.localXform), [1, 0, 5, 0, 2, 100, 0, 0, 1]);
    });

    QUnit.test("processLocalProjection", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processLocalProjection(input, state, output, vpinput));
        assert.ok(isNaN(output.z));

        input.projection = {
            getDistanceFromXYPlane (objectWidth: number, objectHeight: number) {
                return 10;
            },
            getTransform (): number[] {
                return mat4.identity()
            }
        };
        input.dirtyFlags |= DirtyFlags.LocalProjection;
        assert.ok(tapins.processLocalProjection(input, state, output, vpinput));
        assert.strictEqual(output.z, 10);
    });

    QUnit.test("calcRenderXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [1, 0, 0, 0, 1, 0, 0, 0, 1]);
        assert.deepEqual(typedToArray(state.renderAsProjection), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        input.dirtyFlags |= DirtyFlags.Transform;
        mat3.set([2, 0, 0, 0, 2, 0, 0, 0, 1], input.carrierXform);
        mat3.set([1, 0, 10, 0, 1, 50, 0, 0, 1], input.layoutXform);
        mat3.set([-1, 0, 0, 0, 1, 0, 0, 0, 1], state.localXform);
        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [-2, 0, -10, 0, 2, 50, 0, 0, 1]);
        assert.deepEqual(typedToArray(state.renderAsProjection), [-2, 0, 0, -10, 0, 2, 0, 50, 0, 0, 1, 0, 0, 0, 0, 1]);
    });

    QUnit.test("calcLocalProjection", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcLocalProjection(input, state, output, vpinput));
        assert.ok(!output.totalHasRenderProjection);

        input.dirtyFlags |= DirtyFlags.Transform;
        vpinput.totalHasRenderProjection = true;
        assert.ok(tapins.calcLocalProjection(input, state, output, vpinput));
        assert.ok(output.totalHasRenderProjection);
        assert.deepEqual(typedToArray(output.localProjection), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        vpinput.totalHasRenderProjection = false;
        input.projection = {
            getDistanceFromXYPlane (objectWidth: number, objectHeight: number) {
                return 10;
            },
            getTransform (): number[] {
                return mat4.identity()
            }
        };
        mat4.set([1, 0, 0, 100, 0, 1, 0, 200, 0, 0, 1, 0, 0, 0, 0, 1], input.carrierProjection);
        mat4.set([-2, 0, 0, -10, 0, 2, 0, 50, 0, 0, 1, 0, 0, 0, 0, 1], state.renderAsProjection);
        assert.ok(tapins.calcLocalProjection(input, state, output, vpinput));
        assert.ok(output.totalHasRenderProjection);
        assert.deepEqual(typedToArray(output.localProjection), [-2, 0, 0, -210, 0, 2, 0, 450, 0, 0, 1, 0, 0, 0, 0, 1]);
    });

    QUnit.test("calcAbsoluteXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcAbsoluteXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteXform), [1, 0, 0, 0, 1, 0, 0, 0, 1]);

        input.dirtyFlags |= DirtyFlags.Transform;
        mat3.set([2, 0, 0, 0, 4, 0, 0, 0, 1], output.renderXform);
        mat3.set([1, 0, 50, 0, 1, 100, 0, 0, 1], vpinput.absoluteXform);
        assert.ok(tapins.calcAbsoluteXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteXform), [2, 0, 50, 0, 4, 100, 0, 0, 1]);
    });

    QUnit.test("calcAbsoluteProjection", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcAbsoluteProjection(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteProjection), [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

        input.dirtyFlags |= DirtyFlags.Transform;
        mat4.createScale(2, 4, 1, vpinput.absoluteProjection);
        mat4.createTranslate(50, 100, 0, output.localProjection);
        assert.ok(tapins.calcAbsoluteProjection(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteProjection), [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0, 50, 100, 0, 1]);
    });

    QUnit.test("processXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.dirtyFlags = DirtyFlags.Transform;
        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        mat4.createScale(3, 2, 1, output.localProjection);
        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);
    });

    QUnit.test("processLayoutClip", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.equal(output.compositeLayoutClip, null);

        input.dirtyFlags |= DirtyFlags.LayoutClip;
        input.layoutClip = null;
        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.equal(output.compositeLayoutClip, null);

        input.layoutClip = new Rect(10, 20, 90, 80);
        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.deepEqual(output.compositeLayoutClip, new Rect(10, 20, 90, 80));

        vpinput.compositeLayoutClip = new Rect(30, 30, 20, 100);
        assert.ok(tapins.processLayoutClip(input, state, output, vpinput));
        assert.deepEqual(output.compositeLayoutClip, new Rect(30, 30, 20, 70));

        input.layoutClip = null;
        assert.ok(tapins.processLayoutClip(input, state, output, vpinput));
        assert.deepEqual(output.compositeLayoutClip, new Rect(30, 30, 20, 100));
    });

    QUnit.test("processZIndices", (assert) => {
        assert.ok(true);
    });
}