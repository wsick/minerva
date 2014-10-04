module minerva.core.render {
    export interface IEffect {
        PreRender(ctx: RenderContext);
        PostRender(ctx: RenderContext);
        GetPadding(thickness: Thickness): boolean;
    }
    export interface IGeometry {
        Draw(ctx: RenderContext);
    }
}
