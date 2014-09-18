module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processLocalProjection: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.LocalProjection === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.LocalProjection;

        /*
        var projection = input.projection;
        if (!projection) {
            Controls.Panel.SetZ(uie, NaN);
            return;
        }

        projection.SetObjectSize(this.GetBrushSize());
        var z = projection.GetDistanceFromXYPlane();
        Controls.Panel.SetZ(uie, z);
        */

        return true;
    };
}