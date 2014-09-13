module minerva.def.render {
    export interface IRenderTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect):boolean;
    }
    export interface IAssets extends IPipeAssets {
        TotalIsRenderVisible: boolean;
        TotalOpacity: number;
        SurfaceBoundsWithChildren: Rect;
        RenderXform: number[];
        Clip: IGeometry;
        Effect: IEffect;
    }
    export interface IState extends IPipeState {
        RenderRegion: Rect;
    }
    export interface IOutput extends IPipeOutput {

    }

    export interface IEffect {
        PreRender(ctx: RenderContext);
        PostRender(ctx: RenderContext);
    }
    export interface IGeometry {
        Draw(ctx: RenderContext);
    }

    export class RenderPipe extends Pipe<IRenderTapin, IAssets, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('validate', tapins.validate)
                .addTapin('validateRegion', tapins.validateRegion)
                .addTapin('prepareContext', tapins.prepareContext)
                .addTapin('applyClip', tapins.applyClip)
                .addTapin('preRender', tapins.preRender)
                .addTapin('doRender', tapins.doRender)
                .addTapin('postRender', tapins.postRender)
                .addTapin('renderChildren', tapins.renderChildren)
                .addTapin('restoreContext', tapins.restoreContext);
        }

        initState (state: IState) {
            if (!state.RenderRegion)
                state.RenderRegion = new Rect();
        }
    }
}