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
                .setSizingPipe(singleton(sizing.ShapeSizingPipeDef))
                //TODO: Process Up Pipe (compute extents)
                .setHitTestPipe(singleton(hittest.ShapeHitTestPipeDef))

            var assets = this.assets;
            assets.shape = this.createShape();
            assets.naturalBounds = new Rect();
            assets.shapeFlags = ShapeFlags.None;
            assets.stretchXform = mat3.identity();
        }

        createShape (): Shape {
            return new Shape();
        }

        invalidateStretch () {
            var e = this.assets.extents;
            e.x = e.y = e.width = e.height = 0;
            var ewc = this.assets.extentsWithChildren;
            ewc.x = ewc.y = ewc.width = ewc.height = 0;
            mat3.identity(this.assets.stretchXform);
            //TODO: Implement for PathUpdater
            //this.InvalidatePathCache();
        }

        invalidateNaturalBounds () {
            var nb = this.assets.naturalBounds;
            nb.x = nb.y = nb.width = nb.height = 0;
            this.invalidateStretch();
            this.invalidate();
        }
    }
}