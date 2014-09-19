module minerva.def.arrange.tapins {
    export var buildRenderSize: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        Size.copyTo(output.arrangedSize, output.renderSize);
        if (!Size.isEqual(input.renderSize, output.renderSize)) {
            if (!input.lastRenderSize) {
                Size.copyTo(input.renderSize, output.lastRenderSize);
                output.uiFlags |= UIFlags.SizeHint;
            }
        }
        return true;
    };
}