/// <reference path="../../layout/Updater" />

module minerva.shapes.shape {
    export interface IShapeUpdaterAssets extends layout.IUpdaterAssets, render.IInput {
    }

    export class ShapeUpdater extends layout.Updater {
        assets: IShapeUpdaterAssets;

        constructor () {
            super();
            this.setMeasurePipe(singleton(measure.ShapeMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ShapeArrangePipeDef))
                .setRenderPipe(singleton(render.ShapeRenderPipeDef))
                .setSizingPipe(singleton(sizing.ShapeSizingPipeDef));
        }
    }
}