module minerva.def.processup.tapins {
    export var invalidateSubtree: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (!state.invalidateSubtreePaint)
            return true;
        helpers.invalidate(output, output.surfaceBoundsWithChildren);
        return true;
    };
}