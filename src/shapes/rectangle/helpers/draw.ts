module minerva.shapes.rectangle.helpers {
    var epsilon = 1e-10;

    export function draw (ctx: CanvasRenderingContext2D, left: number, top: number, width: number, height: number, radiusX: number, radiusY: number) {
        var right = left + width;
        var bottom = top + height;
        if (!radiusX && !radiusY) {
            ctx.beginPath();
            ctx.rect(left, top, right - left, bottom - top);
        } else if (Math.abs(radiusX - radiusY) < epsilon) {
            drawBalancedRadius(ctx, left, right, top, bottom, radiusX);
        } else if (typeof ctx.ellipse === "function") {
            drawNativeEllipse(ctx, left, right, top, bottom, radiusX, radiusY);
        } else {
            drawNoEllipse(ctx, left, right, top, bottom, radiusX, radiusY);
        }
    }

    function drawBalancedRadius (ctx: CanvasRenderingContext2D, left: number, right: number, top: number, bottom: number, radius: number) {
        ctx.beginPath();
        ctx.moveTo(left + radius, top);
        //top edge
        ctx.lineTo(right - radius, top);
        //top right arc
        ctx.arc(right - radius, top + radius, radius, 3 * Math.PI / 2, 2 * Math.PI);
        //right edge
        ctx.lineTo(right, bottom - radius);
        //bottom right arc
        ctx.arc(right - radius, bottom - radius, radius, 0, Math.PI / 2);
        //bottom edge
        ctx.lineTo(left + radius, bottom);
        //bottom left arc
        ctx.arc(left + radius, bottom - radius, radius, Math.PI / 2, Math.PI);
        //left edge
        ctx.lineTo(left, top + radius);
        //top left arc
        ctx.arc(left + radius, top + radius, radius, Math.PI, 3 * Math.PI / 2);
        ctx.closePath();
    }

    function drawNativeEllipse (ctx: CanvasRenderingContext2D, left: number, right: number, top: number, bottom: number, radiusX: number, radiusY: number) {
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
    }

    var kappa = (4 * (Math.SQRT2 - 1) / 3) + 0.03;
    function drawNoEllipse (ctx: CanvasRenderingContext2D, left: number, right: number, top: number, bottom: number, radiusX: number, radiusY: number) {
        var rxa = radiusX * kappa;
        var rya = radiusY * kappa;

        ctx.beginPath();
        ctx.moveTo(left + radiusX, top);
        //top edge
        ctx.lineTo(right - radiusX, top);
        //top right arc
        ctx.bezierCurveTo(right - radiusX + rxa, top, right, top + radiusY - rya, right, top + radiusY);
        //right edge
        ctx.lineTo(right, bottom - radiusY);
        //bottom right arc
        ctx.bezierCurveTo(right, bottom - radiusY + rya, right - radiusX + rxa, bottom, right - radiusX, bottom);
        //bottom edge
        ctx.lineTo(left + radiusX, bottom);
        //bottom left arc
        ctx.bezierCurveTo(left + radiusX - rxa, bottom, left, bottom - radiusY + rya, left, bottom - radiusY);
        //left edge
        ctx.lineTo(left, top + radiusY);
        //top left arc
        ctx.bezierCurveTo(left, top + radiusY - rya, left + radiusX - rxa, top, left + radiusX, top);
        ctx.closePath();
    }
}