* UpdateLayer
    * Measure
        * Prepare measureSize from availableSize
        * Measure self+children
        * Set validated/cleaned response as DesiredSize
    * Arrange
        * Prepare finalSize from finalRect
        * Arrange self+children
        * Framework coercion
        * Build RenderSize, VisualOffset, LayoutXform, LayoutClip
    * Size
        * Update Actual Size
        * Notify SizeChanged for any changed after entire pass done
* ProcessDown
    * RenderVisibility
    * HitTestVisibility
    * Transformation
    * Clip 
    * ChildrenZIndices
* ProcessUp
    * Bounds
    * Invalidation
* Render
    * Validate Visibility, Opacity
    * Intersect incoming rect with Self+Child Bounds
    * Validate rect is not empty
    * Apply Clip
    * PreRender Effect
    * Do Render
    * PostRender Effect
    * Render Children