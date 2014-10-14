module minerva.text {
    export interface IDocumentContext {
        selectionStart: number;
        selectionLength: number;
        textWrapping: TextWrapping;
        textAlignment: TextAlignment;
        lineStackingStrategy: LineStackingStrategy;
        lineHeight: number;
    }
    export interface IDocumentAssets {
        availableWidth: number;
        actualWidth: number;
        actualHeight: number;
        maxWidth: number;
        maxHeight: number;
        lines: layout.Line[];
        selCached: boolean;
    }

    export interface IDocumentLayoutDef {
        createAssets (): IDocumentAssets;
        layout (docctx: IDocumentContext, docassets: IDocumentAssets, walker: IWalker<text.TextUpdater>): boolean;
        render (ctx: core.render.RenderContext, docctx: IDocumentContext, docassets: IDocumentAssets);
    }

    export class DocumentLayoutDef implements IDocumentLayoutDef {
        createAssets (): IDocumentAssets {
            return {
                availableWidth: Number.POSITIVE_INFINITY,
                actualWidth: NaN,
                actualHeight: NaN,
                maxWidth: Number.POSITIVE_INFINITY,
                maxHeight: Number.POSITIVE_INFINITY,
                lines: [],
                selCached: false
            };
        }

        layout (docctx: IDocumentContext, docassets: IDocumentAssets, walker: IWalker<text.TextUpdater>): boolean {
            docassets.actualWidth = 0.0;
            docassets.actualHeight = 0.0;
            docassets.lines = [];
            for (var offset = 0; walker.step();) {
                offset += walker.current.layout(docctx, docassets);
            }
            return true;
        }

        render (ctx: core.render.RenderContext, docctx: IDocumentContext, docassets: IDocumentAssets) {
            this.splitSelection(docctx, docassets);

            ctx.save();
            docassets.lines.forEach(line => {
                var halign = this.getHorizontalAlignmentX(docctx, docassets, line);
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

        splitSelection (docctx: IDocumentContext, assets: IDocumentAssets) {
            if (!assets.selCached)
                return;
            var start = docctx.selectionStart;
            var end = start + docctx.selectionLength;
            assets.lines.forEach(line =>
                line.runs.forEach(run =>
                    layout.Run.splitSelection(run, start, end, (text, attrs) => this.measureTextWidth(text, attrs.font))));
            assets.selCached = true;
        }

        getHorizontalAlignmentX (docctx: IDocumentContext, assets: IDocumentAssets, line: layout.Line) {
            if (docctx.textAlignment === TextAlignment.Left || docctx.textAlignment === TextAlignment.Justify)
                return 0;
            var width = getWidthConstraint(assets);
            if (line.width < width)
                return 0;
            if (docctx.textAlignment === TextAlignment.Center)
                return (width - line.width) / 2.0;
            return width - line.width;
        }

        measureTextWidth (text: string, font: Font): number {
            return engine.Surface.measureWidth(text, font);
        }
    }

    function getWidthConstraint (assets: IDocumentAssets): number {
        if (isFinite(assets.availableWidth))
            return assets.availableWidth;
        if (!isFinite(assets.maxWidth))
            return assets.actualWidth;
        return Math.min(assets.actualWidth, assets.maxWidth);
    }
}