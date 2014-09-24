module minerva.layout.draft.tapins {
    export var notifyResize: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.SizeHint)
            return true;
        if (data.sizingUpdates.length <= 0)
            return true;

        var update: ISizingUpdate;
        while ((update = data.sizingUpdates.pop()) != null) {
            update.updater.onSizeChanged(update.oldSize, update.newSize);
        }

        return true;
    };
}