module minerva.def.processdown.tapins {
    export var calcAbsoluteXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var abs = output.absoluteXform;
        //abs = vp abs * render
        if (vpinput)
            mat3.multiply(output.renderXform, vpinput.absoluteXform, abs);
        else
            mat3.set(output.renderXform, abs);

        return true;
    };
}