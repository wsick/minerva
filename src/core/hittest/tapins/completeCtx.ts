module minerva.core.hittest.tapins {
    export function completeCtx (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        ctx.restore();
        return true;
    }
}