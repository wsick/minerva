module minerva.controls.video {
    export interface IVideoSource {
        video: HTMLVideoElement;
        pixelWidth: number;
        pixelHeight: number;
        lock();
        unlock();
    }
}