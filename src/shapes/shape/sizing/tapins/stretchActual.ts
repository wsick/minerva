module minerva.shapes.shape.sizing.tapins {
    export function stretchActual (input: IInput, state: IState, output: core.sizing.IOutput, tree: core.IUpdaterTree): boolean {
        if (!state.shouldStretch)
            return true;

        var nb = input.naturalBounds;
        var as = output.actualSize;
        if (!isFinite(as.width))
            as.width = nb.width;
        if (!isFinite(as.height))
            as.height = nb.height;

        var sx = 1.0;
        var sy = 1.0;
        if (nb.width > 0)
            sx = as.width / nb.width;
        if (nb.height > 0)
            sy = as.height / nb.height;

        switch (input.stretch) {
            case Stretch.Uniform:
                sx = sy = Math.min(sx, sy);
                break;
            case Stretch.UniformToFill:
                sx = sy = Math.max(sx, sy);
                break;
            default:
                break;
        }

        as.width = Math.min(as.width, nb.width * sx);
        as.height = Math.min(as.height, nb.height * sy);
    }
}