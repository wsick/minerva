module minerva.layout {
    export interface IMeasurePipe extends IPipe<def.measure.IInput, def.measure.IState, def.measure.IOutput> {
    }
    export interface IArrangePipe extends IPipe<def.arrange.IInput, def.arrange.IState, def.arrange.IOutput> {
    }
    export interface IRenderPipe extends IPipe<def.render.IInput, def.render.IState, def.render.IOutput> {
    }

    export enum DirtyFlags {
        Transform = 1 << 0,
        LocalTransform = 1 << 1,
        LocalProjection = 1 << 2,
        Clip = 1 << 3,
        LocalClip = 1 << 4,
        LayoutClip = 1 << 5,
        RenderVisibility = 1 << 6,
        HitTestVisibility = 1 << 7,
        Measure = 1 << 8,
        Arrange = 1 << 9,
        ChildrenZIndices = 1 << 10,
        Bounds = 1 << 20,
        NewBounds = 1 << 21,
        Invalidate = 1 << 22,
        InUpDirtyList = 1 << 30,
        InDownDirtyList = 1 << 31,

        DownDirtyState = Transform | LocalTransform | LocalProjection
            | Clip | LocalClip | LayoutClip | RenderVisibility | HitTestVisibility | ChildrenZIndices,
        UpDirtyState = Bounds | Invalidate,
    }

    var NO_PIPE = new def.PipeDef<def.ITapin, def.IPipeInput, def.IPipeState, def.IPipeOutput>();

    export interface IUpdaterAssets extends def.measure.IInput, def.arrange.IInput, def.render.IInput {
    }

    export class Updater {
        private $$measure: IMeasurePipe;
        private $$arrange: IArrangePipe;
        private $$render: IRenderPipe;

        assets = <IUpdaterAssets> {
            width: NaN,
            height: NaN,
            minWidth: 0.0,
            minHeight: 0.0,
            maxWidth: Number.POSITIVE_INFINITY,
            maxHeight: Number.POSITIVE_INFINITY,
            useLayoutRounding: true,

            previousConstraint: new Size(),
            desiredSize: new Size(),
            hiddenDesire: new Size(),

            totalIsRenderVisible: true,
            totalOpacity: 1.0,

            surfaceBoundsWithChildren: new Rect(),

            renderXform: mat3.identity(),

            dirtyFlags: 0,

            margin: new Thickness(),
            clip: null,
            effect: null,
            visibility: Visibility.Visible
        };

        constructor () {
            this.$$measure = null;
            this.$$arrange = null;
            this.$$render = null;
        }

        setMeasurePipe (pipedef?: def.measure.MeasurePipeDef): Updater {
            this.$$measure = <IMeasurePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setArrangePipe (pipedef?: def.arrange.ArrangePipe): Updater {
            this.$$arrange = <IArrangePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setRenderPipe (pipedef?: def.render.RenderPipeDef): Updater {
            this.$$render = <IRenderPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            var input = this.assets;
            var output = pipe.output;

            output.dirtyFlags = input.dirtyFlags;
            Size.copyTo(input.previousConstraint, output.previousConstraint);
            Size.copyTo(input.hiddenDesire, output.hiddenDesire);

            var success = pipe.def.run(input, pipe.state, output, availableSize);

            Size.copyTo(output.previousConstraint, input.previousConstraint);
            Size.copyTo(output.desiredSize, input.desiredSize);
            Size.copyTo(output.hiddenDesire, input.hiddenDesire);
            input.dirtyFlags = output.dirtyFlags;

            return success;
        }

        arrange (finalRect: Rect): boolean {
            var pipe = this.$$arrange;
            var input = this.assets;
            var output = pipe.output;

            var success = pipe.def.run(input, pipe.state, output, finalRect);

            return success;
        }

        render (ctx: def.render.RenderContext, region: Rect): boolean {
            var pipe = this.$$render;
            var input = this.assets;
            return pipe.def.run(input, pipe.state, null, ctx, region);
        }
    }
}