module minerva.core.processdown.tapins {
    export var calcLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        output.totalHasRenderProjection = vpinput ? vpinput.totalHasRenderProjection : false;

        var lp = output.localProjection;
        if (input.carrierProjection)
            mat4.multiply(input.carrierProjection, state.renderAsProjection, lp); //local projection = render (as projection) * carrier projection
        else
            mat4.set(state.renderAsProjection, lp);
        var projection = input.projection;
        if (projection) {
            mat4.multiply(lp, input.projection.getTransform(), lp); //local projection = local projection * projection
            output.totalHasRenderProjection = true;
        }

        return true;
    };
}