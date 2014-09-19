module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processZIndices: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.ChildrenZIndices === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.ChildrenZIndices;
        return true;
    };
}