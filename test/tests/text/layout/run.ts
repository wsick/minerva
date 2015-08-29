module minerva.text.layout.tests {
    QUnit.module("text.layout.run");

    var mock = {
        textAssets: function (): text.ITextAssets {
            var font = new Font();
            font.family = "Arial";
            return {
                background: null,
                foreground: null,
                selectionBackground: null,
                selectionForeground: null,
                isUnderlined: false,
                font: font,
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
        },
        measureFull: function (text: string, font: Font) {
            return mock.measure(text, font, true);
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

    QUnit.test("Elliptify (Word)", (assert) => {
        var assets = mock.textAssets();

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 96, TextTrimming.WordEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 20, TextTrimming.WordEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 135, TextTrimming.WordEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span of text");

        var run = mock.run("this is a span         of text", 0, assets);
        layout.Run.elliptify(run, 112, TextTrimming.WordEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span    ...");
    });

    QUnit.test("Elliptify (Character)", (assert) => {
        var assets = mock.textAssets();

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 10, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 20, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "t...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 30, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "thi...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 40, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this ...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 50, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 60, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 70, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a ...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 80, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a sp...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 90, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a spa...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 100, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span ...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 110, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span o...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 120, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span of t...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 130, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span of te...");

        var run = mock.run("this is a span of text", 0, assets);
        layout.Run.elliptify(run, 140, TextTrimming.CharacterEllipsis, mock.measureFull);
        assert.strictEqual(run.text, "this is a span of text");
    });
}