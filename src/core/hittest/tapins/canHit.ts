module minerva.core.hittest.tapins {
    export function canHit (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        return data.assets.totalIsRenderVisible && data.assets.totalIsHitTestVisible;
    }
}