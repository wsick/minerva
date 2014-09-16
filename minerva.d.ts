declare module minerva {
    var version: string;
}
declare module minerva {
    enum HorizontalAlignment {
        Left = 0,
        Center = 1,
        Right = 2,
        Stretch = 3,
    }
    enum VerticalAlignment {
        Top = 0,
        Center = 1,
        Bottom = 2,
        Stretch = 3,
    }
}
declare module vec2 {
    function createFrom(x: number, y: number): number[];
}
declare module vec4 {
    function create(vec?: number[]): number[];
    function createFrom(x: number, y: number, z: number, w: number): number[];
}
declare module mat3 {
    function create(mat?: number[]): number[];
    function inverse(mat: number[], dest?: number[]): number[];
    function multiply(mat: number[], mat2: number[], dest?: number[]): number[];
    function set(mat: number[], dest: number[]): number[];
    function identity(dest?: number[]): number[];
    function str(mat: number[]): string;
    function clone(mat: number[]): number[];
    function toAffineMat4(mat: number[], dest?: number[]): number[];
    function transformVec2(mat: number[], vec: number[], dest?: number[]): number[];
    function translate(mat: number[], x: number, y: number): number[];
    function createTranslate(x: number, y: number, dest?: number[]): number[];
    function scale(mat: number[], x: number, y: number): number[];
    function createScale(x: number, y: number, dest?: number[]): number[];
    function createRotate(angleRad: number, dest?: number[]): number[];
    function createSkew(angleRadX: number, angleRadY: number, dest?: number[]): number[];
}
declare module mat4 {
    function create(mat?: number[]): number[];
    function set(mat: number[], dest: number[]): number[];
    function equal(a: number[], b: number[]): boolean;
    function identity(dest?: number[]): number[];
    function inverse(mat: number[], dest?: number[]): number[];
    function multiply(mat: number[], mat2: number[], dest?: number[]): number[];
    function transformVec4(mat: number[], vec: number[], dest?: number[]): number[];
    function toAffineMat3(mat: number[], dest?: number[]): number[];
    function clone(mat: number[]): number[];
    function str(mat: number[]): string;
    function createTranslate(x: number, y: number, z: number, dest?: number[]): number[];
    function createScale(x: number, y: number, z: number, dest?: number[]): number[];
    function createPerspective(fieldOfViewY: number, aspectRatio: number, zNearPlane: number, zFarPlane: number, dest?: number[]): number[];
    function createViewport(width: number, height: number, dest?: number[]): number[];
    function createRotateX(theta: number, dest?: number[]): number[];
    function createRotateY(theta: number, dest?: number[]): number[];
    function createRotateZ(theta: number, dest?: number[]): number[];
    function translate(mat: number[], x: number, y: number, z: number): number[];
    function scale(mat: number[], x: number, y: number, z: number): number[];
}
declare module minerva {
    class Rect {
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        static isEqual(rect1: Rect, rect2: Rect): boolean;
        static copyTo(src: Rect, dest: Rect): void;
        static roundOut(r: Rect): void;
        static intersection(dest: Rect, rect2: Rect): void;
    }
}
declare module minerva {
    class Size {
        public width: number;
        public height: number;
        constructor(width?: number, height?: number);
        static copyTo(src: Size, dest: Size): void;
    }
}
declare module minerva {
    class Thickness {
        public left: number;
        public top: number;
        public right: number;
        public bottom: number;
        constructor(left?: number, top?: number, right?: number, bottom?: number);
        static shrinkSize(thickness: Thickness, dest: Size): Size;
        static shrinkRect(thickness: Thickness, dest: Rect): void;
        static growSize(thickness: Thickness, dest: Size): Size;
        static growRect(thickness: Thickness, dest: Rect): void;
    }
}
declare module minerva {
    enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
}
declare module minerva.def {
    interface IPipeInput {
    }
    interface IPipeState {
    }
    interface IPipeOutput {
    }
    interface IPipeDef<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        createState(): TState;
        createOutput(): TOutput;
        prepare(input: TInput, state: TState, output: TOutput): any;
        flush(input: TInput, state: TState, output: TOutput): any;
    }
}
declare module minerva.def {
    interface ITapin {
        (assets: IPipeInput, state: IPipeState, output: IPipeOutput, ...contexts: any[]): boolean;
    }
    class PipeDef<T extends ITapin, TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> implements IPipeDef<TInput, TState, TOutput> {
        private $$names;
        private $$tapins;
        public addTapin(name: string, tapin: T): PipeDef<T, TInput, TState, TOutput>;
        public addTapinBefore(name: string, tapin: T, before?: string): PipeDef<T, TInput, TState, TOutput>;
        public addTapinAfter(name: string, tapin: T, after?: string): PipeDef<T, TInput, TState, TOutput>;
        public replaceTapin(name: string, tapin: T): PipeDef<T, TInput, TState, TOutput>;
        public removeTapin(name: string): PipeDef<T, TInput, TState, TOutput>;
        public run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        public createState(): TState;
        public createOutput(): TOutput;
        public prepare(input: TInput, state: TState, output: TOutput): void;
        public flush(input: TInput, state: TState, output: TOutput): void;
    }
}
declare module minerva.def.arrange {
    interface IArrangeTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean;
    }
    interface IInput extends IPipeInput {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        margin: Thickness;
        horizontalAlignment: HorizontalAlignment;
        verticalAlignment: VerticalAlignment;
        useLayoutRounding: boolean;
        visibility: Visibility;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
        layoutSlot: Rect;
    }
    interface IState extends IPipeState {
        finalRect: Rect;
        finalSize: Size;
        framework: Size;
        stretched: Size;
    }
    interface IOutput extends IPipeOutput {
        error: string;
        dirtyFlags: layout.DirtyFlags;
        layoutSlot: Rect;
    }
    class ArrangePipe extends PipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput): void;
        public flush(input: IInput, state: IState, output: IOutput): void;
    }
}
declare module minerva.def.arrange.tapins {
    var applyRounding: IArrangeTapin;
}
declare module minerva.def.arrange.tapins {
    var checkNeedArrange: IArrangeTapin;
}
declare module minerva.def.arrange.tapins {
    var invalidateFuture: IArrangeTapin;
}
declare module minerva.def.arrange.tapins {
    var prepareOverride: IArrangeTapin;
}
declare module minerva.def.arrange.tapins {
    var validateFinalRect: IArrangeTapin;
}
declare module minerva.def.arrange.tapins {
    var validateVisibility: IArrangeTapin;
}
declare module minerva.def.helpers {
    interface ISized {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
    }
    function coerceSize(size: Size, assets: ISized): void;
}
declare module minerva.def.measure {
    interface IMeasureTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, availableSize: Size): boolean;
    }
    interface IInput extends IPipeInput {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
        margin: Thickness;
        previousConstraint: Size;
        visibility: Visibility;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
    }
    interface IState extends IPipeState {
        availableSize: Size;
    }
    interface IOutput extends IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: layout.DirtyFlags;
    }
    class MeasurePipeDef extends PipeDef<IMeasureTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput): void;
        public flush(input: IInput, state: IState, output: IOutput): void;
    }
}
declare module minerva.def.measure.tapins {
    var applyTemplate: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var checkNeedMeasure: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var completeOverride: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var doOverride: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var finishDesired: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var invalidateFuture: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var prepareOverride: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var validate: IMeasureTapin;
}
declare module minerva.def.measure.tapins {
    var validateVisibility: IMeasureTapin;
}
declare module minerva.def.render {
    class RenderContext {
        private $$transforms;
        public currentTransform: number[];
        public raw: CanvasRenderingContext2D;
        constructor(ctx: CanvasRenderingContext2D);
        public save(): void;
        public restore(): void;
        public setTransform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        public resetTransform(): void;
        public transform(m11: number, m12: number, m21: number, m22: number, dx: number, dy: number): void;
        public scale(x: number, y: number): void;
        public rotate(angle: number): void;
        public translate(x: number, y: number): void;
        public transformMatrix(mat: number[]): void;
        public pretransformMatrix(mat: number[]): void;
        public clipGeometry(geom: IGeometry): void;
    }
}
declare module minerva.def.render {
    interface IRenderTapin extends ITapin {
        (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean;
    }
    interface IInput extends IPipeInput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        surfaceBoundsWithChildren: Rect;
        renderXform: number[];
        clip: IGeometry;
        effect: IEffect;
    }
    interface IState extends IPipeState {
        renderRegion: Rect;
    }
    interface IOutput extends IPipeOutput {
    }
    interface IEffect {
        PreRender(ctx: RenderContext): any;
        PostRender(ctx: RenderContext): any;
    }
    interface IGeometry {
        Draw(ctx: RenderContext): any;
    }
    class RenderPipeDef extends PipeDef<IRenderTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
    }
}
declare module minerva.def.render.tapins {
    var applyClip: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var doRender: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var postRender: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var preRender: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var prepareContext: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var renderChildren: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var restoreContext: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var validate: IRenderTapin;
}
declare module minerva.def.render.tapins {
    var validateRegion: IRenderTapin;
}
declare module minerva.layout {
    class IPipe<TInput extends def.IPipeInput, TState extends def.IPipeState, TOutput extends def.IPipeOutput> {
        public def: def.IPipeDef<TInput, TState, TOutput>;
        public state: TState;
        public output: TOutput;
    }
    function createPipe<TInput extends def.IPipeInput, TState extends def.IPipeState, TOutput extends def.IPipeOutput>(pipedef: def.IPipeDef<TInput, TState, TOutput>): IPipe<TInput, TState, TOutput>;
}
declare module minerva.layout {
    interface IMeasurePipe extends IPipe<def.measure.IInput, def.measure.IState, def.measure.IOutput> {
    }
    interface IArrangePipe extends IPipe<def.arrange.IInput, def.arrange.IState, def.arrange.IOutput> {
    }
    interface IRenderPipe extends IPipe<def.render.IInput, def.render.IState, def.render.IOutput> {
    }
    enum DirtyFlags {
        Transform,
        LocalTransform,
        LocalProjection,
        Clip,
        LocalClip,
        LayoutClip,
        RenderVisibility,
        HitTestVisibility,
        Measure,
        Arrange,
        ChildrenZIndices,
        Bounds,
        NewBounds,
        Invalidate,
        InUpDirtyList,
        InDownDirtyList,
        DownDirtyState,
        UpDirtyState,
    }
    interface IUpdaterAssets extends def.measure.IInput, def.arrange.IInput, def.render.IInput {
    }
    class Updater {
        private $$measure;
        private $$arrange;
        private $$render;
        public assets: IUpdaterAssets;
        constructor();
        public setMeasurePipe(pipedef?: def.measure.MeasurePipeDef): Updater;
        public setArrangePipe(pipedef?: def.arrange.ArrangePipe): Updater;
        public setRenderPipe(pipedef?: def.render.RenderPipeDef): Updater;
        public measure(availableSize: Size): boolean;
        public arrange(finalRect: Rect): boolean;
        public render(ctx: def.render.RenderContext, region: Rect): boolean;
    }
}
