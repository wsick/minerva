module minerva.layout.arrange.tapins {
    export var calcStretched: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        var fr = state.finalRect;
        Rect.copyTo(fr, output.layoutSlot);

        Thickness.shrinkRect(input.margin, fr);

        var stretched = state.stretched;
        stretched.width = fr.width;
        stretched.height = fr.height;
        helpers.coerceSize(stretched, input);

        return true;
    }
}