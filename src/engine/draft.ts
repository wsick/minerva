module minerva.engine {
    export function draft (layers: layout.Updater[], draftPipe: layout.draft.DraftPipeDef, pass: IPass): boolean {
        var updated = false;
        for (var i = 0, len = layers.length; i < len; i++) {
            pass.updater = layers[i];
            if ((pass.updater.assets.uiFlags & UIFlags.Hints) === 0)
                continue;
            pass.tree = pass.updater.tree;
            pass.assets = pass.updater.assets;
            while (pass.count < pass.maxCount) {
                if (draftPipe.run(pass))
                    updated = true;
                pass.count++;
            }
        }
        return updated;
    }
}