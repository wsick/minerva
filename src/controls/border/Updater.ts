/// <reference path="../../layout/Updater" />

module minerva.controls.border {
    export interface IUpdaterAssets extends layout.IUpdaterAssets, measure.IInput, arrange.IInput {
    }

    export class Updater extends layout.Updater {
        assets: IUpdaterAssets;

        constructor () {
            super();
            this.setContainerMode(true)
                .setMeasurePipe(border.measure.MeasurePipeDef.instance)
                .setArrangePipe(border.arrange.ArrangePipeDef.instance)
                .setRenderPipe();

            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();
            assets.childUpdater = null;
        }
    }
}