module minerva.core.processdown.tapins {
    export var calcAbsoluteXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var ax = output.absoluteXform;
        if (vpinput)
            mat3.copyTo(vpinput.absoluteXform, ax);
        else
            mat3.identity(ax);

        mat3.preapply(ax, output.renderXform);

        return true;
    };
}