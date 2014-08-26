* Use `PreviousConstraint` as `availableSize` to initiate start of measure traversal
* Fall back to infinite size for `availableSize` if root layout container is not attached and no `PreviousConstraint`
* Doit
    - Validate `availableSize` isn't NaN
    - If `Collapsed`: set `PreviousConstraint` to `availableSize`, clear `DesiredSize`, skip out
    - Memoized `ApplyTemplate`
    - If had dirty measure flag and `PreviousConstraint` equals `null` or `availableSize`: skip out 
    - Save `availableSize` to `PreviousConstraint`
    - Invalidate Arrange
    - Update Bounds
    - Shrink available by `Margin`
    - Coerce `availableSize` (`Width`, `MinWidth`, `MaxWidth`, `Height`, `MinHeight`, `MaxHeight`, `UseLayoutRounding`)
    - `MeasureOverride` (`response`)
    - Save `response` as `HiddenDesire`
    - Clear dirty flags
    - If root or parent is `Canvas` and is `Canvas`: clear `DesiredSize`, skip out
    - Coerce `response`
    - Grow by `Margin`
    - Set `response` to min of `response` and `availableSize`
    - Round if `UseLayoutRounding`
    - Set `DesiredSize` to `response`
* Invalidates visual parent's measure if `DesiredSize` changed
