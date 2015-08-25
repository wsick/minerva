module minerva.controls.video.processdown.tapins {
    export function prepareVideoMetrics (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if (!state.calcVideoMetrics)
            return true;

        var vidRect = state.vidRect;
        vidRect.x = vidRect.y = 0;

        var source = input.source;
        source.lock();
        vidRect.width = source.pixelWidth;
        vidRect.height = source.pixelHeight;
        source.unlock();

        var paintRect = state.paintRect;
        paintRect.x = paintRect.y = 0;
        paintRect.width = input.actualWidth;
        paintRect.height = input.actualHeight;

        /*
        See note below
        var stretched = state.stretched;
        Size.copyTo(paintRect, stretched);
        */

        state.vidAdjust = !Size.isEqual(paintRect, input.renderSize);

        /*
         Removing `stretched` since actualWidth, actualHeight should already be coerced
        core.helpers.coerceSize(stretched, input);
        if (input.stretch !== Stretch.UniformToFill) {
            paintRect.width = Math.min(paintRect.width, stretched.width);
            paintRect.height = Math.min(paintRect.height, stretched.height);
        }
        */

        if (input.stretch === Stretch.None)
            Rect.union(paintRect, vidRect);

        return true;
    }
}