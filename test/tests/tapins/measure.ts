/// <reference path="../../qunit" />
/// <reference path="../../lib/minerva/minerva" />

module minerva.tests.measure.tapins {
    QUnit.module("Measure Pipe Tapins");

    import measure = minerva.def.measure;
    import tapins = minerva.def.measure.tapins;
    import Rect = minerva.Rect;
    import Size = minerva.Size;
    import DirtyFlags = minerva.DirtyFlags;
    import UIFlags = minerva.UIFlags;

    var mock = {
        input: function (): measure.IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,
                margin: new minerva.Thickness(),
                previousConstraint: new Size(),
                visibility: minerva.Visibility.Visible,
                desiredSize: new Size(),
                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: 0
            };
        },
        state: function (): measure.IState {
            return {
                availableSize: new Size()
            };
        },
        output: function (): measure.IOutput {
            return {
                error: null,
                previousConstraint: new Size(),
                desiredSize: new Size(),
                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: 0,
                newUpDirty: 0,
                newDownDirty: 0,
                newUiFlags: 0
            }
        }
    };

    QUnit.test("validate", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.validate(input, state, output, new Size()));
        assert.ok(!output.error);

        assert.ok(!tapins.validate(input, state, output, new Size(NaN, NaN)));
        assert.ok(!!output.error);
    });

    QUnit.test("validateVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.validateVisibility(input, state, output, new Size()));

        input.visibility = minerva.Visibility.Collapsed;
        output.previousConstraint.width = 0;
        output.previousConstraint.height = 0;
        var as = new Size(1, 2);
        assert.ok(!tapins.validateVisibility(input, state, output, as));
        assert.notStrictEqual(output.previousConstraint, as);
        assert.deepEqual(output.previousConstraint, new Size(1, 2));
    });

    QUnit.test("applyTemplate", (assert) => {
        ok(true);
    });

    QUnit.test("checkNeedMeasure", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        assert.ok(!tapins.checkNeedMeasure(input, state, output, new Size(0, 0)));

        assert.ok(tapins.checkNeedMeasure(input, state, output, new Size(100, 100)));

        input.dirtyFlags |= DirtyFlags.Measure;
        assert.ok(tapins.checkNeedMeasure(input, state, output, new Size(0, 0)));
    });

    QUnit.test("invalidateFuture", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.invalidateFuture(input, state, output, new Size()));
        assert.strictEqual(output.dirtyFlags, DirtyFlags.Arrange | DirtyFlags.Bounds);
        assert.strictEqual(output.uiFlags, UIFlags.ArrangeHint);
    });

    QUnit.test("prepareOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        //basic
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(50, 100));

        //margin
        input.margin.left = 5;
        input.margin.top = 10;
        input.margin.right = 15;
        input.margin.bottom = 20;
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(30, 70));

        //margin+min/max coerced
        input.minWidth = 35;
        input.maxHeight = 65;
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(35, 65));

        //margin+size+uselayoutrounding
        input.minWidth = 0;
        input.maxHeight = Number.POSITIVE_INFINITY;
        input.width = 29.75;
        input.height = 50.25;
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(30, 50));

        //size+uselayoutrounding+min/max coerced
        input.margin.left = input.margin.top = input.margin.right = input.margin.bottom = 0;
        input.minWidth = 35;
        input.maxHeight = 45;
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(35, 45));
    });

    QUnit.test("doOverride", (assert) => {
        assert.ok(true);
    });

    QUnit.test("completeOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        input.dirtyFlags |= DirtyFlags.Measure;
        output.desiredSize.width = 35;
        output.desiredSize.height = 35;
        assert.ok(tapins.completeOverride(input, state, output, new Size(50, 50)));
        assert.equal(output.dirtyFlags, 0);
        assert.notStrictEqual(output.desiredSize, output.hiddenDesire);
        assert.deepEqual(output.hiddenDesire, new Size(35, 35));
    });

    QUnit.test("finishDesired", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        output.desiredSize.width = 50;
        output.desiredSize.height = 50;
        assert.ok(tapins.finishDesired(input, state, output, new Size(25.2, 24.8)));
        assert.deepEqual(output.desiredSize, new Size(25, 25));

        //margin
        output.desiredSize.width = 50;
        output.desiredSize.height = 50;
        input.margin.left = 5;
        input.margin.top = 10;
        input.margin.right = 15;
        input.margin.bottom = 20;
        assert.ok(tapins.finishDesired(input, state, output, new Size(100, 75)));
        assert.deepEqual(output.desiredSize, new Size(70, 75));

        //margin+min/max coerced
        input.margin.left = input.margin.top = input.margin.right = input.margin.bottom = 0;
        output.desiredSize.width = 50;
        output.desiredSize.height = 50;
        input.minWidth = 72.25;
        input.maxHeight = 65;
        assert.ok(tapins.prepareOverride(input, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(72, 65));
    });
}