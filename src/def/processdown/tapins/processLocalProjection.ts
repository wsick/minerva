module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.LocalProjection === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.LocalProjection;
        output.dirtyFlags |= DirtyFlags.Transform;

        var projection = input.projection;
        output.z = projection ? projection.getDistanceFromXYPlane(input.actualWidth, input.actualHeight) : NaN;

        return true;
    };
}