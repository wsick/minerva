module minerva.def.arrange.tapins {
    export var buildRenderSize: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        Size.copyTo(output.arrangedSize, output.renderSize);
        if (!Size.isEqual(input.renderSize, output.renderSize)) {
            if (!input.lastRenderSize) {
                output.lastRenderSize = input.renderSize;
                //TODO: this._PropagateFlagUp(UIElementFlags.DirtySizeHint);
            }
        }
        return true;
    };
}