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
        var xp = 0;
        var yp = 0;
        switch (input.stretch) {
            case Stretch.Uniform:
                sx = sy = Math.min(sx, sy);
                xp = (actual.width - (extents.width * sx)) / 2.0;
                yp = (actual.height - (extents.height * sy)) / 2.0;
                break;
            case Stretch.UniformToFill:
                sx = sy = Math.max(sx, sy);
                break;
        }

        mat3.translate(xform, -extents.x, -extents.y);
        mat3.scale(xform, sx, sy);
        mat3.translate(xform, xp, yp);

        Rect.transform(extents, xform);

        return true;
    }
}