module minerva.controls.image.processdown.tapins {
    export function calcOverlap (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if (!state.calcImageMetrics)
            return true;

        if (input.stretch === Stretch.UniformToFill || state.imgAdjust) {
            var paint = state.paintRect;
            Rect.roundOut(paint);

            var stretched = state.stretched;
            Rect.copyTo(state.imgRect, stretched);
            Rect.transform(stretched, output.imgXform);
            Rect.roundIn(stretched);
            output.overlap = Rect.rectIn(paint, stretched);
        }

        return true;
    }
}