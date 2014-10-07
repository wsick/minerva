module minerva.controls.image.processup {
    export interface IInput extends core.processup.IInput {
    }
    export interface IState extends core.processup.IState {
    }

    export class ImageProcessUpPipeDef extends core.processup.ProcessUpPipeDef {
        constructor () {
            super();
            this.replaceTapin('calcActualSize', tapins.calcActualSize);
        }

        createState () {
            var state = <IState>super.createState();
            return state;
        }
    }
}