module minerva.controls.image {
    export interface IImageUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, render.IInput {
    }

    export class ImageUpdater extends core.Updater {
        assets: IImageUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.ImageMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ImageArrangePipeDef))
                .setRenderPipe(singleton(render.ImageRenderPipeDef));

            var assets = this.assets;
            assets.source = null;
            assets.stretch = Stretch.Uniform;

            super.init();
        }
    }
}