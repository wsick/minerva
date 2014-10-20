module minerva.shapes.path {
    export interface IPathUpdaterAssets extends shape.IShapeUpdaterAssets, measure.IInput, render.IInput {
    }

    export class PathUpdater extends shape.ShapeUpdater {
        assets: IPathUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.PathMeasurePipeDef))
                .setRenderPipe(singleton(render.PathRenderPipeDef));

            var assets = this.assets;
            assets.stretch = Stretch.None;

            super.init();
        }
    }
}