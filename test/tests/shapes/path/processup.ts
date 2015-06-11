module minerva.shapes.path.processup.tests {
    QUnit.module("shapes.path.processup");

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
                shapeRect: new Rect(),
                naturalBounds: new Rect(),
                data: null,
                stretch: Stretch.None,
                stretchXform: mat3.identity()
            };
        },
        tree: function (visualParent: core.Updater): core.IUpdaterTree {
            return <any>{
                isTop: !visualParent,
                visualOwner: visualParent,
                visualParent: visualParent
            };
        }
    };

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    QUnit.test("calcActualSize", (assert) => {
        var vparent = new core.Updater();

        var pipedef = new PathProcessUpPipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();
        var tree = mock.tree(vparent);

        input.actualWidth = 50;
        input.actualHeight = 100;

        //empty natural bounds -> empty actual size
        input.dirtyFlags |= DirtyFlags.Bounds;
        input.naturalBounds = new Rect(0, 0, 0, 10);
        input.width = NaN;
        input.height = NaN;
        assert.ok(tapins.calcActualSize(input, state, output, tree));
        assert.deepEqual(state.actualSize, new Size(0, 0));

        //0-width or 0-height -> empty actual size
        input.naturalBounds = new Rect(15, 30, 150, 300);
        input.width = 0;
        input.height = 0;
        assert.ok(tapins.calcActualSize(input, state, output, tree));
        assert.deepEqual(state.actualSize, new Size(0, 0));

        //actuals -> actual size
        input.width = NaN;
        input.height = NaN;
        assert.ok(tapins.calcActualSize(input, state, output, tree));
        assert.deepEqual(state.actualSize, new Size(50, 100));

        //inside canvas with no actual width
        input.actualWidth = 0;
        tree = mock.tree(new controls.canvas.CanvasUpdater());
        assert.ok(tapins.calcActualSize(input, state, output, tree));
        assert.deepEqual(state.actualSize, new Size(150, 100));

        //inside canvas
        input.actualWidth = 50;
        tree = mock.tree(new controls.canvas.CanvasUpdater());
        assert.ok(tapins.calcActualSize(input, state, output, tree));
        assert.deepEqual(state.actualSize, new Size(50, 100));
    });

    QUnit.test("calcStretch", (assert) => {
        var pipedef = new PathProcessUpPipeDef();
        var input = mock.input();
        var state = pipedef.createState();
        var output = pipedef.createOutput();

        input.dirtyFlags |= DirtyFlags.Bounds;
        output.shapeRect = new Rect(-10, 20, 50, 100);

        //empty actual size -> identity
        output.stretchXform = [1, 2, 3, 4, 5, 6];
        state.actualSize = new Size(0, 0);
        input.stretch = Stretch.None;
        assert.ok(tapins.calcStretch(input, state, output, null));
        assert.deepEqual(typedToArray(output.stretchXform), [1, 0, 0, 1, 0, 0]);

        //no stretch -> identity
        output.stretchXform = [1, 2, 3, 4, 5, 6];
        state.actualSize = new Size(50, 50);
        assert.ok(tapins.calcStretch(input, state, output, null));
        assert.deepEqual(typedToArray(output.stretchXform), [1, 0, 0, 1, 0, 0]);

        //Fill
        input.stretch = Stretch.Fill;
        assert.ok(tapins.calcStretch(input, state, output, null));
        assert.deepEqual(typedToArray(output.stretchXform), [1, 0, 0, 0.5, 10, -10]);

        //Uniform
        input.stretch = Stretch.Uniform;
        assert.ok(tapins.calcStretch(input, state, output, null));
        assert.deepEqual(typedToArray(output.stretchXform), [0.5, 0, 0, 0.5, 17.5, -10]);

        //UniformToFill
        input.stretch = Stretch.UniformToFill;
        assert.ok(tapins.calcStretch(input, state, output, null));
        assert.deepEqual(typedToArray(output.stretchXform), [1, 0, 0, 1, 10, -20]);
    });
}