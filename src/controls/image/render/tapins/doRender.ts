module minerva.controls.image.render.tapins {
    export function doRender (input: IInput, state: IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        var source = input.source;
        if (!source)
            return true;

        if (source.pixelWidth === 0 || source.pixelHeight === 0) {
            source.unlock();
            return true;
        }

        ctx.save();
        //TODO: RenderLayoutClip
        /*
        if (this.CompositeLayoutClip || input.overlap !== RectOverlap.In)
            this.RenderLayoutClip(ctx);
        */
        ctx.pretransformMatrix(input.imgXform);
        ctx.raw.drawImage(source.image, 0, 0);
        ctx.restore();

        source.unlock();

        return true;
    }
}