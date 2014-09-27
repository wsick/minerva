/// <reference path="../../../qunit" />
/// <reference path="../../../lib/minerva/minerva" />

module minerva.layout.draft.tapins.tests {
    QUnit.module("Draft Pipe Tapins");

    var mock = {
        data: function (updater?: Updater): IDraftPipeData {
            return {
                updater: updater,
                assets: updater ? updater.assets : null,
                flag: UIFlags.None,
                measureList: [],
                arrangeList: [],
                sizingList: [],
                surfaceSize: new Size(),
                sizingUpdates: []
            };
        },
        createUpdater: function (): Updater {
            return new layout.Updater();
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
        assert.ok(true);
    });

    QUnit.test("measure", (assert) => {
        assert.ok(true);
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