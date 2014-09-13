module minerva.def.arrange {
    export interface IArrangeTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, finalRect: Rect):boolean;
    }
    export interface IAssets extends IPipeAssets {
        hiddenDesire: Size;
    }
    export interface IState extends IPipeState {
    }
    export interface IOutput extends IPipeOutput {
    }

    export class ArrangePipe extends Pipe<IArrangeTapin, IAssets, IState, IOutput> {
        constructor () {
            super();

        }

        createState (): IState {
            return {
            };
        }

        createOutput (): IOutput {
            return {
            };
        }
    }
}