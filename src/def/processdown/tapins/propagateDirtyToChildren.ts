module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var propagateDirtyToChildren: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        return true;
    };
}