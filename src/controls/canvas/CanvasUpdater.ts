/// <reference path="../panel/PanelUpdater" />

module minerva.controls.canvas {
    export interface ICanvasUpdaterAssets extends panel.IPanelUpdaterAssets, measure.IInput {
    }

    export class CanvasUpdater extends panel.PanelUpdater {
        assets: ICanvasUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.CanvasMeasurePipeDef))
                .setArrangePipe(singleton(arrange.CanvasArrangePipeDef))
                .setProcessUpPipe(singleton(processup.CanvasProcessUpPipeDef));
            super.init();
        }
    }
}