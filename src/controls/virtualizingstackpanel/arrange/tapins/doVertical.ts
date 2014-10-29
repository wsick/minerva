module minerva.controls.virtualizingstackpanel.arrange.tapins {
    export function doVertical (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean {
        if (input.orientation !== Orientation.Vertical)
            return true;

        return true;
    }
}