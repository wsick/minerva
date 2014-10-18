/// <reference path="../../shape/hittest/ShapeHitTestPipeDef" />

module minerva.shapes.rectangle.hittest {
    export interface IHitTestData extends shape.hittest.IHitTestData {
        assets: IRectangleUpdaterAssets;
    }

    export class RectangleHitTestPipeDef extends shape.hittest.ShapeHitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('insideShape', tapins.insideShape);
        }
    }

    export module tapins {
        export function insideShape (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            var assets = data.assets;
            ctx.save();
            ctx.pretransformMatrix(assets.stretchXform);

            var width = assets.actualWidth;
            var height = assets.actualHeight;
            var rx = Math.min(Math.abs(assets.radiusX), width / 2.0);
            if (isNaN(rx))
                rx = 0;
            var ry = Math.min(Math.abs(assets.radiusY), height / 2.0);
            if (isNaN(ry))
                ry = 0;

            helpers.draw(ctx.raw, 0, 0, width, height, rx, ry);
            var inside = (!!assets.fill && ctx.raw.isPointInPath(pos.x, pos.y))
                || (!!assets.stroke && ctx.isPointInStrokeEx(assets, pos.x, pos.y));
            ctx.restore();

            if (!inside) {
                hitList.shift();
                return false;
            }

            return true;
        }
    }
}