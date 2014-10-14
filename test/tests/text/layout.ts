module minerva.text.layout.tests {

    module run {
        QUnit.module("Text Layout: Run");

        var mock = {
            attrs: function (): ITextAttributes {
                return {
                    background: null,
                    foreground: null,
                    selectionBackground: null,
                    selectionForeground: null,
                    isUnderlined: false,
                    font: new Font()
                };
            },
            run: function (text: string, start: number, attrs: ITextAttributes): Run {
                var r = new Run();
                r.attrs = attrs;
                r.text = text;
                r.start = start;
                r.length = text.length;
                r.width = 0;
                return r;
            },
            cluster: function (text: string, attrs: ITextAttributes, isSelected: boolean): Cluster {
                var c = new Cluster();
                c.text = text;
                c.width = mock.measureWidth(text, attrs);
                c.isSelected = isSelected;
                return c;
            },
            measureWidth: function (text: string, attrs: ITextAttributes): number {
                return engine.Surface.measureWidth(text, attrs.font);
            }
        };

        QUnit.test("Split Selection", (assert) => {
            //Selection before start
            var attrs = mock.attrs();
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 1, 2, mock.measureWidth);
            assert.equal(run.pre, null);
            assert.equal(run.sel, null);
            assert.deepEqual(run.post, mock.cluster("Fayde", attrs, false));

            //Selection covering start
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 4, 6, mock.measureWidth);
            assert.equal(run.pre, null);
            assert.deepEqual(run.sel, mock.cluster("F", attrs, true));
            assert.deepEqual(run.post, mock.cluster("ayde", attrs, false));

            //Selection inside
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 6, 8, mock.measureWidth);
            assert.deepEqual(run.pre, mock.cluster("F", attrs, false));
            assert.deepEqual(run.sel, mock.cluster("ay", attrs, true));
            assert.deepEqual(run.post, mock.cluster("de", attrs, false));

            //Selection covering end
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 8, 11, mock.measureWidth);
            assert.deepEqual(run.pre, mock.cluster("Fay", attrs, false));
            assert.deepEqual(run.sel, mock.cluster("de", attrs, true));
            assert.equal(run.post, null);

            //Selection after end
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 12, 14, mock.measureWidth);
            assert.deepEqual(run.pre, mock.cluster("Fayde", attrs, false));
            assert.equal(run.sel, null);
            assert.equal(run.post, null);

            //Selection surrounding
            var run = mock.run("Fayde", 5, attrs);
            Run.splitSelection(run, 0, 14, mock.measureWidth);
            assert.equal(run.pre, null);
            assert.deepEqual(run.sel, mock.cluster("Fayde", attrs, true));
            assert.equal(run.post, null);
        });
    }
}