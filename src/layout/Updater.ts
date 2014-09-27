module minerva.layout {
    var NO_PIPE = new pipe.TriPipeDef<pipe.ITriTapin, pipe.IPipeInput, pipe.IPipeState, pipe.IPipeOutput>();
    var NO_VO: IVisualOwner = {
        updateBounds: function () {
        },
        invalidate: function (region: Rect) {
        }
    };

    export class Updater {
        private $$measure: IMeasurePipe = null;
        private $$measureBinder: measure.IMeasureBinder = null;
        private $$arrange: IArrangePipe = null;
        private $$arrangeBinder: arrange.IArrangeBinder = null;
        private $$sizing: ISizingPipe = null;
        private $$processdown: IProcessDownPipe = null;
        private $$processup: IProcessUpPipe = null;
        private $$render: IRenderPipe = null;

        private $$visualParentUpdater: Updater = null;
        private $$surface: ISurface = null;

        private $$inDownDirty = false;
        private $$inUpDirty = false;

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
            isLayoutContainer: false,
            isContainer: false,

            previousConstraint: new Size(),
            desiredSize: new Size(),
            hiddenDesire: new Size(),

            renderSize: new Size(),
            lastRenderSize: new Size(),
            layoutSlot: new Rect(),
            layoutClip: new Rect(),
            compositeLayoutClip: null,

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
            this.setMeasureBinder()
                .setArrangeBinder();
        }

        setContainerMode (isLayoutContainer: boolean, isContainer?: boolean): Updater {
            var assets = this.assets;
            if (isLayoutContainer != null)
                assets.isLayoutContainer = isLayoutContainer;
            if (isContainer != null)
                assets.isContainer = isContainer;
            else
                assets.isContainer = isLayoutContainer;
            return this;
        }

        setVisualParent (visualParent: Updater): Updater {
            this.$$visualParentUpdater = visualParent;
            return this;
        }

        onSizeChanged (oldSize: Size, newSize: Size) {
            //TODO: Raise SizeChanged
        }

        /////// PREPARE PIPES

        setMeasurePipe (pipedef?: measure.MeasurePipeDef): Updater {
            this.$$measure = <IMeasurePipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        setMeasureBinder (mb?: measure.IMeasureBinder): Updater {
            this.$$measureBinder = mb || new measure.MeasureBinder();
            return this;
        }

        setArrangePipe (pipedef?: arrange.ArrangePipeDef): Updater {
            this.$$arrange = <IArrangePipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        setArrangeBinder (ab?: arrange.IArrangeBinder): Updater {
            this.$$arrangeBinder = ab || new arrange.ArrangeBinder();
            return this;
        }

        setSizingPipe (pipedef?: sizing.SizingPipeDef): Updater {
            this.$$sizing = <ISizingPipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        setProcessDownPipe (pipedef?: processdown.ProcessDownPipeDef): Updater {
            this.$$processdown = <IProcessDownPipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        setProcessUpPipe (pipedef?: processup.ProcessUpPipeDef): Updater {
            this.$$processup = <IProcessUpPipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        setRenderPipe (pipedef?: render.RenderPipeDef): Updater {
            this.$$render = <IRenderPipe>pipe.createTriPipe(pipedef || NO_PIPE);
            return this;
        }

        /////// RUN PIPES

        doMeasure () {
            this.$$measureBinder.bind(this, this.$$surface, this.$$visualParentUpdater);
        }

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            var output = pipe.output;
            var success = pipe.def.run(this.assets, pipe.state, output, availableSize);
            if (output.newUpDirty)
                Updater.$$addUpDirty(this);
            if (output.newDownDirty)
                Updater.$$addDownDirty(this);
            if (output.newUiFlags)
                Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
            return success;
        }

        doArrange () {
            this.$$arrangeBinder.bind(this, this.$$surface, this.$$visualParentUpdater);
        }

        arrange (finalRect: Rect): boolean {
            var pipe = this.$$arrange;
            var output = pipe.output;
            var success = pipe.def.run(this.assets, pipe.state, output, finalRect);
            if (output.newUpDirty)
                Updater.$$addUpDirty(this);
            if (output.newDownDirty)
                Updater.$$addDownDirty(this);
            if (output.newUiFlags)
                Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
            return success;
        }

        sizing (oldSize: Size, newSize: Size): boolean {
            var pipe = this.$$sizing;
            var assets = this.assets;
            if (assets.lastRenderSize)
                Size.copyTo(assets.lastRenderSize, oldSize);
            var success = pipe.def.run(assets, pipe.state, pipe.output);
            Size.copyTo(pipe.output.actualSize, newSize);
            assets.lastRenderSize = undefined;
            return success;
        }

        processDown (): boolean {
            if (!this.$$inDownDirty)
                return true;
            if (this.$$visualParentUpdater && this.$$visualParentUpdater.$$inDownDirty) {
                //OPTIMIZATION: uie is overzealous. His parent will invalidate him later
                return false;
            }

            var pipe = this.$$processdown;
            var vp = this.$$visualParentUpdater;
            var success = pipe.def.run(this.assets, pipe.state, pipe.output, vp ? vp.assets : null);
            this.$$inDownDirty = false;
            if (pipe.output.newUpDirty)
                Updater.$$addUpDirty(this);
            return success;
        }

        processUp (): boolean {
            if (!this.$$inUpDirty)
                return true;

            var pipe = this.$$processup;
            var success = pipe.def.run(this.assets, pipe.state, pipe.output, Updater.$$getVisualOnwer(this));
            this.$$inUpDirty = false;
            return success;
        }

        render (ctx: render.RenderContext, region: Rect): boolean {
            var pipe = this.$$render;
            return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region);
        }

        ///////

        invalidateMeasure () {
            this.assets.dirtyFlags |= DirtyFlags.Measure;
            Updater.$$propagateUiFlagsUp(this, UIFlags.MeasureHint);
        }

        invalidateArrange () {
            this.assets.dirtyFlags |= DirtyFlags.Arrange;
            Updater.$$propagateUiFlagsUp(this, UIFlags.ArrangeHint);
        }

        updateBounds (forceRedraw?: boolean) {
            var assets = this.assets;
            assets.dirtyFlags |= DirtyFlags.Bounds;
            Updater.$$addUpDirty(this);
            if (forceRedraw === true)
                assets.forceInvalidate = true;
        }

        invalidate (region: Rect) {
            var assets = this.assets;
            if (!assets.totalIsRenderVisible || (assets.totalOpacity * 255) < 0.5)
                return;
            assets.dirtyFlags |= DirtyFlags.Invalidate;
            Updater.$$addUpDirty(this);
            Rect.union(assets.dirtyRegion, region);
        }

        findChildInList (list: Updater[]) {
            for (var i = 0, len = list.length; i < len; i++) {
                if (list[i].$$visualParentUpdater === this)
                    return i;
            }
            return -1;
        }

        /////// STATIC HELPERS

        static walk (updater: Updater): IWalker<Updater> {
            //TODO: Implement walk
            return null;
        }

        static walkDeep (updater: Updater): IDeepWalker<Updater> {
            //TODO: Implement walkDeep
            return null;
        }

        private static $$getVisualOnwer (updater: Updater): IVisualOwner {
            if (updater.$$visualParentUpdater)
                return updater.$$visualParentUpdater;
            if (updater.assets.isTopLevel && updater.$$surface)
                return updater.$$surface;
            return NO_VO;
        }

        private static $$addUpDirty (updater: Updater) {
            if (updater.$$surface && !updater.$$inUpDirty) {
                updater.$$surface.addUpDirty(updater);
                updater.$$inUpDirty = true;
            }
        }

        private static $$addDownDirty (updater: Updater) {
            if (updater.$$surface && !updater.$$inDownDirty) {
                updater.$$surface.addDownDirty(updater);
                updater.$$inDownDirty = true;
            }
        }

        static $$propagateUiFlagsUp (updater: Updater, flags: UIFlags) {
            updater.assets.uiFlags |= flags;
            var vpu = updater;
            while ((vpu = vpu.$$visualParentUpdater) != null && (vpu.assets.uiFlags & flags) === 0) {
                vpu.assets.uiFlags |= flags;
            }
        }
    }
}