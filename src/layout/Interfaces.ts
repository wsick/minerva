module minerva.layout {
    export interface IMeasurePipe extends IPipe<def.measure.IInput, def.measure.IState, def.measure.IOutput> {
    }
    export interface IArrangePipe extends IPipe<def.arrange.IInput, def.arrange.IState, def.arrange.IOutput> {
    }
    export interface ISizingPipe extends IPipe<def.sizing.IInput, def.sizing.IState, def.sizing.IOutput> {
    }
    export interface IProcessDownPipe extends IPipe<def.processdown.IInput, def.processdown.IState, def.processdown.IOutput> {
    }
    export interface IProcessUpPipe extends IPipe<def.processup.IInput, def.processup.IState, def.processup.IOutput> {
    }
    export interface IRenderPipe extends IPipe<def.render.IInput, def.render.IState, def.render.IOutput> {
    }

    export interface IVisualOwner extends def.processup.IProcessVisualOwner {
    }
    export interface ISurface extends IVisualOwner {
        addUpDirty (updater: layout.Updater);
        addDownDirty (updater: layout.Updater);
    }

    export interface IUpdaterAssets extends def.measure.IInput, def.arrange.IInput, def.sizing.IInput, def.processdown.IInput, def.processup.IInput, def.render.IInput {
    }
}