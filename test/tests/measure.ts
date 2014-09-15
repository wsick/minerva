/// <reference path="../qunit.d.ts" />
/// <reference path="../lib/minerva/minerva" />

module tests.measure {
    QUnit.module("Measure Pipe");

    import measure = minerva.def.measure;
    import tapins = minerva.def.measure.tapins;
    import Rect = minerva.Rect;
    import Size = minerva.Size;

    var mock = {
        assets: function (): measure.IAssets {
            return <measure.IAssets> {
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
                dirtyFlags: 0
            };
        },
        state: function (): measure.IState {
            return <measure.IState> {
                availableSize: new Size()
            };
        },
        output: function (): measure.IOutput {
            return <measure.IOutput> {
                error: null,
                previousConstraint: new Size(),
                desiredSize: new Size(),
                hiddenDesire: new Size(),
                dirtyFlags: 0
            }
        }
    };

    QUnit.test("validate", (assert) => {
        var assets = mock.assets();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.validate(assets, state, output, new Size()));
        assert.ok(!output.error);

        assert.ok(!tapins.validate(assets, state, output, new Size(NaN, NaN)));
        assert.ok(!!output.error);
    });
}