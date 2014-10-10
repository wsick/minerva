module minerva.controls.border.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IBorderUpdaterAssets;
    }

    export class BorderHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('canHitInside', tapins.canHitInside);
        }
    }

    export module tapins {
        export function canHitInside (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            var bg = data.assets.background;
            var bb = data.assets.borderBrush;
            if ((!bg || bg.isTransparent()) && (!bb || bb.isTransparent())) {
                hitList.shift();
                ctx.restore();
                return false;
            }
            return true;
        }
    }
}