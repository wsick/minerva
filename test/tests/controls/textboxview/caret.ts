module minerva.controls.textboxview.caret.tests {
    QUnit.module("controls.textboxview.caret");

    var mock = {
        updater: function () {
            return new TextBoxViewUpdater();
        },
        textUpdater: function () {
            return new text.TextUpdater();
        },
        measure: function (text: string, font: Font, full?: boolean): number {
            if (full === true)
                return engine.Surface.measureWidth(text, font);
            var width = 0;
            for (var i = 0; i < text.length; i++) {
                width += engine.Surface.measureWidth(text[i], font);
            }
            return width;
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
        assert.strictEqual(upd.getCursorFromPoint(new Point(60, 0)), 5);
        assert.strictEqual(upd.getCursorFromPoint(new Point(60, 20)), 11);
        assert.strictEqual(upd.getCursorFromPoint(new Point(60, 40)), 17);
    });

    QUnit.test("getCaretFromCursor", (assert) => {
        var upd = mock.updater();
        var textupd = mock.textUpdater();
        upd.tree.onTextAttached(textupd);

        textupd.assets.text = "Welcome to Fayde.";
        upd.invalidateTextMetrics();
        upd.tree.layout(new Size(150, 100), upd.assets);

        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(0, 0, 1, 19));
        upd.assets.selectionStart = 8;
        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(mock.measure("Welcome ", textupd.assets.font, true), 0, 1, 19));
        upd.assets.selectionStart = 17;
        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(mock.measure("Welcome to Fayde.", textupd.assets.font, true), 0, 1, 19));

        textupd.assets.text = "";
        upd.invalidateTextMetrics();
        upd.tree.layout(new Size(150, 100), upd.assets);
        upd.assets.selectionStart = 0;
        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(0, 0, 1, 19));
    });

    QUnit.test("getCaretFromCursor - Line Breaks", (assert) => {
        var upd = mock.updater();
        upd.assets.textWrapping = TextWrapping.Wrap;
        var textupd = mock.textUpdater();
        upd.tree.onTextAttached(textupd);

        textupd.assets.text = "Welcome to Fayde\nThis is the next line.\nHere is the last line.";
        upd.invalidateTextMetrics();
        upd.tree.layout(new Size(150, 100), upd.assets);

        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(0, 0, 1, 19));
        upd.assets.selectionStart = 17;
        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(0, 19, 1, 19));
        upd.assets.selectionStart = 20;
        assert.deepEqual(upd.tree.getCaretRegion(upd.assets), new Rect(mock.measure("Thi", textupd.assets.font, true), 19, 1, 19));
    });
}