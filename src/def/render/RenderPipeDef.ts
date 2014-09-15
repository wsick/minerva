module minerva.def.render {
    export interface IRenderTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect):boolean;
    }
    export interface IInput extends IPipeInput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        surfaceBoundsWithChildren: Rect;
        renderXform: number[];
        clip: IGeometry;
        effect: IEffect;
    }
    export interface IState extends IPipeState {
        renderRegion: Rect;
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

    export class RenderPipeDef extends PipeDef<IRenderTapin, IInput, IState, IOutput> {
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

        createState (): IState {
            return <IState> {
                renderRegion: new Rect()
            };
        }

        createOutput (): IOutput {
            return <IOutput> {
            };
        }
    }
}