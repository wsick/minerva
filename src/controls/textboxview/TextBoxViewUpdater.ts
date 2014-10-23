module minerva.controls.textboxview {
    export interface ITextBoxViewUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, render.IInput, text.IDocumentContext {
    }

    export class TextBoxViewUpdater extends core.Updater {
        assets: ITextBoxViewUpdaterAssets;
        tree: TextBoxViewUpdaterTree;

        init () {
            this.setTree(new TextBoxViewUpdaterTree())
                .setMeasurePipe(singleton(measure.TextBoxViewMeasurePipeDef))
                .setArrangePipe(singleton(arrange.TextBoxViewArrangePipeDef))
                .setProcessUpPipe(singleton(processup.TextBoxViewProcessUpPipeDef))
                .setRenderPipe(singleton(render.TextBoxViewRenderPipeDef))
                .setHitTestPipe(singleton(hittest.TextBoxViewHitTestPipeDef));

            this.setDocument();

            var assets = this.assets;
            assets.selectionStart = 0;
            assets.selectionLength = 0;
            assets.textWrapping = TextWrapping.NoWrap;
            assets.textAlignment = TextAlignment.Left;
            assets.lineStackingStrategy = LineStackingStrategy.MaxHeight;
            assets.lineHeight = NaN;

            super.init();
        }

        setDocument (docdef?: text.IDocumentLayoutDef): TextBoxViewUpdater {
            if (this.tree.doc)
                return this;
            this.tree.doc = text.createDocumentLayout(docdef || new text.DocumentLayoutDef());
            return this;
        }

        invalidateFont (full?: boolean) {
            if (full === true) {
                this.invalidateMeasure();
                this.invalidateArrange();
                this.updateBounds(true);
            }
            this.invalidate();
        }

        invalidateTextMetrics () {
            this.invalidateMeasure();
            this.invalidateArrange();
            this.updateBounds(true);
            this.invalidate();
            var docassets = this.tree.doc.assets;
            docassets.actualWidth = NaN;
            docassets.actualHeight = NaN;
        }
    }
}