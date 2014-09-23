module minerva.layout.layout.tapins {
    export var arrange: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.ArrangeHint)
            return true;

        return true;
    };
}