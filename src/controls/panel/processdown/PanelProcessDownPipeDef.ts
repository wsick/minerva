module minerva.controls.panel.processdown {
    export interface IInput extends core.processdown.IInput {
        zSorted: core.Updater[];
    }
    export interface IState extends core.processdown.IState {
    }
    export interface IOutput extends core.processdown.IOutput {
        zSorted: core.Updater[];
    }

    export class PanelProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor () {
            super();
            this.replaceTapin('processZIndices', tapins.processZIndices);
        }

        createOutput (): IOutput {
            var output = <IOutput>super.createOutput();
            output.zSorted = [];
            return output;
        }

        prepare (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.prepare(input, state, output, vpinput, tree);
            if ((input.dirtyFlags & DirtyFlags.ChildrenZIndices) > 0) {
                output.zSorted = [];
            }
        }

        flush (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree) {
            super.flush(input, state, output, vpinput, tree);
            input.zSorted = output.zSorted;
        }
    }
}