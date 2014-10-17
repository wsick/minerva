/// <reference path="../../core/Updater" />

module minerva.shapes.shape {
    export interface IShapeUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, sizing.IInput, processup.IInput, render.IInput {
    }

    export class ShapeUpdater extends core.Updater {
        assets: IShapeUpdaterAssets;

        constructor () {
            super();
            this.setMeasurePipe(singleton(measure.ShapeMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ShapeArrangePipeDef))
                .setRenderPipe(singleton(render.ShapeRenderPipeDef))
                .setSizingPipe(singleton(sizing.ShapeSizingPipeDef))
                .setProcessUpPipe(singleton(processup.ShapeProcessUpPipeDef))
                .setHitTestPipe(singleton(hittest.ShapeHitTestPipeDef));

            var assets = this.assets;
            assets.naturalBounds = new Rect();
            assets.shapeFlags = ShapeFlags.None;
            assets.stretchXform = mat3.identity();
        }

        invalidateNaturalBounds () {
            var nb = this.assets.naturalBounds;
            nb.x = nb.y = nb.width = nb.height = 0;
            this.invalidateMeasure();
            this.updateBounds(true);
        }
    }
}