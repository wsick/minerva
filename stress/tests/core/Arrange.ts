import StressTest = require('../../StressTest');
import Surface = minerva.engine.Surface;
import Updater = minerva.core.Updater;
import DirtyFlags = minerva.DirtyFlags;
import Rect = minerva.Rect;
import Point = minerva.Point;
import Size = minerva.Size;

var mock = {
    child (parent: Updater): Updater {
        var child = new Updater();
        child.setVisualParent(parent);
        return child;
    }
};

class Arrange extends StressTest {
    surface: Surface;
    updater: Updater;
    childUpdater: Updater;
    finalRect: Rect;

    prepare () {
        (this.childUpdater = new Updater())
            .setVisualParent(this.updater = new Updater());
        this.updater.setSurface(this.surface = new Surface());

        this.childUpdater.arrange = function (finalRect: Rect): boolean {
            return true;
        };
        this.finalRect = new Rect(0, 0, 100, 200);
    }

    prepareIteration () {
        var assets = this.updater.assets;
        assets.visibility = minerva.Visibility.Visible;
        assets.margin = new minerva.Thickness(5, 5, 5, 5);
        assets.dirtyFlags |= DirtyFlags.Arrange;
        assets.useLayoutRounding = true;
    }

    runIteration () {
        this.updater.arrange(this.finalRect);
    }
}
export = Arrange;