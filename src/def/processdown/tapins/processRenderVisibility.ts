module minerva.def.processdown.tapins {
    export var processRenderVisibility: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if ((output.dirtyFlags & layout.DirtyFlags.RenderVisibility) === 0)
            return true;
        output.dirtyFlags &= ~layout.DirtyFlags.RenderVisibility;

        //Update bounds
        output.dirtyFlags |= layout.DirtyFlags.Bounds;
        if (vpoutput)
            vpoutput.dirtyFlags |= layout.DirtyFlags.Bounds;

        //Calculate
        if (vpinput) {
            output.totalOpacity = vpinput.totalOpacity * input.opacity;
            output.totalIsRenderVisible = (vpinput.visibility === Visibility.Visible) && (input.visibility === Visibility.Visible);
        } else {
            output.totalOpacity = input.opacity;
            output.totalIsRenderVisible = input.visibility === Visibility.Visible;
        }

        /*
         if (!output.totalIsRenderVisible)
         this._CacheInvalidateHint();
         */

        //Update new bounds
        if (input.totalIsRenderVisible !== output.totalIsRenderVisible)
            output.dirtyFlags |= layout.DirtyFlags.NewBounds;

        return true;
    };
}