module minerva.text.layout.tests {
    QUnit.module("text.layout.run");

    var mock = {
        textAssets: function (): text.ITextAssets {
            return {
                background: null,
                foreground: null,
                selectionBackground: null,
                selectionForeground: null,
                isUnderlined: false,
                font: new Font(),
                text: ""
            };
        },
        run: function (text: string, start: number, assets: text.ITextAssets): Run {
            var run = new Run();
            run.attrs = assets;
            run.text = text;
            run.start = start;
            run.width = mock.measure(text, assets.font, true);
            run.length = text.length;
            return run;
        },
        cluster: function (text: string, assets: text.ITextAssets, isSelected: boolean): Cluster {
            var c = new Cluster();
            c.text = text;
            c.width = mock.measureWidth(text, assets);
            c.isSelected = isSelected;
            return c;
        },
        measureWidth: function (text: string, assets: text.ITextAssets): number {
            return engine.Surface.measureWidth(text, assets.font);
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

    QUnit.test("Split Selection", (assert) => {
        //Selection before start
        var assets = mock.textAssets();

        var run = mock.run("Fayde", 5, assets);
        layout.Run.splitSelection(run, 1, 2, mock.measureWidth);
        assert.equal(run.pre, null);
        assert.equal(run.sel, null);
        assert.deepEqual(run.post, mock.cluster("Fayde", assets, false));

        //Selection covering start
        var run = mock.run("Fayde", 5, assets);
        Run.splitSelection(run, 4, 6, mock.measureWidth);
        assert.equal(run.pre, null);
        assert.deepEqual(run.sel, mock.cluster("F", assets, true));
        assert.deepEqual(run.post, mock.cluster("ayde", assets, false));

        //Selection inside
        var run = mock.run("Fayde", 5, assets);
        Run.splitSelection(run, 6, 8, mock.measureWidth);
        assert.deepEqual(run.pre, mock.cluster("F", assets, false));
        assert.deepEqual(run.sel, mock.cluster("ay", assets, true));
        assert.deepEqual(run.post, mock.cluster("de", assets, false));

        //Selection covering end
        var run = mock.run("Fayde", 5, assets);
        Run.splitSelection(run, 8, 11, mock.measureWidth);
        assert.deepEqual(run.pre, mock.cluster("Fay", assets, false));
        assert.deepEqual(run.sel, mock.cluster("de", assets, true));
        assert.equal(run.post, null);

        //Selection after end
        var run = mock.run("Fayde", 5, assets);
        Run.splitSelection(run, 12, 14, mock.measureWidth);
        assert.deepEqual(run.pre, mock.cluster("Fayde", assets, false));
        assert.equal(run.sel, null);
        assert.equal(run.post, null);

        //Selection surrounding
        var run = mock.run("Fayde", 5, assets);
        Run.splitSelection(run, 0, 14, mock.measureWidth);
        assert.equal(run.pre, null);
        assert.deepEqual(run.sel, mock.cluster("Fayde", assets, true));
        assert.equal(run.post, null);
    });
}