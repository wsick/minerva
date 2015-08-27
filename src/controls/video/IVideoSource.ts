module minerva.controls.video {
    export interface IVideoSource {
        video: HTMLVideoElement;
        pixelWidth: number;
        pixelHeight: number;
        getIsPlaying(): boolean;
        lock();
        unlock();
    }
}