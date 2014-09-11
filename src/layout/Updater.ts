module minerva.layout {
    export interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {

    }

    var NO_PIPE = new def.Pipe<def.ITapin, def.IPipeAssets, def.IPipeState, def.IPipeOutput>();

    export class Updater {
        private $$render: IRenderPipe;

        constructor () {
            //TODO: init $$render
            this.$$render = {
                def: NO_PIPE,
                assets: {
                    TotalIsRenderVisible: true,
                    TotalOpacity: 1.0,
                    SurfaceBoundsWithChildren: new Rect(),
                    RenderXform: mat3.identity(),
                    Clip: null,
                    Effect: null
                },
                state: { },
                output: { }
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