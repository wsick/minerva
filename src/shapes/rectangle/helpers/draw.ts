module minerva.shapes.rectangle.helpers {
    export function draw (ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radiusX: number, radiusY: number) {
        var right = left + width;
        var bottom = top + height;
        if (!radiusX && !radiusY) {
            ctx.beginPath();
            ctx.rect(left, top, right - left, bottom - top);
            return;
        }
        ctx.beginPath();
        ctx.moveTo(left + radiusX, top);
        //top edge
        ctx.lineTo(right - radiusX, top);
        //top right arc
        ctx.quadraticCurveTo(right, top, right, top + radiusY);
        //right edge
        ctx.lineTo(right, bottom - radiusY);
        //bottom right arc
        ctx.quadraticCurveTo(right, bottom, right - radiusX, bottom);
        //bottom edge
        ctx.lineTo(left + radiusX, bottom);
        //bottom left arc
        ctx.quadraticCurveTo(left, bottom, left, bottom - radiusY);
        //left edge
        ctx.lineTo(left, top + radiusY);
        //top left arc
        ctx.quadraticCurveTo(left, top, left + radiusX, top);
        ctx.closePath();
    }
}