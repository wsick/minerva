module minerva.layout.layout.tapins {
    export var prepareMeasure: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.MeasureHint)
            return true;

        /*
        var walker = new DeepUpdaterTreeWalker(data.element);
        var childu: Updater;
        while ((childu = walker.step()) != null) {
            var childAssets = childu.assets;

            if (childAssets.visibility !== Visibility.Visible) {
                walker.skipBranch();
                continue;
            }
            if ((childAssets.uiFlags & UIFlags.MeasureHint) === 0) {
                walker.skipBranch();
                continue;
            }

            childAssets.uiFlags &= ~UIFlags.MeasureHint;
            if ((childAssets.dirtyFlags & DirtyFlags.Measure) > 0)
                data.measureList.push(childu);
        }
        */

        return true;
    };
}