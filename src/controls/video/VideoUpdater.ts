module minerva.controls.video {
    export interface IVideoUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processdown.IInput, render.IInput {
    }

    export class VideoUpdater extends core.Updater {
        assets: IVideoUpdaterAssets;

        init() {
            this.setMeasurePipe(singleton(measure.VideoMeasurePipeDef))
                .setArrangePipe(singleton(arrange.VideoArrangePipeDef))
                .setProcessDownPipe(singleton(processdown.VideoProcessDownPipeDef))
                .setRenderPipe(singleton(render.VideoRenderPipeDef))
                .setHitTestPipe(singleton(hittest.VideoHitTestPipeDef));

            var assets = this.assets;
            assets.source = null;
            assets.stretch = Stretch.Uniform;
            assets.overlap = RectOverlap.In;
            assets.vidXform = mat3.identity();

            super.init();
        }

        invalidateMetrics(): VideoUpdater {
            this.assets.dirtyFlags |= DirtyFlags.ImageMetrics;
            core.Updater.$$addDownDirty(this);
            return this;
        }

        onSurfaceChanged(oldSurface: core.ISurface, newSurface: core.ISurface) {
            if (oldSurface)
                oldSurface.unhookPrerender(this);
            if (newSurface)
                newSurface.hookPrerender(this);
        }

        preRender() {
            var assets = this.assets;
            if (assets.source && assets.source.getIsPlaying())
                this.invalidate();
        }
    }
}