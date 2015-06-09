module minerva.shapes.path.processup.tapins {
    export function calcStretch (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var extents = output.extents;
        var xform = output.stretchXform;
        var actual = state.actual;
        mat3.identity(xform);
        Rect.clear(extents);
        if (Size.isEmpty(actual))
            return true;

        Rect.copyTo(input.naturalBounds, extents);
        if (input.stretch === Stretch.None)
            return true;

        var sx = actual.width / extents.width;
        var sy = actual.height / extents.height;
        switch (input.stretch) {
            case Stretch.Fill:
                break;
            case Stretch.Uniform:
                sx = sy = Math.min(sx, sy);
                break;
            case Stretch.UniformToFill:
                sx = sy = Math.max(sx, sy);
                break;
        }

        mat3.translate(xform, -extents.x, extents.y);
        mat3.scale(xform, sx, sy);

        Rect.transform(extents, xform);

        return true;
    }
}