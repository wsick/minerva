module minerva.controls.canvas.processup.tapins {
    export var calcPaintBounds = function (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        core.helpers.copyGrowTransform(output.globalBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.renderXform);
        var sbwc = output.surfaceBoundsWithChildren;
        var surface = tree.surface;
        if (surface && tree.isTop) {
            sbwc.x = sbwc.y = 0;
            sbwc.width = surface.width;
            sbwc.height = surface.height;
        } else {
            core.helpers.copyGrowTransform(sbwc, output.extentsWithChildren, input.effectPadding, input.absoluteXform);
        }

        return true;
    };
}