module minerva.path.segments {
    export function roundedRect (x: number, y: number, width: number, height: number, radiusX: number, radiusY: number): IRect {
        if (radiusX === 0.0 && radiusY === 0.0)
            return rect(x, y, width, height);

        var left = x;
        var top = y;
        var right = x + width;
        var bottom = y + height;

        return {
            sx: null,
            sy: null,
            ex: x,
            ey: y,
            isSingle: true,
            x: x,
            y: y,
            width: width,
            height: height,
            radiusX: radiusX,
            radiusY: radiusY,
            draw: function (ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.moveTo(left + radiusX, top);
                //top edge
                ctx.lineTo(right - radiusX, top);
                //top right arc
                ctx.ellipse(right - radiusX, top + radiusY, radiusX, radiusY, 0, 3 * Math.PI / 2, 2 * Math.PI);
                //right edge
                ctx.lineTo(right, bottom - radiusY);
                //bottom right arc
                ctx.ellipse(right - radiusX, bottom - radiusY, radiusX, radiusY, 0, 0, Math.PI / 2);
                //bottom edge
                ctx.lineTo(left + radiusX, bottom);
                //bottom left arc
                ctx.ellipse(left + radiusX, bottom - radiusY, radiusX, radiusY, 0, Math.PI / 2, Math.PI);
                //left edge
                ctx.lineTo(left, top + radiusY);
                //top left arc
                ctx.ellipse(left + radiusX, top + radiusY, radiusX, radiusY, 0, Math.PI, 3 * Math.PI / 2);
                ctx.closePath();
            },
            extendFillBox: function (box: IBoundingBox) {
                box.l = Math.min(box.l, x);
                box.r = Math.max(box.r, x + width);
                box.t = Math.min(box.t, y);
                box.b = Math.max(box.b, y + height);
            },
            extendStrokeBox: function (box: IBoundingBox, pars: IStrokeParameters) {
                var hs = pars.strokeThickness / 2.0;
                box.l = Math.min(box.l, x - hs);
                box.r = Math.max(box.r, x + width + hs);
                box.t = Math.min(box.t, y - hs);
                box.b = Math.max(box.b, y + height + hs);
            },
            getStartVector: function (): number[] {
                return null;
            },
            getEndVector: function (): number[] {
                return null;
            }
        };
    }
}