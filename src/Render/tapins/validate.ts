module minerva.render.tapins {
    export var validate:IRenderTapin = function (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean {
        if (!assets.TotalIsRenderVisible)
            return false;
        if ((assets.TotalOpacity * 255) < 0.5)
            return false;
        return true;
    };
}