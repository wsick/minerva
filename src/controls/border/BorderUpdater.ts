/// <reference path="../../layout/Updater" />

module minerva.controls.border {
    export interface IBorderUpdaterAssets extends layout.IUpdaterAssets, measure.IInput, arrange.IInput {
    }

    export class BorderTree extends layout.UpdaterTree {
        isLayoutContainer = true;
        isContainer = true;
        child: layout.Updater = undefined;

        walk (direction?: WalkDirection): IWalker<layout.Updater> {
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

    export class BorderUpdater extends layout.Updater {
        tree: BorderTree;
        assets: IBorderUpdaterAssets;

        constructor () {
            super();
            this.setTree(new BorderTree())
                .setProcessDownPipe()
                .setProcessUpPipe()
                .setMeasurePipe(singleton(border.measure.MeasurePipeDef))
                .setArrangePipe(singleton(border.arrange.ArrangePipeDef))
                .setRenderPipe(singleton(layout.render.RenderContext.hasFillRule ? border.render.RenderPipeDef : border.render.ShimRenderPipeDef));

            var assets = this.assets;
            assets.padding = new Thickness();
            assets.borderThickness = new Thickness();
        }
    }
}