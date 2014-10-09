module minerva.core.arrange.tapins {
    export var doOverride: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        state.arrangedSize.width = 0;
        state.arrangedSize.height = 0;
        return true;
    };
}