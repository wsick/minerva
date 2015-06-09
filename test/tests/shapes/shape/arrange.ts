module minerva.shapes.shape.arrange.tests {
    QUnit.module("shapes.shape.arrange");

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
                horizontalAlignment: HorizontalAlignment.Stretch,
                verticalAlignment: VerticalAlignment.Stretch,
                visibility: Visibility.Visible,

                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: UIFlags.None,

                layoutSlot: new Rect(),
                renderSize: new Size(),
                visualOffset: new Point(),
                lastRenderSize: null,
                layoutXform: mat3.identity(),
                layoutClip: new Rect(), //NOTE: empty represents no layout clip

                stretch: Stretch.None,
                fill: null,
                fillRule: FillRule.EvenOdd,
                stroke: null,
                strokeThickness: 0,
                strokeStartLineCap: PenLineCap.Flat,
                strokeEndLineCap: PenLineCap.Flat,
                strokeLineJoin: PenLineJoin.Miter,
                strokeMiterLimit: 10,

                naturalBounds: new Rect()
            };
        }
    };

    QUnit.test("doOverride", (assert) => {
        var pipedef = new ShapeArrangePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        state.finalSize = new Size(100, 150);
        input.naturalBounds = new Rect(0, 0, 50, 50);
        input.stretch = Stretch.None;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(state.arrangedSize, new Size(100, 150));

        input.stretch = Stretch.Fill;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(state.arrangedSize, new Size(100, 150));

        input.stretch = Stretch.Uniform;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(state.arrangedSize, new Size(100, 100));

        input.stretch = Stretch.UniformToFill;
        assert.ok(tapins.doOverride(input, state, output, null));
        assert.deepEqual(state.arrangedSize, new Size(150, 150));
    });
}