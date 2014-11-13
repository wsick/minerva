import StressTest = require('../../StressTest');
import Surface = minerva.engine.Surface;
import Updater = minerva.core.Updater;
import DirtyFlags = minerva.DirtyFlags;
import Rect = minerva.Rect;
import Point = minerva.Point;

class ProcessDown extends StressTest {
    surface: Surface;
    parentUpdater: Updater;
    updater: Updater;

    prepare () {
        (this.updater = new Updater())
            .setVisualParent(this.parentUpdater = new Updater());
        this.parentUpdater.setSurface(this.surface = new Surface());
    }

    prepareIteration () {
        Updater.$$addDownDirty(this.updater);

        this.parentUpdater.assets.compositeLayoutClip = new Rect(20, 20, 50, 50);

        var assets = this.updater.assets;
        assets.renderTransform = mat3.createTranslate(1, 2);
        assets.renderTransformOrigin = new Point(0.5, 0.5);
        assets.carrierXform = mat3.createScale(2, 2);
        assets.dirtyFlags |= (DirtyFlags.RenderVisibility | DirtyFlags.HitTestVisibility | DirtyFlags.LocalTransform);

        assets.layoutClip = new Rect(10, 10, 100, 100);

        assets.renderXform = mat3.identity();
        assets.absoluteXform = mat3.identity();
    }

    runIteration () {
        this.updater.processDown();
    }
}
export = ProcessDown;