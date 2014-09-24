module minerva.layout.draft.tapins {
    export var measure: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.MeasureHint)
            return true;

        if (data.measureList.length <= 0)
            return false;

        var updater: Updater;
        while ((updater = data.measureList.shift()) != null) {
            Updater.doMeasure(updater);
        }

        return true;
    };
}