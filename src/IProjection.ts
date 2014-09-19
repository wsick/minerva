module minerva {
    export interface IProjection {
        getDistanceFromXYPlane(objectWidth: number, objectHeight: number): number;
        getTransform(): number[];
    }
}