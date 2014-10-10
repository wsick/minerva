module minerva.controls.image {
    export interface IImageUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processdown.IInput, render.IInput {
    }

    export class ImageUpdater extends core.Updater {
        assets: IImageUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.ImageMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ImageArrangePipeDef))
                .setProcessDownPipe(singleton(processdown.ImageProcessDownPipeDef))
                .setRenderPipe(singleton(render.ImageRenderPipeDef))
                .setHitTestPipe(singleton(hittest.ImageHitTestPipeDef));

            var assets = this.assets;
            assets.source = null;
            assets.stretch = Stretch.Uniform;
            assets.overlap = RectOverlap.In;
            assets.imgXform = mat3.identity();

            super.init();
        }

        invalidateMetrics (): ImageUpdater {
            this.assets.dirtyFlags |= DirtyFlags.ImageMetrics;
            core.Updater.$$addDownDirty(this);
            return this;
        }

        //TODO: Hit Testing
        /*
         InsideObject (ctx: RenderContextEx, x: number, y: number) {
         if (!super.InsideObject(ctx, x, y))
         return false;

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
         }
         */
    }
}