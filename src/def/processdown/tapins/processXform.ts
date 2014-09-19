module minerva.def.processdown.tapins {
    import DirtyFlags = layout.DirtyFlags;
    export var processXform: IProcessDownTapin = function (input: IInput, state: IState, output: IOutput, vpinput: IInput, vpoutput: IOutput): boolean {
        if (output.dirtyFlags & DirtyFlags.Transform === 0)
            return true;
        output.dirtyFlags &= ~DirtyFlags.Transform;

        //computeTransform();

        if (vpoutput)
            vpoutput.dirtyFlags |= DirtyFlags.Bounds;

        return true;
    };

    /*
    function computeTransform() {
        var projection = uie.Projection;

        var oldProjection = mat4.clone(this.LocalProjection);
        var old = mat3.clone(this.AbsoluteXform);

        mat4.identity(this.LocalProjection);
        if (vplu) {
            mat3.set(vplu.AbsoluteXform, this.AbsoluteXform);
            mat4.set(vplu.AbsoluteProjection, this.AbsoluteProjection);
            this.TotalRenderProjection = vplu.TotalRenderProjection;
        } else {
            mat3.identity(this.AbsoluteXform);
            mat4.identity(this.AbsoluteProjection);
            this.TotalRenderProjection = false;
        }
        var carrierProjection = this.CarrierProjection;
        var carrierXform = this.CarrierXform;
        if (carrierProjection)
            mat4.set(carrierProjection, this.LocalProjection);

        var renderXform: number[] = this.RenderXform;
        if (carrierXform)
            mat3.set(carrierXform, renderXform);
        else
            mat3.identity(renderXform);

        mat3.multiply(renderXform, this.LayoutXform, renderXform); //render = layout * render
        mat3.multiply(renderXform, this.LocalXform, renderXform); //render = local * render

        var m = mat3.toAffineMat4(renderXform);
        mat4.multiply(this.LocalProjection, m, this.LocalProjection); //local = m * local

        if (false) {
            //TODO: Render To Intermediate not implemented
        } else {
            mat3.multiply(this.RenderXform, this.AbsoluteXform, this.AbsoluteXform); //abs = abs * render
        }

        if (projection) {
            m = projection.GetTransform();
            mat4.multiply(m, this.LocalProjection, this.LocalProjection); //local = local * m
            this.TotalRenderProjection = true;
        }

        mat4.multiply(this.LocalProjection, this.AbsoluteProjection, this.AbsoluteProjection); //abs = abs * local

        if (uin instanceof Controls.Primitives.PopupNode) {
            var popupChildNode = <UINode>(<Controls.Primitives.PopupNode>uin).SubtreeNode;
            if (popupChildNode)
                popupChildNode.LayoutUpdater.UpdateTransform();
        }
        if (!mat4.equal(oldProjection, this.LocalProjection)) {
            if (vplu)
                vplu.Invalidate(this.SurfaceBoundsWithChildren);
            else if (uin.IsTopLevel)
                this.InvalidateSubtreePaint();

            if (uin.IsAttached)
                this._AddDirtyElement(_Dirty.NewBounds);
        }

        // render = local
        mat4.set(this.LocalProjection, this.RenderProjection);

        //TODO: We can optimize to shift bounds rather than going through an UpdateBounds invalidation
        this.UpdateBounds();

        this.ComputeComposite();

        this.PostComputeTransform(!!projection);
    }
    */
}