module minerva.core.hittest.tapins {
    export function canHit (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        //TODO: Handle ShouldSkipHitTest in overrides
        return data.assets.totalIsRenderVisible && data.assets.totalIsHitTestVisible;
    }
}