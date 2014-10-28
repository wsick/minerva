module minerva.core.hittest.tapins {
    export function prepareCtx (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext, includeAll: boolean): boolean {
        ctx.save();
        ctx.pretransformMatrix(data.assets.renderXform);
        return true;
    }
}