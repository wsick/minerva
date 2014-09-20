module minerva.layout {
    export interface IMeasurePipe extends IPipe<def.measure.IInput, def.measure.IState, def.measure.IOutput> {
    }
    export interface IArrangePipe extends IPipe<def.arrange.IInput, def.arrange.IState, def.arrange.IOutput> {
    }
    export interface ISizePipe extends IPipe<def.size.IInput, def.size.IState, def.size.IOutput> {
    }
    export interface IProcessDownPipe extends IPipe<def.processdown.IInput, def.processdown.IState, def.processdown.IOutput> {
    }
    export interface IProcessUpPipe extends IPipe<def.processup.IInput, def.processup.IState, def.processup.IOutput> {
    }
    export interface IRenderPipe extends IPipe<def.render.IInput, def.render.IState, def.render.IOutput> {
    }

    export interface IVisualOwner extends def.processup.IProcessVisualOwner {
    }

    export interface IUpdaterAssets extends def.measure.IInput, def.arrange.IInput, def.size.IInput, def.processdown.IInput, def.processup.IInput, def.render.IInput {
    }
}