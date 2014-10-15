module minerva.controls.panel.render {
    export interface IInput extends core.render.IInput, core.helpers.ISized {
        background: IBrush;
        compositeLayoutClip: Rect;
    }

    export class PanelRenderPipeDef extends core.render.RenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('doRender', doRender);
        }
    }

    function doRender (input: IInput, state: core.render.IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        var background = input.background;
        if (!background || background.isTransparent())
            return true;
        var renderRegion = state.renderRegion;
        if (Rect.isEmpty(renderRegion))
            return true;

        var raw = ctx.raw;
        var composite = input.compositeLayoutClip;
        if (composite && !Rect.isEmpty(composite)) {
            raw.beginPath();
            raw.rect(composite.x, composite.y, composite.width, composite.height);
            raw.clip();
        }

        raw.beginPath();
        raw.rect(renderRegion.x, renderRegion.y, renderRegion.width, renderRegion.height);
        ctx.fillEx(background, renderRegion);

        return true;
    }
}