/// <reference path="../../layout/Updater" />

module minerva.controls.border {
    export interface IUpdaterAssets extends layout.IUpdaterAssets, measure.IInput, arrange.IInput {
    }


    export class BorderUpdater extends layout.Updater {
        assets: IUpdaterAssets;

        constructor () {
            super();
            this.setContainerMode(true)
                .setProcessDownPipe()
                .setProcessUpPipe()
                .setMeasurePipe(singleton(border.measure.MeasurePipeDef))
                .setArrangePipe(singleton(border.arrange.ArrangePipeDef))
                .setRenderPipe(singleton(layout.render.RenderContext.hasFillRule ? border.render.RenderPipeDef : border.render.ShimRenderPipeDef));

            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();
            assets.childUpdater = null;
        }
    }
}