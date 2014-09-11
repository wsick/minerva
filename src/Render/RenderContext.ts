module minerva.render {
    export class RenderContext {
        static pretransformMatrix (ctx: CanvasRenderingContext2D, xform: number[]) {

        }

        static clipGeometry (ctx: CanvasRenderingContext2D, geom: IGeometry) {
            geom.Draw(ctx);
            ctx.clip();
        }
    }
}