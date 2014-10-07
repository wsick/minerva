module minerva.controls.image.render.tapins {
    export function calcMetrics(input: IInput, state: IState, output: core.render.IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean {
        var source = input.source;
        if (!input.source)
            return true;

        // Just to get something working, we do all the matrix transforms for stretching.
        // Eventually, we can let the html5 canvas do all the dirty work.
        source.lock();

        //TODO: Calculate render metrics
        /*
        var stretch = img.Stretch;
        var specified = size.fromRaw(img.ActualWidth, img.ActualHeight);
        var stretched = lu.CoerceSize(size.copyTo(specified));
        var adjust = !Size.isEqual(specified, input.renderSize);

        var pw = source.pixelWidth;
        var ph = source.pixelHeight;
        if (pw === 0 || ph === 0)
            return null;

        if (stretch !== Stretch.UniformToFill) {
            specified.width = Math.min(specified.width, stretched.width);
            specified.height = Math.min(specified.height, stretched.height);
        }

        var paint = rect.fromSize(specified);
        var image = new rect();
        image.width = pw;
        image.height = ph;

        if (stretch === Stretch.None)
            rect.union(paint, image);

        var matrix = state.metrics.matrix;
        var matrix = computeMatrix(paint.width, paint.height, image.width, image.height,
            stretch, AlignmentX.Center, AlignmentY.Center);

        if (adjust) {
            img.MeasureOverride(specified);
            Size.copyTo(specified, paint);
            paint.x = (stretched.width - specified.width) * 0.5;
            paint.y = (stretched.height - specified.height) * 0.5;
        }

        state.metrics.overlap = RectOverlap.In;
        if (stretch === Stretch.UniformToFill || adjust) {
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
}