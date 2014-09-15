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

    QUnit.test("validateVisibility", (assert) => {
        var assets = mock.assets();
        var state = mock.state();
        var output = mock.output();

        assert.ok(tapins.validateVisibility(assets, state, output, new Size()));

        assets.visibility = minerva.Visibility.Collapsed;
        output.previousConstraint.width = 0;
        output.previousConstraint.height = 0;
        var as = new Size(1, 2);
        assert.ok(!tapins.validateVisibility(assets, state, output, as));
        assert.notStrictEqual(output.previousConstraint, as);
        assert.deepEqual(output.previousConstraint, new Size(1, 2));
    });

    QUnit.test("applyTemplate", (assert) => {
        ok(true);
    });

    QUnit.test("checkNeedMeasure", (assert) => {
        var assets = mock.assets();
        var state = mock.state();
        var output = mock.output();

        assert.ok(!tapins.checkNeedMeasure(assets, state, output, new Size(0, 0)));

        assert.ok(tapins.checkNeedMeasure(assets, state, output, new Size(100, 100)));

        assets.dirtyFlags |= minerva.layout.DirtyFlags.Measure;
        assert.ok(tapins.checkNeedMeasure(assets, state, output, new Size(0, 0)));
    });

    QUnit.test("invalidateFuture", (assert) => {
        console.warn("invalidateFuture needs implemented.");
        ok(true);
    });

    QUnit.test("prepareOverride", (assert) => {
        var assets = mock.assets();
        var state = mock.state();
        var output = mock.output();

        //basic
        assert.ok(tapins.prepareOverride(assets, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(50, 100));

        //margin
        assets.margin.left = 5;
        assets.margin.top = 10;
        assets.margin.right = 15;
        assets.margin.bottom = 20;
        assert.ok(tapins.prepareOverride(assets, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(30, 70));

        //margin+min/max coerced
        assets.minWidth = 35;
        assets.maxHeight = 65;
        assert.ok(tapins.prepareOverride(assets, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(35, 65));

        //margin+size+uselayoutrounding
        assets.minWidth = 0;
        assets.maxHeight = Number.POSITIVE_INFINITY;
        assets.width = 29.75;
        assets.height = 50.25;
        assert.ok(tapins.prepareOverride(assets, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(30, 50));

        //size+uselayoutrounding+min/max coerced
        assets.minWidth = 35;
        assets.maxHeight = 45;
        assert.ok(tapins.prepareOverride(assets, state, output, new Size(50, 100)));
        assert.deepEqual(state.availableSize, new Size(35, 45));
    });

    QUnit.test("doOverride", (assert) => {
        assert.ok(true);
    });

    QUnit.test("completeOverride", (assert) => {
        var assets = mock.assets();
        var state = mock.state();
        var output = mock.output();

        assets.dirtyFlags |= minerva.layout.DirtyFlags.Measure;
        output.desiredSize.width = 35;
        output.desiredSize.height = 35;
        assert.ok(tapins.completeOverride(assets, state, output, new Size(50, 50)));
        assert.equal(output.dirtyFlags, 0);
        assert.notStrictEqual(output.desiredSize, output.hiddenDesire);
        assert.deepEqual(output.hiddenDesire, new Size(35, 35));
    });
}