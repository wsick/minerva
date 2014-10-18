module minerva.shapes.path {
    export interface IPathUpdaterAssets extends shape.IShapeUpdaterAssets {
        path: minerva.path.Path;
    }

    export class PathUpdater extends shape.ShapeUpdater {
        assets: IPathUpdaterAssets;

        init() {

            var assets = this.assets;
            assets.path = new minerva.path.Path();

            super.init();
        }
    }
}