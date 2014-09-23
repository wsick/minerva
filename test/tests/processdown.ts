/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

module tests.processdown {
    QUnit.module("Process Down Pipe");

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
                compositeLayoutClip: new Rect(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                totalHasRenderProjection: false,
                dirtyFlags: 0
            };
        }
    };

    QUnit.test("processRenderVisibility", (assert) => {
        ok(true);
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
        ok(true);
    });

    QUnit.test("processLocalXform", (assert) => {
        ok(true);
    });

    QUnit.test("processLocalProjection", (assert) => {
        ok(true);
    });

    QUnit.test("calcRenderXform", (assert) => {
        ok(true);
    });

    QUnit.test("calcLocalProjection", (assert) => {
        ok(true);
    });

    QUnit.test("calcAbsoluteXform", (assert) => {
        ok(true);
    });

    QUnit.test("calcAbsoluteProjection", (assert) => {
        ok(true);
    });

    QUnit.test("processXform", (assert) => {
        ok(true);
    });

    QUnit.test("processLayoutClip", (assert) => {
        ok(true);
    });

    QUnit.test("processZIndices", (assert) => {
        ok(true);
    });
}