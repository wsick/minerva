module minerva.text {
    export interface ITextAssets {
        text: string;
        background: IBrush;
        selectionBackground: IBrush;
        foreground: IBrush;
        selectionForeground: IBrush;
        isUnderlined: boolean;
        font: Font;
    }

    export interface ITextLayoutPass {
        text: string;
        index: number;
        max: number;
    }

    export class TextLayoutDef {
        layout (docctx: IDocumentContext, docassets: IDocumentAssets, assets: ITextAssets): boolean {
            //TODO: Implement lineStackingStrategy, lineHeight
            var text = assets.text;
            if (!text) {
                var line = new layout.Line();
                line.height = assets.font.getHeight();
                docassets.lines.push(line);
                return false;
            }

            if (docctx.textWrapping === TextWrapping.NoWrap)
                this.doLayoutNoWrap(docctx, docassets, assets);
            else
                this.doLayoutWrap(docctx, docassets, assets);

            docassets.selCached = false;
            return true;
        }

        doLayoutNoWrap (docctx: IDocumentContext, docassets: IDocumentAssets, assets: ITextAssets) {
            var text = assets.text;

            var usedText = text;
            var end = text.length;
            var width: number;
            //NOTE: Guess at clip point
            if ((width = this.measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
                end = (Math.ceil(docassets.maxWidth / width * text.length)) || 0;
                usedText = text.substr(0, end);
            }
            //NOTE: Move backward if still need to clip
            while (end > 0 && (width = this.measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
                end--;
                usedText = text.substr(0, end);
            }
            //NOTE: Move forward if not clipping remaining characters
            while (end < text.length && (width = this.measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
                end++;
                usedText = text.substr(0, end);
            }
            //NOTE: Include clipped character
            if ((end + 1) < text.length) {
                end++;
                usedText += text[end + 1];
                width = this.measureTextWidth(usedText, assets.font);
            }

            var line = new layout.Line();
            line.height = assets.font.getHeight();
            docassets.lines.push(line);

            var run = new layout.Run();
            run.attrs = assets;
            run.text = usedText;
            run.start = 0;
            run.length = end;
            run.width = width;

            line.width = run.width;
            line.runs.push(run);

            docassets.actualWidth = line.width;
            docassets.actualHeight = line.height;
        }

        doLayoutWrap (docctx: IDocumentContext, docassets: IDocumentAssets, assets: ITextAssets) {
            var pass: ITextLayoutPass = {
                text: assets.text,
                index: 0,
                max: assets.text.length
            };

            var font = assets.font;

            var line = new layout.Line();
            line.height = font.getHeight();
            docassets.actualHeight += line.height;
            docassets.lines.push(line);

            var run = new layout.Run();
            run.attrs = assets;
            line.runs.push(run);

            while (pass.index < pass.max) {
                var hitbreak = isFinite(docassets.maxWidth) ? this.advanceFinite(run, pass, font, docassets.maxWidth) : this.advanceInfinite(run, pass, font);
                if (hitbreak) {
                    docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
                    line.width = run.width;
                    line = new layout.Line();
                    line.height = font.getHeight();
                    docassets.actualHeight += line.height;
                    docassets.lines.push(line);

                    run = new layout.Run();
                    run.attrs = assets;
                    line.runs.push(run);
                }
            }
            line.width = run.width;
            docassets.actualWidth = Math.max(docassets.actualWidth, run.width);
        }

        advanceInfinite (run: layout.Run, pass: ITextLayoutPass, font: Font): boolean {
            //NOTE: Returning true implies a new line is necessary
            var remaining = pass.text.substr(pass.index);
            var rindex = remaining.indexOf('\r');
            var nindex = remaining.indexOf('\n');

            if (rindex < 0 && nindex < 0) {
                //Didn't find \r or \n
                run.length = remaining.length;
                run.text = remaining;
                run.width = this.measureTextWidth(run.text, font);
                pass.index += run.length;
                return false;
            }

            if (rindex > -1 && rindex + 1 === nindex) {
                //Found \r\n
                run.length = nindex + 1;
                run.text = remaining.substr(0, run.length);
                run.width = this.measureTextWidth(run.text, font);
                pass.index += run.length;
                return true;
            }

            if (rindex > -1 && rindex < nindex) {
                //Found \r before \n, but not back-to-back
                run.length = rindex + 1;
                run.text = remaining.substr(0, run.length);
                run.width = this.measureTextWidth(run.text, font);
                pass.index += run.length;
                return true;
            }

            //Found \n (potentially before \r, don't care)
            run.length = nindex + 1;
            run.text = remaining.substr(0, run.length);
            run.width = this.measureTextWidth(run.text, font);
            pass.index += run.length;
            return true;
        }

        advanceFinite (run: layout.Run, pass: ITextLayoutPass, font: Font, maxWidth: number): boolean {
            //NOTE: Returning true implies a new line is necessary
            var text = pass.text;
            var start = pass.index;
            var lastSpace = -1;
            var c: string;
            var curText = "";
            var curWidth = 0;
            while (pass.index < pass.max) {
                c = text.charAt(pass.index);
                curText += c;
                curWidth = this.measureTextWidth(curText, font);
                if (c === '\n') {
                    run.length = pass.index - start + 1;
                    run.text = text.substr(start, run.length);
                    run.width = this.measureTextWidth(run.text, font);
                    pass.index++;
                    return true;
                } else if (c === '\r') {
                    run.length = pass.index - start + 1;
                    pass.index++;
                    if (text.charAt(pass.index) === '\n') {
                        run.length++;
                        pass.index++;
                    }
                    run.text = text.substr(start, run.length);
                    run.width = this.measureTextWidth(run.text, font);
                    return true;
                }
                if (curWidth > maxWidth) {
                    var breakIndex = (lastSpace > -1) ? lastSpace + 1 : pass.index;
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