module minerva.core.render {
    export interface IStrokeParameters {
        stroke: IBrush;
        strokeThickness: number;
        strokeLineJoin: PenLineJoin;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeMiterLimit: number;
    }

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
	private ratio = 1.0;

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
	    // Compute a scaling ratio that will account for both the
	    // devicePixelRatio and the size of the canvas backing
	    // store.
            var canvas = this.raw.canvas;
	    var context : any = <any>this.raw;
	    var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
	    var ratio = (window.devicePixelRatio || 1) / backingStoreRatio;
	    this.ratio = ratio;
	    
	    // Size the canvas width and height (the virtual canvas
	    // size) to the scaled up pixel count.
            canvas.width = width * ratio;
            canvas.height = height * ratio;

	    // Size the physical canvas using CSS width and height to
	    // the pixel dimensions.
	    canvas.style.width = width + "px";
	    canvas.style.height = height + "px";

	    // Add a transform to the canvas to scale the contents
	    // according to the scaling ratio, and update the
	    // currentTransform to match.
	    this.raw.transform(ratio, 0, 0, ratio, 0, 0);
	    mat3.copyTo([ratio, 0, 0, ratio, 0, 0], this.currentTransform);

	    // In setTransform and resetTransform, ensure that the transforms
	    // are appropriately scaled by the ratio for this canvas.
	    /*
	    console.log("Resize canvas: (" + width + "," + height + ") ==> (" +
			canvas.width + "," + canvas.height + ") ratio " + ratio + ": "
			+ this.currentTransform[0] + ","
			+ this.currentTransform[1] + ","
			+ this.currentTransform[2] + ","
			+ this.currentTransform[3] + ","
			+ this.currentTransform[4] + ","
			+ this.currentTransform[5]
		       );
	    */
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
	    this.raw.transform(this.ratio, 0, 0, this.ratio, 0, 0);
        }

        resetTransform () {
            mat3.identity(this.currentTransform);
            var raw = <any>this.raw;
            if (raw.resetTransform) {
                raw.resetTransform();
		this.raw.transform(this.ratio, 0, 0, this.ratio, 0, 0);
	    }
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
