module minerva.layout.draft.tapins {
    export var flushPrevious: IDraftTapin = function (data: IDraftPipeData): boolean {
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