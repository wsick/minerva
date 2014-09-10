module minerva.render.tapins {
    export var validateRegion:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        var r = state.RenderRegion;
        Rect.copyTo(assets.SurfaceBoundsWithChildren, r);
        Rect.roundOut(r);
        Rect.intersection(r, region);
        return r.width > 0 && r.height > 0;
    };
}