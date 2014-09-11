interface CanvasRenderingContext2D {
    currentTransform: number[];
}

module minerva.render {
    export class RenderContext {
        static pretransformMatrix (ctx: CanvasRenderingContext2D, mat: number[]) {
            var ct = ctx.currentTransform;
            mat3.multiply(mat, ct, ct);
            ctx.setTransform(ct[0], ct[1], ct[3], ct[4], ct[2], ct[5]);
        }

        static clipGeometry (ctx: CanvasRenderingContext2D, geom: IGeometry) {
            geom.Draw(ctx);
            ctx.clip();
        }
    }
}