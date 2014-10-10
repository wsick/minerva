module minerva.controls.image.hittest.tapins {
    export function insideStretch (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
        //TODO: Implement
        /*
         var img = <Image>this.Node.XObject;
         var source = img.Source;
         if (!source)
         return false;
         var stretch = img.Stretch;
         if (stretch === Media.Stretch.Fill || stretch === Media.Stretch.UniformToFill)
         return true;
         var metrics = calculateRenderMetrics(img, source, this);
         if (!metrics)
         return null;

         var irect = new rect();
         irect.Width = source.PixelWidth;
         irect.Height = source.PixelHeight;
         rect.transform(irect, metrics.Matrix);
         var np = new Point(x, y);
         this.TransformPoint(np);
         return rect.containsPoint(irect, np);
         */

        return true;
    }
}