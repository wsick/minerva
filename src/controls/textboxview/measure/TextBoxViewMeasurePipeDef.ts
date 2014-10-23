module minerva.controls.textboxview.measure {
    export interface IInput extends core.measure.IInput, text.IDocumentContext {
    }

    export class TextBoxViewMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor () {
            super();
            this.replaceTapin('doOverride', tapins.doOverride);
        }
    }

    export module tapins {
        export function doOverride (input: IInput, state: core.measure.IState, output: core.measure.IOutput, tree: TextBoxViewUpdaterTree, availableSize: Size): boolean {
            var ds = output.desiredSize;
            var as = state.availableSize;
            Size.copyTo(tree.layout(as, input), ds);
            if (!isFinite(as.width))
                ds.width = Math.max(ds.width, 11);
            ds.width = Math.min(ds.width, as.width);
            ds.height = Math.min(ds.height, as.height);
            return true;
        }
    }
}