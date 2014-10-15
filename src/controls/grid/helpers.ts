module minerva.controls.grid {
    export module helpers {
        export function expandStarCols (mat: Segment[][], coldefs: IColumnDefinition[], availableSize: Size) {
            var aw = availableSize.width;

            for (var i = 0; i < mat.length; i++) {
                var cur = mat[i][i];
                if (cur.type === GridUnitType.Star)
                    cur.offered = 0;
                else
                    aw = Math.max(aw - cur.offered, 0);
            }
            aw = assignSize(mat, 0, mat.length - 1, aw, GridUnitType.Star, false);

            for (var i = 0; i < coldefs.length; i++) {
                var cur = mat[i][i];
                if (cur.type === GridUnitType.Star)
                    coldefs[i].setActualWidth(cur.offered);
            }
        }

        export function expandStarRows (mat: Segment[][], rowdefs: IRowDefinition[], availableSize: Size) {
            var ah = availableSize.height;

            for (var i = 0; i < mat.length; i++) {
                var cur = mat[i][i];
                if (cur.type === GridUnitType.Star)
                    cur.offered = 0;
                else
                    ah = Math.max(ah - cur.offered, 0);
            }
            ah = assignSize(mat, 0, mat.length - 1, ah, GridUnitType.Star, false);

            for (var i = 0; i < rowdefs.length; i++) {
                var cur = mat[i][i];
                if (cur.type === GridUnitType.Star)
                    rowdefs[i].setActualHeight(cur.offered);
            }
        }

        function assignSize (mat: Segment[][], start: number, end: number, size: number, unitType: GridUnitType, desiredSize: boolean): number {
            var count = 0;
            var assigned = false;
            var segmentSize = 0;
            for (var i = start; i <= end; i++) {
                var cur = mat[i][i];
                segmentSize = desiredSize ? cur.desired : cur.offered;
                if (segmentSize < cur.max)
                    count += (unitType === GridUnitType.Star) ? cur.stars : 1;
            }

            do {
                assigned = false;
                var contribution = size / count;
                for (i = start; i <= end; i++) {
                    cur = mat[i][i];
                    segmentSize = desiredSize ? cur.desired : cur.offered;
                    if (!(cur.type === unitType && segmentSize < cur.max))
                        continue;
                    var newSize = segmentSize;
                    newSize += contribution * (unitType === GridUnitType.Star ? cur.stars : 1);
                    newSize = Math.min(newSize, cur.max);
                    assigned = assigned || (newSize > segmentSize);
                    size -= newSize - segmentSize;
                    if (desiredSize)
                        cur.desired = newSize;
                    else
                        cur.offered = newSize;
                }
            } while (assigned);
            return size;
        }

        export function allocateDesiredSize (rowMat: Segment[][], rowCount: number, colMat: Segment[][], colCount: number) {
            for (var i = 0; i < 2; i++) {
                var matrix = i === 0 ? rowMat : colMat;
                var count = i === 0 ? rowCount : colCount;

                for (var row = count - 1; row >= 0; row--) {
                    for (var col = row; col >= 0; col--) {
                        var spansStar = false;
                        for (var j = row; j >= col; j--) {
                            spansStar = spansStar || (matrix[j][j].type === GridUnitType.Star);
                        }
                        var current = matrix[row][col].desired;
                        var totalAllocated = 0;
                        for (var a = row; a >= col; a--) {
                            totalAllocated += matrix[a][a].desired;
                        }
                        if (totalAllocated < current) {
                            var additional = current - totalAllocated;
                            if (spansStar) {
                                additional = assignSize(matrix, col, row, additional, GridUnitType.Star, true);
                            } else {
                                additional = assignSize(matrix, col, row, additional, GridUnitType.Pixel, true);
                                additional = assignSize(matrix, col, row, additional, GridUnitType.Auto, true);
                            }
                        }
                    }
                }
            }
            for (var i = 0; i < rowMat.length; i++) {
                rowMat[i][i].offered = rowMat[i][i].desired;
            }
            for (var i = 0; i < matrix.length; i++) {
                colMat[i][i].offered = colMat[i][i].desired;
            }
        }
    }
}