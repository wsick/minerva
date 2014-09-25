/// <reference path="../../layout/measure/MeasurePipeDef" />

module minerva.controls.border.measure {
    export class MeasurePipeDef extends layout.measure.MeasurePipeDef {
        constructor () {
            super();
            this.addTapinBefore('doOverride', 'preOverride', preOverride)
                .replaceTapin('doOverride', doOverride)
                .addTapinAfter('doOverride', 'postOverride', postOverride);
        }

        createState (): IState {
            var state = <IState>super.createState();
            state.totalBorder = new Thickness();
            return state;
        }

        static instance = new MeasurePipeDef();
    }

    export interface IInput extends layout.measure.IInput {
        padding: Thickness;
        borderThickness: Thickness;
        childUpdater: Updater;
    }
    export interface IState extends layout.measure.IState {
        totalBorder: Thickness;
    }

    export function preOverride (input: IInput, state: IState, output: layout.measure.IOutput, availableSize: Size): boolean {
        var tb = state.totalBorder;
        Thickness.copyTo(input.padding, tb);
        Thickness.add(tb, input.borderThickness);
        Thickness.shrinkSize(tb, state.availableSize);
        return true;
    }

    export function doOverride (input: IInput, state: IState, output: layout.measure.IOutput, availableSize: Size): boolean {
        var childu = input.childUpdater;
        var ds = output.desiredSize;
        if (childu) {
            childu.measure(state.availableSize);
            Size.copyTo(childu.assets.desiredSize, ds);
        }
        return true;
    }

    export function postOverride (input: IInput, state: IState, output: layout.measure.IOutput, availableSize: Size): boolean {
        Thickness.growSize(state.totalBorder, output.desiredSize);
        Size.min(output.desiredSize, state.availableSize);
        return true;
    }
}