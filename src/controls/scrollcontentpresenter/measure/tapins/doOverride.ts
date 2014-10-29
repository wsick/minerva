module minerva.controls.scrollcontentpresenter.measure.tapins {
    export var doOverride = function (input: IInput, state: IState, output: core.measure.IOutput, tree: core.UpdaterTree, availableSize: Size): boolean {
        var ds = output.desiredSize;
        ds.width = ds.height = 0;

        if (!tree.subtree)
            return true;

        var sd = input.scrollData;
        var ideal = state.idealSize;
        ideal.width = ideal.height = Number.POSITIVE_INFINITY;
        if (!sd.canHorizontallyScroll)
            ideal.width = state.availableSize.width;
        if (!sd.canVerticallyScroll)
            ideal.height = state.availableSize.height;

        tree.subtree.measure(ideal);

        return true;
    };
}