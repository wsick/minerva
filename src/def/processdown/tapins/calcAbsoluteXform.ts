module minerva.def.processdown.tapins {
    export var calcAbsoluteXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var abs = output.absoluteXform;
        if (vpinput)
            mat3.set(vpinput.absoluteXform, abs);
        else
            mat3.identity(abs);

        mat3.multiply(output.renderXform, abs, abs); //abs = abs * render

        return true;
    };
}