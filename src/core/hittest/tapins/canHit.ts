module minerva.core.hittest.tapins {
    export function canHit (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        var assets = data.assets;
        return !!assets.totalIsRenderVisible
            && !!assets.totalIsHitTestVisible
            && ((assets.totalOpacity * 255) >= 0.5);
    }
}