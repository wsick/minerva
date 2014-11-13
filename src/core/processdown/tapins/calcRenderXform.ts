module minerva.core.processdown.tapins {
    export var calcRenderXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var rx = output.renderXform;
        if (input.carrierXform)
            mat3.multiply(input.carrierXform, input.layoutXform, rx); //render = layout * carrier
        else
            mat3.set(input.layoutXform, rx); //render = layout
        mat3.multiply(rx, state.localXform, rx); //render = local * render

        return true;
    };
}