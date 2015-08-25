module minerva.controls.video.measure.tapins {
    export function doOverride (input: IInput, state: IState, output: core.measure.IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        var ds = output.desiredSize;
        ds.width = state.videoBounds.width * state.stretchX;
        ds.height = state.videoBounds.height * state.stretchY;
        return true;
    }
}