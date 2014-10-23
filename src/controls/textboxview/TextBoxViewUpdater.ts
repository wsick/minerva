module minerva.controls.textboxview {
    export interface ITextBoxViewUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, render.IInput, text.IDocumentContext {
        isReadOnly: boolean;
        isFocused: boolean;
    }

    export class TextBoxViewUpdater extends core.Updater {
        assets: ITextBoxViewUpdaterAssets;
        tree: TextBoxViewUpdaterTree;
        blinker: Blinker;

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

            assets.isCaretVisible = false;
            assets.caretBrush = null;
            assets.caretRegion = new Rect();
            assets.isReadOnly = false;

            this.blinker = new Blinker((isVisible) => {
                this.assets.isCaretVisible = isVisible;
                this.invalidateCaret();
            });

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

        invalidateCaret () {
            var assets = this.assets;
            var region = new Rect();
            Rect.copyTo(assets.caretRegion, region);
            Rect.transform(region, assets.absoluteXform);
            this.invalidate(region)
        }

        resetCaretBlinker (shouldDelay: boolean) {
            var assets = this.assets;
            var blinker = this.blinker;

            if (assets.selectionLength > 0 || assets.isReadOnly || assets.isFocused)
                return blinker.end();
            if (shouldDelay)
                return blinker.delay();
            return blinker.begin();
        }
    }
}