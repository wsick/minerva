module minerva.engine {
    export function updateLayers (layers: layout.Updater[], layoutPipe: layout.draft.LayoutPipeDef, pass: IPass): boolean {
        var updated = false;
        for (var i = 0, len = layers.length; i < len; i++) {
            var layer = layers[i];
            if ((layer.assets.uiFlags & UIFlags.Hints) === 0)
                continue;
            while (pass.count < pass.maxCount) {
                if (layoutPipe.run(pass))
                    updated = true;
                pass.count++;
            }
        }
        return updated;
    }
}