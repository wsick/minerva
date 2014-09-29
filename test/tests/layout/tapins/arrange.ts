/// <reference path="../../../qunit" />
/// <reference path="../../../lib/minerva/minerva" />

module minerva.layout.arrange.tapins.tests {
    QUnit.module("Arrange Pipe Tapins");

    import Rect = minerva.Rect;
    import Size = minerva.Size;
    import Point = minerva.Point;
    import DirtyFlags = minerva.DirtyFlags;
    import UIFlags = minerva.UIFlags;

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    var mock = {
        input: function (): arrange.IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,
                margin: new minerva.Thickness(),
                horizontalAlignment: minerva.HorizontalAlignment.Stretch,
                verticalAlignment: minerva.VerticalAlignment.Stretch,
                visibility: minerva.Visibility.Visible,
                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: 0,
                layoutSlot: new Rect(),
                renderSize: new Size(),
                lastRenderSize: new Size(),
                layoutClip: new Rect(),
                isTopLevel: false
            };
        },
        state: function (): arrange.IState {
            return {
                finalRect: new Rect(),
                finalSize: new Size(),
                framework: new Size(),
                stretched: new Size(),
                constrained: new Size(),
                visualOffset: new Point(),
                flipHorizontal: false
            };
        },
        output: function (): arrange.IOutput {
            return {
                error: null,
                layoutSlot: new Rect(),
                arrangedSize: new Size(),
                layoutXform: mat3.identity(),
                layoutClip: new Rect(),
                renderSize: new Size(),
                lastRenderSize: new Size(),
                dirtyFlags: 0,
                uiFlags: 0,
                newUpDirty: 0,
                newDownDirty: 0,
                newUiFlags: 0
            }
        },
        tree: function (): layout.IUpdaterTree {
            return new layout.UpdaterTree();
        }
    };

    QUnit.test("applyRounding", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0.25, 0.75, 50.25, 50.50);
        assert.ok(tapins.applyRounding(input, state, output, tree, fr));
        assert.notStrictEqual(state.finalRect, fr);
        assert.deepEqual(state.finalRect, new Rect(0, 1, 50, 51));

        input.useLayoutRounding = false;
        assert.ok(tapins.applyRounding(input, state, output, tree, fr));
        assert.notStrictEqual(state.finalRect, fr);
        assert.deepEqual(state.finalRect, new Rect(0.25, 0.75, 50.25, 50.50));
    });

    QUnit.test("validateFinalRect", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0, 0, 50, 50);
        Rect.copyTo(fr, state.finalRect);
        assert.ok(tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.width = -1;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.width = NaN;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.width = Number.POSITIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.width = Number.NEGATIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));
        state.finalRect.width = 50;

        state.finalRect.height = -1;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.height = NaN;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.height = Number.POSITIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));

        state.finalRect.height = Number.NEGATIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, tree, fr));
    });

    QUnit.test("validateVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0, 0, 50, 50);
        assert.ok(tapins.validateVisibility(input, state, output, tree, fr));

        input.visibility = minerva.Visibility.Collapsed;
        assert.ok(!tapins.validateVisibility(input, state, output, tree, fr));
    });

    QUnit.test("checkNeedArrange", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0, 0, 50, 50);
        Rect.copyTo(fr, state.finalRect);
        var ls = output.layoutSlot;
        ls.width = 50;
        ls.height = 50;
        assert.ok(!tapins.checkNeedArrange(input, state, output, tree, fr));

        input.dirtyFlags |= DirtyFlags.Arrange;
        assert.ok(tapins.checkNeedArrange(input, state, output, tree, fr));
        input.dirtyFlags = 0;

        ls.width = 100;
        ls.height = 100;
        assert.ok(tapins.checkNeedArrange(input, state, output, tree, fr));
    });

    QUnit.test("invalidateFuture", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        assert.ok(tapins.invalidateFuture(input, state, output, tree, new Rect()));
        assert.strictEqual(output.dirtyFlags, DirtyFlags.LocalTransform | DirtyFlags.LocalProjection | DirtyFlags.Bounds);
        assert.deepEqual(output.layoutClip, new Rect(0, 0, 0, 0));
    });

    QUnit.test("calcStretched", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0, 0, 100, 100);
        Rect.copyTo(fr, state.finalRect);
        input.margin.left = input.margin.top = input.margin.right = input.margin.bottom = 5;
        assert.ok(tapins.calcStretched(input, state, output, tree, fr));
        assert.notStrictEqual(output.layoutSlot, fr);
        assert.deepEqual(output.layoutSlot, new Rect(0, 0, 100, 100));
        assert.deepEqual(state.stretched, new Size(90, 90));
    });

    QUnit.test("prepareOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        var fr = new Rect(0, 0, 100, 100);
        Rect.copyTo(fr, state.finalRect);
        input.width = 150;
        input.height = 75;
        input.hiddenDesire.width = 145;
        input.hiddenDesire.height = 80;
        state.stretched.width = 151;
        state.stretched.height = 70;
        assert.ok(tapins.prepareOverride(input, state, output, tree, fr));
        assert.deepEqual(state.finalSize, new Size(151, 80));
    });

    QUnit.test("doOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        assert.ok(true);
    });

    QUnit.test("completeOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        output.dirtyFlags |= DirtyFlags.Arrange;
        output.arrangedSize.width = 100;
        output.arrangedSize.height = 100;
        state.framework.width = 150.6;
        state.framework.height = 95.3;
        assert.ok(tapins.completeOverride(input, state, output, tree, new Rect()));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Arrange, 0);
        assert.deepEqual(output.arrangedSize, new Size(151, 100));
        assert.deepEqual(state.constrained, new Size(151, 100));
    });

    QUnit.test("calcFlip", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        assert.ok(tapins.calcFlip(input, state, output, tree, new Rect()));
        assert.strictEqual(state.flipHorizontal, false);
    });

    QUnit.test("calcVisualOffset", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        state.finalRect = new Rect(100, 33, 323, 900);
        state.constrained = new Size(350, 523);
        input.verticalAlignment = minerva.VerticalAlignment.Center;
        input.horizontalAlignment = minerva.HorizontalAlignment.Center;
        assert.ok(tapins.calcVisualOffset(input, state, output, tree, new Rect()));
        assert.deepEqual(state.visualOffset, new Point(87, 222));
    });

    QUnit.test("buildLayoutClip", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        output.layoutClip = new Rect(0, 0, 0, 0);

        tree.isTop = true;
        assert.ok(tapins.buildLayoutClip(input, state, output, tree, new Rect()));
        assert.deepEqual(output.layoutClip, new Rect(0, 0, 0, 0));

        tree.isTop = false;
        state.visualOffset = new Point(5, 15);
        state.finalRect = new Rect(5, 15, 200, 300);
        output.arrangedSize = new Size(100, 100);
        input.layoutClip = new Rect(0, 0, 0, 0);
        assert.ok(tapins.buildLayoutClip(input, state, output, tree, new Rect()));
        assert.deepEqual(output.layoutClip, new Rect(0, 0, 200, 300));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.LayoutClip, DirtyFlags.LayoutClip);
    });

    QUnit.test("buildLayoutXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        state.visualOffset = new Point(150, 200);
        assert.ok(tapins.buildLayoutXform(input, state, output, tree, new Rect()));
        assert.deepEqual(typedToArray(output.layoutXform), [1, 0, 150, 0, 1, 200, 0, 0, 1]);

        output.arrangedSize.width = 100;
        state.flipHorizontal = true;
        assert.ok(tapins.buildLayoutXform(input, state, output, tree, new Rect()));
        assert.deepEqual(typedToArray(output.layoutXform), [-1, 0, -250, 0, 1, 200, 0, 0, 1]);
    });

    QUnit.test("buildRenderSize", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var tree = mock.tree();

        input.renderSize = new Size(100, 200);
        output.arrangedSize = new Size(250, 300);
        output.uiFlags = 0;
        assert.ok(tapins.buildRenderSize(input, state, output, tree, new Rect()));
        assert.deepEqual(output.renderSize, output.arrangedSize);
        assert.notStrictEqual(output.renderSize, output.arrangedSize);
        assert.deepEqual(output.lastRenderSize, input.renderSize);
        assert.notStrictEqual(output.lastRenderSize, input.renderSize);
        assert.strictEqual(output.uiFlags, UIFlags.SizeHint);
    });
}