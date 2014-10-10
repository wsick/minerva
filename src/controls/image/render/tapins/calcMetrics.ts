module minerva.controls.image.render.tapins {
    export function calcMetrics(input: IInput, state: IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        var source = input.source;
        if (!input.source)
            return true;

        //TODO: Remove me!

        /*
        // Just to get something working, we do all the matrix transforms for stretching.
        // Eventually, we can let the html5 canvas do all the dirty work.
        source.lock();

        var specified = state.specified;
        specified.width = input.actualWidth;
        specified.height = input.actualHeight;

        var stretched = state.stretched;
        Size.copyTo(specified, stretched);
        helpers.coerceSize(stretched, input);

        var pw = source.pixelWidth;
        var ph = source.pixelHeight;
        if (pw === 0 || ph === 0)
            return null;

        var adjust = !Size.isEqual(specified, input.renderSize);

        if (input.stretch !== Stretch.UniformToFill) {
            specified.width = Math.min(specified.width, stretched.width);
            specified.height = Math.min(specified.height, stretched.height);
        }

        var paint = state.paint;
        paint.x = paint.y = 0;
        Size.copyTo(specified, paint);

        var image = state.image;
        image.x = image.y = 0;
        image.width = pw;
        image.height = ph;

        if (input.stretch === Stretch.None)
            Rect.union(paint, image);

        var matrix = state.metrics.matrix;
        computeMatrix(matrix, paint.width, paint.height, image.width, image.height,
            input.stretch, AlignmentX.Center, AlignmentY.Center);

        if (adjust) {
            img.MeasureOverride(specified);
            Size.copyTo(specified, paint);
            paint.x = (stretched.width - specified.width) * 0.5;
            paint.y = (stretched.height - specified.height) * 0.5;
        }

        state.metrics.overlap = RectOverlap.In;
        if (input.stretch === Stretch.UniformToFill || adjust) {
            var bounds = Rect.copyTo(paint);
            Rect.roundOut(bounds);
            var box = Rect.copyTo(image);
            Rect.transform(box, matrix);
            Rect.roundIn(box);
            state.metrics.overlap = Rect.rectIn(bounds, box);
        }
        */

        return true;
    }

    /*
    function computeMatrix (width: number, height: number, sw: number, sh: number, stretch: Media.Stretch, alignX: Media.AlignmentX, alignY: Media.AlignmentY): number[] {
        var sx = width / sw;
        var sy = height / sh;
        if (width === 0)
            sx = 1.0;
        if (height === 0)
            sy = 1.0;

        if (stretch === Media.Stretch.Fill) {
            return mat3.createScale(sx, sy);
        }

        var scale = 1.0;
        var dx = 0.0;
        var dy = 0.0;
        switch (stretch) {
            case Media.Stretch.Uniform:
                scale = sx < sy ? sx : sy;
                break;
            case Media.Stretch.UniformToFill:
                scale = sx < sy ? sy : sx;
                break;
            case Media.Stretch.None:
                break;
        }

        switch (alignX) {
            case Media.AlignmentX.Left:
                dx = 0.0;
                break;
            case Media.AlignmentX.Center:
                dx = (width - (scale * sw)) / 2;
                break;
            case Media.AlignmentX.Right:
            default:
                dx = width - (scale * sw);
                break;
        }

        switch (alignY) {
            case Media.AlignmentY.Top:
                dy = 0.0;
                break;
            case Media.AlignmentY.Center:
                dy = (height - (scale * sh)) / 2;
                break;
            case Media.AlignmentY.Bottom:
            default:
                dy = height - (scale * sh);
                break;
        }
        var m = mat3.createScale(scale, scale);
        mat3.translate(m, dx, dy);
        return m;
    }
    */
}