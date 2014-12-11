interface CanvasRenderingContext2D {
    isPointInStroke(x: number, y: number): boolean;
}
if (!CanvasRenderingContext2D.prototype.isPointInStroke) {
    CanvasRenderingContext2D.prototype.isPointInStroke = function (x: number, y: number) {
        return false;
    };
}

module minerva.core.render {
    export interface IStrokeParameters {
        stroke: IBrush;
        strokeThickness: number;
        strokeLineJoin: PenLineJoin;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeMiterLimit: number;
    }

    var ARC_TO_BEZIER = 0.55228475;
    var caps: string[] = [
        "butt", //flat
        "square", //square
        "round", //round
        "butt" //triangle
    ];
    var joins: string[] = [
        "miter",
        "bevel",
        "round"
    ];
    export class RenderContext {
        private $$transforms = [];
        currentTransform = mat3.identity();
        raw: CanvasRenderingContext2D;
        hasFillRule: boolean;

        constructor (ctx: CanvasRenderingContext2D) {
            Object.defineProperty(this, 'raw', {value: ctx, writable: false});
            Object.defineProperty(this, 'currentTransform', {value: mat3.identity(), writable: false});
            Object.defineProperty(this, 'hasFillRule', {value: RenderContext.hasFillRule, writable: false});
        }

        static get hasFillRule (): boolean {
            if (navigator.appName === "Microsoft Internet Explorer") {
                var version = getIEVersion();
                return version < 0 || version > 10;
            }
            return true;
        }

        resize (width: number, height: number) {
            var canvas = this.raw.canvas;
            canvas.width = width;
            canvas.height = height;
        }

        save () {
            this.$$transforms.push(mat3.create(this.currentTransform));
            this.raw.save();
        }

        restore () {
            var old = this.$$transforms.pop();
            if (old)
                mat3.copyTo(old, this.currentTransform);
            this.raw.restore();
        }

        setTransform (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            mat3.copyTo([m11, m12, m21, m22, dx, dy], this.currentTransform);
            this.raw.setTransform(m11, m12, m21, m22, dx, dy);
        }

        resetTransform () {
            mat3.identity(this.currentTransform);
            var raw = <any>this.raw;
            if (raw.resetTransform)
                raw.resetTransform();
        }

        transform (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            var ct = this.currentTransform;
            mat3.multiply(ct, mat3.create([m11, m12, m21, m22, dx, dy]), ct);
            this.raw.transform(m11, m12, m21, m22, dx, dy);
        }

        scale (x: number, y: number) {
            mat3.scale(this.currentTransform, x, y);
            this.raw.scale(x, y);
        }

        rotate (angle: number) {
            var ct = this.currentTransform;
            var r = mat3.createRotate(angle);
            mat3.multiply(ct, r, ct); //ct = ct * r
            this.raw.rotate(angle);
        }

        translate (x: number, y: number) {
            mat3.translate(this.currentTransform, x, y);
            this.raw.translate(x, y);
        }

        transformMatrix (mat: number[]) {
            var ct = this.currentTransform;
            mat3.multiply(ct, mat, ct); //ct = ct * matrix
            this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
        }

        pretransformMatrix (mat: number[]) {
            var ct = this.currentTransform;
            mat3.multiply(mat, ct, ct); //ct = matrix * ct
            this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
        }

        clipGeometry (geom: IGeometry) {
            geom.Draw(this);
            this.raw.clip();
        }

        clipRect (rect: Rect) {
            var raw = this.raw;
            raw.beginPath();
            raw.rect(rect.x, rect.y, rect.width, rect.height);
            raw.clip();
        }

        fillEx (brush: IBrush, region: Rect, fillRule?: FillRule) {
            var raw = this.raw;
            brush.setupBrush(raw, region);
            raw.fillStyle = brush.toHtml5Object();
            if (fillRule == null) {
                (<any>raw).fillRule = raw.msFillRule = "nonzero";
                raw.fill();
            } else {
                var fr = fillRule === FillRule.EvenOdd ? "evenodd" : "nonzero";
                (<any>raw).fillRule = raw.msFillRule = fr;
                raw.fill(fr);
            }
        }

        drawRectEx (extents: Rect, cr?: ICornerRadius) {
            var raw = this.raw;
            if (!cr || CornerRadius.isEmpty(cr)) {
                raw.rect(extents.x, extents.y, extents.width, extents.height);
                return;
            }

            var top_adj = Math.max(cr.topLeft + cr.topRight - extents.width, 0) / 2;
            var bottom_adj = Math.max(cr.bottomLeft + cr.bottomRight - extents.width, 0) / 2;
            var left_adj = Math.max(cr.topLeft + cr.bottomLeft - extents.height, 0) / 2;
            var right_adj = Math.max(cr.topRight + cr.bottomRight - extents.height, 0) / 2;

            var tlt = cr.topLeft - top_adj;
            raw.moveTo(extents.x + tlt, extents.y);

            var trt = cr.topRight - top_adj;
            var trr = cr.topRight - right_adj;
            raw.lineTo(extents.x + extents.width - trt, extents.y);
            raw.bezierCurveTo(
                extents.x + extents.width - trt + trt * ARC_TO_BEZIER, extents.y,
                extents.x + extents.width, extents.y + trr - trr * ARC_TO_BEZIER,
                extents.x + extents.width, extents.y + trr);

            var brr = cr.bottomRight - right_adj;
            var brb = cr.bottomRight - bottom_adj;
            raw.lineTo(extents.x + extents.width, extents.y + extents.height - brr);
            raw.bezierCurveTo(
                extents.x + extents.width, extents.y + extents.height - brr + brr * ARC_TO_BEZIER,
                extents.x + extents.width + brb * ARC_TO_BEZIER - brb, extents.y + extents.height,
                extents.x + extents.width - brb, extents.y + extents.height);

            var blb = cr.bottomLeft - bottom_adj;
            var bll = cr.bottomLeft - left_adj;
            raw.lineTo(extents.x + blb, extents.y + extents.height);
            raw.bezierCurveTo(
                extents.x + blb - blb * ARC_TO_BEZIER, extents.y + extents.height,
                extents.x, extents.y + extents.height - bll + bll * ARC_TO_BEZIER,
                extents.x, extents.y + extents.height - bll);

            var tll = cr.topLeft - left_adj;
            raw.lineTo(extents.x, extents.y + tll);
            raw.bezierCurveTo(
                extents.x, extents.y + tll - tll * ARC_TO_BEZIER,
                extents.x + tlt - tlt * ARC_TO_BEZIER, extents.y,
                extents.x + tlt, extents.y);
        }

        isPointInStrokeEx (strokePars: IStrokeParameters, x: number, y: number): boolean {
            var raw = this.raw;
            raw.lineWidth = strokePars.strokeThickness;
            raw.lineCap = caps[strokePars.strokeStartLineCap || strokePars.strokeEndLineCap || 0] || caps[0];
            raw.lineJoin = joins[strokePars.strokeLineJoin || 0] || joins[0];
            raw.miterLimit = strokePars.strokeMiterLimit;
            return raw.isPointInStroke(x, y);
        }
    }

    function getIEVersion (): number {
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(navigator.userAgent) != null)
            return parseFloat(RegExp.$1);
        return -1;
    }
}