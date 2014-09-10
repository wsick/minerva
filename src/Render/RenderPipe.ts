module minerva.render {
    export interface IRenderTapin extends ITapin {
        (assets:IRenderAssets, state:IRenderState, output:IRenderOutput):boolean;
    }
    export interface IRenderAssets extends IPipeAssets {
        ctx: CanvasRenderingContext2D;

        TotalIsRenderVisible: boolean;
        TotalOpacity: number;
        SurfaceBoundsWithChildren: Rect;
        RenderXform: number[];
        Clip: any;
        Effect: any;
    }
    export interface IRenderState extends IPipeState {
        RenderRegion: Rect;
    }
    export interface IRenderOutput extends IPipeOutput {

    }

    export class RenderPipeDefinition implements IPipeDefinition {
        initAssets(assets:IRenderAssets) {
        }

        initState(state:IRenderState) {
            if (!state.RenderRegion)
                state.RenderRegion = new Rect();
        }

        initOutput(output:IRenderOutput) {

        }

        getTapins():IRenderTapin[] {
            return [
                tapins.validate,
                tapins.validateRegion,
                tapins.prepareContext,
                tapins.applyClip,
                tapins.preRender,
                tapins.doRender,
                tapins.postRender,
                tapins.renderChildren,
                tapins.restoreContext
            ];
        }
    }
}