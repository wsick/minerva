module minerva.core.processdown.tapins {
    export var calcRenderXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var rx = output.renderXform;
        if (input.carrierXform)
            mat3.multiply(input.carrierXform, input.layoutXform, rx); //render = carrier * layout
        else
            mat3.copyTo(input.layoutXform, rx); //render = layout
        mat3.multiply(rx, state.localXform, rx); //render = render * local

        return true;
    };
}