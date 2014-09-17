module minerva {
    export class Rect implements IPoint, ISize {
        x: number;
        y: number;
        width: number;
        height: number;

        constructor (x?: number, y?: number, width?: number, height?: number) {
            this.x = x == null ? 0 : x;
            this.y = y == null ? 0 : y;
            this.width = width == null ? 0 : width;
            this.height = height == null ? 0 : height;
        }

        static isEqual (rect1: Rect, rect2: Rect): boolean {
            return rect1.x === rect2.x
                && rect1.y === rect2.y
                && rect1.width === rect2.width
                && rect1.height === rect2.height;
        }

        static copyTo (src: Rect, dest: Rect) {
            dest.x = src.x;
            dest.y = src.y;
            dest.width = src.width;
            dest.height = src.height;
        }

        static roundOut (r: Rect) {
            var x = Math.floor(r.x);
            var y = Math.floor(r.y);
            r.width = Math.ceil(r.x + r.width) - x;
            r.height = Math.ceil(r.y + r.height) - y;
            r.x = x;
            r.y = y;
        }

        static intersection (dest: Rect, rect2: Rect) {
            var x = Math.max(dest.x, rect2.x);
            var y = Math.max(dest.y, rect2.y);
            dest.width = Math.max(0, Math.min(dest.x + dest.width, rect2.x + rect2.width) - x);
            dest.height = Math.max(0, Math.min(dest.y + dest.height, rect2.y + rect2.height) - y);
            dest.x = x;
            dest.y = y;
        }

        static isContainedIn (src: Rect, test: Rect) {
            var sl = src.x;
            var st = src.y;
            var sr = src.x + src.width;
            var sb = src.y + src.height;

            var tl = test.x;
            var tt = test.y;
            var tr = test.x + test.width;
            var tb = test.y + test.height;

            if (sl < tl || st < tt || sl > tr || st > tb) //src top-left is outside test
                return false;
            if (sr < tl || sb < tt || sr > tr || sb > tb) //src bottom-right is outside test
                return false;
            return true;
        }
    }
}