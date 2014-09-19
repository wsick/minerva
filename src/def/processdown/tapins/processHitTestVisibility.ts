module minerva.def.processdown.tapins {
    export var processHitTestVisibility: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & DirtyFlags.HitTestVisibility) === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.HitTestVisibility;

        if (vpinput) {
            output.totalIsHitTestVisible = vpinput.totalIsHitTestVisible && input.isHitTestVisible;
        } else {
            output.totalIsHitTestVisible = input.isHitTestVisible;
        }

        return true;
    };
}