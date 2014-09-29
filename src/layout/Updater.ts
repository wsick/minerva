module minerva.layout {
    var NO_VO: IVisualOwner = {
        updateBounds: function () {
        },
        invalidate: function (region: Rect) {
        }
    };

    function getVisualOwner (updater: Updater): IVisualOwner {
        var tree = updater.tree;
        if (tree.visualParent)
            return tree.visualParent;
        if (tree.isTop && tree.surface)
            return tree.surface;
        return NO_VO;
    }

    export class Updater {
        private $$measure: IMeasurePipe = null;
        private $$measureBinder: measure.IMeasureBinder = null;
        private $$arrange: IArrangePipe = null;
        private $$arrangeBinder: arrange.IArrangeBinder = null;
        private $$sizing: ISizingPipe = null;
        private $$processdown: IProcessDownPipe = null;
        private $$processup: IProcessUpPipe = null;
        private $$render: IRenderPipe = null;

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

        tree: IUpdaterTree = null;

        constructor () {
            this.setMeasureBinder()
                .setArrangeBinder();
        }

        /*
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
         */

        onSizeChanged (oldSize: Size, newSize: Size) {
            //TODO: Raise SizeChanged
        }

        setTree (tree?: IUpdaterTree): Updater {
            this.tree = tree || new layout.UpdaterTree();
            return this;
        }

        setVisualParent (visualParent: Updater): Updater {
            this.tree.visualParent = visualParent;
            return this;
        }

        walkDeep (dir?: WalkDirection): IDeepWalker<Updater> {
            var last: Updater = undefined;
            var walkList: Updater[] = [this];
            dir = dir || WalkDirection.Forward;
            var revdir = (dir === WalkDirection.Forward || dir === WalkDirection.ZForward) ? dir + 1 : dir - 1;

            return {
                current: undefined,
                step: function (): boolean {
                    if (last) {
                        for (var subwalker = last.tree.walk(revdir); subwalker.step();) {
                            walkList.unshift(subwalker.current);
                        }
                    }

                    this.current = last = walkList.shift();
                    return this.current !== undefined;
                },
                skipBranch: function () {
                    last = undefined;
                }
            };
        }

        /////// PREPARE PIPES

        setMeasurePipe (pipedef?: measure.MeasurePipeDef): Updater {
            var def = pipedef || new measure.MeasurePipeDef();
            this.$$measure = <IMeasurePipe>pipe.createTriPipe(def);
            return this;
        }

        setMeasureBinder (mb?: measure.IMeasureBinder): Updater {
            this.$$measureBinder = mb || new measure.MeasureBinder();
            return this;
        }

        setArrangePipe (pipedef?: arrange.ArrangePipeDef): Updater {
            var def = pipedef || new arrange.ArrangePipeDef();
            this.$$arrange = <IArrangePipe>pipe.createTriPipe(def);
            return this;
        }

        setArrangeBinder (ab?: arrange.IArrangeBinder): Updater {
            this.$$arrangeBinder = ab || new arrange.ArrangeBinder();
            return this;
        }

        setSizingPipe (pipedef?: sizing.SizingPipeDef): Updater {
            var def = pipedef || new sizing.SizingPipeDef();
            this.$$sizing = <ISizingPipe>pipe.createTriPipe(def);
            return this;
        }

        setProcessDownPipe (pipedef?: processdown.ProcessDownPipeDef): Updater {
            var def: pipe.TriPipeDef<processdown.IProcessDownTapin, processdown.IInput, processdown.IState, processdown.IOutput> = pipedef;
            if (!def)
                def = new processdown.ProcessDownPipeDef();
            this.$$processdown = <IProcessDownPipe>pipe.createTriPipe(def);
            return this;
        }

        setProcessUpPipe (pipedef?: processup.ProcessUpPipeDef): Updater {
            var def: pipe.TriPipeDef<processup.IProcessUpTapin, processup.IInput, processup.IState, processup.IOutput> = pipedef;
            if (!def)
                def = new processup.ProcessUpPipeDef();
            this.$$processup = <IProcessUpPipe>pipe.createTriPipe(def);
            return this;
        }

        setRenderPipe (pipedef?: render.RenderPipeDef): Updater {
            var def = pipedef || new render.RenderPipeDef();
            this.$$render = <IRenderPipe>pipe.createTriPipe(def);
            return this;
        }

        /////// RUN PIPES

        doMeasure () {
            this.$$measureBinder.bind(this);
        }

        measure (availableSize: Size): boolean {
            var pipe = this.$$measure;
            var output = pipe.output;
            var success = pipe.def.run(this.assets, pipe.state, output, this.tree, availableSize);
            if (output.newUpDirty)
                Updater.$$addUpDirty(this);
            if (output.newDownDirty)
                Updater.$$addDownDirty(this);
            if (output.newUiFlags)
                Updater.$$propagateUiFlagsUp(this, output.newUiFlags);
            return success;
        }

        doArrange () {
            this.$$arrangeBinder.bind(this);
        }

        arrange (finalRect: Rect): boolean {
            var pipe = this.$$arrange;
            var output = pipe.output;
            var success = pipe.def.run(this.assets, pipe.state, output, this.tree, finalRect);
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
            var vp = this.tree.visualParent;
            if (vp && vp.$$inDownDirty) {
                //OPTIMIZATION: uie is overzealous. His parent will invalidate him later
                return false;
            }

            var pipe = this.$$processdown;
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
            var success = pipe.def.run(this.assets, pipe.state, pipe.output, getVisualOwner(this));
            this.$$inUpDirty = false;
            return success;
        }

        render (ctx: render.RenderContext, region: Rect): boolean {
            var pipe = this.$$render;
            return pipe.def.run(this.assets, pipe.state, pipe.output, ctx, region, this.tree);
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
                if (list[i].tree.visualParent === this)
                    return i;
            }
            return -1;
        }

        /////// STATIC HELPERS

        private static $$addUpDirty (updater: Updater) {
            var surface = updater.tree.surface;
            if (surface && !updater.$$inUpDirty) {
                surface.addUpDirty(updater);
                updater.$$inUpDirty = true;
            }
        }

        private static $$addDownDirty (updater: Updater) {
            var surface = updater.tree.surface;
            if (surface && !updater.$$inDownDirty) {
                surface.addDownDirty(updater);
                updater.$$inDownDirty = true;
            }
        }

        static $$propagateUiFlagsUp (updater: Updater, flags: UIFlags) {
            updater.assets.uiFlags |= flags;
            var vpu = updater;
            while ((vpu = vpu.tree.visualParent) != null && (vpu.assets.uiFlags & flags) === 0) {
                vpu.assets.uiFlags |= flags;
            }
        }
    }
}