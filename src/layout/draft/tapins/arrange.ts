module minerva.layout.draft.tapins {
    export var arrange: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.ArrangeHint)
            return true;

        if (data.arrangeList.length <= 0)
            return false;

        var updater: Updater;
        while ((updater = data.arrangeList.shift()) != null) {
            updater.doArrange();
        }

        return true;
    };
}