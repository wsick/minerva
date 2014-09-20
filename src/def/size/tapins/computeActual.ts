module minerva.def.size.tapins {
    export var computeActual: ISizeTapin = function (input: IInput, state: IState, output: IOutput): boolean {
        var as = output.actualSize;
        as.width = as.height = 0;
        if (input.visibility !== Visibility.Visible) {
            return true;
        }

        if (state.useRender) {
            Size.copyTo(input.renderSize, as);
            return true;
        }

        helpers.coerceSize(as, input);
        return true;
    };
}