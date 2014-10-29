module minerva.controls.virtualizingstackpanel.measure.tapins {
    export function doHorizontal (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        if (input.orientation !== Orientation.Horizontal)
            return true;

        return true;
    }
}