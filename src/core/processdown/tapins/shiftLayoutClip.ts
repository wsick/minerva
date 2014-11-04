module minerva.core.processdown.tapins {
    export var shiftLayoutClip: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if (!state.needsLayoutClipShift)
            return true;

        if (Rect.isEmpty(output.compositeLayoutClip))
            return true;

        Rect.transform(output.compositeLayoutClip, mat3.inverse(output.renderXform));

        return true;
    }
}