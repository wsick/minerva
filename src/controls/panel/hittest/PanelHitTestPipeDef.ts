module minerva.controls.panel.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IPanelUpdaterAssets;
    }

    export class PanelHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.replaceTapin('canHitInside', tapins.canHitInside);
        }
    }

    export module tapins {
        export function canHitInside (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            var bg = data.assets.background;
            if (!bg || bg.isTransparent()) {
                hitList.shift();
                ctx.restore();
                return false;
            }
            return true;
        }
    }
}