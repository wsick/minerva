module minerva.core {
    export interface IUpdaterTree {
        isTop: boolean;
        surface: ISurface;
        visualParent: Updater;
        isContainer: boolean;
        isLayoutContainer: boolean;
        walk(direction?: WalkDirection): IWalker<Updater>;
        onChildAttached(child: Updater);
        onChildDetached(child: Updater);
    }
    export class UpdaterTree implements IUpdaterTree {
        isTop = false;
        surface = null;
        visualParent = null;
        isContainer = false;
        isLayoutContainer = false;
        subtree = null;

        walk(direction?: WalkDirection): IWalker<Updater> {
            var visited = false;
            var _this = this;
            return {
                current: undefined,
                step: function (): boolean {
                    if (visited)
                        return false;
                    visited = true;
                    this.current = _this.subtree;
                    return this.current != null;
                }
            };
        }

        onChildAttached(child: core.Updater) {
            this.subtree = child;
        }

        onChildDetached(child: core.Updater) {
            this.subtree = null;
        }
    }
}