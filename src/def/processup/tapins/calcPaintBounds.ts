module minerva.def.processup.tapins {
    export var calcPaintBounds: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        helpers.copyGrowTransform4(output.globalBoundsWithChildren, input.extentsWithChildren, input.effectPadding, input.localProjection);
        helpers.copyGrowTransform4(output.surfaceBoundsWithChildren, input.extentsWithChildren, input.effectPadding, input.absoluteProjection);

        return true;
    };
}