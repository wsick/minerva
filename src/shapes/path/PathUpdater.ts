module minerva.shapes.path {
    export interface IPathUpdaterAssets extends shape.IShapeUpdaterAssets, measure.IInput, render.IInput {
    }

    export class PathUpdater extends shape.ShapeUpdater {
        assets: IPathUpdaterAssets;

        init () {
            var assets = this.assets;
            assets.data = null;
            assets.stretch = Stretch.None;

            super.init();
        }
    }
}