module minerva.def.render {
    export class RenderContext {
        private $$transforms = [];
        currentTransform = mat3.identity();
        raw: CanvasRenderingContext2D;

        constructor (ctx: CanvasRenderingContext2D) {
            Object.defineProperty(this, 'raw', { value: ctx, writable: false });
        }

        save () {
            var ct = this.currentTransform;
            this.$$transforms.push(ct);
            this.currentTransform = !ct ? mat3.identity() : mat3.create(ct);
            this.raw.save();
        }

        restore () {
            this.currentTransform = this.$$transforms.pop();
            this.raw.restore();
        }

        setTransform (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            this.currentTransform = mat3.create([m11, m12, dx, m21, m22, dy, 0, 0, 1]);
            this.raw.setTransform(m11, m12, m21, m22, dx, dy);
        }

        resetTransform () {
            this.currentTransform = mat3.identity();
            var raw = <any>this.raw;
            if (raw.resetTransform)
                raw.resetTransform();
        }

        transform (m11: number, m12: number, m21: number, m22: number, dx: number, dy: number) {
            var ct = this.currentTransform;
            mat3.multiply(ct, mat3.create([m11, m12, dx, m21, m22, dy, 0, 0, 1]), ct);
            this.raw.transform(m11, m12, m21, m22, dx, dy);
        }

        scale (x: number, y: number) {
            var ct = this.currentTransform;
            mat3.scale(ct, x, y);
            this.raw.scale(x, y);
        }

        rotate (angle: number) {
            var ct = this.currentTransform;
            var r = mat3.createRotate(angle);
            mat3.multiply(ct, r, ct);
            this.raw.rotate(angle);
        }

        translate (x: number, y: number) {
            var ct = this.currentTransform;
            mat3.translate(ct, x, y);
            this.raw.translate(x, y);
        }

        transformMatrix (mat: number[]) {
            var ct = this.currentTransform;
            mat3.multiply(ct, mat, ct); //ct = matrix * ct
            this.raw.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
        }

        pretransformMatrix (mat: number[]) {
            var ct = this.currentTransform;
            mat3.multiply(mat, ct, ct); //ct = ct * matrix
            this.raw.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
        }

        clipGeometry (geom: IGeometry) {
            geom.Draw(this);
            this.raw.clip();
        }
    }
}