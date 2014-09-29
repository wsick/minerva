module minerva.layout {
    export interface IMeasurePipe extends pipe.ITriPipe<measure.IInput, measure.IState, measure.IOutput> {
    }
    export interface IArrangePipe extends pipe.ITriPipe<arrange.IInput, arrange.IState, arrange.IOutput> {
    }
    export interface ISizingPipe extends pipe.ITriPipe<sizing.IInput, sizing.IState, sizing.IOutput> {
    }
    export interface IProcessDownPipe extends pipe.ITriPipe<processdown.IInput, processdown.IState, processdown.IOutput> {
    }
    export interface IProcessUpPipe extends pipe.ITriPipe<processup.IInput, processup.IState, processup.IOutput> {
    }
    export interface IRenderPipe extends pipe.ITriPipe<render.IInput, render.IState, render.IOutput> {
    }

    export interface IVisualOwner extends processup.IProcessVisualOwner {
    }
    export interface ISurface extends IVisualOwner {
        width: number;
        height: number;
        addUpDirty (updater: layout.Updater);
        addDownDirty (updater: layout.Updater);
    }

    export interface IUpdaterAssets extends measure.IInput, arrange.IInput, sizing.IInput, processdown.IInput, processup.IInput, render.IInput {
    }
}