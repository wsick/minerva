module minerva.def.processup.tapins {
    export var processInvalidate: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & DirtyFlags.Invalidate) === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.Invalidate;
        var dirty = output.dirtyRegion;
        if (vpoutput)
            helpers.invalidate(vpoutput, dirty);
        else if (input.surface)
            input.surface.invalidate(dirty);
        dirty.x = dirty.y = dirty.width = dirty.height = 0;
        return true;
    };
}