module minerva.controls.video.render.tapins {
    export function doRender (input: IInput, state: IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        var source = input.source;
        if (!source || source.pixelWidth === 0 || source.pixelHeight === 0)
            return true;

        source.lock();
        ctx.save();
        core.helpers.renderLayoutClip(ctx, input, tree);
        ctx.preapply(input.vidXform);
        ctx.raw.drawImage(source.video, 0, 0, region.width, region.height - 1);
        ctx.restore();
        source.unlock();

        return true;
    }
}