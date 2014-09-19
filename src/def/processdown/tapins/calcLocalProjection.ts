module minerva.def.processdown.tapins {
    export var calcLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        output.totalHasRenderProjection = vpinput ? vpinput.totalHasRenderProjection : false;

        var lp = output.localProjection;
        mat4.multiply(input.carrierProjection, state.renderAsProjection, lp); //local projection = render (as projection) * carrier projection
        var projection = input.projection;
        if (projection) {
            mat4.multiply(lp, input.projection.getTransform(), lp); //local projection = local projection * projection
            output.totalHasRenderProjection = true;
        }

        return true;
    };
}