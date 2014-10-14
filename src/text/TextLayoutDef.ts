module minerva.text {
    export class TextLayoutDef {
        invalidate (assets: ITextLayoutAssets) {
            assets.actualWidth = NaN;
            assets.actualHeight = NaN;
        }

        layout (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets): boolean {
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
            return true;
        }

        doLayoutNoWrap (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets) {
            var text = lctx.text;

            var usedText = text;
            var end = text.length - 1;
            var width: number;
            //NOTE: Guess at clip point
            if ((width = this.measureTextWidth(usedText, attrs.font)) > assets.maxWidth) {
                end = (Math.ceil(assets.maxWidth / width * text.length)) || 0;
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
            //NOTE: Include clipped character
            if ((end + 1) < text.length) {
                end++;
                usedText += text[end + 1];
                width = this.measureTextWidth(usedText, attrs.font);
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

            assets.actualWidth = line.width;
            assets.actualHeight = line.height;
        }

        doLayoutWrap (lctx: ITextLayoutContext, attrs: ITextAttributes, assets: ITextLayoutAssets) {
            var pass: ITextLayoutPass = {
                text: lctx.text,
                index: 0,
                max: lctx.text.length
            };

            var font = attrs.font;

            var line = new layout.Line();
            line.height = font.getHeight();
            assets.actualHeight += line.height;
            assets.lines.push(line);

            var run = new layout.Run();
            run.attrs = attrs;
            line.runs.push(run);

            while (pass.index < pass.max) {
                if (this.advanceLineBreak(run, pass, font) || this.advanceToBreak(run, pass, font, assets.maxWidth)) {
                    assets.actualWidth = Math.max(assets.actualWidth, run.width);
                    line.width = run.width;
                    line = new layout.Line();
                    line.height = font.getHeight();
                    assets.actualHeight += line.height;
                    assets.lines.push(line);

                    run = new layout.Run();
                    run.attrs = attrs;
                    line.runs.push(run);
                }
            }
            assets.actualWidth = Math.max(assets.actualWidth, run.width);
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

        advanceToBreak (run: layout.Run, pass: ITextLayoutPass, font: Font, maxWidth: number): boolean {
            //NOTE: Returning true implies a new line is necessary
            if (!isFinite(maxWidth)) {
                run.text += pass.text.substr(pass.index);
                run.length = run.text.length;
                run.width = this.measureTextWidth(run.text, font);
                return false;
            }

            var nextIndex = pass.text.indexOf(' ', pass.index);
            var nextText: string;
            var nextWidth: number;
            if (nextIndex === -1) {
                nextText = pass.text.substr(pass.index);
                nextWidth = this.measureTextWidth(nextText, font);
                if ((run.width + nextWidth) < maxWidth) {
                    run.text += nextText;
                    run.length += nextText.length;
                    run.width += nextWidth;
                    return false;
                }
                //If one word is too long, break up the word, advance run to break index
                //TODO: Implement one-word break
                return true;
            }

            while ((nextText = pass.text.slice(pass.index, nextIndex + 1)) != null && ((nextWidth = this.measureTextWidth(nextText, font)) + run.width) < maxWidth) {
                run.text += nextText;
                run.length += nextText.length;
                run.width += nextWidth;
                pass.index = nextIndex + 1;
                nextIndex = pass.text.indexOf(' ', pass.index);
            }

            return nextText.length > 0;
        }

        measureTextWidth (text: string, font: Font): number {
            return engine.Surface.measureWidth(text, font);
        }
    }
}