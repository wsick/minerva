module minerva.controls.video.arrange.tapins {
    export function doOverride (input: IInput, state: IState, output: core.arrange.IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean {
        var as = state.arrangedSize;
        as.width = state.videoBounds.width * state.stretchX;
        as.height = state.videoBounds.height * state.stretchY;
        return true;
    }
}