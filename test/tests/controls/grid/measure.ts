module minerva.controls.grid.measure.tests {
    QUnit.module("Grid Measure Pipe Tapins");

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
                previousConstraint: new Size(),
                visibility: Visibility.Visible,
                desiredSize: new Size(),
                hiddenDesire: new Size(),
                dirtyFlags: 0,
                uiFlags: UIFlags.None,

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
                availableSize: new Size(),

                totalStars: new Size(),
                gridShape: new GridShape(),
                childShapes: [],
                childSize: new Size(),
                placements: [],
                placementIndex: 0
            };
        },
        segment: function (original?: number, offered?: number, desired?: number): Segment {
            var segment = new Segment();
            segment.original = original || 0.0;
            segment.offered = offered || 0.0;
            segment.desired = desired || 0.0;
            return segment;
        },
        coldef: function (): IColumnDefinition {
            return {
                Width: { Value: 1.0, Type: GridUnitType.Star },
                MinWidth: 0,
                MaxWidth: Number.POSITIVE_INFINITY,
                ActualWidth: NaN,
                setActualWidth: function (value: number) {
                    this.ActualWidth = value;
                }
            };
        },
        rowdef: function (): IRowDefinition {
            return {
                Height: { Value: 1.0, Type: GridUnitType.Star },
                MinHeight: 0,
                MaxHeight: Number.POSITIVE_INFINITY,
                ActualHeight: NaN,
                setActualHeight: function (value: number) {
                    this.ActualHeight = value;
                }
            };
        },
        updater: function (row: number, rowspan: number, col: number, colspan: number): core.Updater {
            var upd = new core.Updater();
            upd.setAttachedValue("Grid.Row", row);
            upd.setAttachedValue("Grid.RowSpan", rowspan);
            upd.setAttachedValue("Grid.Column", col);
            upd.setAttachedValue("Grid.ColumnSpan", colspan);
            return upd;
        }
    };

    QUnit.test("ensureRowMatrix", (assert) => {
        var input = mock.input();

        input.rowDefinitions = [mock.rowdef(), mock.rowdef(), mock.rowdef()];
        assert.ok(tapins.ensureRowMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.rowMatrix, [
            [new Segment()],
            [new Segment(), new Segment()],
            [new Segment(), new Segment(), new Segment()]
        ]);

        input.rowDefinitions.pop();
        assert.ok(tapins.ensureRowMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.rowMatrix, [
            [new Segment()],
            [new Segment(), new Segment()]
        ]);
    });

    QUnit.test("prepareRowMatrix", (assert) => {

        assert.ok(true);
    });

    QUnit.test("ensureColMatrix", (assert) => {
        var input = mock.input();

        input.columnDefinitions = [mock.coldef(), mock.coldef(), mock.coldef()];
        assert.ok(tapins.ensureColMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.colMatrix, [
            [new Segment()],
            [new Segment(), new Segment()],
            [new Segment(), new Segment(), new Segment()]
        ]);

        input.columnDefinitions.pop();
        assert.ok(tapins.ensureColMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.colMatrix, [
            [new Segment()],
            [new Segment(), new Segment()]
        ]);
    });

    QUnit.test("prepareColMatrix", (assert) => {

        assert.ok(true);
    });

    QUnit.test("buildShape", (assert) => {

        assert.ok(true);
    });
}