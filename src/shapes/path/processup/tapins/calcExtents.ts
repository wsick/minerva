module minerva.shapes.path.processup.tapins {
    export function calcExtents (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        Rect.copyTo(output.extents, output.extentsWithChildren);
        return true;
    }
}