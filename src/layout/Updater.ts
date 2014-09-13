module minerva.layout {
    export interface IMeasurePipe extends IPipe<def.measure.IAssets, def.measure.IState, def.measure.IOutput> {
    }
    export interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {
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

    var NO_PIPE = new def.Pipe<def.ITapin, def.IPipeAssets, def.IPipeState, def.IPipeOutput>();

    export class Updater implements def.measure.IAssets, def.render.IAssets {
        private $$measure: IMeasurePipe;
        private $$render: IRenderPipe;

        width: number = NaN;
        height: number = NaN;
        minWidth: number = 0.0;
        minHeight: number = 0.0;
        maxWidth: number = Number.POSITIVE_INFINITY;
        maxHeight: number = Number.POSITIVE_INFINITY;
        useLayoutRounding: boolean = true;

        previousConstraint = new Size();
        desiredSize = new Size();
        hiddenDesire = new Size();

        totalIsRenderVisible = true;
        totalOpacity = 1.0;

        surfaceBoundsWithChildren = new Rect();

        renderXform = mat3.identity();

        dirtyFlags: DirtyFlags = 0;

        margin: Thickness = new Thickness();
        clip: def.render.IGeometry = null;
        effect: def.render.IEffect = null;
        visibility = Visibility.Visible;

        constructor () {
            this.$$measure = null;
            this.$$render = null;
        }

        setMeasurePipe (pipedef?: def.measure.MeasurePipe): Updater {
            this.$$measure = <IMeasurePipe>createPipe(pipedef || NO_PIPE, this);
            return this;
        }

        setRenderPipe (pipedef?: def.render.RenderPipe): Updater {
            this.$$render = <IRenderPipe>createPipe(pipedef || NO_PIPE, this);
            return this;
        }

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            var output = pipe.output;

            output.dirtyFlags = this.dirtyFlags;
            Size.copyTo(this.hiddenDesire, output.hiddenDesire);

            var success = pipe.def.run(pipe.assets, pipe.state, output, availableSize);

            Size.copyTo(output.previousConstraint, this.previousConstraint);
            Size.copyTo(output.desiredSize, this.desiredSize);
            Size.copyTo(output.hiddenDesire, this.hiddenDesire);
            this.dirtyFlags = output.dirtyFlags;

            return success;
        }

        render (ctx: CanvasRenderingContext2D, region: Rect): boolean {
            var pipe = this.$$render;
            return pipe.def.run(pipe.assets, pipe.state, null, ctx, region);
        }
    }
}