module minerva.text {
    export class TextLayoutDef {
        invalidate (assets: ITextLayoutAssets) {
            assets.actualWidth = NaN;
            assets.actualHeight = NaN;
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
            assets.selCached = false;
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
            var pass: ITextLayoutPass = {
                text: lctx.text,
                index: 0,
                max: lctx.text.length
            };

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
}