module minerva.controls.grid.arrange.tests {
    QUnit.module("Grid Arrange Pipe Tapins");

    var mock = {
        input: function (): IInput {
            return {
                width: NaN,
                height: NaN,
                minWidth: 0,
                minHeight: 0,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                useLayoutRounding: true,

                margin: new Thickness(),
                horizontalAlignment: HorizontalAlignment.Stretch,
                verticalAlignment: VerticalAlignment.Stretch,
                visibility: Visibility.Visible,

                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: UIFlags.None,

                layoutSlot: new Rect(),
                renderSize: new Size(),
                lastRenderSize: null,
                layoutXform: mat3.identity(),
                layoutClip: new Rect(),

                gridState: {
                    rowMatrix: [],
                    colMatrix: []
                },
                columnDefinitions: [],
                rowDefinitions: []
            };
        },
        segment: function (original?: number, offered?: number): Segment {
            var segment = new Segment();
            segment.original = original || 0.0;
            segment.offered = offered || 0.0;
            return segment;
        }
    };

    QUnit.test("restoreMeasureResults", (assert) => {
        var input = mock.input();

        var rm = input.gridState.rowMatrix;
        rm.push([mock.segment(10)]);
        rm.push([mock.segment(30), mock.segment(60)]);
        rm.push([mock.segment(50), mock.segment(75), mock.segment(100)]);

        var cm = input.gridState.colMatrix;
        cm.push([mock.segment(10)]);
        cm.push([mock.segment(30), mock.segment(60)]);
        cm.push([mock.segment(50), mock.segment(75), mock.segment(100)]);

        assert.ok(tapins.restoreMeasureResults(input, null, null, null, null));
        var erm: Segment[][] = [
            [mock.segment(10, 10)],
            [mock.segment(30, 30), mock.segment(60, 60)],
            [mock.segment(50, 50), mock.segment(75, 75), mock.segment(100, 100)]
        ];
        var ecm: Segment[][] = [
            [mock.segment(10, 10)],
            [mock.segment(30, 30), mock.segment(60, 60)],
            [mock.segment(50, 50), mock.segment(75, 75), mock.segment(100, 100)]
        ];
        assert.deepEqual(rm, erm);
        assert.deepEqual(cm, ecm);
    });

    QUnit.test("calcConsumed", (assert) => {

        assert.ok(true);
    });

    QUnit.test("setActuals", (assert) => {

        assert.ok(true);
    });

    QUnit.test("doOverride", (assert) => {

        assert.ok(true);
    });
}