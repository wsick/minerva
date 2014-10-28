module minerva.core.hittest.tapins {
    export function insideLayoutClip (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext, includeAll: boolean): boolean {
        if (data.hitChildren)
            return true;

        var layoutClip = data.assets.layoutClip;
        if (!layoutClip || Rect.isEmpty(layoutClip))
            return true;

        //TODO: Handle composite LayoutClip

        var lcbounds = data.layoutClipBounds;
        Rect.copyTo(layoutClip, lcbounds);
        Rect.transform(lcbounds, ctx.currentTransform);

        if (!Rect.containsPoint(lcbounds, pos)) {
            hitList.shift();
            ctx.restore();
            return false;
        }

        return true;
    }
}