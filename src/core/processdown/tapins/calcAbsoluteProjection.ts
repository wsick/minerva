module minerva.core.processdown.tapins {
    export var calcAbsoluteProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var abs = output.absoluteProjection;
        //abs = vp abs * local
        if (vpinput)
            mat4.multiply(output.localProjection, vpinput.absoluteProjection, abs);
        else
            mat4.set(output.localProjection, abs);

        return true;
    };
}