module minerva.controls.textboxview.caret.tests {
    QUnit.module("TextBoxView Caret Tests");

    var mock = {
        updater: function () {
            return new TextBoxViewUpdater();
        },
        textUpdater: function () {
            return new text.TextUpdater();
        }
    };

    QUnit.test("getCursorFromPoint", (assert) => {
        var upd = mock.updater();
        var textupd = mock.textUpdater();
        upd.tree.onTextAttached(textupd);

        textupd.assets.text = "Welcome to Fayde.";
        upd.invalidateTextMetrics();
        upd.tree.layout(new Size(150, 100), upd.assets);

        assert.strictEqual(upd.getCursorFromPoint(new Point(-10, 10)), 0);
        assert.strictEqual(upd.getCursorFromPoint(new Point(10, -10)), 0);
        assert.strictEqual(upd.getCursorFromPoint(new Point(51, 10)), 6);
        assert.strictEqual(upd.getCursorFromPoint(new Point(10, 25)), 17);

        upd.assets.textWrapping = TextWrapping.Wrap;
        upd.invalidateTextMetrics();
        upd.tree.layout(new Size(45, 100), upd.assets);
        //"Welco"
        //"me to "
        //"Fayde."
        assert.strictEqual(upd.getCursorFromPoint(new Point(0, 0)), 0);
        assert.strictEqual(upd.getCursorFromPoint(new Point(0, 20)), 5);
        assert.strictEqual(upd.getCursorFromPoint(new Point(0, 40)), 11);
    });
}