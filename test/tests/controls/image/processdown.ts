module minerva.controls.image.processdown.tests {
    QUnit.module("Image ProcessDown Tapins");

    var mock = {
        input: function (): IInput {
            return {
                visibility: Visibility.Visible,
                opacity: 1.0,
                isHitTestVisible: true,
                renderTransform: mat3.identity(),
                renderTransformOrigin: new Point(),
                projection: null,
                actualWidth: 0,
                actualHeight: 0,
                surfaceBoundsWithChildren: new Rect(),
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                totalIsHitTestVisible: true,
                z: NaN,
                layoutClip: new Rect(),
                compositeLayoutClip: new Rect(),
                layoutXform: mat3.identity(),
                carrierXform: mat3.identity(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                carrierProjection: mat4.identity(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                totalHasRenderProjection: false,
                dirtyFlags: 0,
                //ISized
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,
                //IMAGE
                source: null,
                stretch: Stretch.None,
                imgXform: mat3.identity(),
                overlap: RectOverlap.In,
                renderSize: new Size()
            };
        },
        state: function (): IState {
            return {
                xformOrigin: new Point(),
                localXform: mat3.identity(),
                renderAsProjection: mat4.identity(),
                //IMAGE
                imgRect: new Rect(),
                paintRect: new Rect(),
                calcImageMetrics: false,
                stretched: new Rect(),
                imgAdjust: false
            };
        },
        output: function (): IOutput {
            return {
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                totalIsHitTestVisible: true,
                z: NaN,
                compositeLayoutClip: new Rect(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                localProjection: mat4.identity(),
                absoluteProjection: mat4.identity(),
                totalHasRenderProjection: false,
                dirtyFlags: 0,
                newUpDirty: 0,
                //IMAGE
                imgXform: mat3.identity(),
                overlap: RectOverlap.In
            };
        },
        imageSource: function (): IImageSource {
            return {
                islocked: false,
                image: null,
                pixelWidth: 0,
                pixelHeight: 0,
                lock: function () {
                    this.islocked = true;
                },
                unlock: function () {
                    this.islocked = false;
                }
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

    QUnit.test("checkNeedImageMetrics", (assert) => {
        //DOF: dirtyFlags, source
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.checkNeedImageMetrics(input, state, output, vpinput, null));
        assert.strictEqual(state.calcImageMetrics, false);

        input.dirtyFlags |= DirtyFlags.ImageMetrics;
        assert.ok(tapins.checkNeedImageMetrics(input, state, output, vpinput, null));
        assert.strictEqual(state.calcImageMetrics, false);

        input.source = mock.imageSource();
        assert.ok(tapins.checkNeedImageMetrics(input, state, output, vpinput, null));
        assert.strictEqual(state.calcImageMetrics, true);
    });

    QUnit.test("prepareImageMetrics", (assert) => {
        //DOF: imgRect, stretch, actualWidth, actualHeight, renderSize, (width, height, minWidth, minHeight, maxWidth, maxHeight, useLayoutRounding)
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        state.calcImageMetrics = true;

        input.source = mock.imageSource();
        input.source.pixelWidth = 50;
        input.source.pixelHeight = 100;
        assert.strictEqual((<any>input.source).islocked, false);
        assert.ok(tapins.prepareImageMetrics(input, state, output, vpinput, null));
        assert.deepEqual(state.imgRect, new Rect(0, 0, 50, 100));
        assert.strictEqual((<any>input.source).islocked, false);

        input.actualWidth = 100;
        input.actualHeight = 200;
        input.renderSize = new Size(100, 100);
        assert.ok(tapins.prepareImageMetrics(input, state, output, vpinput, null));
        assert.strictEqual(state.imgAdjust, true);

        input.actualWidth = 100;
        input.actualHeight = 200;
        input.renderSize = new Size(100, 200);
        assert.ok(tapins.prepareImageMetrics(input, state, output, vpinput, null));
        assert.strictEqual(state.imgAdjust, false);

        input.source.pixelWidth = 50;
        input.source.pixelHeight = 50;
        input.stretch = Stretch.UniformToFill;
        assert.ok(tapins.prepareImageMetrics(input, state, output, vpinput, null));
        assert.deepEqual(state.imgRect, new Rect(0, 0, 50, 50));
        assert.deepEqual(state.paintRect, new Rect(0, 0, 100, 200));
    });

    QUnit.test("calcImageTransform", (assert) => {
        //DOF: Stretch, imgRect, paintRect
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        state.calcImageMetrics = true;

        input.stretch = Stretch.None;
        state.paintRect = new Rect(0, 0, 100, 200);
        state.imgRect = new Rect(25, 25, 50, 50);
        assert.ok(tapins.calcImageTransform(input, state, output, vpinput, null));
        assert.deepEqual(typedToArray(output.imgXform), [1, 0, 25, 0, 1, 75, 0, 0, 1]);

        input.stretch = Stretch.Uniform;
        assert.ok(tapins.calcImageTransform(input, state, output, vpinput, null));
        assert.deepEqual(typedToArray(output.imgXform), [2, 0, 0, 0, 2, 50, 0, 0, 1]);

        input.stretch = Stretch.UniformToFill;
        assert.ok(tapins.calcImageTransform(input, state, output, vpinput, null));
        assert.deepEqual(typedToArray(output.imgXform), [4, 0, -50, 0, 4, 0, 0, 0, 1]);

        input.stretch = Stretch.Fill;
        assert.ok(tapins.calcImageTransform(input, state, output, vpinput, null));
        assert.deepEqual(typedToArray(output.imgXform), [2, 0, 0, 0, 4, 0, 0, 0, 1]);
    });

    QUnit.test("calcOverlap", (assert) => {
        //DOF: imgRect, paintRect, imgXform
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        state.calcImageMetrics = true;

        state.imgAdjust = true;
        state.imgRect = new Rect(0, 0, 50, 100);
        state.paintRect = new Rect(0, 0, 50, 100);
        assert.ok(tapins.calcOverlap(input, state, output, vpinput, null));
        assert.strictEqual(output.overlap, RectOverlap.In);

        state.imgRect = new Rect(0, 0, 50, 100);
        state.paintRect = new Rect(0, 0, 50, 100);
        mat3.set([1, 0, 50, 0, 1, 100, 0, 0, 1], output.imgXform);
        assert.ok(tapins.calcOverlap(input, state, output, vpinput, null));
        assert.strictEqual(output.overlap, RectOverlap.Out);

        state.imgRect = new Rect(0, 0, 50, 100);
        state.paintRect = new Rect(0, 0, 50, 100);
        mat3.set([1, 0, 10, 0, 1, 20, 0, 0, 1], output.imgXform);
        assert.ok(tapins.calcOverlap(input, state, output, vpinput, null));
        assert.strictEqual(output.overlap, RectOverlap.Part);
    });
}