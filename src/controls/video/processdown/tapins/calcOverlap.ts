module minerva.controls.video.processdown.tapins {
    export function calcOverlap (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if (!state.calcVideoMetrics)
            return true;

        if (input.stretch === Stretch.UniformToFill || state.vidAdjust) {
            var paint = state.paintRect;
            Rect.roundOut(paint);

            var imgRect = state.vidRect;
            Rect.transform(imgRect, output.vidXform);
            Rect.roundIn(imgRect);

            output.overlap = Rect.rectIn(paint, imgRect);
        }

        return true;
    }
}