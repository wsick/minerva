module minerva.def.arrange.tapins {
    export var checkNeedArrange: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        if ((input.dirtyFlags & DirtyFlags.Arrange) > 0)
            return true;
        return !Rect.isEqual(output.layoutSlot, state.finalRect);
    };
}