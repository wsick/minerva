module minerva.layout.layout.tapins {
    export var measure: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.MeasureHint)
            return true;
        return true;
    };
}