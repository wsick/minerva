module minerva.controls.scrollcontentpresenter.arrange.tapins {
    export var doOverride = function (input: IInput, state: IState, output: core.arrange.IOutput, tree: core.UpdaterTree, finalRect: Rect): boolean {
        var as = state.arrangedSize;
        if (!tree.subtree) {
            as.width = as.height = 0;
            return true;
        }

        if (helpers.clampOffsets(input.scrollData)) {
            //TODO: InvalidateScrollInfo
            //scrollOwner.InvalidateScrollInfo();
        }

        var sd = input.scrollData;
        var desired = input.desiredSize;

        var cr = state.childRect;
        cr.x = -sd.offsetX;
        cr.y = -sd.offsetY;
        cr.width = Math.max(state.finalSize.width, desired.width);
        cr.height = Math.max(state.finalSize.height, desired.height);

        tree.subtree.arrange(cr);

        return true;
    };
}