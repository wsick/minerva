module minerva.layout.measure {
    export interface IMeasureBinder {
        bind(updater: Updater, surface: ISurface, visualParent: Updater): boolean;
    }
    export class MeasureBinder implements IMeasureBinder {
        bind (updater: Updater, surface: ISurface, visualParent: Updater): boolean {
            var assets = updater.assets;
            var last = assets.previousConstraint;
            var old = new Size();

            if (!surface && !last && !visualParent /*&& isLayoutContainer */)
                last = new Size(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

            var success = false;
            if (last) {
                Size.copyTo(assets.desiredSize, old);
                success = updater.measure(last);
                if (Size.isEqual(old, assets.desiredSize))
                    return success;
            }

            if (visualParent)
                visualParent.invalidateMeasure();

            assets.dirtyFlags &= ~DirtyFlags.Measure;
            return success;
        }
    }
}