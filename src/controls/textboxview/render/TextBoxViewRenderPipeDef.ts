module minerva.controls.textboxview.render {
    export interface IInput extends core.render.IInput, text.IDocumentContext {
        isCaretVisible: boolean;
        caretRegion: Rect;
        caretBrush: IBrush;
    }

    export class TextBoxViewRenderPipeDef extends core.render.RenderPipeDef {
        constructor () {
            super();
            this.replaceTapin('doRender', tapins.doRender)
                .addTapinAfter('doRender', 'renderCaret', tapins.renderCaret);
        }
    }

    export module tapins {
        export function doRender (input: IInput, state: core.render.IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: TextBoxViewUpdaterTree): boolean {
            ctx.save();
            //TODO: Render layout clip
            tree.render(ctx, input);
            ctx.restore();
            return true;
        }

        export function renderCaret (input: IInput, state: core.render.IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: TextBoxViewUpdaterTree): boolean {
            if (!input.isCaretVisible)
                return true;

            var region = input.caretRegion;
            var brush = input.caretBrush;
            var raw = ctx.raw;

            raw.beginPath();
            raw.moveTo(region.x + 0.5, region.y);
            raw.lineTo(region.x + 0.5, region.y + region.height);
            raw.lineWidth = 1.0;
            if (brush) {
                brush.setupBrush(raw, region);
                raw.strokeStyle = brush.toHtml5Object();
            } else {
                raw.strokeStyle = "#000000";
            }
            raw.stroke();

            return true;
        }
    }
}