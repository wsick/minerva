module minerva.controls.video.processdown.tapins {
    export function checkNeedVideoMetrics (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        state.calcVideoMetrics = false;
        if ((input.dirtyFlags & DirtyFlags.ImageMetrics) === 0)
            return true;

        mat3.identity(output.vidXform);
        output.overlap = RectOverlap.In;

        var vidRect = state.vidRect;
        vidRect.x = vidRect.y = vidRect.width = vidRect.height = 0;

        state.calcVideoMetrics = !!input.source;
        return true;
    }
}