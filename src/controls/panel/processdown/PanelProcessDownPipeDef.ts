module minerva.controls.panel.processdown {
    export interface IInput extends core.processdown.IInput {
    }
    export interface IState extends core.processdown.IState {
    }
    export interface IOutput extends core.processdown.IOutput {
    }

    export class PanelProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor () {
            super();
            this.replaceTapin('processZIndices', processZIndices);
        }
    }

    function processZIndices (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean {
        //TODO: Implement z sorting
        return true;
    }

    /*
     function zIndexComparer(upd1: core.Updater, upd2: core.Updater) {
     var zi1 = Panel.GetZIndex(uin1.XObject);
     var zi2 = Panel.GetZIndex(uin2.XObject);
     if (zi1 === zi2) {
     var z1 = Panel.GetZ(uin1.XObject);
     var z2 = Panel.GetZ(uin2.XObject);
     if (isNaN(z1) || isNaN(z2))
     return 0;
     return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
     }
     return zi1 - zi2;
     }
     */
}