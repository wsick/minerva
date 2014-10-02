module minerva.controls.panel.processdown.tapins {
    export function processZIndices (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.ChildrenZIndices) === 0)
            return true;
        var zs = output.zSorted;
        for (var walker = tree.walk(); walker.step();) {
            zs.push(walker.current);
        }
        zs.sort(zIndexComparer);
        return true;
    }

    function zIndexComparer (upd1: core.Updater, upd2: core.Updater) {
        var zi1 = upd1.getAttachedValue("Panel.ZIndex");
        var zi2 = upd2.getAttachedValue("Panel.ZIndex");
        if (zi1 === zi2) {
            var z1 = upd1.getAttachedValue("Panel.Z");
            var z2 = upd2.getAttachedValue("Panel.Z");
            if (isNaN(z1) || isNaN(z2))
                return 0;
            return z1 > z2 ? 1 : (z1 < z2 ? -1 : 0);
        }
        return zi1 - zi2;
    }
}