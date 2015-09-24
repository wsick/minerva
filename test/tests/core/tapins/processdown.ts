module minerva.core.processdown.tapins.tests {
    QUnit.module("core.tapins.processdown");

    import Rect = minerva.Rect;
    import Size = minerva.Size;
    import Point = minerva.Point;
    import Thickness = minerva.Thickness;
    import DirtyFlags = minerva.DirtyFlags;
    import Visibility = minerva.Visibility;

    var mock = {
        input: function (): processdown.IInput {
            return <processdown.IInput>{
                visibility: Visibility.Visible,
                opacity: 1.0,
                isHitTestVisible: true,
                renderTransform: null,
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
                dirtyFlags: 0
            };
        },
        state: function (): processdown.IState {
            return {
                xformOrigin: new Point(),
                localXform: mat3.identity(),
                subtreeDownDirty: 0
            };
        },
        output: function (): processdown.IOutput {
            return {
                totalIsRenderVisible: true,
                totalOpacity: 1.0,
                totalIsHitTestVisible: true,
                z: NaN,
                compositeLayoutClip: new Rect(),
                renderXform: mat3.identity(),
                absoluteXform: mat3.identity(),
                dirtyFlags: 0,
                newUpDirty: 0
            };
        },
        tree: function (children: Updater[]): IUpdaterTree {
            var tree = new UpdaterTree();
            tree.walk = function (): IWalker<Updater> {
                var i = -1;
                return {
                    current: undefined,
                    step: function (): boolean {
                        i++;
                        this.current = children[i];
                        return this.current !== undefined;
                    }
                };
            };
            return tree;
        }
    };

    function typedToArray (typed) {
        var arr = [];
        for (var i = 0; i < typed.length; i++) {
            arr.push(typed[i]);
        }
        return arr;
    }

    QUnit.test("processRenderVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 1.0);
        assert.strictEqual(output.totalIsRenderVisible, true);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.dirtyFlags |= DirtyFlags.RenderVisibility;
        input.opacity = 0.5;
        vpinput.totalOpacity = 0.5;
        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 0.25);
        assert.strictEqual(output.totalIsRenderVisible, true);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.totalIsRenderVisible = true;
        state.subtreeDownDirty = 0;
        input.opacity = 1.0;
        vpinput.totalOpacity = 1.0;
        vpinput.totalIsRenderVisible = false;
        assert.ok(tapins.processRenderVisibility(input, state, output, vpinput));
        assert.strictEqual(output.totalOpacity, 1.0);
        assert.strictEqual(output.totalIsRenderVisible, false);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);
        assert.strictEqual(state.subtreeDownDirty, DirtyFlags.RenderVisibility);
    });

    QUnit.test("processHitTestVisibility", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        input.dirtyFlags |= DirtyFlags.HitTestVisibility;
        input.isHitTestVisible = false;
        assert.ok(tapins.processHitTestVisibility(input, state, output, null));
        assert.ok(!output.totalIsHitTestVisible);

        input.isHitTestVisible = true;
        assert.ok(tapins.processHitTestVisibility(input, state, output, null));
        assert.ok(output.totalIsHitTestVisible);

        assert.ok(tapins.processHitTestVisibility(input, state, output, vpinput));
        assert.ok(output.totalIsHitTestVisible);

        input.totalIsHitTestVisible = true;
        state.subtreeDownDirty = 0;
        vpinput.totalIsHitTestVisible = false;
        assert.ok(tapins.processHitTestVisibility(input, state, output, vpinput));
        assert.ok(!output.totalIsHitTestVisible);
        assert.strictEqual(state.subtreeDownDirty, DirtyFlags.HitTestVisibility);
    });

    QUnit.test("calcXformOrigin", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcXformOrigin(input, state, output, vpinput));
        assert.deepEqual(state.xformOrigin, new Point(0, 0));

        input.renderTransformOrigin = new Point(0.5, 0.75);
        input.actualWidth = 100;
        input.actualHeight = 200;
        assert.ok(tapins.calcXformOrigin(input, state, output, vpinput));
        assert.deepEqual(state.xformOrigin, new Point(50, 150));
    });

    QUnit.test("processLocalXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processLocalXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(state.localXform), [1, 0, 0, 1, 0, 0]);

        input.dirtyFlags |= DirtyFlags.LocalTransform;
        input.renderTransform = {
            getRaw () {
                return mat3.create([1, 0, 0, 2, 5, 0]);
            }
        };
        state.xformOrigin = new Point(50, 100);
        assert.ok(tapins.processLocalXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(state.localXform), [1, 0, 0, 2, 5, -100]);
    });

    QUnit.test("calcRenderXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [1, 0, 0, 1, 0, 0]);

        input.dirtyFlags |= DirtyFlags.Transform;
        mat3.init(input.carrierXform, 2, 0, 0, 2, 0, 0);
        mat3.init(input.layoutXform, 1, 0, 0, 1, 10, 50);
        mat3.init(state.localXform, -1, 0, 0, 1, 0, 0);
        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [-2, 0, 0, 2, 20, 100]);

        //Ensure running twice doesn't change renderXform
        mat3.copyTo(output.renderXform, input.renderXform);
        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [-2, 0, 0, 2, 20, 100]);

        //Ensure running again without a carrier doesn't affect the renderXform
        mat3.copyTo(output.renderXform, input.renderXform);
        input.carrierXform = null;
        assert.ok(tapins.calcRenderXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.renderXform), [-1, 0, 0, 1, 10, 50]);
    });

    QUnit.test("calcAbsoluteXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.calcAbsoluteXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteXform), [1, 0, 0, 1, 0, 0]);

        input.dirtyFlags |= DirtyFlags.Transform;
        mat3.init(output.renderXform, 2, 0, 0, 4, 0, 0);
        mat3.init(vpinput.absoluteXform, 1, 0, 0, 1, 50, 100);
        assert.ok(tapins.calcAbsoluteXform(input, state, output, vpinput));
        assert.deepEqual(typedToArray(output.absoluteXform), [2, 0, 0, 4, 50, 100]);
    });

    QUnit.test("processXform", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        input.dirtyFlags = DirtyFlags.Transform;
        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.notStrictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);

        state.subtreeDownDirty = 0;
        mat3.createScale(3, 2, output.renderXform);
        assert.ok(tapins.processXform(input, state, output, vpinput));
        assert.strictEqual(output.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.strictEqual(output.dirtyFlags & DirtyFlags.NewBounds, DirtyFlags.NewBounds);
        assert.strictEqual(state.subtreeDownDirty, DirtyFlags.Transform);
    });

    QUnit.test("processLayoutClip", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.deepEqual(output.compositeLayoutClip, new Rect());

        input.dirtyFlags |= DirtyFlags.LayoutClip;
        input.layoutClip = new Rect();
        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.deepEqual(output.compositeLayoutClip, new Rect());

        input.layoutClip = new Rect(10, 20, 90, 80);
        assert.ok(tapins.processLayoutClip(input, state, output, null));
        assert.deepEqual(output.compositeLayoutClip, new Rect(10, 20, 90, 80));

        vpinput.compositeLayoutClip = new Rect(30, 30, 20, 100);
        assert.ok(tapins.processLayoutClip(input, state, output, vpinput));
        assert.deepEqual(output.compositeLayoutClip, new Rect(30, 30, 20, 70));

        state.subtreeDownDirty = 0;
        input.layoutClip = new Rect();
        assert.ok(tapins.processLayoutClip(input, state, output, vpinput));
        assert.deepEqual(output.compositeLayoutClip, new Rect(30, 30, 20, 100));
        assert.strictEqual(state.subtreeDownDirty, DirtyFlags.LayoutClip);
    });

    QUnit.test("propagateDirtyToChildren", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var output = mock.output();
        var vpinput = mock.input();

        var added: Updater[] = [];
        var oldAddDownDirty = Updater.$$addDownDirty;
        Updater.$$addDownDirty = function (updater: Updater) {
            added.push(updater);
        };

        var children: Updater[] = [];
        children.push(new Updater());
        children.push(new Updater());
        var tree = mock.tree(children);

        assert.ok(tapins.propagateDirtyToChildren(input, state, output, vpinput, tree));
        assert.strictEqual(added.length, 0);

        state.subtreeDownDirty = DirtyFlags.RenderVisibility;
        assert.ok(tapins.propagateDirtyToChildren(input, state, output, vpinput, tree));
        assert.strictEqual(added[0], children[0]);
        assert.strictEqual(children[0].assets.dirtyFlags & DirtyFlags.RenderVisibility, DirtyFlags.RenderVisibility);
        assert.strictEqual(added[1], children[1]);
        assert.strictEqual(children[1].assets.dirtyFlags & DirtyFlags.RenderVisibility, DirtyFlags.RenderVisibility);

        Updater.$$addDownDirty = oldAddDownDirty;
    });
}