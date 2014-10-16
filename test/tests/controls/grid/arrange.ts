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
        state: function (): IState {
            return {
                consumed: new Size(),

                childRect: new Rect(),

                arrangedSize: new Size(),
                finalRect: new Rect(),
                finalSize: new Size(),
                framework: new Size(),
                stretched: new Size(),
                constrained: new Size(),
                visualOffset: new Point(),
                flipHorizontal: false
            };
        },
        segment: function (original?: number, offered?: number, desired?: number): Segment {
            var segment = new Segment();
            segment.original = original || 0.0;
            segment.offered = offered || 0.0;
            segment.desired = desired || 0.0;
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
        var input = mock.input();
        var state = mock.state();

        var rm = input.gridState.rowMatrix;
        rm.push([mock.segment(10, 0, 20)]);
        rm.push([mock.segment(30, 0, 40), mock.segment(60, 0, 70)]);
        rm.push([mock.segment(50, 0, 60), mock.segment(75, 0, 85), mock.segment(100, 0, 110)]);

        var cm = input.gridState.colMatrix;
        cm.push([mock.segment(10, 0, 20)]);
        cm.push([mock.segment(30, 0, 40), mock.segment(60, 0, 70)]);
        cm.push([mock.segment(50, 0, 60), mock.segment(75, 0, 85), mock.segment(100, 0, 110)]);

        state.finalSize = new Size(200, 200);

        assert.ok(tapins.calcConsumed(input, state, null, null, null));
        assert.deepEqual(state.consumed, new Size(200, 200));
        var erm: Segment[][] = [
            [mock.segment(10, 20, 20)],
            [mock.segment(30, 0, 40), mock.segment(60, 70, 70)],
            [mock.segment(50, 0, 60), mock.segment(75, 0, 85), mock.segment(100, 110, 110)]
        ];
        var ecm: Segment[][] = [
            [mock.segment(10, 20, 20)],
            [mock.segment(30, 0, 40), mock.segment(60, 70, 70)],
            [mock.segment(50, 0, 60), mock.segment(75, 0, 85), mock.segment(100, 110, 110)]
        ];
        assert.deepEqual(rm, erm);
        assert.deepEqual(cm, ecm);

        //TODO: Test expandStarRows, expandStarCols
    });

    QUnit.test("setActuals", (assert) => {

        assert.ok(true);
    });

    QUnit.test("doOverride", (assert) => {

        assert.ok(true);
    });
}