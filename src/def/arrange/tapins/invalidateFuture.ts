module minerva.def.arrange.tapins {
    export var invalidateFuture: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        var lc = output.layoutClip;
        lc.x = lc.y = lc.width = lc.height = 0;
        output.dirtyFlags |= layout.DirtyFlags.LocalTransform;
        output.dirtyFlags |= layout.DirtyFlags.LocalProjection;
        output.dirtyFlags |= layout.DirtyFlags.Bounds;
        return true;
    };
}