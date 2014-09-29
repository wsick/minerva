module minerva.layout.render.tapins {
    export var prepareContext: IRenderTapin = function (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect, tree: layout.IUpdaterTree): boolean {
        ctx.save();
        ctx.pretransformMatrix(input.renderXform);
        ctx.raw.globalAlpha = input.totalOpacity;
        return true;
    };
}