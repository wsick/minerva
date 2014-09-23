module minerva.def.processup.tapins {
    export var processInvalidate: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner): boolean {
        if ((input.dirtyFlags & DirtyFlags.Invalidate) === 0 && !state.hasInvalidate)
            return true;
        var dirty = output.dirtyRegion;
        vo.invalidate(dirty);
        dirty.x = dirty.y = dirty.width = dirty.height = 0;
        return true;
    };
}