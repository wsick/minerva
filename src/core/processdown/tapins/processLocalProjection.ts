module minerva.core.processdown.tapins {
    export var processLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.LocalProjection) === 0)
            return true;

        var projection = input.projection;
        output.z = NaN;
        if (projection) {
            projection.setObjectSize(input.actualWidth, input.actualHeight);
            output.z = projection.getDistanceFromXYPlane();
        }

        return true;
    };
}