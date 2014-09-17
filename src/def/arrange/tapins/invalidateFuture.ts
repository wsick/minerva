module minerva.def.arrange.tapins {
    export var invalidateFuture: IArrangeTapin = function (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean {
        console.warn("Implement arrange.tapins.invalidateFuture");
        var lc = output.layoutClip;
        lc.x = lc.y = lc.width = lc.height = 0;
        //this.UpdateTransform();
        //this.UpdateProjection();
        //this.UpdateBounds();
        return true;
    };
}