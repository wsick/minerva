module minerva.controls.textblock {
    export interface ITextBlockUpdaterAssets extends core.IUpdaterAssets, measure.IInput, text.IDocumentContext {
    }

    export class TextBlockUpdater extends core.Updater {
        assets: ITextBlockUpdaterAssets;
        private $$doc: text.IDocumentLayout<text.IDocumentLayoutDef, text.IDocumentAssets>;
        doctree = new TextBlockUpdaterTree();

        init () {
            this.setDocument()
                .setMeasurePipe(singleton(measure.TextBlockMeasurePipeDef))
                .setHitTestPipe(singleton(hittest.TextBlockHitTestPipeDef));

            var assets = this.assets;
            assets.selectionStart = 0;
            assets.selectionLength = 0;
            assets.textWrapping = TextWrapping.NoWrap;
            assets.textAlignment = TextAlignment.Left;
            assets.lineStackingStrategy = LineStackingStrategy.MaxHeight;
            assets.lineHeight = NaN;

            super.init();
        }

        setDocument (docdef?: text.IDocumentLayoutDef): TextBlockUpdater {
            if (this.$$doc)
                return this;
            this.$$doc = text.createDocumentLayout(docdef || new text.DocumentLayoutDef());
            return this;
        }

        layout (constraint: Size): boolean {
            var doc = this.$$doc;
            if (!isNaN(doc.assets.actualWidth))
                return false;
            doc.assets.maxWidth = constraint.width;
            doc.def.layout(this.assets, doc.assets, this.doctree.walk());
            return true;
        }

        //TODO: Implement
        /*
         invalidateFont () {
         if (this.$$textupdater.invalidateFont()) {
         this.invalidateMeasure();
         this.invalidateArrange();
         this.updateBounds(true);
         }
         this.invalidate();
         }
         */

        invalidateTextMetrics () {
            this.invalidateMeasure();
            this.invalidateArrange();
            this.updateBounds(true);
            this.invalidate();
            var docassets = this.$$doc.assets;
            docassets.actualWidth = NaN;
            docassets.actualHeight = NaN;
        }
    }
}