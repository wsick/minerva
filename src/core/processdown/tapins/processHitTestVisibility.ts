module minerva.core.processdown.tapins {
    export var processHitTestVisibility: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        if ((input.dirtyFlags & DirtyFlags.HitTestVisibility) === 0)
            return true;

        if (vpinput) {
            output.totalIsHitTestVisible = vpinput.totalIsHitTestVisible && input.isHitTestVisible;
        } else {
            output.totalIsHitTestVisible = input.isHitTestVisible;
        }

        return true;
    };
}