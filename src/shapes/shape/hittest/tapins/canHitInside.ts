module minerva.shapes.shape.hittest.tapins {
    export function canHitInside (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
        if (!data.assets.shape.fill && !data.assets.shape.stroke) {
            hitList.shift();
            ctx.restore();
            return false;
        }
        return true;
    }
}