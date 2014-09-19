module minerva.def.processup.tapins {
    export var processNewBounds: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & DirtyFlags.NewBounds) === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.NewBounds;
        if (vpoutput)
            helpers.invalidate(vpoutput, output.surfaceBoundsWithChildren);
        else if (input.isTopLevel)
            state.invalidateSubtreePaint = true;

        return true;
    };
}