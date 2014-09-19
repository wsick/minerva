module minerva.layout {
    export interface IMeasurePipe extends IPipe<def.measure.IInput, def.measure.IState, def.measure.IOutput> {
    }
    export interface IArrangePipe extends IPipe<def.arrange.IInput, def.arrange.IState, def.arrange.IOutput> {
    }
    export interface IProcessDownPipe extends IPipe<def.processdown.IInput, def.processdown.IState, def.processdown.IOutput> {
    }
    export interface IRenderPipe extends IPipe<def.render.IInput, def.render.IState, def.render.IOutput> {
    }

    var NO_PIPE = new def.PipeDef<def.ITapin, def.IPipeInput, def.IPipeState, def.IPipeOutput>();

    export interface IUpdaterAssets extends def.measure.IInput, def.arrange.IInput, def.render.IInput, def.processdown.IInput {
    }

    export class Updater {
        private $$measure: IMeasurePipe = null;
        private $$arrange: IArrangePipe = null;
        private $$processdown: IProcessDownPipe = null;
        private $$render: IRenderPipe = null;

        private $$visualParentUpdater: Updater = null;

        assets = <IUpdaterAssets> {
            width: NaN,
            height: NaN,
            minWidth: 0.0,
            minHeight: 0.0,
            maxWidth: Number.POSITIVE_INFINITY,
            maxHeight: Number.POSITIVE_INFINITY,
            useLayoutRounding: true,
            margin: new Thickness(),
            horizontalAlignment: HorizontalAlignment.Stretch,
            verticalAlignment: VerticalAlignment.Stretch,
            clip: null,
            effect: null,
            visibility: Visibility.Visible,

            previousConstraint: new Size(),
            desiredSize: new Size(),
            hiddenDesire: new Size(),

            totalIsRenderVisible: true,
            totalOpacity: 1.0,

            surfaceBoundsWithChildren: new Rect(),

            renderXform: mat3.identity(),

            dirtyFlags: 0,
            uiFlags: UIFlags.RenderVisible | UIFlags.HitTestVisible
        };

        constructor () {
        }

        setMeasurePipe (pipedef?: def.measure.MeasurePipeDef): Updater {
            this.$$measure = <IMeasurePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setArrangePipe (pipedef?: def.arrange.ArrangePipeDef): Updater {
            this.$$arrange = <IArrangePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setProcessDownPipe (pipedef?: def.processdown.ProcessDownPipeDef): Updater {
            this.$$processdown = <IProcessDownPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setRenderPipe (pipedef?: def.render.RenderPipeDef): Updater {
            this.$$render = <IRenderPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            return pipe.def.run(this.assets, pipe.state, pipe.output, availableSize);
        }

        arrange (finalRect: Rect): boolean {
            var pipe = this.$$arrange;
            return pipe.def.run(this.assets, pipe.state, pipe.output, finalRect);
        }

        processDown (): boolean {
            var pipe = this.$$processdown;
            var vp = this.$$visualParentUpdater;
            var vpi = vp ? vp.assets : null;
            var vpo = vp ? vp.$$processdown.output : null;
            return pipe.def.run(this.assets, pipe.state, pipe.output, vpi, vpo);
        }

        render (ctx: def.render.RenderContext, region: Rect): boolean {
            var pipe = this.$$render;
            return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region);
        }
    }
}