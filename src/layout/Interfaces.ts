module minerva.layout {
    export interface IMeasurePipe extends pipe.IPipe<measure.IInput, measure.IState, measure.IOutput> {
    }
    export interface IArrangePipe extends pipe.IPipe<arrange.IInput, arrange.IState, arrange.IOutput> {
    }
    export interface ISizingPipe extends pipe.IPipe<sizing.IInput, sizing.IState, sizing.IOutput> {
    }
    export interface IProcessDownPipe extends pipe.IPipe<processdown.IInput, processdown.IState, processdown.IOutput> {
    }
    export interface IProcessUpPipe extends pipe.IPipe<processup.IInput, processup.IState, processup.IOutput> {
    }
    export interface IRenderPipe extends pipe.IPipe<render.IInput, render.IState, render.IOutput> {
    }

    export interface IVisualOwner extends processup.IProcessVisualOwner {
    }
    export interface ISurface extends IVisualOwner {
        addUpDirty (updater: layout.Updater);
        addDownDirty (updater: layout.Updater);
    }

    export interface IUpdaterAssets extends measure.IInput, arrange.IInput, sizing.IInput, processdown.IInput, processup.IInput, render.IInput {
    }
}