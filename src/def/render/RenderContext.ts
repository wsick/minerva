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

        scale (x: number, y: number) {
            var ctx = this.raw;
            var ct = this.currentTransform;
            mat3.scale(ct, x, y);
            ctx.scale(x, y);
        }

        pretransformMatrix (mat: number[]) {
            var ctx = this.raw;
            var ct = this.currentTransform;
            mat3.multiply(mat, ct, ct);
            ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
        }

        clipGeometry (geom: IGeometry) {
            var ctx = this.raw;
            geom.Draw(this);
            ctx.clip();
        }
    }
}