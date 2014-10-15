module minerva.controls.grid {
    export interface IColumnDefinition {
        Width: IGridLength;
        MaxWidth: number;
        MinWidth: number;
        ActualWidth: number;
        actualWidth: number;
    }
}