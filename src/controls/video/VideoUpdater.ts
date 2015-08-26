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
}