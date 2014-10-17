module minerva.core.processup.tapins {
    export var calcActualSize: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var as = state.actualSize;
        as.width = input.actualWidth;
        as.height = input.actualHeight;
        helpers.coerceSize(as, input);
        if (isNaN(as.width))
            as.width = 0;
        if (isNaN(as.height))
            as.height = 0;

        return true;
    };
}