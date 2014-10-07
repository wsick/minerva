module minerva.core.processdown.tapins {
    export var processXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        if (!mat4.equal(input.localProjection, output.localProjection)) {
            //NOTE: Removing visual parent (or surface) `Invalidate`
            //      In our down pass, we should only be invalidating self and children
            output.dirtyFlags |= DirtyFlags.NewBounds;
        }

        //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
        output.dirtyFlags |= DirtyFlags.Bounds;

        return true;
    };
}