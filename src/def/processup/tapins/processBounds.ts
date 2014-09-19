module minerva.def.processup.tapins {
    export var processBounds: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        output.dirtyFlags &= ~DirtyFlags.Bounds;

        if (vpoutput && !Rect.isEqual(input.globalBoundsWithChildren, output.globalBoundsWithChildren)) {
            vpoutput.dirtyFlags |= DirtyFlags.Bounds;
            helpers.invalidate(vpoutput, input.surfaceBoundsWithChildren);
            helpers.invalidate(vpoutput, output.surfaceBoundsWithChildren);
        }

        state.invalidateSubtreePaint = !Rect.isEqual(input.extentsWithChildren, output.extentsWithChildren) || input.forceInvalidate;
        output.forceInvalidate = false;

        return true;
    };
}