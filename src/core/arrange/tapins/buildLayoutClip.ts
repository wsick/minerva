module minerva.core.arrange.tapins {
    export var buildLayoutClip: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        var lc = output.layoutClip;
        lc.x = lc.y = lc.width = lc.height = 0;
        return true;
    };
}