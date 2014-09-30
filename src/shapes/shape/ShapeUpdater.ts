/// <reference path="../../layout/Updater" />

module minerva.shapes.shape {
    export class ShapeUpdater extends layout.Updater {
        constructor () {
            super();
            this.setMeasurePipe(singleton(ShapeMeasurePipeDef))
                .setArrangePipe(singleton(ShapeArrangePipeDef))
                .setRenderPipe(singleton(ShapeRenderPipeDef))
                .setSizingPipe(singleton(ShapeSizingPipeDef));
        }
    }
}