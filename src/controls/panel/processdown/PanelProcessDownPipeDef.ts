module minerva.controls.panel.processdown {
    export class PanelProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor() {
            super();
            this.replaceTapin('processZIndices', processZIndices);
        }
    }

    function processZIndices(input: core.processdown.IInput, state: core.processdown.IState, output: core.processdown.IOutput, vpinput: core.processdown.IInput): boolean {
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