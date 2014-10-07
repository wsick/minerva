module minerva.controls.image.processup.tapins {
    export function calcActualSize (input: IInput, state: IState, output: core.processup.IOutput, vo: core.processup.IProcessVisualOwner, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var as = state.actualSize;
        as.width = input.actualWidth;
        as.height = input.actualHeight;
        core.helpers.coerceSize(as, input);
        if (isNaN(as.width))
            as.width = 0;
        if (isNaN(as.height))
            as.height = 0;

        //TODO: Implement computation

        return true;
    }
}