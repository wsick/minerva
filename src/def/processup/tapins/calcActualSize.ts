module minerva.def.processup.tapins {
    export var calcActualSize: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & DirtyFlags.Bounds) === 0)
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