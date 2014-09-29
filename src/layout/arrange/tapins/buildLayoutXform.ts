module minerva.layout.arrange.tapins {
    export var buildLayoutXform: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: layout.IUpdaterTree, finalRect: Rect): boolean {
        var vo = state.visualOffset;
        var layoutXform = mat3.createTranslate(vo.x, vo.y, output.layoutXform);
        if (state.flipHorizontal) {
            mat3.translate(layoutXform, output.arrangedSize.width, 0);
            mat3.scale(layoutXform, -1, 1);
        }
        return true;
    };
}