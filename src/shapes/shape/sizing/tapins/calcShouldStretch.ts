module minerva.shapes.shape.sizing.tapins {
    export function calcShouldStretch (input: IInput, state: IState, output: core.sizing.IOutput, tree: core.IUpdaterTree): boolean {
        state.shouldStretch = false;

        // If visual parent is canvas and no previousConstraint and no layoutSlot
        //  return true

        if (!tree.surface)
            return true;

        var nb = input.naturalBounds;
        if (nb.width <= 0 && nb.height <= 0)
            return true;

        if (input.stretch === Stretch.None && !Rect.isEmpty(nb)) {
            Size.copyTo(nb, output.actualSize);
            return true;
        }

        state.shouldStretch = true;
        return true;
    }
}