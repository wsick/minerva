<<<<<<< HEAD
module minerva.controls.video {
    export interface IVideoUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processdown.IInput, render.IInput {
    }

    export class VideoUpdater extends core.Updater {
        assets: IVideoUpdaterAssets;

        init () {
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

        invalidateMetrics (): VideoUpdater {
            this.assets.dirtyFlags |= DirtyFlags.ImageMetrics;
            core.Updater.$$addDownDirty(this);
            return this;
        }
    }
=======
module minerva.controls.video {
    export class VideoUpdater extends core.Updater {
        onSurfaceChanged (oldSurface: core.ISurface, newSurface: core.ISurface) {
            if (oldSurface)
                oldSurface.unhookPrerender(this);
            if (newSurface)
                newSurface.hookPrerender(this);
        }

        preRender () {
            this.invalidate();
        }
    }
>>>>>>> a1f2c23e28a9769d6e25e46e310bb8b7513a0d4c
}