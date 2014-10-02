module minerva.controls.canvas.measure.tapins {
    export function doOverride (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        var as = state.availableSize;
        as.width = as.height = Number.POSITIVE_INFINITY;
        for (var walker = tree.walk(); walker.step();) {
            walker.current.measure(as);
        }
        var desired = output.desiredSize;
        desired.width = desired.height = 0;
        return true;
    }
}