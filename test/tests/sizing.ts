/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

module tests.sizing {
    QUnit.module("Sizing Pipe");

    import sizing = minerva.def.sizing;
    import tapins = minerva.def.sizing.tapins;
    import Visibility = minerva.Visibility;
    import Size = minerva.Size;

    var mock = {
        input: function (): sizing.IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,
                visibility: Visibility.Visible,
                renderSize: new Size(),
                actualWidth: 0,
                actualHeight: 0
            };
        },
        state: function (): sizing.IState {
            return {
                useRender: false
            };
        },
        output: function (): sizing.IOutput {
            return {
                actualSize: new Size()
            }
        }
    };

    QUnit.test("calcUseRender", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.calcUseRender(input, state, output));
        assert.strictEqual(state.useRender, true);
    });

    QUnit.test("computeActual", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();

        input.visibility = Visibility.Collapsed;
        assert.ok(tapins.computeActual(input, state, output));
        assert.deepEqual(output.actualSize, new Size(0, 0));

        state.useRender = true;
        input.visibility = Visibility.Visible;
        input.renderSize.width = 100.2;
        input.renderSize.height = 150.5;
        assert.ok(tapins.computeActual(input, state, output));
        assert.deepEqual(output.actualSize, input.renderSize);
        assert.notStrictEqual(output.actualSize, input.renderSize);

        state.useRender = false;
        input.width = 50;
        input.height = 100;
        assert.ok(tapins.computeActual(input, state, output));
        assert.deepEqual(output.actualSize, new Size(50, 100));
    });
}