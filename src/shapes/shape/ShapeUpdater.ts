/// <reference path="../../core/Updater" />

module minerva.shapes.shape {
    export interface IShapeUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processup.IInput, render.IInput {
    }

    export class ShapeUpdater extends core.Updater {
        assets: IShapeUpdaterAssets;

        constructor () {
            super();
            this.setMeasurePipe(singleton(measure.ShapeMeasurePipeDef))
                .setArrangePipe(singleton(arrange.ShapeArrangePipeDef))
                .setRenderPipe(singleton(render.ShapeRenderPipeDef))
                .setProcessUpPipe(singleton(processup.ShapeProcessUpPipeDef))
                .setHitTestPipe(singleton(hittest.ShapeHitTestPipeDef));

            var assets = this.assets;
            assets.naturalBounds = new Rect();
            assets.shapeFlags = ShapeFlags.None;
            assets.stretchXform = mat3.identity();

            assets.fill = null;
            assets.stretch = Stretch.None;
            assets.stroke = null;
            assets.strokeThickness = 1.0;
            assets.strokeDashArray = [];
            assets.strokeDashCap = PenLineCap.Flat;
            assets.strokeDashOffset = 0;
            assets.strokeStartLineCap = PenLineCap.Flat;
            assets.strokeEndLineCap = PenLineCap.Flat
            assets.strokeLineJoin = PenLineJoin.Miter;
            assets.strokeMiterLimit = 10;
        }

        invalidateNaturalBounds () {
            var nb = this.assets.naturalBounds;
            nb.x = nb.y = nb.width = nb.height = 0;
            this.invalidateMeasure();
            this.updateBounds(true);
        }
    }
}