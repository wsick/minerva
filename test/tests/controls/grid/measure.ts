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
        segment: function (original?: number, offered?: number, desired?: number, min?: number, max?: number, type?: GridUnitType, stars?: number): Segment {
            var segment = new Segment();
            segment.original = original || 0.0;
            segment.offered = offered || 0.0;
            segment.desired = desired || 0.0;
            segment.min = min || 0;
            segment.max = max == null ? Number.POSITIVE_INFINITY : max;
            segment.type = type == null ? GridUnitType.Pixel : type;
            segment.stars = stars || 0;
            return segment;
        },
        coldef: function (type?: GridUnitType, width?: number, min?: number, max?: number): IColumnDefinition {
            return {
                Width: { Value: width == null ? 1.0 : width, Type: type == null ? GridUnitType.Star : type },
                MinWidth: min || 0,
                MaxWidth: max == null ?  Number.POSITIVE_INFINITY : max,
                ActualWidth: NaN,
                setActualWidth: function (value: number) {
                    this.ActualWidth = value;
                }
            };
        },
        rowdef: function (type?: GridUnitType, height?: number, min?: number, max?: number): IRowDefinition {
            return {
                Height: { Value: height == null ? 1.0 : height, Type: type == null ? GridUnitType.Star : type },
                MinHeight: min || 0,
                MaxHeight: max == null ? Number.POSITIVE_INFINITY : max,
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

        input.rowDefinitions.pop();
        input.rowDefinitions.pop();
        assert.ok(tapins.ensureRowMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.rowMatrix, [
            [new Segment()]
        ]);
    });

    QUnit.test("prepareRowMatrix", (assert) => {
        var input = mock.input();
        var state = mock.state();

        var rowdefs = input.rowDefinitions;

        var rm = input.gridState.rowMatrix;
        rm.push([mock.segment(0, 25)]);

        assert.ok(tapins.prepareRowMatrix(input, state, null, null, null));
        assert.deepEqual(state.totalStars, new Size(0, 1));
        assert.strictEqual(rm[0][0].type, GridUnitType.Star);
        assert.strictEqual(rm[0][0].stars, 1.0);

        rowdefs.push(mock.rowdef(GridUnitType.Star, 2, 40, 100));
        rowdefs.push(mock.rowdef(GridUnitType.Auto, 1, 40, 80));
        rm.push([mock.segment(0, 50), mock.segment(0, 100)]);
        assert.ok(tapins.prepareRowMatrix(input, state, null, null, null));
        assert.deepEqual(state.totalStars, new Size(0, 2));
        assert.strictEqual(rm[0][0].stars, 2);
        assert.strictEqual(rowdefs[0].ActualHeight, Number.POSITIVE_INFINITY);
        assert.deepEqual(rm[0][0], mock.segment(0, 40, 0, 40, 100, GridUnitType.Star, 2));
        assert.deepEqual(rm[1][1], mock.segment(0, 40, 40, 40, 80, GridUnitType.Auto));
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

        input.columnDefinitions.pop();
        input.columnDefinitions.pop();
        assert.ok(tapins.ensureColMatrix(input, null, null, null, null));
        assert.deepEqual(input.gridState.colMatrix, [
            [new Segment()]
        ]);
    });

    QUnit.test("prepareColMatrix", (assert) => {
        var input = mock.input();
        var state = mock.state();
        var input = mock.input();
        var state = mock.state();

        var coldefs = input.columnDefinitions;

        var cm = input.gridState.colMatrix;
        cm.push([mock.segment(0, 25)]);

        assert.ok(tapins.prepareColMatrix(input, state, null, null, null));
        assert.deepEqual(state.totalStars, new Size(1, 0));
        assert.strictEqual(cm[0][0].type, GridUnitType.Star);
        assert.strictEqual(cm[0][0].stars, 1.0);

        coldefs.push(mock.coldef(GridUnitType.Star, 2, 40, 100));
        coldefs.push(mock.coldef(GridUnitType.Auto, 1, 40, 80));
        cm.push([mock.segment(0, 50), mock.segment(0, 100)]);
        assert.ok(tapins.prepareColMatrix(input, state, null, null, null));
        assert.deepEqual(state.totalStars, new Size(2, 0));
        assert.strictEqual(cm[0][0].stars, 2);
        assert.strictEqual(coldefs[0].ActualWidth, Number.POSITIVE_INFINITY);
        assert.deepEqual(cm[0][0], mock.segment(0, 40, 0, 40, 100, GridUnitType.Star, 2));
        assert.deepEqual(cm[1][1], mock.segment(0, 40, 40, 40, 80, GridUnitType.Auto));
    });

    QUnit.test("buildShape", (assert) => {

        assert.ok(true);
    });
}