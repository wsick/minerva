module minerva.core.render {
    export interface IStrokeParameters {
        stroke: IBrush;
        strokeThickness: number;
        strokeLineJoin: PenLineJoin;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeMiterLimit: number;
    }

    var epsilon = 1e-10;
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
        private $$width: number;
        private $$height: number;
        currentTransform = mat3.identity();
        raw: CanvasRenderingContext2D;
        hasFillRule: boolean;
        dpiRatio: number;

        constructor (ctx: CanvasRenderingContext2D) {
            this.$$width = ctx.canvas.width;
            this.$$height = ctx.canvas.height;
            Object.defineProperty(this, 'raw', {value: ctx, writable: false});
            Object.defineProperty(this, 'currentTransform', {value: mat3.identity(), writable: false});
            Object.defineProperty(this, 'hasFillRule', {value: RenderContext.hasFillRule, writable: false});
            var ratio = (window.devicePixelRatio || 1) / ctx.backingStorePixelRatio;
            Object.defineProperty(this, 'dpiRatio', {value: ratio, writable: false});
            this.scale(ratio, ratio);
        }

        static get hasFillRule (): boolean {
            if (navigator.appName === "Microsoft Internet Explorer") {
                var version = getIEVersion();
                return version < 0 || version > 10;
            }
            return true;
        }

        resize (width: number, height: number) {
            if (Math.abs(this.$$width - width) < epsilon && Math.abs(this.$$height - height) < epsilon)
                return;
            this.$$width = width;
            this.$$height = height;

            var canvas = this.raw.canvas;
            if (Math.abs(this.dpiRatio - 1) < epsilon) {
                canvas.width = width;
                canvas.height = height;
            } else {
                // Size the canvas width and height (the virtual canvas size) to the scaled up pixel count.
                canvas.width = width * this.dpiRatio;
                canvas.height = height * this.dpiRatio;
                // Size the physical canvas using CSS width and height to the pixel dimensions.
                canvas.style.width = width.toString() + "px";
                canvas.style.height = height.toString() + "px";
            }
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

        apply (mat: number[]) {
            var ct = mat3.apply(this.currentTransform, mat);
            this.raw.setTransform(ct[0], ct[1], ct[2], ct[3], ct[4], ct[5]);
        }

        preapply (mat: number[]) {
            var ct = mat3.preapply(this.currentTransform, mat);
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