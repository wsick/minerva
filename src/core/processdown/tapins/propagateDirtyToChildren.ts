module minerva.core.processdown.tapins {
    export var propagateDirtyToChildren: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        var newDownDirty = (output.dirtyFlags & ~input.dirtyFlags) & DirtyFlags.PropagateDown;
        for (var walker = tree.walk(); walker.step();) {
            walker.current.assets.dirtyFlags |= newDownDirty;
            Updater.$$addDownDirty(walker.current);
        }
        return true;
    };
}