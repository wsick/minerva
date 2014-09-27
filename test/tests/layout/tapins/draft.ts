/// <reference path="../../../qunit" />
/// <reference path="../../../lib/minerva/minerva" />

module minerva.layout.draft.tapins.tests {
    QUnit.module("Draft Pipe Tapins");

    var mock = {
        data: function (): IDraftPipeData {
            return {
                updater: null,
                assets: null,
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
}