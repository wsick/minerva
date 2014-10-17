module minerva.shapes.shape.processup.tapins {
    export function calcExtents (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        Rect.copyTo(state.stretchBounds, output.extents);
        Rect.copyTo(state.stretchBounds, output.extentsWithChildren);

        return true;
    }
}