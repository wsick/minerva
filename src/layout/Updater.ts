module minerva.layout {
    export interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {

    }

    var NO_PIPE = new def.Pipe<def.ITapin, def.IPipeAssets, def.IPipeState, def.IPipeOutput>();

    export class Updater {
        private $$render: IRenderPipe;

        TotalIsRenderVisible = true;
        TotalOpacity = 1.0;

        SurfaceBoundsWithChildren = new Rect();

        RenderXform = mat3.identity();

        Clip: def.render.IGeometry = null;
        Effect: def.render.IEffect = null;

        constructor () {
            this.$$render = {
                def: NO_PIPE,
                assets: this,
                state: {
                    RenderRegion: null
                },
                output: null
            };
        }

        setRenderPipe (pipedef: def.render.RenderPipe) {
            this.$$render.def = pipedef || NO_PIPE;
        }

        render (ctx: CanvasRenderingContext2D, region: Rect) {
            var pipe = this.$$render;
            pipe.def.run(pipe.assets, pipe.state, pipe.output, ctx, region);
        }
    }
}