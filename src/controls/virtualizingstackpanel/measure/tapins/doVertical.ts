module minerva.controls.virtualizingstackpanel.measure.tapins {
    export function doVertical (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean {
        if (input.orientation !== Orientation.Vertical)
            return true;

        return true;
    }
}