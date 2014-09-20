module minerva.layout {
    var NO_PIPE = new def.PipeDef<def.ITapin, def.IPipeInput, def.IPipeState, def.IPipeOutput>();
    var NO_VO: IVisualOwner = {
        updateBounds: function () {
        },
        invalidate: function (region: Rect) {
        }
    };

    export class Updater {
        private $$measure: IMeasurePipe = null;
        private $$arrange: IArrangePipe = null;
        private $$size: ISizePipe = null;
        private $$processdown: IProcessDownPipe = null;
        private $$processup: IProcessUpPipe = null;
        private $$render: IRenderPipe = null;

        private $$visualParentUpdater: Updater = null;
        private $$surface: ISurface = null;

        assets: IUpdaterAssets = {
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
            opacity: 1.0,
            isHitTestVisible: true,
            renderTransform: mat3.identity(),
            renderTransformOrigin: new Point(),
            projection: null,
            effectPadding: new Thickness(),

            isTopLevel: false,

            previousConstraint: new Size(),
            desiredSize: new Size(),
            hiddenDesire: new Size(),

            renderSize: new Size(),
            lastRenderSize: new Size(),
            layoutSlot: new Rect(),
            layoutClip: new Rect(),
            compositeLayoutClip: new Rect(),

            actualWidth: 0,
            actualHeight: 0,
            z: NaN,

            totalIsRenderVisible: true,
            totalOpacity: 1.0,
            totalIsHitTestVisible: true,
            totalHasRenderProjection: false,

            extents: new Rect(),
            extentsWithChildren: new Rect(),
            surfaceBoundsWithChildren: new Rect(),
            globalBoundsWithChildren: new Rect(),

            layoutXform: mat3.identity(),
            carrierXform: mat3.identity(),
            renderXform: mat3.identity(),
            absoluteXform: mat3.identity(),
            carrierProjection: mat4.identity(),
            localProjection: mat4.identity(),
            absoluteProjection: mat4.identity(),

            dirtyRegion: new Rect(),
            dirtyFlags: 0,
            uiFlags: UIFlags.RenderVisible | UIFlags.HitTestVisible,
            forceInvalidate: false
        };

        constructor () {
        }

        /////// PREPARE PIPES

        setMeasurePipe (pipedef?: def.measure.MeasurePipeDef): Updater {
            this.$$measure = <IMeasurePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setArrangePipe (pipedef?: def.arrange.ArrangePipeDef): Updater {
            this.$$arrange = <IArrangePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setSizePipe (pipedef?: def.size.SizePipeDef): Updater {
            this.$$size = <ISizePipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setProcessDownPipe (pipedef?: def.processdown.ProcessDownPipeDef): Updater {
            this.$$processdown = <IProcessDownPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setProcessUpPipe (pipedef?: def.processup.ProcessUpPipeDef): Updater {
            this.$$processup = <IProcessUpPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        setRenderPipe (pipedef?: def.render.RenderPipeDef): Updater {
            this.$$render = <IRenderPipe>createPipe(pipedef || NO_PIPE);
            return this;
        }

        /////// RUN PIPES

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            return pipe.def.run(this.assets, pipe.state, pipe.output, availableSize);
        }

        arrange (finalRect: Rect): boolean {
            var pipe = this.$$arrange;
            return pipe.def.run(this.assets, pipe.state, pipe.output, finalRect);
        }

        size (oldSize: Size, newSize: Size): boolean {
            var pipe = this.$$size;
            var assets = this.assets;
            oldSize.width = assets.actualWidth;
            oldSize.height = assets.actualHeight;
            var success = pipe.def.run(assets, pipe.state, pipe.output);
            Size.copyTo(pipe.output.actualSize, newSize);
            return success;
        }

        processDown (): boolean {
            var pipe = this.$$processdown;
            var vp = this.$$visualParentUpdater;
            return pipe.def.run(this.assets, pipe.state, pipe.output, vp ? vp.assets : null);
        }

        processUp (): boolean {
            var pipe = this.$$processup;
            var vo = this.$$getVisualOwner();
            return pipe.def.run(this.assets, pipe.state, pipe.output, vo);
        }

        render (ctx: def.render.RenderContext, region: Rect): boolean {
            var pipe = this.$$render;
            return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region);
        }

        ///////

        private $$getVisualOwner (): IVisualOwner {
            if (this.$$visualParentUpdater)
                return this.$$visualParentUpdater;
            if (this.assets.isTopLevel && this.$$surface)
                return this.$$surface;
            return NO_VO;
        }

        updateBounds (forceRedraw?: boolean) {
            var assets = this.assets;
            assets.dirtyFlags |= DirtyFlags.Bounds;
            //TODO: add dirty element
            if (forceRedraw === true)
                assets.forceInvalidate = true;
        }

        invalidate (region: Rect) {
            var assets = this.assets;
            if (!assets.totalIsRenderVisible || (assets.totalOpacity * 255) < 0.5)
                return;
            assets.dirtyFlags |= DirtyFlags.Invalidate;
            //TODO: add dirty element
            Rect.union(assets.dirtyRegion, region);
        }
    }
}