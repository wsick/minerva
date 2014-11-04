module minerva.core.render.tapins {
    export function renderLayoutClip (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect, tree: IUpdaterTree): boolean {
        if (Rect.isEmpty(input.compositeLayoutClip))
            return true;
        ctx.clipRect(input.compositeLayoutClip);
        return true;
    }
}