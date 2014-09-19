module minerva.def.processdown.tapins {
    export var processXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & layout.DirtyFlags.Transform) === 0)
            return true;
        output.dirtyFlags &= ~layout.DirtyFlags.Transform;

        //TODO: Popup needs to invalidate subtree transform

        if (!mat4.equal(input.localProjection, output.localProjection)) {
            //TODO: Invalidate SBWC on visual parent (if no visual parent and top level, invalidate on surface)
            output.dirtyFlags |= layout.DirtyFlags.NewBounds;
        }

        //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
        output.dirtyFlags |= layout.DirtyFlags.Bounds;

        //TODO: Popup needs to set carrier xform/projection on child

        return true;
    };
}