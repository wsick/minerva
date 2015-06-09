module minerva.core.processdown.tapins {
    export var calcRenderXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var rx = output.renderXform;
        if (input.carrierXform)
            mat3.copyTo(input.carrierXform, rx);
        else
            mat3.identity(rx);

        mat3.preapply(rx, input.layoutXform);
        mat3.preapply(rx, state.localXform);

        return true;
    };
}