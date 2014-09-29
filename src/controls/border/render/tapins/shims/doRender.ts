module minerva.controls.border.render.tapins.shim {
    export function doRender (input: IInput, state: IShimState, output: layout.render.IOutput, ctx: layout.render.RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        if (!state.shouldRender)
            return true;
        ctx.save();

        var raw = ctx.raw;
        if (Thickness.isBalanced(input.borderThickness)) {
            raw.beginPath();
            ctx.drawRectEx(state.strokeExtents, state.middleCornerRadius);
            ctx.strokeEx(input.borderBrush, { thickness: input.borderThickness.left, endCap: 0, startCap: 0, miterLimit: 0, join: 0 }, state.strokeExtents);
        } else {
            raw.beginPath();
            raw.fillStyle = state.pattern;
            ctx.drawRectEx(input.extents, state.outerCornerRadius);
            raw.fill();
        }

        ctx.restore();
        return true;
    }
}