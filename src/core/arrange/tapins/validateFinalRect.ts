module minerva.core.arrange.tapins {
    export var validateFinalRect: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean {
        var fr = state.finalRect;
        if (fr.width < 0 || fr.height < 0
            || !isFinite(fr.width) || !isFinite(fr.height)
            || isNaN(fr.width) || isNaN(fr.height)) {
            output.error = "Invalid arguments to Arrange.";
            return false;
        }
        return true;
    };
}