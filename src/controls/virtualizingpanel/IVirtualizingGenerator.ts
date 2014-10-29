module minerva.controls.virtualizingpanel {
    export interface IVirtualizingGenerator {
        current: core.Updater;
        generate(): boolean;
    }
}