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
        }
    };

    QUnit.test("NoWrap", (assert) => {
        var def = new TextLayoutDef();
        var lctx = mock.context();
        var attrs = mock.attributes();
        var assets = mock.assets();

        lctx.textWrapping = TextWrapping.NoWrap;
        lctx.text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur nunc lobortis varius dignissim. Sed sed sem non orci laoreet tempus. Nullam a nisi consequat, dignissim diam volutpat, blandit augue. Praesent et nulla nec ante consectetur varius et condimentum leo. Nam ornare odio neque, ut lobortis purus volutpat eu. In hac habitasse platea dictumst. Etiam accumsan bibendum vehicula.";
        assets.maxWidth = 100;

        def.invalidate(assets);
        def.layout(lctx, attrs, assets);
        assert.strictEqual(assets.actualWidth, engine.Surface.measureWidth("Lorem ipsum do", attrs.font));
        assert.strictEqual(assets.actualHeight, 19);
        assert.strictEqual(assets.lines.length, 1);

        lctx.text = "Lorem";
        def.invalidate(assets);
        def.layout(lctx, attrs, assets);
        assert.strictEqual(assets.actualWidth, engine.Surface.measureWidth("Lorem", attrs.font));
        assert.strictEqual(assets.actualHeight, 19);
        assert.strictEqual(assets.lines.length, 1);
    });
}