/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

module tests.arrange {
    QUnit.module("Arrange Pipe");

    import arrange = minerva.def.arrange;
    import tapins = minerva.def.arrange.tapins;
    import Rect = minerva.Rect;
    import Size = minerva.Size;

    var mock = {
        input: function (): arrange.IInput {
            return <arrange.IInput> {
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
                layoutSlot: new Rect()
            };
        },
        state: function (): arrange.IState {
            return <arrange.IState> {
                finalRect: new Rect(),
                finalSize: new Size(),
                framework: new Size(),
                stretched: new Size()
            };
        },
        output: function (): arrange.IOutput {
            return <arrange.IOutput> {
                error: null,
                layoutSlot: new Rect(),
                dirtyFlags: 0
            }
        }
    };

    QUnit.test("applyRounding", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0.25, 0.75, 50.25, 50.50);
        assert.ok(tapins.applyRounding(input, state, output, fr));
        assert.notStrictEqual(state.finalRect, fr);
        assert.deepEqual(state.finalRect, new Rect(0, 1, 50, 51));

        input.useLayoutRounding = false;
        assert.ok(tapins.applyRounding(input, state, output, fr));
        assert.notStrictEqual(state.finalRect, fr);
        assert.deepEqual(state.finalRect, new Rect(0.25, 0.75, 50.25, 50.50));
    });

    QUnit.test("validateFinalRect", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0, 0, 50, 50);
        Rect.copyTo(fr, state.finalRect);
        assert.ok(tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.width = -1;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.width = NaN;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.width = Number.POSITIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.width = Number.NEGATIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));
        state.finalRect.width = 50;

        state.finalRect.height = -1;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.height = NaN;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.height = Number.POSITIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));

        state.finalRect.height = Number.NEGATIVE_INFINITY;
        assert.ok(!tapins.validateFinalRect(input, state, output, fr));
    });

    QUnit.test("validateVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0, 0, 50, 50);
        assert.ok(tapins.validateVisibility(input, state, output, fr));

        input.visibility = minerva.Visibility.Collapsed;
        assert.ok(!tapins.validateVisibility(input, state, output, fr));
    });

    QUnit.test("checkNeedArrange", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0, 0, 50, 50);
        Rect.copyTo(fr, state.finalRect);
        var ls = output.layoutSlot;
        ls.width = 50;
        ls.height = 50;
        assert.ok(!tapins.checkNeedArrange(input, state, output, fr));

        input.dirtyFlags |= minerva.layout.DirtyFlags.Arrange;
        assert.ok(tapins.checkNeedArrange(input, state, output, fr));
        input.dirtyFlags = 0;

        ls.width = 100;
        ls.height = 100;
        assert.ok(tapins.checkNeedArrange(input, state, output, fr));
    });

    QUnit.test("invalidateFuture", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        ok(true);
    });

    QUnit.test("calcStretched", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0, 0, 100, 100);
        Rect.copyTo(fr, state.finalRect);
        input.margin.left = input.margin.top = input.margin.right = input.margin.bottom = 5;
        assert.ok(tapins.calcStretched(input, state, output, fr));
        assert.notStrictEqual(output.layoutSlot, fr);
        assert.deepEqual(output.layoutSlot, new Rect(0, 0, 100, 100));
        assert.deepEqual(state.stretched, new Size(90, 90));
    });

    QUnit.test("prepareOverride", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        var fr = new Rect(0, 0, 100, 100);
        Rect.copyTo(fr, state.finalRect);
        input.width = 150;
        input.height = 75;
        input.hiddenDesire.width = 145;
        input.hiddenDesire.height = 80;
        state.stretched.width = 151;
        state.stretched.height = 70;
        assert.ok(tapins.prepareOverride(input, state, output, fr));
        assert.deepEqual(state.finalSize, new Size(151, 80));
    });
}