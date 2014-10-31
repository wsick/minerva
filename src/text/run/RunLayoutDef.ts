module minerva.text.run {
    export class RunLayoutDef implements ITextLayoutDef {
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
                run.doLayoutNoWrap(docctx, docassets, assets);
            else
                run.doLayoutWrap(docctx, docassets, assets);

            docassets.selCached = false;
            return true;
        }
    }
}