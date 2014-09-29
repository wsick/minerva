module minerva.layout.render.tapins {
    export var restoreContext: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        ctx.restore();
        return true;
    };
}