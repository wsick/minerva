module minerva.layout {
    export interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {

    }

    var NO_PIPE = new def.Pipe<def.ITapin, def.IPipeAssets, def.IPipeState, def.IPipeOutput>();

    export class Updater implements def.render.IAssets {
        private $$render: IRenderPipe;

        totalIsRenderVisible = true;
        totalOpacity = 1.0;

        surfaceBoundsWithChildren = new Rect();

        renderXform = mat3.identity();

        clip: def.render.IGeometry = null;
        effect: def.render.IEffect = null;

        constructor () {
            this.$$render = <IRenderPipe>{
                def: NO_PIPE,
                assets: this,
                state: {
                    renderRegion: null
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