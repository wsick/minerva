module minerva.shapes.shape.processup.tests {
    QUnit.module("shapes.shape.processup");

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
                clip: null,
                actualWidth: 0,
                actualHeight: 0,
                effectPadding: new Thickness(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                layoutClip: new Rect(),
                extents: new Rect(),
                extentsWithChildren: new Rect(),
                globalBoundsWithChildren: new Rect(),
                surfaceBoundsWithChildren: new Rect(),
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                dirtyFlags: 0,
                dirtyRegion: new Rect(),
                forceInvalidate: false,

                stroke: null,
                strokeThickness: 0,

                shapeFlags: ShapeFlags.None,
                shapeRect: new Rect()
            };
        }
    }

    QUnit.test("calcExtents", (assert) => {
        var pipedef = new ShapeProcessUpPipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.dirtyFlags |= DirtyFlags.Bounds;
        state.actualSize = new Size(100, 200);
        assert.ok(tapins.calcExtents(input, state, output, null));
        assert.deepEqual(output.extents, new Rect(0, 0, 100, 200));
        assert.deepEqual(output.extentsWithChildren, new Rect(0, 0, 100, 200));
    });

    QUnit.test("calcShapeRect", (assert) => {
        var pipedef = new ShapeProcessUpPipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.dirtyFlags |= DirtyFlags.Bounds;
        output.extents = new Rect(0, 0, 100, 100);
        input.stroke = <any>{};
        input.strokeThickness = 15;
        assert.ok(tapins.calcShapeRect(input, state, output, null));
        assert.deepEqual(output.shapeRect, new Rect(7.5, 7.5, 85, 85));
        assert.strictEqual(output.shapeFlags, ShapeFlags.Normal);

        output.extents = new Rect(0, 0, 0, 0);
        assert.ok(tapins.calcShapeRect(input, state, output, null));
        assert.deepEqual(output.shapeRect, new Rect(0, 0, 0, 0));
        assert.strictEqual(output.shapeFlags, ShapeFlags.Empty);

        output.extents = new Rect(0, 0, 10, 10);
        assert.ok(tapins.calcShapeRect(input, state, output, null));
        assert.deepEqual(output.shapeRect, new Rect(7.5, 7.5, 0.015000000000000568, 0.015000000000000568));
        assert.strictEqual(output.shapeFlags, ShapeFlags.Degenerate);
    });
}