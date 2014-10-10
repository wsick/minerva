module minerva.core.hittest.tapins {
    export function canHitInside (data: IHitTestData, pos: Point, hitList: Updater[], ctx: render.RenderContext): boolean {
        if (data.hitChildren)
            return true;

        //TODO: Handle in overrides
        /*
        if (!this.CanHitElement || !this.IsNeverInsideObject) {
            hitList.shift();
            ctx.restore();
            return false;
        }
        */

        return true;
    }
}