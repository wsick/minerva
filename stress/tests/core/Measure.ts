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

class ProcessUp extends StressTest {
    surface: Surface;
    updater: Updater;
    childUpdater: Updater;
    constraint: Size;

    prepare () {
        (this.childUpdater = new Updater())
            .setVisualParent(this.updater = new Updater());
        this.updater.setSurface(this.surface = new Surface());

        this.childUpdater.measure = function (constraint: Size): boolean {
            return true;
        };
        this.constraint = new Size(100, 200);
    }

    prepareIteration () {
        var cassets = this.childUpdater.assets;
        cassets.desiredSize = new Size(50, 50);

        var assets = this.updater.assets;
        assets.visibility = minerva.Visibility.Visible;
        assets.margin = new minerva.Thickness(5, 5, 5, 5);
        assets.dirtyFlags |= DirtyFlags.Measure;
        assets.useLayoutRounding = true;
    }

    runIteration () {
        this.updater.measure(this.constraint);
    }
}
export = ProcessUp;