module minerva.controls.panel.render {
    export interface IInput extends core.render.IInput, core.helpers.ISized {
        background: IBrush;
        compositeLayoutClip: Rect;
        extents: Rect;
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
        var extents = input.extents;
        if (Rect.isEmpty(extents))
            return true;

        var raw = ctx.raw;
        raw.beginPath();
        raw.rect(extents.x, extents.y, extents.width, extents.height);
        ctx.fillEx(background, extents);

        return true;
    }
}