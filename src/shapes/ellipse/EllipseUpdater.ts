/// <reference path="../shape/ShapeUpdater" />

module minerva.shapes.ellipse {
    export interface IEllipseUpdaterAssets extends shape.IShapeUpdaterAssets, render.IInput {
    }

    export class EllipseUpdater extends shape.ShapeUpdater {
        assets: IEllipseUpdaterAssets;

        init () {
            this.setRenderPipe(singleton(render.EllipseRenderPipeDef))
                .setHitTestPipe(singleton(hittest.EllipseHitTestPipeDef));

            var assets = this.assets;
            assets.stretch = Stretch.Fill;

            super.init();
        }
    }
}