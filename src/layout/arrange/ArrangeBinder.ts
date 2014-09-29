module minerva.layout.arrange {
    export interface IArrangeBinder {
        bind (updater: Updater): boolean;
    }
    export class ArrangeBinder implements IArrangeBinder {
        bind (updater: Updater): boolean {
            var assets = updater.assets;
            var tree = updater.tree;
            var last = assets.layoutSlot || undefined;
            if (!tree.visualParent) {
                last = new Rect();
                this.expandViewport(last, assets, tree);
                this.shiftViewport(last, assets, tree);
            }

            if (last) {
                return updater.arrange(last);
            } else if (tree.visualParent) {
                tree.visualParent.invalidateArrange();
            }
            return false;
        }

        expandViewport (viewport: Rect, assets: IUpdaterAssets, tree: IUpdaterTree) {
            if (tree.isLayoutContainer) {
                Size.copyTo(assets.desiredSize, viewport);
                if (tree.surface) {
                    var measure = assets.previousConstraint;
                    if (measure) {
                        viewport.width = Math.max(viewport.width, measure.width);
                        viewport.height = Math.max(viewport.height, measure.height);
                    } else {
                        viewport.width = tree.surface.width;
                        viewport.height = tree.surface.height;
                    }
                }
            } else {
                viewport.width = assets.actualWidth;
                viewport.height = assets.actualHeight;
            }
        }

        shiftViewport (viewport: Rect, assets: IUpdaterAssets, tree: IUpdaterTree) {
            //TODO: Implement
            //viewport.x = Controls.Canvas.GetLeft(fe);
            //viewport.y = Controls.Canvas.GetTop(fe);
        }
    }
}