module minerva.shapes.shape.hittest.tapins {
    export function insideShape (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
        //TODO: Implement insideShape
        /*
         if ((data.assets.shapeFlags & ShapeFlags.Empty) === 0)
         return false;
         if (!this.Fill && !this.Stroke)
         return false;
         ctx.save();
         ctx.pretransformMatrix(this.StretchXform);
         this.Draw(ctx);
         var ret = false;
         if (this.Fill) {
         ret = ctx.isPointInPath(x, y);
         } else if (!ret) {
         ret = ctx.isPointInStrokeEx(this.CreateStrokeParameters(), x, y);
         }
         ctx.restore();
         return ret;
         */

        return true;
    }
}