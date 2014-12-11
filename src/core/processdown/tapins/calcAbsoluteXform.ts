module minerva.core.processdown.tapins {
    export var calcAbsoluteXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var abs = output.absoluteXform;
        //abs = render * vp abs
        if (vpinput)
            mat3.multiply(output.renderXform, vpinput.absoluteXform, abs);
        else
            mat3.copyTo(output.renderXform, abs);

        return true;
    };
}