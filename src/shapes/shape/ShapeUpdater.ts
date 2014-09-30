/// <reference path="../../core/Updater" />

module minerva.shapes.shape {
    export interface IShapeUpdaterAssets extends core.IUpdaterAssets, render.IInput, sizing.IInput {
    }

    export class ShapeUpdater extends core.Updater {
        assets: IShapeUpdaterAssets;

        constructor () {
            super();
            this.setMeasurePipe(singleton(measure.ShapeMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ShapeArrangePipeDef))
                .setRenderPipe(singleton(render.ShapeRenderPipeDef))
                .setSizingPipe(singleton(sizing.ShapeSizingPipeDef));
            //TODO: Process Up Pipe (compute extents)

            var assets = this.assets;
            assets.shape = this.createShape();
            assets.naturalBounds = new Rect();
            assets.shapeFlags = ShapeFlags.None;
            assets.stretchXform = mat3.identity();
        }

        createShape (): Shape {
            return new Shape();
        }
    }
}