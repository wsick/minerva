module minerva.engine {
    export interface IPass extends core.draft.IDraftPipeData {
        count: number;
        maxCount: number;
    }

    var fontCtx: CanvasRenderingContext2D = null;
    var hitTestCtx: core.render.RenderContext = null;
    export class Surface implements core.ISurface {
        private $$layout = new core.draft.DraftPipeDef();

        private $$canvas: HTMLCanvasElement = null;
        private $$ctx: core.render.RenderContext = null;

        private $$layers: core.Updater[] = [];

        private $$downDirty: core.Updater[] = [];
        private $$upDirty: core.Updater[] = [];
        private $$dirtyRegion: Rect = null;

        private $$width: number = 0;
        private $$height: number = 0;
        //NOTE: If we resize the HTML5 canvas during resize, the canvas will go blank until render happens
        private $$sizechanged: boolean = false;

        get width (): number {
            return this.$$width;
        }

        get height (): number {
            return this.$$height;
        }

        init (canvas: HTMLCanvasElement) {
            this.$$canvas = canvas;
            this.$$ctx = new core.render.RenderContext(canvas.getContext('2d', {alpha: false}));
            this.$$width = canvas.offsetWidth;
            this.$$height = canvas.offsetHeight;
        }

        attachLayer (layer: core.Updater, root?: boolean) {
            if (root === true)
                this.$$layers.unshift(layer);
            else
                this.$$layers.push(layer);
            layer.tree.isTop = true;
            layer.invalidateMeasure();
            layer.fullInvalidate();
            layer.setSurface(this);
        }

        detachLayer (layer: core.Updater) {
            layer.tree.isTop = false;
            layer.setSurface(null);
            var index = this.$$layers.indexOf(layer);
            if (index > -1)
                this.$$layers.splice(index, 1);
            this.invalidate(layer.assets.surfaceBoundsWithChildren);
        }

        walkLayers (reverse?: boolean): IWalker<core.Updater> {
            var layers = this.$$layers;
            var i = -1;
            if (reverse === true) {
                i = layers.length;
                return {
                    current: undefined,
                    step: function (): boolean {
                        i--;
                        this.current = layers[i];
                        return this.current !== undefined;
                    }
                };
            } else {
                return {
                    current: undefined,
                    step: function (): boolean {
                        i++;
                        this.current = layers[i];
                        return this.current !== undefined;
                    }
                };
            }
        }

        updateBounds () {

        }

        invalidate (region?: Rect) {
            region = region || new Rect(0, 0, this.$$canvas.offsetWidth, this.$$canvas.offsetHeight);
            if (!this.$$dirtyRegion)
                this.$$dirtyRegion = new Rect(region.x, region.y, region.width, region.height);
            else
                Rect.union(this.$$dirtyRegion, region);
        }

        render () {
            var region = this.$$dirtyRegion;
            if (!region || Rect.isEmpty(region))
                return;
            this.$$dirtyRegion = null;
            Rect.roundOut(region);

            var ctx = this.$$ctx;
            if (this.$$sizechanged) {
                this.$$sizechanged = false;
                ctx.resize(this.$$width, this.$$height);
            } else {
            }
            ctx.raw.fillStyle = "#ffffff";
            ctx.raw.fillRect(region.x, region.y, region.width, region.height);

            ctx.save();
            ctx.clipRect(region);
            for (var layers = this.$$layers, i = 0, len = layers.length; i < len; i++) {
                layers[i].render(ctx, region);
            }
            ctx.restore();
        }

        addUpDirty (updater: core.Updater) {
            this.$$upDirty.push(updater);
        }

        addDownDirty (updater: core.Updater) {
            this.$$downDirty.push(updater);
        }

        updateLayout (): boolean {
            var pass: IPass = {
                count: 0,
                maxCount: 250,
                updater: null,
                assets: null,
                tree: null,
                flag: UIFlags.None,
                measureList: [],
                arrangeList: [],
                sizingList: [],
                surfaceSize: new Size(this.$$width, this.$$height),
                sizingUpdates: []
            };
            var updated = false;
            var layersUpdated = true;
            while (pass.count < pass.maxCount && layersUpdated) {
                layersUpdated = draft(this.$$layers, this.$$layout, pass);
                updated = process(this.$$downDirty, this.$$upDirty) || layersUpdated || updated;
            }

            if (pass.count >= pass.maxCount) {
                console.error("[MINERVA] Aborting infinite update loop");
            }

            return updated;
        }

        resize (width: number, height: number) {
            this.$$width = width;
            this.$$height = height;
            this.$$sizechanged = true;
            this.invalidate(new Rect(0, 0, width, height));
            for (var layers = this.$$layers, i = 0; i < layers.length; i++) {
                layers[i].invalidateMeasure();
            }
        }

        hitTest (pos: Point): core.Updater[] {
            if (this.$$layers.length < 1)
                return null;
            hitTestCtx = hitTestCtx || new core.render.RenderContext(document.createElement('canvas').getContext('2d'));
            hitTestCtx.resize(this.$$canvas.width, this.$$canvas.height);

            var list: core.Updater[] = [];
            for (var layers = this.$$layers, i = layers.length - 1; i >= 0 && list.length === 0; i--) {
                layers[i].hitTest(pos, list, hitTestCtx, false);
            }
            return list;
        }

        static measureWidth (text: string, font: Font): number {
            fontCtx = fontCtx || document.createElement('canvas').getContext('2d');
            fontCtx.font = font.toHtml5Object();
            return fontCtx.measureText(text).width;
        }
    }
}