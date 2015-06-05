interface CanvasRenderingContext2D {
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean);
}
(function (Ctx) {
    if (Ctx.prototype.ellipse)
        return;
    var epsilon = 1e-10;
    //Reference:
    // Approximating elliptical arcs using http://www.spaceroots.org/documents/ellipse/node22.html
    Ctx.prototype.ellipse = function (x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise: boolean = false) {
        if (Math.abs(radiusX - radiusY) < epsilon) {
            return this.arc(x, y, radiusX, startAngle, endAngle, anticlockwise);
        }
    };
})(CanvasRenderingContext2D);