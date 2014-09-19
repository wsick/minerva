module minerva.def.processdown.tapins {
    export var processLocalXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & layout.DirtyFlags.LocalTransform) === 0)
            return true;
        output.dirtyFlags &= ~layout.DirtyFlags.LocalTransform;
        output.dirtyFlags |= layout.DirtyFlags.Transform;

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