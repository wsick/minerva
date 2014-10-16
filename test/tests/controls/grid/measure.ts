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
                MaxWidth: max == null ? Number.POSITIVE_INFINITY : max,
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
        updater: function (row?: number, rowspan?: number, col?: number, colspan?: number): core.Updater {
            var upd = new core.Updater();
            if (row != null)
                upd.setAttachedValue("Grid.Row", row);
            if (rowspan != null)
                upd.setAttachedValue("Grid.RowSpan", rowspan);
            if (col != null)
                upd.setAttachedValue("Grid.Column", col);
            if (colspan != null)
                upd.setAttachedValue("Grid.ColumnSpan", colspan);
            return upd;
        },
        shape: function (hasAutoAuto: boolean, hasAutoStar: boolean, hasStarAuto: boolean): GridShape {
            var gs = new GridShape();
            gs.hasAutoAuto = hasAutoAuto;
            gs.hasAutoStar = hasAutoStar;
            gs.hasStarAuto = hasStarAuto;
            return gs;
        },
        childshape: function (row: number, rowspan: number, col: number, colspan: number, starRow: boolean, autoRow: boolean, starCol: boolean, autoCol: boolean): GridChildShape {
            var gcs = new GridChildShape();
            gcs.row = row;
            gcs.rowspan = rowspan;
            gcs.col = col;
            gcs.colspan = colspan;
            gcs.starRow = starRow;
            gcs.autoRow = autoRow;
            gcs.starCol = starCol;
            gcs.autoCol = autoCol;
            return gcs;
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
        var input = mock.input();
        var state = mock.state();

        var rm = input.gridState.rowMatrix = [
            [mock.segment(10, 20, 20, 0, Number.POSITIVE_INFINITY, GridUnitType.Star)],
            [null, mock.segment(60, 70, 70, 0, Number.POSITIVE_INFINITY, GridUnitType.Auto)]
        ];
        input.rowDefinitions.push(mock.rowdef());
        input.rowDefinitions.push(mock.rowdef(GridUnitType.Auto));

        var cm = input.gridState.colMatrix = [
            [mock.segment(10, 20, 20, 0, Number.POSITIVE_INFINITY, GridUnitType.Star)],
            [null, mock.segment(60, 70, 70, 0, Number.POSITIVE_INFINITY, GridUnitType.Star)]
        ];
        input.columnDefinitions.push(mock.coldef());
        input.columnDefinitions.push(mock.coldef());

        var updater = new GridUpdater();
        var tree = updater.tree;
        tree.children = [];
        var child1 = mock.updater();
        tree.children.push(child1);
        var child2 = mock.updater(1, null, 0, 2);
        tree.children.push(child2);

        var cshapes = state.childShapes;
        assert.ok(tapins.buildShape(input, state, null, tree, null));
        assert.deepEqual(cshapes[0], mock.childshape(0, 1, 0, 1, true, false, true, false));
        assert.deepEqual(cshapes[1], mock.childshape(1, 1, 0, 2, false, true, true, false));
        assert.deepEqual(state.gridShape, mock.shape(false, true, false));
        assert.strictEqual(state.placementIndex, 0);
        assert.deepEqual(state.placements, [new GridChildPlacement(null, 0, 0, 0)]);
    });
}