module minerva.shapes.shape.processup.tapins {
    export function calcStretchBounds (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        //TODO: Implement stretchBounds

        return true;
    }
}