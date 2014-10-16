/// <reference path="../shape/ShapeUpdater" />

module minerva.shapes.rectangle {
    export interface IRectangleUpdaterAssets extends shape.IShapeUpdaterAssets, measure.IInput {
    }

    export class RectangleUpdater extends shape.ShapeUpdater {
        assets: IRectangleUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.RectangleMeasurePipeDef));

            super.init();
        }
    }
}