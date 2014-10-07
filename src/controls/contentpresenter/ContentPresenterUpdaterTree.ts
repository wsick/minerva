module minerva.controls.contentpresenter {
    export class ContentPresenterUpdaterTree extends core.UpdaterTree {
        content: core.Updater = null;
        templateOwner: core.Updater = null;
    }
}