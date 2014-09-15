module minerva {
    export class Thickness {
        left: number;
        top: number;
        right: number;
        bottom: number;

        constructor (left?: number, top?: number, right?: number, bottom?: number) {
            this.left = left == null ? 0 : left;
            this.top = top == null ? 0 : top;
            this.right = right == null ? 0 : right;
            this.bottom = bottom == null ? 0 : bottom;
        }

        static shrinkSize (thickness: Thickness, dest: Size) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w -= thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h -= thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        }

        static growSize (thickness: Thickness, dest: Size) {
            var w = dest.width;
            var h = dest.height;
            if (w != Number.POSITIVE_INFINITY)
                w += thickness.left + thickness.right;
            if (h != Number.POSITIVE_INFINITY)
                h += thickness.top + thickness.bottom;
            dest.width = w > 0 ? w : 0;
            dest.height = h > 0 ? h : 0;
            return dest;
        }
    }
}