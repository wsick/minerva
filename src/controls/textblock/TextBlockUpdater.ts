module minerva.controls.textblock {
    export interface ITextBlockUpdaterAssets extends core.IUpdaterAssets, measure.IInput {
        fontFamily: string;
        fontSize: number;
        fontStretch: string;
        fontStyle: string;
        fontWeight: FontWeight;
        textDecorations: TextDecorations;
        language: string;
    }

    export class TextBlockUpdater extends core.Updater {
        assets: ITextBlockUpdaterAssets;

        init () {
            this.setMeasurePipe(singleton(measure.TextBlockMeasurePipeDef))
                .setHitTestPipe(singleton(hittest.TextBlockHitTestPipeDef));

            this.assets.font = new Font();

            super.init();
        }

        invalidateFont () {
            var assets = this.assets;
            var changed = Font.mergeInto(assets.font, assets.fontFamily, assets.fontSize, assets.fontStretch, assets.fontStyle, assets.fontWeight);
            if (changed) {
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
        }
    }
}