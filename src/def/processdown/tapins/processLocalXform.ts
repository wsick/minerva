module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processLocalXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.LocalTransform === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.LocalTransform;
        output.dirtyFlags |= ~DirtyFlags.Transform;

        var local = mat3.identity(state.localXform);
        var render = input.renderTransform;
        if (!render)
            return true;

        var origin = state.xformOrigin;
        mat3.translate(local, origin.x, origin.y);
        mat3.multiply(local, render, local); //local = render * local
        mat3.translate(local, -origin.x, -origin.y);

        return true;
    };
}