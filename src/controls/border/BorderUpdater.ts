/// <reference path="../../core/UpdaterTree" />
/// <reference path="../../core/Updater" />

module minerva.controls.border {
    export interface IBorderUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput {
    }

    export class BorderTree extends core.UpdaterTree {
        isLayoutContainer = true;
        isContainer = true;
        child: core.Updater = undefined;

        walk(direction?: WalkDirection): IWalker<core.Updater> {
            var visited = false;
            var _this = this;
            return {
                current: undefined,
                step: function (): boolean {
                    this.current = !visited ? _this.child : undefined;
                    visited = true;
                    return this.current !== undefined;
                }
            }
        }
    }

    export class BorderUpdater extends core.Updater {
        tree: BorderTree;
        assets: IBorderUpdaterAssets;

        init() {
            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();
            this.setTree(new BorderTree())
                .setMeasurePipe(singleton(border.measure.BorderMeasurePipeDef))
                .setArrangePipe(singleton(border.arrange.BorderArrangePipeDef))
                .setRenderPipe(singleton(core.render.RenderContext.hasFillRule ? border.render.BorderRenderPipeDef : border.render.ShimBorderRenderPipeDef));
            super.init();
        }
    }
}