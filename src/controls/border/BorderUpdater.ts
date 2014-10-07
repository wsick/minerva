/// <reference path="../../core/Updater" />

module minerva.controls.border {
    export interface IBorderUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, render.IInput {
    }

    export class BorderUpdater extends core.Updater {
        tree: BorderTree;
        assets: IBorderUpdaterAssets;

        init () {
            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();
            this.setTree(new BorderTree())
                .setMeasurePipe(singleton(border.measure.BorderMeasurePipeDef))
                .setArrangePipe(singleton(border.arrange.BorderArrangePipeDef))
                .setRenderPipe(singleton(core.render.RenderContext.hasFillRule ? border.render.BorderRenderPipeDef : border.render.ShimBorderRenderPipeDef));
            super.init();
        }
    }
}