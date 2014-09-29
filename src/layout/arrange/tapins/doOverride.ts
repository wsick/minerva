module minerva.layout.arrange.tapins {
    export var doOverride: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: layout.IUpdaterTree, finalRect: Rect): boolean {
        output.arrangedSize.width = 0;
        output.arrangedSize.height = 0;
        return true;
    };
}