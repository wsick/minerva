module minerva.controls.stackpanel.arrange.tapins {
    export function doOverride(input: IInput, state: IState, output: core.arrange.IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean {
        var cr = state.childRect;
        cr.x = cr.y = 0;
        Size.copyTo(state.finalSize, cr);
        Size.copyTo(state.finalSize, output.arrangedSize);
        return true;
    }
}