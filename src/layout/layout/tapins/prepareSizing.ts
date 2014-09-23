module minerva.layout.layout.tapins {
    export var prepareSizing: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.SizeHint)
            return true;
        return true;
    };
}