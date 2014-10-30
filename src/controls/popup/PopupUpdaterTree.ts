/// <reference path="../../core/UpdaterTree" />

module minerva.controls.popup {
    export class PopupUpdaterTree extends core.UpdaterTree {
        child: core.Updater = undefined;
        visualChild: core.Updater = undefined;
        initiatorSurface: core.ISurface = undefined;

        walk (direction?: WalkDirection): IWalker<core.Updater> {
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
}