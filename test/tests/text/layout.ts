module minerva.text.layout.tests {
    QUnit.module("Text Layout");

    var mock = {
        context: function (): ITextLayoutContext {
            return {
                text: "",
                selectionStart: 0,
                selectionLength: 0,
                textWrapping: TextWrapping.NoWrap,
                textAlignment: TextAlignment.Left,
                lineStackingStrategy: LineStackingStrategy.MaxHeight,
                lineHeight: 0
            };
        },
        attributes: function (): ITextAttributes {
            return {
                background: null,
                selectionBackground: null,
                foreground: null,
                selectionForeground: null,
                isUnderlined: false,
                font: new Font()
            };
        },
        assets: function (): ITextLayoutAssets {
            return {
                availableWidth: Number.POSITIVE_INFINITY,
                actualWidth: NaN,
                actualHeight: NaN,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                lines: [],
                selCached: false
            };
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

    QUnit.test("NoWrap", (assert) => {
        var def = new TextLayoutDef();
        var lctx = mock.context();
        var attrs = mock.attributes();
        var assets = mock.assets();

        lctx.textWrapping = TextWrapping.NoWrap;
        lctx.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur nunc lobortis varius dignissim. Sed sed sem non orci laoreet tempus. Nullam a nisi consequat, dignissim diam volutpat, blandit augue. Praesent et nulla nec ante consectetur varius et condimentum leo. Nam ornare odio neque, ut lobortis purus volutpat eu. In hac habitasse platea dictumst. Etiam accumsan bibendum vehicula.";
        assets.maxWidth = 99;

        def.invalidate(assets);
        def.layout(lctx, attrs, assets);
        assert.strictEqual(assets.lines.length, 1);
        assert.strictEqual(assets.lines[0].runs.length, 1);
        assert.strictEqual(assets.lines[0].runs[0].text, "Lorem ipsum do");
        assert.strictEqual(assets.actualWidth, mock.measure("Lorem ipsum do", attrs.font));
        assert.strictEqual(assets.actualHeight, 19);

        lctx.text = "Lorem";
        def.invalidate(assets);
        def.layout(lctx, attrs, assets);
        assert.strictEqual(assets.lines.length, 1);
        assert.strictEqual(assets.lines[0].runs.length, 1);
        assert.strictEqual(assets.lines[0].runs[0].text, "Lorem");
        assert.strictEqual(assets.actualWidth, mock.measure("Lorem", attrs.font));
        assert.strictEqual(assets.actualHeight, 19);
    });

    QUnit.test("Wrap", (assert) => {
        var def = new TextLayoutDef();
        var lctx = mock.context();
        var attrs = mock.attributes();
        var assets = mock.assets();

        lctx.textWrapping = TextWrapping.Wrap;
        lctx.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur nunc lobortis varius dignissim. Sed sed sem non orci laoreet tempus. Nullam a nisi consequat, dignissim diam volutpat, blandit augue.";
        assets.maxWidth = 99;

        def.invalidate(assets);
        def.layout(lctx, attrs, assets);
        assert.strictEqual(assets.lines.length, 16);
        assets.lines.forEach(line => assert.strictEqual(line.width, line.runs.reduce<number>((agg, run) => agg + run.width, 0), "Line Width === Run Widths"));
        var runs = assets.lines.reduce<Run[]>((agg, line) => agg.concat(line.runs), []);
        runs.forEach(run => delete run.attrs);
        var expectedRuns = [
            createExpectedRun("Lorem ipsum ", 0, attrs),
            createExpectedRun("dolor sit amet, ", 0, attrs),
            createExpectedRun("consectetur ", 0, attrs),
            createExpectedRun("adipiscing elit. ", 0, attrs),
            createExpectedRun("Mauris efficitur ", 0, attrs),
            createExpectedRun("nunc lobortis ", 0, attrs),
            createExpectedRun("varius ", 0, attrs),
            createExpectedRun("dignissim. Sed ", 0, attrs),
            createExpectedRun("sed sem non ", 0, attrs),
            createExpectedRun("orci laoreet ", 0, attrs),
            createExpectedRun("tempus. ", 0, attrs),
            createExpectedRun("Nullam a nisi ", 0, attrs),
            createExpectedRun("consequat, ", 0, attrs),
            createExpectedRun("dignissim diam ", 0, attrs),
            createExpectedRun("volutpat, ", 0, attrs),
            createExpectedRun("blandit augue.", 0, attrs)
        ];
        runs.forEach((run, i?) => assert.deepEqual(run, expectedRuns[i]));
    });

    function createExpectedRun (text: string, start: number, attrs: ITextAttributes) {
        var run = new Run();
        run.text = text;
        run.start = start;
        run.width = mock.measure(text, attrs.font, true);
        run.length = text.length;
        return run;
    }
}