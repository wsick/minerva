module minerva.def.processdown.tapins {
    export var calcRenderXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var rx = output.renderXform;
        mat3.set(input.carrierXform, rx);
        mat3.multiply(rx, input.layoutXform, rx); //render = layout * render
        mat3.multiply(rx, state.localXform, rx); //render = local * render
        mat3.toAffineMat4(rx, state.renderAsProjection);

        return true;
    };
}