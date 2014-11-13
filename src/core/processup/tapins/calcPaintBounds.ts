module minerva.core.processup.tapins {
    export var calcPaintBounds: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        helpers.copyGrowTransform(output.globalBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.renderXform);
        helpers.copyGrowTransform(output.surfaceBoundsWithChildren, output.extentsWithChildren, input.effectPadding, input.absoluteXform);

        return true;
    };
}