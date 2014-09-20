module minerva.def.size {
    export interface ISizeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput):boolean;
    }
    export interface IInput extends IPipeInput, helpers.ISized {
        visibility: Visibility;
        renderSize: Size;
        actualWidth: number;
        actualHeight: number;
    }
    export interface IState extends IPipeState {
        useRender: boolean;
    }
    export interface IOutput extends IPipeOutput {
        actualSize: Size;
    }

    export class SizePipeDef extends PipeDef<ISizeTapin, IInput, IState, IOutput> {
        constructor () {
            super();
            this.addTapin('calcUseRender', tapins.calcUseRender)
                .addTapin('computeActual', tapins.computeActual);
        }

        createState (): IState {
            return {
                useRender: false
            };
        }

        createOutput (): IOutput {
            return {
                actualSize: new Size()
            };
        }

        prepare (input: IInput, state: IState, output: IOutput) {
        }

        flush (input: IInput, state: IState, output: IOutput) {
            var as = output.actualSize;
            input.actualWidth = as.width;
            input.actualHeight = as.height;
        }
    }
}