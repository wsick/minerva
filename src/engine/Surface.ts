module minerva.engine {
    export class Surface implements layout.ISurface {
        private $$downDirty: layout.Updater[] = [];
        private $$upDirty: layout.Updater[] = [];

        updateBounds() {

        }

        invalidate(region: Rect) {

        }

        private $$processDown() {
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

        private $$processUp() {
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