module minerva.controls.popup {
    export interface IPopupUpdaterAssets extends core.IUpdaterAssets, processdown.IInput {
        isVisible: boolean;
        isOpen: boolean;
    }

    export class PopupUpdater extends core.Updater {
        assets: IPopupUpdaterAssets;
        tree: PopupUpdaterTree;

        init () {
            this.setTree(new PopupUpdaterTree())
                .setProcessDownPipe(singleton(processdown.PopupProcessDownPipeDef))
                .setProcessUpPipe(singleton(processup.PopupProcessUpPipeDef));

            var assets = this.assets;
            assets.horizontalOffset = 0;
            assets.verticalOffset = 0;
            assets.isVisible = false;
            assets.isOpen = false;

            super.init();
        }

        setChild(child: core.Updater) {
            var old = this.tree.child;
            if (old) {
                this.hide();
                old.assets.carrierProjection = null;
                old.assets.carrierXform = null;
            }

            this.tree.child = child;
            if (child) {
                child.assets.carrierXform = mat3.identity();
                if (this.assets.isOpen)
                    this.show();
            }
        }

        hide (): boolean {
            var vchild = this.tree.visualChild;
            if (!this.assets.isVisible || !vchild)
                return false;
            this.assets.isVisible = false;
            //TODO: Use for hit testing
            //this.LayoutUpdater.ShouldSkipHitTest = true;
            var surface = this.tree.surface;
            if (!surface)
                return false;
            surface.detachLayer(vchild);
            return true;
        }

        show (): boolean {
            var vchild = this.tree.visualChild;
            if (this.assets.isVisible || !vchild)
                return false;
            this.assets.isVisible = true;
            //TODO: Use for hit testing
            //this.LayoutUpdater.ShouldSkipHitTest = false;
            var surface = this.tree.surface;
            if (!surface)
                return false;
            surface.attachLayer(vchild);
            return true;
        }
    }

    export module reactTo {
        export function isOpen (updater: PopupUpdater, oldValue: boolean, newValue: boolean) {
            (newValue === true) ? updater.show() : updater.hide();
        }

        export function horizontalOffset (updater: PopupUpdater, oldValue: number, newValue: number) {
            var tree = updater.tree;
            var child = tree.child;
            if (!child)
                return;
            var tweenX = newValue - updater.assets.horizontalOffset;
            if (tweenX === 0)
                return;
            tweenOffset(child, tweenX, 0);
            if (tree.visualChild)
                tree.visualChild.invalidateMeasure();
        }

        export function verticalOffset (updater: PopupUpdater, oldValue: number, newValue: number) {
            var tree = updater.tree;
            var child = tree.child;
            if (!child)
                return;
            var tweenY = newValue - updater.assets.verticalOffset;
            if (tweenY === 0)
                return;
            tweenOffset(child, 0, tweenY);
            if (tree.visualChild)
                tree.visualChild.invalidateMeasure();
        }

        function tweenOffset (child: core.Updater, tweenX: number, tweenY: number) {
            var proj = child.assets.carrierProjection;
            if (proj) {
                var transl = mat4.createTranslate(tweenX, tweenY, 0.0);
                mat4.multiply(transl, proj, proj);
            } else if (child.assets.carrierXform) {
                mat3.translate(child.assets.carrierXform, tweenX, tweenY);
            }
        }
    }
}