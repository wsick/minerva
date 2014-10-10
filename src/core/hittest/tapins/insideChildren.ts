module minerva.core.hittest.tapins {
    export function insideChildren (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        hitList.unshift(data.updater);

        data.hitChildren = false;
        for (var walker = data.tree.walk(WalkDirection.ZReverse); walker.step(); ) {
            if (walker.current.hitTest(pos, hitList, ctx)) {
                data.hitChildren = true;
                return true;
            }
        }

        return true;
    }
}