module minerva.controls.virtualizingpanel {
    export interface IVirtualizingContainerOwner {
        itemCount: number;
        createGenerator(): IVirtualizingGenerator;
        remove(index: number, count: number);
    }
}