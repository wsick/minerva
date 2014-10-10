module minerva.controls.control.hittest {
    export interface IHitTestData extends core.hittest.IHitTestData {
        assets: IControlUpdaterAssets;
    }

    export class ControlHitTestPipeDef extends core.hittest.HitTestPipeDef {
        constructor () {
            super();
            this.addTapinBefore('canHit', 'shouldSkip', tapins.shouldSkip)
                .replaceTapin('canHitInside', tapins.canHitInside);
        }
    }

    export module tapins {
        export function shouldSkip (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            if (data.assets.isEnabled)
                return true;
            hitList.shift();
            ctx.restore();
            return false;
        }

        export function canHitInside (data: IHitTestData, pos: Point, hitList: core.Updater[], ctx: core.render.RenderContext): boolean {
            if (data.hitChildren)
                return true;

            hitList.shift();
            ctx.restore();
            return false;
        }
    }
}