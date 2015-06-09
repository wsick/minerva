module minerva.shapes.ellipse.measure.tests {
    QUnit.module("shapes.ellipse.measure");

    var mock = {
        input: function (): shape.measure.IInput {
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

    QUnit.test("shrinkAvailable", (assert) => {
        var pipedef = new EllipseMeasurePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        state.availableSize = new Size(100, 100);
        assert.ok(tapins.shrinkAvailable(input, state, output, null));
        assert.deepEqual(state.availableSize, new Size(0, 0));
    });
}