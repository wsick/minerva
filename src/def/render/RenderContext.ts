interface CanvasRenderingContext2D {
    currentTransform: number[];
    $$transforms: number[][];
}

module minerva.def.render {
    export module RenderContext {
        export function init(ctx: CanvasRenderingContext2D) {
            ctx.currentTransform = mat3.identity();
            ctx.$$transforms = [];
        }

        export function save(ctx: CanvasRenderingContext2D) {
            var ct = ctx.currentTransform;
            ctx.$$transforms.push(ct);
            ctx.currentTransform = !ct ? mat3.identity() : mat3.create(ct);
            ctx.save();
        }

        export function restore(ctx: CanvasRenderingContext2D) {
            ctx.currentTransform = ctx.$$transforms.pop();
            ctx.restore();
        }

        export function scale(ctx: CanvasRenderingContext2D, x: number, y: number) {
            var ct = ctx.currentTransform;
            mat3.scale(ct, x, y);
        }

        export function pretransformMatrix (ctx: CanvasRenderingContext2D, mat: number[]) {
            var ct = ctx.currentTransform;
            mat3.multiply(mat, ct, ct);
            ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
        }

        export function clipGeometry (ctx: CanvasRenderingContext2D, geom: IGeometry) {
            geom.Draw(ctx);
            ctx.clip();
        }
    }
}