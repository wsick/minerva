module minerva {
    export interface IEffect {
        PreRender(ctx: core.render.RenderContext);
        PostRender(ctx: core.render.RenderContext);
        GetPadding(thickness: Thickness): boolean;
    }
    export interface IGeometry {
        Draw(ctx: core.render.RenderContext);
        GetBounds(): Rect;
    }
}
