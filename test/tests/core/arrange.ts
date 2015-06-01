module minerva.core.arrange.tests {
    QUnit.module("core.arrange");

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

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
                layoutClip: new Rect() //NOTE: empty represents no layout clip
            };
        }
    };

    QUnit.test("prepare", (assert) => {
        var pipedef = new ArrangePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.dirtyFlags = DirtyFlags.Measure;
        input.uiFlags = UIFlags.MeasureHint;

        input.renderSize = new Size(100, 200);
        input.layoutSlot = new Rect(10, 15, 150, 300);
        input.layoutXform = mat3.create([1, 2, 3, 4, 5, 6]);
        input.layoutClip = new Rect(50, 50, 50, 50);

        pipedef.prepare(input, state, output);

        assert.strictEqual(input.lastRenderSize, output.lastRenderSize);
        assert.notStrictEqual(input.renderSize, output.renderSize);
        assert.deepEqual(output.renderSize, new Size(100, 200));
        assert.notStrictEqual(input.layoutSlot, output.layoutSlot);
        assert.deepEqual(output.layoutSlot, new Rect(10, 15, 150, 300));
        assert.notStrictEqual(input.layoutXform, output.layoutXform);
        assert.deepEqual(typedToArray(output.layoutXform), [1, 2, 3, 4, 5, 6]);
        assert.notStrictEqual(input.layoutClip, output.layoutClip);
        assert.deepEqual(output.layoutClip, new Rect(50, 50, 50, 50));

        assert.strictEqual(output.dirtyFlags, DirtyFlags.Measure);
        assert.strictEqual(output.uiFlags, UIFlags.MeasureHint);
    });

    QUnit.test("flush", (assert) => {
        var pipedef = new ArrangePipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        output.origDirtyFlags = input.dirtyFlags = DirtyFlags.Arrange;
        output.dirtyFlags = DirtyFlags.Measure | DirtyFlags.Arrange | DirtyFlags.Transform;
        output.origUiFlags = input.uiFlags = UIFlags.MeasureHint;
        output.uiFlags = UIFlags.MeasureHint | UIFlags.ArrangeHint;

        output.renderSize = new Size(100, 200);
        output.layoutSlot = new Rect(10, 15, 150, 300);
        output.layoutXform = mat3.create([1, 2, 3, 4, 5, 6]);
        output.layoutClip = new Rect(50, 50, 50, 50);

        pipedef.flush(input, state, output);

        assert.strictEqual(input.lastRenderSize, output.lastRenderSize);
        assert.notStrictEqual(input.renderSize, output.renderSize);
        assert.deepEqual(input.renderSize, new Size(100, 200));
        assert.notStrictEqual(input.layoutSlot, output.layoutSlot);
        assert.deepEqual(input.layoutSlot, new Rect(10, 15, 150, 300));
        assert.notStrictEqual(input.layoutXform, output.layoutXform);
        assert.deepEqual(typedToArray(input.layoutXform), [1, 2, 3, 4, 5, 6]);
        assert.notStrictEqual(input.layoutClip, output.layoutClip);
        assert.deepEqual(input.layoutClip, new Rect(50, 50, 50, 50));

        assert.strictEqual(input.dirtyFlags, DirtyFlags.Measure | DirtyFlags.Arrange | DirtyFlags.Transform);
        assert.strictEqual(input.uiFlags, UIFlags.MeasureHint | UIFlags.ArrangeHint);

        assert.strictEqual(output.newDownDirty, DirtyFlags.Transform);
        assert.strictEqual(output.newUpDirty, 0);
        assert.strictEqual(output.newUiFlags, UIFlags.ArrangeHint);
    });
}