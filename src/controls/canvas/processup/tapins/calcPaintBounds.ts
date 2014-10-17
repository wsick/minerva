module minerva.controls.canvas.processup.tapins {
    export var calcPaintBounds = function (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        core.helpers.copyGrowTransform4(output.globalBoundsWithChildren, input.extentsWithChildren, input.effectPadding, input.localProjection);
        var sbwc = output.surfaceBoundsWithChildren;
        var surface = tree.surface;
        if (surface && tree.isTop) {
            sbwc.x = sbwc.y = 0;
            sbwc.width = surface.width;
            sbwc.height = surface.height;
        } else {
            core.helpers.copyGrowTransform4(sbwc, input.extentsWithChildren, input.effectPadding, input.absoluteProjection);
        }

        return true;
    };
}