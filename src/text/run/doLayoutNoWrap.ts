module minerva.text.run {
    export function doLayoutNoWrap (docctx: IDocumentContext, docassets: IDocumentAssets, assets: ITextAssets) {
        var text = assets.text;

        var usedText = text;
        var end = text.length;
        var width: number;
        //NOTE: Guess at clip point
        if ((width = measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
            end = (Math.ceil(docassets.maxWidth / width * text.length)) || 0;
            usedText = text.substr(0, end);
        }
        //NOTE: Move backward if still need to clip
        while (end > 0 && (width = measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
            end--;
            usedText = text.substr(0, end);
        }
        //NOTE: Move forward if not clipping remaining characters
        while (end < text.length && (width = measureTextWidth(usedText, assets.font)) > docassets.maxWidth) {
            end++;
            usedText = text.substr(0, end);
        }
        //NOTE: Include clipped character
        if ((end + 1) < text.length) {
            end++;
            usedText += text[end + 1];
            width = measureTextWidth(usedText, assets.font);
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

    function measureTextWidth (text: string, font: Font): number {
        return engine.Surface.measureWidth(text, font);
    }
}