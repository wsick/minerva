module minerva.controls.border.render.tapins.shim {
    export function doRender (input: IInput, state: IShimState, output: layout.render.IOutput, ctx: layout.render.RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        if (!state.shouldRender)
            return true;
        ctx.save();

        var raw = ctx.raw;
        if (Thickness.isBalanced(input.borderThickness)) {
            raw.beginPath();
            ctx.drawRectEx(state.strokeExtents, state.middleCornerRadius);

            raw.lineWidth = input.borderThickness.left;
            raw.lineCap = "butt";
            raw.lineJoin = "miter";
            raw.miterLimit = 0;
            input.borderBrush.setupBrush(raw, state.strokeExtents);
            raw.strokeStyle = input.borderBrush.toHtml5Object();
            raw.stroke();
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