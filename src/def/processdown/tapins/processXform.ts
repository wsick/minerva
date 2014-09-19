module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.Transform === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.Transform;

        //TODO: Popup needs to invalidate subtree transform

        if (!mat4.equal(input.localProjection, output.localProjection)) {
            //TODO: Invalidate SBWC on visual parent (if no visual parent and top level, invalidate on surface)
            output.dirtyFlags |= DirtyFlags.NewBounds;
        }

        //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
        output.dirtyFlags |= DirtyFlags.Bounds;

        //TODO: Popup needs to set carrier xform/projection on child

        return true;
    };
}