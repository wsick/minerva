/// <reference path="../../core/UpdaterTree" />

module minerva.controls.border {
    export class BorderTree extends core.UpdaterTree {
        isLayoutContainer = true;
        isContainer = true;
        child: core.Updater = undefined;

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