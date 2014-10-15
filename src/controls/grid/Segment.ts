module minerva.controls.grid {
    export class Segment {
        desired: number = 0.0;
        offered: number = 0.0;
        original: number = 0.0;
        min: number = 0.0;
        max: number = Number.POSITIVE_INFINITY;
        stars: number = 0;
        type: GridUnitType;

        clamp (value: number): number {
            if (value < this.min)
                return this.min;
            if (value > this.max)
                return this.max;
            return value;
        }

        setOfferedToDesired (): number {
            return this.offered = this.desired;
        }

        setDesiredToOffered (): number {
            return this.desired = this.offered;
        }

        static init (segment: Segment, offered?: number, min?: number, max?: number, unitType?: GridUnitType) {
            segment.offered = offered || 0.0;
            segment.min = min || 0.0;
            segment.max = max != null ? max : Number.POSITIVE_INFINITY;
            segment.type = unitType != null ? unitType : GridUnitType.Pixel;

            if (segment.offered < min)
                segment.offered = min;
            else if (segment.offered > max)
                segment.offered = max;
        }
    }
}