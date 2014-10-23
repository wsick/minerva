module minerva.controls.textboxview.render {
    export interface IInput extends core.render.IInput, text.IDocumentContext {
    }

    export class TextBoxViewRenderPipeDef extends core.render.RenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('doRender', tapins.doRender);
        }
    }

    export module tapins {
        export function renderCursor (input: IInput, state: core.render.IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: TextBoxViewUpdaterTree): boolean {
            //TODO: Render cursor
            return true;
        }

        export function doRender (input: IInput, state: core.render.IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: TextBoxViewUpdaterTree): boolean {

            //TODO: save
            //TODO: Render layout clip
            tree.render(ctx, input);
            //TODO: restore
            return true;
        }
    }
}