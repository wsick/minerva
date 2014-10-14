module minerva.text {
    export class TextRenderDef {
        render (ctx: core.render.RenderContext, lctx: ITextLayoutContext, assets: ITextLayoutAssets) {
            this.splitSelection(lctx, assets);

            ctx.save();
            assets.lines.forEach(line => {
                var halign = this.getHorizontalAlignmentX(lctx, assets, line);
                ctx.translate(halign, 0);
                line.runs.forEach(run => {
                    if (run.pre) {
                        layout.Cluster.render(run.pre, run.attrs, ctx);
                        ctx.translate(run.pre.width, 0);
                    }
                    if (run.sel) {
                        layout.Cluster.render(run.sel, run.attrs, ctx);
                        ctx.translate(run.sel.width, 0);
                    }
                    if (run.post) {
                        layout.Cluster.render(run.post, run.attrs, ctx);
                        ctx.translate(run.post.width, 0);
                    }
                });
                ctx.translate(-line.width - halign, line.height);
            });
            ctx.restore();
        }

        splitSelection (lctx: ITextLayoutContext, assets: ITextLayoutAssets) {
            if (!assets.selCached)
                return;
            var start = lctx.selectionStart;
            var end = start + lctx.selectionLength;
            assets.lines.forEach(line =>
                line.runs.forEach(run =>
                    layout.Run.splitSelection(run, start, end, (text, attrs) => this.measureTextWidth(text, attrs.font))));
            assets.selCached = true;
        }

        getHorizontalAlignmentX (lctx: ITextLayoutContext, assets: ITextLayoutAssets, line: layout.Line) {
            if (lctx.textAlignment === TextAlignment.Left || lctx.textAlignment === TextAlignment.Justify)
                return 0;
            var width = getWidthConstraint(assets);
            if (line.width < width)
                return 0;
            if (lctx.textAlignment === TextAlignment.Center)
                return (width - line.width) / 2.0;
            return width - line.width;
        }

        measureTextWidth (text: string, font: Font): number {
            return engine.Surface.measureWidth(text, font);
        }
    }

    function getWidthConstraint (assets: ITextLayoutAssets): number {
        if (isFinite(assets.availableWidth))
            return assets.availableWidth;
        if (!isFinite(assets.maxWidth))
            return assets.actualWidth;
        return Math.min(assets.actualWidth, assets.maxWidth);
    }
}