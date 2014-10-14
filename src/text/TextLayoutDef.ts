module minerva.text {
    export interface ITextLayoutContext {
        text: string;
        selectionStart: number;
        selectionLength: number;
        textWrapping: TextWrapping;
        textAlignment: TextAlignment;
        lineStackingStrategy: LineStackingStrategy;
        lineHeight: number;
    }
    export interface ITextAttributes {
        background: IBrush;
        selectionBackground: IBrush;
        foreground: IBrush;
        selectionForeground: IBrush;
        isUnderlined: boolean;
        font: Font;
    }
    export interface ITextLayoutAssets {
        availableWidth: number;
        actualWidth: number;
        actualHeight: number;
        wrapped: boolean;
        maxWidth: number;
        maxHeight: number;
        lines: layout.Line[];
        selCached: boolean;
    }

    export interface ITextLayoutPass {
        text: string;
        index: number;
        max: number;
    }

    export class TextLayoutDef {
        invalidate (assets: ITextLayoutAssets) {
            assets.actualWidth = NaN;
            assets.actualHeight = NaN;
        }

        invalidateSelection (assets: ITextLayoutAssets) {
            assets.selCached = false;
        }

        layout (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets) {
            //TODO: Implement lineStackingStrategy, lineHeight
            if (!isNaN(assets.actualWidth))
                return false;

            assets.actualWidth = 0.0;
            assets.actualHeight = 0.0;
            assets.lines = [];

            var text = lctx.text;
            if (!text)
                return false;

            if (lctx.textWrapping === TextWrapping.NoWrap)
                this.doLayoutNoWrap(lctx, attrs, assets);
            else
                this.doLayoutWrap(lctx, attrs, assets);
            this.invalidateSelection(assets);
        }

        doLayoutNoWrap (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets) {
            var text = lctx.text;

            var usedText = text;
            var end = text.length - 1;
            var width: number;
            //NOTE: Guess at clip point
            if ((width = this.measureTextWidth(usedText, attrs.font)) > assets.maxWidth) {
                end = (Math.ceil(assets.maxWidth / width) * text.length) || 0;
                usedText = text.slice(0, end);
            }
            //NOTE: Move backward if still need to clip
            while (end > -1 && (width = this.measureTextWidth(usedText, attrs.font)) > assets.maxWidth) {
                end--;
                usedText = text.slice(0, end);
            }
            //NOTE: Move forward if not clipping remaining characters
            while (end < text.length && (width = this.measureTextWidth(usedText, attrs.font)) > assets.maxWidth) {
                end++;
                usedText = text.slice(0, end);
            }

            var line = new layout.Line();
            line.height = attrs.font.getHeight();
            assets.lines.push(line);

            var run = new layout.Run();
            run.attrs = attrs;
            run.text = usedText;
            run.start = 0;
            run.length = end;
            run.width = width;

            line.width = run.width;
            line.runs.push(run);
        }

        doLayoutWrap (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets) {

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

        advanceLineBreak (run: layout.Run, pass: ITextLayoutPass, font: Font): boolean {
            var c0 = pass.text.charAt(pass.index);
            if (c0 === '\n') {
                run.length++;
                run.text += c0;
                run.width = this.measureTextWidth(run.text, font);
                pass.index++;
                return true;
            }
            var c1 = pass.text.charAt(pass.index + 1);
            if (c0 === '\r' && c1 === '\n') {
                run.length += 2;
                run.text += (c0 + c1);
                run.width = this.measureTextWidth(run.text, font);
                pass.index += 2;
                return true;
            }
            return false;
        }

        advanceToBreak (run: layout.Run, pass: ITextLayoutPass, font: Font): boolean {
            var c = pass.text.charAt(pass.index);

            return true;
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