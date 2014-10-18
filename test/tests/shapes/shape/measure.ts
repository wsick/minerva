module minerva.shapes.shape.measure.tests {
    QUnit.module("Shape Measure Tests");

    var mock = {
        input: function (): IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,

                margin: new Thickness(),
                visibility: Visibility.Visible,

                previousConstraint: new Size(),
                desiredSize: new Size(),
                hiddenDesire: new Size(),

                dirtyFlags: 0,
                uiFlags: UIFlags.None,

                fill: null,
                stretch: Stretch.None,
                stroke: null,
                strokeThickness: 0,
                strokeDashArray: [],
                strokeDashCap: PenLineCap.Flat,
                strokeDashOffset: 5,
                strokeEndLineCap: PenLineCap.Flat,
                strokeLineJoin: PenLineJoin.Miter,
                strokeMiterLimit: 10,
                strokeStartLineCap: PenLineCap.Flat,

                naturalBounds: new Rect()
            };
        }
    };

    QUnit.test("calcNaturalBounds", (assert) => {
        var pipedef = new ShapeMeasurePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        assert.ok(tapins.calcNaturalBounds(input, state, output, null));
        assert.deepEqual(output.naturalBounds, new Rect(0, 0, 1, 1));
    });

    QUnit.test("doOverride", (assert) => {
        var pipedef = new ShapeMeasurePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.stretch = Stretch.None;
        output.naturalBounds = new Rect(0, 0, 50, 50);
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(output.desiredSize, new Size(0, 0));

        input.stretch = Stretch.Fill;
        state.availableSize = new Size(100, 150);
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(output.desiredSize, new Size(100, 150));

        input.stretch = Stretch.Uniform;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(output.desiredSize, new Size(100, 100));

        input.stretch = Stretch.UniformToFill;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(output.desiredSize, new Size(150, 150));
    });
}