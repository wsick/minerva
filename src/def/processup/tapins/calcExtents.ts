module minerva.def.processup.tapins {
    export var calcExtents: IProcessUpTapin = function (input: IInput, state: IState, output: IOutput, vo: IVisualOwner): boolean {
        if ((input.dirtyFlags & DirtyFlags.Bounds) === 0)
            return true;

        var e = output.extents;
        var ewc = output.extentsWithChildren;
        e.x = ewc.x = 0;
        e.y = ewc.y = 0;
        var as = state.actualSize;
        e.width = ewc.width = as.width;
        e.height = ewc.height = as.height;

        /*
         var node = this.Node;
         var enumerator = node.GetVisualTreeEnumerator();
         while (enumerator.moveNext()) {
         var item = <UINode>enumerator.current;
         var itemlu = item.LayoutUpdater;
         if (itemlu.TotalIsRenderVisible)
         rect.union(ewc, itemlu.GlobalBoundsWithChildren);
         }
         */

        return true;
    };
}