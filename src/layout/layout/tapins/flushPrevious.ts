module minerva.layout.layout.tapins {
    export var flushPrevious: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        var updater: Updater;
        while ((updater = data.arrangeList.shift()) != null) {
            //TODO: Propagate ArrangeHint up
        }
        while ((updater = data.sizingList.shift()) != null) {
            //TODO: Propagate SizeHint up
        }
        return true;
    };
}