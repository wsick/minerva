import StressTest = require('../StressTest');
import Surface = minerva.engine.Surface;
import Updater = minerva.core.Updater;
import DirtyFlags = minerva.DirtyFlags;
import Rect = minerva.Rect;
import Point = minerva.Point;

var mock = {
    projection (): minerva.IProjection {
        return {
            setObjectSize (objectWidth: number, objectHeight: number) {
            },
            getDistanceFromXYPlane (): number {
                return NaN;
            },
            getTransform (): number[] {
                return mat4.createTranslate(0, 1, 0);
            }
        };
    }
};

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

        var passets = this.parentUpdater.assets;
        passets.compositeLayoutClip = new Rect(20, 20, 50, 50);
        passets.absoluteProjection = mat4.createScale(1, 2, 3);

        var assets = this.updater.assets;
        assets.renderTransform = mat3.createTranslate(1, 2);
        assets.renderTransformOrigin = new Point(0.5, 0.5);
        assets.carrierXform = mat3.createScale(2, 2);
        assets.dirtyFlags |= (DirtyFlags.RenderVisibility | DirtyFlags.HitTestVisibility | DirtyFlags.LocalProjection | DirtyFlags.LocalTransform);
        assets.projection = mock.projection();
        assets.carrierProjection = mat4.createTranslate(1, 2, 3);

        assets.layoutClip = new Rect(10, 10, 100, 100);

        assets.renderXform = mat3.identity();
        assets.absoluteXform = mat3.identity();
    }

    runIteration () {
        this.updater.processDown();
    }
}
export = ProcessDown;