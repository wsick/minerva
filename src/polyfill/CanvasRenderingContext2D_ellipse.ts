interface CanvasRenderingContext2D {
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean);
}
(function (Ctx) {
    if (Ctx.prototype.ellipse)
        return;
    Ctx.prototype.ellipse = function (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise: boolean = false) {

    };
})(CanvasRenderingContext2D);