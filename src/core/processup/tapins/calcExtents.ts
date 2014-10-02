module minerva.core.processup.tapins {
    export var calcExtents: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var e = output.extents;
        var ewc = output.extentsWithChildren;
        e.x = ewc.x = 0;
        e.y = ewc.y = 0;
        var as = state.actualSize;
        e.width = ewc.width = as.width;
        e.height = ewc.height = as.height;

        for (var walker = tree.walk(); walker.step();) {
            if (walker.current.assets.totalIsRenderVisible)
                Rect.union(ewc, walker.current.assets.globalBoundsWithChildren);
        }

        return true;
    };
}