module minerva.layout.arrange {
    export interface IArrangeBinder {
        bind (updater: Updater, surface: ISurface, visualParent: Updater): boolean;
    }
    export class ArrangeBinder implements IArrangeBinder {
        bind (updater: Updater, surface: ISurface, visualParent: Updater): boolean {
            var last = updater.assets.layoutSlot || undefined;
            if (!visualParent) {
                last = new Rect();
                this.expandViewport(last, updater, surface);
                this.shiftViewport(last, updater, surface);
            }

            if (last) {
                return updater.arrange(last);
            } else if (visualParent) {
                visualParent.invalidateArrange();
            }
            return false;
        }

        expandViewport (viewport: Rect, updater: Updater, surface: ISurface) {
            var assets = updater.assets;
            if (assets.isLayoutContainer) {
                Size.copyTo(assets.desiredSize, viewport);
                if (surface) {
                    var measure = assets.previousConstraint;
                    if (measure) {
                        viewport.width = Math.max(viewport.width, measure.width);
                        viewport.height = Math.max(viewport.height, measure.height);
                    } else {
                        viewport.width = surface.width;
                        viewport.height = surface.height;
                    }
                }
            } else {
                viewport.width = assets.actualWidth;
                viewport.height = assets.actualHeight;
            }
        }

        shiftViewport (viewport: Rect, updater: Updater, surface: ISurface) {
            //TODO: Implement
            //viewport.x = Controls.Canvas.GetLeft(fe);
            //viewport.y = Controls.Canvas.GetTop(fe);
        }
    }
}