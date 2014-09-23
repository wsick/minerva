module minerva.layout.draft.tapins {
    export var prepareArrange: ILayoutTapin = function (data: ILayoutPipeData): boolean {
        if (data.flag !== UIFlags.ArrangeHint)
            return true;

        return true;
    };
}