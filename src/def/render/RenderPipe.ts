module minerva.def.render {
    export interface IRenderTapin extends ITapin {
        (assets: IRenderAssets, state: IRenderState, output: IRenderOutput, ctx: CanvasRenderingContext2D, region: Rect):boolean;
    }
    export interface IRenderAssets extends IPipeAssets {
        TotalIsRenderVisible: boolean;
        TotalOpacity: number;
        SurfaceBoundsWithChildren: Rect;
        RenderXform: number[];
        Clip: IGeometry;
        Effect: IEffect;
    }
    export interface IRenderState extends IPipeState {
        RenderRegion: Rect;
    }
    export interface IRenderOutput extends IPipeOutput {

    }

    export interface IEffect {
        PreRender(ctx: CanvasRenderingContext2D);
        PostRender(ctx: CanvasRenderingContext2D);
    }
    export interface IGeometry {
        Draw(ctx: CanvasRenderingContext2D);
    }

    export class RenderPipe extends Pipe<IRenderTapin, IRenderAssets, IRenderState, IRenderOutput> {
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

        initState (state: IRenderState) {
            if (!state.RenderRegion)
                state.RenderRegion = new Rect();
        }
    }
}