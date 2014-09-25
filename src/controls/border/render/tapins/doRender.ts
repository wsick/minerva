module minerva.controls.border.render.tapins {
    export function doRender (input: IInput, state: IState, output: layout.render.IOutput, ctx: layout.render.RenderContext, region: Rect): boolean {
        if (!state.shouldRender)
            return true;
        ctx.save();

        var borderBrush = input.borderBrush;
        var extents = input.extents;
        var fillExtents = state.fillExtents;
        var raw = ctx.raw;
        if (borderBrush && !Rect.isEmpty(extents)) {
            raw.beginPath();
            ctx.drawRectEx(extents, state.outerCornerRadius);
            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
            ctx.fillEx(borderBrush, extents, "evenodd");
        }
        var backgroundBrush = input.backgroundBrush;
        if (backgroundBrush && !Rect.isEmpty(fillExtents)) {
            raw.beginPath();
            ctx.drawRectEx(fillExtents, state.innerCornerRadius);
            ctx.fillEx(backgroundBrush, fillExtents);
        }

        ctx.restore();
        return true;
    }
}