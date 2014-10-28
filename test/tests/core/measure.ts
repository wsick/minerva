module minerva.core.measure.tests {
    QUnit.module("Measure Pipe");

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
                uiFlags: UIFlags.None
            };
        }
    };

    QUnit.test("prepare", (assert) => {
        var pipedef = new MeasurePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.previousConstraint = new Size(100, 200);
        input.desiredSize = new Size(50, 150);
        input.hiddenDesire = new Size(75, 125);
        input.dirtyFlags = DirtyFlags.Measure;
        input.uiFlags = UIFlags.MeasureHint;

        pipedef.prepare(input, state, output);

        assert.notStrictEqual(input.previousConstraint, output.previousConstraint);
        assert.deepEqual(output.previousConstraint, new Size(100, 200));

        assert.notStrictEqual(input.desiredSize, output.desiredSize);
        assert.deepEqual(output.desiredSize, new Size(50, 150));

        assert.notStrictEqual(input.hiddenDesire, output.hiddenDesire);
        assert.deepEqual(output.hiddenDesire, new Size(75, 125));

        assert.strictEqual(output.dirtyFlags, DirtyFlags.Measure);
        assert.strictEqual(output.uiFlags, UIFlags.MeasureHint);
    });

    QUnit.test("flush", (assert) => {
        var pipedef = new MeasurePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        output.previousConstraint = new Size(100, 200);
        output.desiredSize = new Size(50, 150);
        output.hiddenDesire = new Size(75, 125);
        output.origDirtyFlags = input.dirtyFlags = DirtyFlags.Arrange;
        output.dirtyFlags = DirtyFlags.Measure | DirtyFlags.Arrange | DirtyFlags.Transform;
        output.origUiFlags = input.uiFlags = UIFlags.MeasureHint;
        output.uiFlags = UIFlags.MeasureHint | UIFlags.ArrangeHint;

        pipedef.flush(input, state, output);

        assert.notStrictEqual(input.previousConstraint, output.previousConstraint);
        assert.deepEqual(input.previousConstraint, new Size(100, 200));

        assert.notStrictEqual(input.desiredSize, output.desiredSize);
        assert.deepEqual(input.desiredSize, new Size(50, 150));

        assert.notStrictEqual(input.hiddenDesire, output.hiddenDesire);
        assert.deepEqual(input.hiddenDesire, new Size(75, 125));

        assert.strictEqual(input.dirtyFlags, DirtyFlags.Measure | DirtyFlags.Arrange | DirtyFlags.Transform);
        assert.strictEqual(input.uiFlags, UIFlags.MeasureHint | UIFlags.ArrangeHint);

        assert.strictEqual(output.newDownDirty, DirtyFlags.Transform);
        assert.strictEqual(output.newUpDirty, 0);
        assert.strictEqual(output.newUiFlags, UIFlags.ArrangeHint);
    });
}