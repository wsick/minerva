module minerva.shapes.path.processup.tapins {
    export function calcExtents (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var e = output.extents;
        var ewc = output.extentsWithChildren;
        e.x = ewc.x = 0;
        e.y = ewc.y = 0;
        var actual = state.actualSize;
        e.width = ewc.width = actual.width;
        e.height = ewc.height = actual.height;

        return true;
    }
}