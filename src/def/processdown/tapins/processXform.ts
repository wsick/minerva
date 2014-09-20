module minerva.def.processdown.tapins {
    export var processXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        //TODO: Popup needs to invalidate subtree transform

        if (!mat4.equal(input.localProjection, output.localProjection)) {
            if (vpoutput)
                helpers.invalidate(vpoutput, input.surfaceBoundsWithChildren);
            else if (input.isTopLevel && input.surface)
                input.surface.invalidate(input.surfaceBoundsWithChildren);
            output.dirtyFlags |= DirtyFlags.NewBounds;
        }

        //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
        output.dirtyFlags |= DirtyFlags.Bounds;

        //TODO: Popup needs to set carrier xform/projection on child

        return true;
    };
}