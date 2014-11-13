import StressTest = require('../../StressTest');
import Surface = minerva.engine.Surface;
import Updater = minerva.core.Updater;
import DirtyFlags = minerva.DirtyFlags;
import Rect = minerva.Rect;
import Point = minerva.Point;

var mock = {
    child (parent: Updater): Updater {
        var child = new Updater();
        child.setVisualParent(parent);
        return child;
    }
};

class ProcessUp extends StressTest {
    surface: Surface;
    updater: Updater;
    childUpdater: Updater;

    prepare () {
        (this.childUpdater = new Updater())
            .setVisualParent(this.updater = new Updater());
        this.updater.setSurface(this.surface = new Surface());
    }

    prepareIteration () {
        Updater.$$addUpDirty(this.updater);

        var cassets = this.childUpdater.assets;
        cassets.totalIsRenderVisible = true;
        cassets.globalBoundsWithChildren = new Rect(0, 0, 150, 50);

        var assets = this.updater.assets;
        assets.actualWidth = 100;
        assets.actualHeight = 200;
        assets.effectPadding = new minerva.Thickness(5, 5, 5, 5);
        assets.renderXform = mat3.createTranslate(1, 2);
        assets.absoluteXform = mat3.createTranslate(50, 40);

        assets.globalBoundsWithChildren = new Rect();
        assets.dirtyRegion = new Rect();

        assets.dirtyFlags |= (DirtyFlags.Bounds | DirtyFlags.NewBounds | DirtyFlags.Invalidate);
    }

    runIteration () {
        this.updater.processUp();
    }
}
export = ProcessUp;