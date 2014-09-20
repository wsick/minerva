module minerva.def.processdown.tapins {
    export var calcAbsoluteProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var abs = output.absoluteProjection;
        if (vpinput)
            mat4.set(vpinput.absoluteProjection, abs);
        else
            mat4.identity(abs);

        mat4.multiply(output.localProjection, abs, abs); //abs = abs * local

        return true;
    };
}