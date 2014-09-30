module minerva.engine {
    export interface IPass extends core.draft.IDraftPipeData {
        count: number;
        maxCount: number;
    }

    export class Surface implements core.ISurface {
        private $$layout = new core.draft.DraftPipeDef();

        private $$canvas: HTMLCanvasElement = null;
        private $$ctx: core.render.RenderContext = null;

        private $$layers: core.Updater[] = [];

        private $$downDirty: core.Updater[] = [];
        private $$upDirty: core.Updater[] = [];
        private $$dirtyRegion: Rect = null;

        get width (): number {
            return this.$$canvas.offsetWidth;
        }

        get height (): number {
            return this.$$canvas.offsetHeight;
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
            ctx.raw.clearRect(region.x, region.y, region.width, region.height);
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
                surfaceSize: new Size(this.$$canvas.offsetWidth, this.$$canvas.offsetHeight),
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
    }
}