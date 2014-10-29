module minerva.controls.virtualizingstackpanel.measure.tapins {
    export function doHorizontal (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        if (input.orientation !== Orientation.Horizontal)
            return true;

        var ca = state.childAvailable;
        var sd = input.scrollData;
        if (sd.canVerticallyScroll)
            ca.height = Number.POSITIVE_INFINITY;
        var index = Math.floor(sd.offsetX);


        return true;
    }
}