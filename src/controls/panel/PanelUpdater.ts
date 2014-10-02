module minerva.controls.panel {
    export interface IPanelUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processdown.IInput, processup.IInput, render.IInput {
    }

    export class PanelUpdater extends core.Updater {
        assets: IPanelUpdaterAssets;

        init () {
            var assets = this.assets;
            assets.background = null;
            assets.zSorted = [];

            this.setMeasurePipe(singleton(panel.measure.PanelMeasurePipeDef))
                .setArrangePipe(singleton(panel.arrange.PanelArrangePipeDef))
                .setProcessDownPipe(singleton(panel.processdown.PanelProcessDownPipeDef))
                .setProcessUpPipe(singleton(panel.processup.PanelProcessUpPipeDef))
                .setRenderPipe(singleton(panel.render.PanelRenderPipeDef));
            super.init();
        }
    }
}