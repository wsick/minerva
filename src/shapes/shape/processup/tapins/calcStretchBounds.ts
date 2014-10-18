module minerva.shapes.shape.processup.tapins {
    export function calcStretchBounds (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var sb = state.stretchBounds;
        sb.x = sb.y = 0;
        sb.width = input.actualWidth;
        sb.height = input.actualHeight;

        switch (input.stretch) {
            case Stretch.None:
                sb.width = sb.height = 0;
                break;
            case Stretch.Fill:
                break;
            case Stretch.Uniform:
                sb.width = sb.height = Math.min(sb.width, sb.height);
                break;
            case Stretch.UniformToFill:
                sb.width = sb.height = Math.max(sb.width, sb.height);
                break;
        }

        return true;
    }
}