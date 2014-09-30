/// <reference path="../../layout/Updater" />

module minerva.shapes.shape {
    export interface IShapeUpdaterAssets extends layout.IUpdaterAssets, render.IInput, sizing.IInput {
    }

    export class ShapeUpdater extends layout.Updater {
        assets: IShapeUpdaterAssets;

        constructor () {
            super();
            this.setMeasurePipe(singleton(measure.ShapeMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ShapeArrangePipeDef))
                .setRenderPipe(singleton(render.ShapeRenderPipeDef))
                .setSizingPipe(singleton(sizing.ShapeSizingPipeDef));
            //TODO: Process Up Pipe (compute extents)

            var assets = this.assets;

            assets.naturalBounds = new Rect();
            assets.shapeFlags = ShapeFlags.None;
            assets.stretchXform = mat3.identity();

            assets.path = null;

            assets.stretch = Stretch.None;
            assets.fill = null;
            assets.fillRule = FillRule.EvenOdd;
            assets.stroke = null;
            assets.strokeThickness = 0;
            assets.strokeStartLineCap = PenLineCap.Flat;
            assets.strokeEndLineCap = PenLineCap.Flat;
            assets.strokeLineJoin = PenLineJoin.Miter;
            assets.strokeMiterLimit = 10;
        }
    }
}