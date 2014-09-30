module minerva.core {
    export interface IUpdaterTree {
        isTop: boolean;
        surface: ISurface;
        visualParent: Updater;
        isContainer: boolean;
        isLayoutContainer: boolean;
        walk(direction?: WalkDirection): IWalker<Updater>;
    }
    export class UpdaterTree implements IUpdaterTree {
        isTop = false;
        surface = null;
        visualParent = null;
        isContainer = false;
        isLayoutContainer = false;

        walk (direction?: WalkDirection): IWalker<Updater> {
            return {
                current: undefined,
                step: function (): boolean {
                    return false;
                }
            };
        }
    }
}