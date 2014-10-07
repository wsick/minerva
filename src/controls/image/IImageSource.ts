module minerva.controls.image {
    export interface IImageSource {
        image: HTMLImageElement;
        pixelWidth: number;
        pixelHeight: number;
        lock();
        unlock();
    }
}