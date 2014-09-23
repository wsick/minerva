module minerva.layout.processdown.tapins {
    export var processLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.LocalProjection) === 0)
            return true;

        var projection = input.projection;
        output.z = projection ? projection.getDistanceFromXYPlane(input.actualWidth, input.actualHeight) : NaN;

        return true;
    };
}