module minerva.def.processup.tapins {
    export var processNewBounds: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vo: IVisualOwner): boolean {
        if ((input.dirtyFlags & DirtyFlags.NewBounds) === 0 && !state.hasNewBounds)
            return true;
        output.dirtyFlags |= DirtyFlags.Invalidate;
        Rect.union(output.dirtyRegion, output.surfaceBoundsWithChildren);
        return true;
    };
}