module minerva.controls.image.processdown.tapins {
    export function prepareImageMetrics (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if (!state.calcImageMetrics)
            return true;

        /*
        var paintBounds = state.paintBounds;
        paintBounds.x = paintBounds.y = 0;
        paintBounds.width = input.actualWidth;
        paintBounds.height = input.actualHeight;

        var stretched = state.stretched;
        Size.copyTo(paintBounds, stretched);
        helpers.coerceSize(stretched, input);

        state.imgAdjust = !Size.isEqual(paintBounds, input.renderSize);
        */

        return true;
    }
}