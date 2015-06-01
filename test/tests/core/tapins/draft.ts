module minerva.core.draft.tapins.tests {
    QUnit.module("core.tapins.draft");

    var mock = {
        data: function (updater?: Updater): IDraftPipeData {
            return {
                updater: updater,
                assets: updater ? updater.assets : null,
                tree: updater ? updater.tree : null,
                flag: UIFlags.None,
                measureList: [],
                arrangeList: [],
                sizingList: [],
                surfaceSize: new Size(),
                sizingUpdates: []
            };
        },
        createUpdater: function (): Updater {
            return new core.Updater()
                .setTree();
        }
    };

    QUnit.test("flushPrevious", (assert) => {
        var data = mock.data();
        var vp = mock.createUpdater();
        data.updater = mock.createUpdater()
            .setVisualParent(vp);
        data.assets = data.updater.assets;
        var sibling = mock.createUpdater()
            .setVisualParent(vp);

        data.arrangeList.push(data.updater, sibling);
        assert.ok(tapins.flushPrevious(data));
        assert.strictEqual(data.updater.assets.uiFlags & UIFlags.ArrangeHint, UIFlags.ArrangeHint);
        assert.strictEqual(sibling.assets.uiFlags & UIFlags.ArrangeHint, UIFlags.ArrangeHint);
        assert.strictEqual(vp.assets.uiFlags & UIFlags.ArrangeHint, UIFlags.ArrangeHint);
        assert.strictEqual(data.arrangeList.length, 0);

        data.sizingList.push(data.updater, sibling);
        assert.ok(tapins.flushPrevious(data));
        assert.strictEqual(data.updater.assets.uiFlags & UIFlags.SizeHint, UIFlags.SizeHint);
        assert.strictEqual(sibling.assets.uiFlags & UIFlags.SizeHint, UIFlags.SizeHint);
        assert.strictEqual(vp.assets.uiFlags & UIFlags.SizeHint, UIFlags.SizeHint);
        assert.strictEqual(data.sizingList.length, 0);
    });

    QUnit.test("determinePhase", (assert) => {
        var data = mock.data(mock.createUpdater());
        var assets = data.updater.assets;

        assets.visibility = Visibility.Collapsed;
        assert.ok(tapins.determinePhase(data));
        assert.strictEqual(data.flag, UIFlags.None);

        assets.visibility = Visibility.Visible;
        assets.uiFlags |= (UIFlags.MeasureHint | UIFlags.ArrangeHint | UIFlags.SizeHint);
        assert.ok(tapins.determinePhase(data));
        assert.strictEqual(data.flag, UIFlags.MeasureHint);

        assets.uiFlags &= ~UIFlags.MeasureHint;
        assert.ok(tapins.determinePhase(data));
        assert.strictEqual(data.flag, UIFlags.ArrangeHint);

        assets.uiFlags &= ~UIFlags.ArrangeHint;
        assert.ok(tapins.determinePhase(data));
        assert.strictEqual(data.flag, UIFlags.SizeHint);

        assets.uiFlags &= ~UIFlags.SizeHint;
        assert.ok(!tapins.determinePhase(data));
        assert.strictEqual(data.flag, UIFlags.None);
    });

    QUnit.test("prepareMeasure", (assert) => {
        var items: Updater[] = [];
        var root = minerva.tests.mock.createTree(items);
        var data = mock.data(root);
        var assets = root.assets;

        for (var i = 0; i < items.length; i++) {
            items[i].assets.uiFlags |= UIFlags.MeasureHint;
            items[i].assets.dirtyFlags |= DirtyFlags.Measure;
        }

        data.flag = UIFlags.MeasureHint;
        root.tree.isContainer = true;
        data.surfaceSize = new Size(100, 200);
        assert.ok(tapins.prepareMeasure(data));
        assert.strictEqual(assets.dirtyFlags & DirtyFlags.Measure, DirtyFlags.Measure);
        assert.strictEqual(assets.uiFlags & UIFlags.MeasureHint, UIFlags.None);
        assert.deepEqual(assets.previousConstraint, new Size(100, 200));
        assert.strictEqual(data.measureList.length, 8);
        for (var i = 0, list = data.measureList; i < list.length; i++) {
            assert.strictEqual(list[i].assets.uiFlags & UIFlags.MeasureHint, UIFlags.None);
        }
    });

    QUnit.test("measure", (assert) => {
        var root = minerva.tests.mock.createTree();
        var data = mock.data(root);
        var assets = root.assets;

        data.flag |= UIFlags.MeasureHint;
        assets.dirtyFlags |= DirtyFlags.Measure;
        data.measureList.push(root);
        assets.previousConstraint = new Size(400, 400);
        assert.ok(tapins.measure(data));
        assert.strictEqual(assets.dirtyFlags & DirtyFlags.Measure, 0);
        assert.strictEqual(assets.dirtyFlags & DirtyFlags.Arrange, DirtyFlags.Arrange);
        assert.strictEqual(assets.uiFlags & UIFlags.ArrangeHint, UIFlags.ArrangeHint);
        assert.strictEqual(assets.dirtyFlags & DirtyFlags.Bounds, DirtyFlags.Bounds);
        assert.deepEqual(data.assets.desiredSize, new Size());
    });

    QUnit.test("prepareArrange", (assert) => {
        assert.ok(true);
    });

    QUnit.test("arrange", (assert) => {
        assert.ok(true);
    });

    QUnit.test("prepareSizing", (assert) => {
        assert.ok(true);
    });

    QUnit.test("sizing", (assert) => {
        assert.ok(true);
    });

    QUnit.test("notifyResize", (assert) => {
        assert.ok(true);
    });
}