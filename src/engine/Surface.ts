module minerva.engine {
    export class Surface implements layout.ISurface {
        private $$canvas: HTMLCanvasElement = null;
        private $$ctx: layout.render.RenderContext = null;

        private $$layers: layout.Updater[] = [];

        private $$downDirty: layout.Updater[] = [];
        private $$upDirty: layout.Updater[] = [];
        private $$dirtyRegion: Rect = null;

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

        addUpDirty (updater: layout.Updater) {
            this.$$upDirty.push(updater);
        }

        addDownDirty (updater: layout.Updater) {
            this.$$downDirty.push(updater);
        }

        private $$processDown () {
            //Down --> RenderVisibility, HitTestVisibility, Transformation, Clip, ChildrenZIndices
            var list = this.$$downDirty;
            for (var updater = list[0]; updater != null;) {
                if (updater.processDown()) {
                    list.shift();
                } else {
                    list.push(list.shift());
                }
            }
            if (list.length > 0) {
                console.warn("[MINERVA] Finished DownDirty pass, not empty.");
            }
        }

        private $$processUp () {
            //Up --> Bounds, Invalidation
            var list = this.$$upDirty;
            for (var updater = list[0]; updater != null;) {
                var childIndex = updater.findChildInList(list);
                if (childIndex > -1) {
                    // OPTIMIZATION: Parent is overzealous, children will invalidate him
                    list.splice(childIndex + 1, 0, list.shift());
                } else if (updater.processUp()) {
                    list.shift();
                }
            }
            if (list.length > 0) {
                console.warn("Finished UpDirty pass, not empty.");
            }
        }
    }
}