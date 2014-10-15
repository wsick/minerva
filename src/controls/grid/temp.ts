/*
module temp {
    class GridMeasurer {
        private _RowMatrix: ISegment[][] = [];
        private _ColMatrix: ISegment[][] = [];

        Measure(grid: Grid, availableSize: size, error: BError): size {
            var totalSize = size.copyTo(availableSize);
            var cols = grid.ColumnDefinitions;
            var rows = grid.RowDefinitions;
            var colCount = cols ? cols.Count : 0;
            var rowCount = rows ? rows.Count : 0;
            var totalStars = new size();
            var emptyRows = rowCount === 0;
            var emptyCols = colCount === 0;
            var hasChildren = grid.Children.Count > 0;

            if (emptyRows) rowCount = 1;
            if (emptyCols) colCount = 1;

            this._CreateMatrices(rowCount, colCount);

            var rm = this._RowMatrix;
            var cm = this._ColMatrix;

            var defaultGridLength: GridLength = new GridLength(1.0, GridUnitType.Star);

            var i: number = 0;
            var cell: ISegment = null;
            if (emptyRows) {
                cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
                cell.Stars = 1.0;
                rm[0][0] = cell;
                totalStars.Height += 1.0;
            } else {
                i = 0;
                var enumerator = rows.getEnumerator();
                var rowdef: RowDefinition = null;
                var height: GridLength = null;
                while (enumerator.moveNext()) {
                    rowdef = enumerator.current;
                    height = rowdef.Height;
                    if (!height) height = defaultGridLength;
                    rowdef.SetValueInternal(RowDefinition.ActualHeightProperty, Number.POSITIVE_INFINITY);
                    cell = createSegment(0.0, rowdef.MinHeight, rowdef.MaxHeight, height.Type);

                    if (height.Type === GridUnitType.Pixel) {
                        cell.OfferedSize = cell.Clamp(height.Value);
                        rowdef.SetValueInternal(RowDefinition.ActualHeightProperty, cell.SetDesiredToOffered());
                    } else if (height.Type === GridUnitType.Star) {
                        cell.Stars = height.Value;
                        totalStars.Height += height.Value;
                    } else if (height.Type === GridUnitType.Auto) {
                        cell.OfferedSize = cell.Clamp(0);
                        cell.SetDesiredToOffered();
                    }

                    rm[i][i] = cell;
                    i++;
                }
            }

            if (emptyCols) {
                cell = createSegment(0.0, 0, Number.POSITIVE_INFINITY, GridUnitType.Star);
                cell.Stars = 1.0;
                cm[0][0] = cell;
                totalStars.Width += 1.0;
            } else {
                i = 0;
                var enumerator2 = cols.getEnumerator();
                var coldef: ColumnDefinition = null;
                var width: GridLength = null;
                while (enumerator2.moveNext()) {
                    coldef = enumerator2.current;
                    var width = coldef.Width;
                    if (!width) width = defaultGridLength;
                    coldef.SetValueInternal(ColumnDefinition.ActualWidthProperty, Number.POSITIVE_INFINITY);
                    cell = createSegment(0.0, coldef.MinWidth, coldef.MaxWidth, width.Type);

                    if (width.Type === GridUnitType.Pixel) {
                        cell.OfferedSize = cell.Clamp(width.Value);
                        coldef.SetValueInternal(ColumnDefinition.ActualWidthProperty, cell.SetDesiredToOffered());
                    } else if (width.Type === GridUnitType.Star) {
                        cell.Stars = width.Value;
                        totalStars.Width += width.Value;
                    } else if (width.Type === GridUnitType.Auto) {
                        cell.OfferedSize = cell.Clamp(0);
                        cell.SetDesiredToOffered();
                    }

                    cm[i][i] = cell;
                    i++;
                }
            }

            var sizes: IGridChildPlacement[] = [];
            var separator: IGridChildPlacement = {
                Matrix: null,
                Row: 0,
                Col: 0,
                Size: 0,
                Cell: null
            };
            sizes.push(separator);
            var separatorIndex: number = 0;

            var c: number = 0;
            var r: number = 0;
            var childNode: UINode = null;
            var child: UIElement = null;
            var childLu: LayoutUpdater = null;

            var childSize = new size();
            var starCol = false;
            var starRow = false;
            var autoCol = false;
            var autoRow = false;

            var col = 0;
            var row = 0;
            var colspan = 0;
            var rowspan = 0;

            var node: IGridChildPlacement = null;
            var gridState = walkGrid(grid, rm, cm);
            for (i = 0; i < 6; i++) {
                var autoAuto = i === 0;
                var starAuto = i === 1;
                var autoStar = i === 2;
                var starAutoAgain = i === 3;
                var nonStar = i === 4;
                var remainingStar = i === 5;

                if (hasChildren) {
                    this._ExpandStarCols(grid, totalSize);
                    this._ExpandStarRows(grid, totalSize);
                }

                var e4 = grid.XamlNode.GetVisualTreeEnumerator();
                while (e4.moveNext()) {
                    childNode = e4.current;
                    child = childNode.XObject;
                    childLu = childNode.LayoutUpdater;

                    childSize = new size();
                    starCol = false;
                    starRow = false;
                    autoCol = false;
                    autoRow = false;

                    col = Math.min(Grid.GetColumn(child), colCount - 1);
                    row = Math.min(Grid.GetRow(child), rowCount - 1);
                    colspan = Math.min(Grid.GetColumnSpan(child), colCount - col);
                    rowspan = Math.min(Grid.GetRowSpan(child), rowCount - row);

                    for (r = row; r < row + rowspan; r++) {
                        starRow = starRow || (rm[r][r].Type === GridUnitType.Star);
                        autoRow = autoRow || (rm[r][r].Type === GridUnitType.Auto);
                    }
                    for (c = col; c < col + colspan; c++) {
                        starCol = starCol || (cm[c][c].Type === GridUnitType.Star);
                        autoCol = autoCol || (cm[c][c].Type === GridUnitType.Auto);
                    }

                    if (autoRow && autoCol && !starRow && !starCol) {
                        if (!autoAuto)
                            continue;
                        childSize.Width = Number.POSITIVE_INFINITY;
                        childSize.Height = Number.POSITIVE_INFINITY;
                    } else if (starRow && autoCol && !starCol) {
                        if (!(starAuto || starAutoAgain))
                            continue;
                        if (starAuto && gridState.HasAutoStar)
                            childSize.Height = Number.POSITIVE_INFINITY;
                        childSize.Width = Number.POSITIVE_INFINITY;
                    } else if (autoRow && starCol && !starRow) {
                        if (!autoStar)
                            continue;
                        childSize.Height = Number.POSITIVE_INFINITY;
                    } else if ((autoRow || autoCol) && !(starRow || starCol)) {
                        if (!nonStar)
                            continue;
                        if (autoRow)
                            childSize.Height = Number.POSITIVE_INFINITY;
                        if (autoCol)
                            childSize.Width = Number.POSITIVE_INFINITY;
                    } else if (!(starRow || starCol)) {
                        if (!nonStar)
                            continue;
                    } else {
                        if (!remainingStar)
                            continue;
                    }

                    for (r = row; r < row + rowspan; r++) {
                        childSize.Height += rm[r][r].OfferedSize;
                    }
                    for (c = col; c < col + colspan; c++) {
                        childSize.Width += cm[c][c].OfferedSize;
                    }

                    childLu._Measure(childSize, error);

                    if (!starAuto) {
                        node = createGridChildPlacement(rm, row + rowspan - 1, row, childLu.DesiredSize.Height);
                        if (node.Row === node.Col) {
                            sizes.splice(separatorIndex + 1, 0, node);
                        } else {
                            sizes.splice(separatorIndex, 0, node);
                            separatorIndex++;
                        }
                    }
                    node = createGridChildPlacement(cm, col + colspan - 1, col, childLu.DesiredSize.Width);
                    if (node.Row === node.Col) {
                        sizes.splice(separatorIndex + 1, 0, node);
                    } else {
                        sizes.splice(separatorIndex, 0, node);
                        separatorIndex++;
                    }
                }

                sizes.splice(separatorIndex, 1);
                separatorIndex = -1;

                while (node = sizes.pop()) {
                    cell = node.Matrix[node.Row][node.Col];
                    cell.DesiredSize = Math.max(cell.DesiredSize, node.Size);
                    this._AllocateDesiredSize(rowCount, colCount);
                }
                separatorIndex = sizes.push(separator) - 1;
            }
            this._SaveMeasureResults();
            //sizes.Remove(separator);

            var gridSize = new size();
            for (c = 0; c < colCount; c++) {
                gridSize.Width += cm[c][c].DesiredSize;
            }
            for (r = 0; r < rowCount; r++) {
                gridSize.Height += rm[r][r].DesiredSize;
            }
            return gridSize;
        }
    }

    interface IGridChildPlacement {
        Matrix: ISegment[][];
        Row: number;
        Col: number;
        Size: number;
    }
    function createGridChildPlacement(matrix: ISegment[][], row: number, col: number, size: number): IGridChildPlacement {
        return {
            Matrix: matrix,
            Row: row,
            Col: col,
            Size: size
        };
    }
}
*/