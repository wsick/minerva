module minerva.def.processdown.tapins {
    export var processLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & layout.DirtyFlags.LocalProjection) === 0)
            return true;
        output.dirtyFlags &= ~layout.DirtyFlags.LocalProjection;
        output.dirtyFlags |= layout.DirtyFlags.Transform;

        var projection = input.projection;
        output.z = projection ? projection.getDistanceFromXYPlane(input.actualWidth, input.actualHeight) : NaN;

        return true;
    };
}