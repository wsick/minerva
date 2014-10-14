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
            line.width = run.width;
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
            var text = pass.text;
            //NOTE: Returning true implies a new line is necessary
            if (!isFinite(maxWidth)) {
                run.text += text.substr(pass.index);
                run.length = run.text.length;
                pass.index += run.text.length;
                run.width = this.measureTextWidth(run.text, font);
                return false;
            }

            var start = pass.index;
            var lastSpace = -1;
            var c: string;
            var curText = "";
            var curWidth = 0;
            while (pass.index < pass.max) {
                c = text.charAt(pass.index);
                curText += c;
                curWidth = this.measureTextWidth(curText, font);
                if (curWidth > maxWidth) {
                    var breakIndex = (lastSpace > -1) ? lastSpace + 1 : pass.index - 1;
                    run.length = (breakIndex - start) || 1; //Force at least 1 character
                    run.text = text.substr(start, run.length);
                    run.width = this.measureTextWidth(run.text, font);
                    pass.index = breakIndex;
                    return true;
                }
                if (c === ' ')
                    lastSpace = pass.index;
                pass.index++;
            }
            run.text = text.substr(start);
            run.length = run.text.length;
            run.width = this.measureTextWidth(run.text, font);
            return false;
        }

        measureTextWidth (text: string, font: Font): number {
            return engine.Surface.measureWidth(text, font);
        }
    }
}