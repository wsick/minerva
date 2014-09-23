module minerva.engine {
    export function process (down: layout.Updater[], up: layout.Updater[]): boolean {
        var updated = down.length > 0 || up.length > 0;
        processDown(down);
        processUp(up);
        return updated;
    }

    //Down --> RenderVisibility, HitTestVisibility, Transformation, Clip, ChildrenZIndices
    function processDown (list: layout.Updater[]) {
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

    //Up --> Bounds, Invalidation
    function processUp (list: layout.Updater[]) {
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
            console.warn("[MINERVA] Finished UpDirty pass, not empty.");
        }
    }
}