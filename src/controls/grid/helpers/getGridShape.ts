module minerva.controls.grid.helpers {
    export interface IGridShape {
        HasAutoAuto: boolean;
        HasStarAuto: boolean;
        HasAutoStar: boolean;
    }

    export function getGridShape (tree: core.IUpdaterTree, rm: Segment[][], cm: Segment[][]): IGridShape {
        var haa: boolean = false;
        var hsa: boolean = false;
        var has: boolean = false;

        var starCol = false;
        var starRow = false;
        var autoCol = false;
        var autoRow = false;

        var col: number = 0;
        var row: number = 0;
        var colspan: number = 1;
        var rowspan: number = 1;

        var rowCount = rm.length;
        var colCount = cm.length;

        for (var walker = tree.walk(); walker.step();) {
            var child = walker.current;

            starCol = false;
            starRow = false;
            autoCol = false;
            autoRow = false;

            col = Math.min(child.getAttachedValue("Grid.Column"), colCount - 1);
            row = Math.min(child.getAttachedValue("Grid.Row"), rowCount - 1);
            colspan = Math.min(child.getAttachedValue("Grid.ColumnSpan"), colCount - col);
            rowspan = Math.min(child.getAttachedValue("Grid.RowSpan"), rowCount - row);

            for (var r = row; r < row + rowspan; r++) {
                starRow = starRow || (rm[r][r].type === GridUnitType.Star);
                autoRow = autoRow || (rm[r][r].type === GridUnitType.Auto);
            }
            for (var c = col; c < col + colspan; c++) {
                starCol = starCol || (cm[c][c].type === GridUnitType.Star);
                autoCol = autoCol || (cm[c][c].type === GridUnitType.Auto);
            }

            haa = haa || (autoRow && autoCol && !starRow && !starCol);
            hsa = hsa || (starRow && autoCol);
            has = has || (autoRow && starCol);
        }

        return {
            HasAutoAuto: haa,
            HasStarAuto: hsa,
            HasAutoStar: has
        };
    }
}