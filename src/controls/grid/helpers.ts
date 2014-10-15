module minerva.controls.grid {
    export module helpers {
        //TODO: Carry `actualWidth`, `actualHeight` to SetCurrentValue
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
                    coldefs[i].actualWidth = cur.offered;
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
                    rowdefs[i].actualHeight = cur.offered;
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
    }
}