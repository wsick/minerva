module minerva.controls.popup.processdown.tapins {
    export var postProcessXform = function (input: IInput, state: core.processdown.IState, output: core.processdown.IOutput, vpinput: core.processdown.IInput, tree: PopupUpdaterTree): boolean {
        if ((input.dirtyFlags & DirtyFlags.Transform) === 0)
            return true;

        var child = tree.child;
        if (!child)
            return true;

        if (output.totalHasRenderProjection) {
            child.assets.carrierXform = null;
            child.assets.dirtyFlags |= DirtyFlags.LocalProjection;

            var carrier = child.assets.carrierProjection;
            if (!carrier)
                carrier = child.assets.carrierProjection || mat4.create();
            mat4.set(output.absoluteProjection, carrier);
            var transl = mat4.createTranslate(input.horizontalOffset, input.verticalOffset, 0.0);
            mat4.multiply(transl, carrier, carrier); //carrier = carrier * transl

        } else {
            child.assets.carrierProjection = null;
            child.assets.dirtyFlags |= DirtyFlags.LocalTransform;

            var carrier = child.assets.carrierXform;
            if (!carrier)
                carrier = child.assets.carrierXform || mat3.create();
            mat3.set(output.absoluteXform, carrier);
            mat3.translate(carrier, input.horizontalOffset, input.verticalOffset);
        }
        core.Updater.$$addDownDirty(child);

        return true;
    };
}