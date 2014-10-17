module minerva.shapes.shape.hittest.tapins {
    export function canHitShape (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
        if ((data.assets.shapeFlags & ShapeFlags.Empty) === 0) {
            hitList.shift();
            ctx.restore();
            return false;
        }
        return true;
    }
}