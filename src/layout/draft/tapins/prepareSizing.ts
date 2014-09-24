module minerva.layout.draft.tapins {
    export var prepareSizing: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.SizeHint)
            return true;

        for (var walker = Updater.walkDeep(data.updater); walker.step();) {
            var assets = walker.current.assets;
            if (assets.visibility !== Visibility.Visible) {
                walker.skipBranch();
                continue;
            }
            if ((assets.uiFlags & UIFlags.SizeHint) === 0) {
                walker.skipBranch();
                continue;
            }

            assets.uiFlags &= ~UIFlags.SizeHint;
            if (assets.lastRenderSize !== undefined)
                data.sizingList.push(walker.current);
        }

        return true;
    };
}