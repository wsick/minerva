module minerva.def.render.tapins {
    export var validateRegion: IRenderTapin = function (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean {
        var r = state.RenderRegion;
        Rect.copyTo(assets.SurfaceBoundsWithChildren, r);
        Rect.roundOut(r);
        Rect.intersection(r, region);
        return r.width > 0 && r.height > 0;
    };
}