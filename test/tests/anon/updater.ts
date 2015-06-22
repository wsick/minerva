module minerva.anon.tests {
    QUnit.module("anon");

    class ExtendUpdater extends AnonymousUpdater {
        available: Size;
        final: Size;

        measureOverride (availableSize: Size): Size {
            return this.available = new Size(availableSize.width, availableSize.height);
        }

        arrangeOverride (finalSize: Size): Size {
            return this.final = new Size(finalSize.width, finalSize.height);
        }
    }

    QUnit.test("measureOverride", (assert) => {
        var updater = new ExtendUpdater();
        updater.measure(new Size(100, 150));
        assert.deepEqual(updater.available, new Size(100, 150));
    });

    QUnit.test("arrangeOverride", (assert) => {
        var updater = new ExtendUpdater();
        updater.arrange(new Rect(0, 0, 100, 150));
        assert.deepEqual(updater.final, new Size(100, 150));
    });
}