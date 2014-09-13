declare module minerva {
    var version: string;
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
        static shrinkSize(thickness: Thickness, dest: Size): Size;
        static growSize(thickness: Thickness, dest: Size): Size;
    }
}
declare module minerva {
    enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
}
declare module minerva.def {
    interface IPipeAssets {
    }
    interface IPipeState {
    }
    interface IPipeOutput {
    }
    interface IPipe<TAssets extends IPipeAssets, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(assets: TAssets, state: TState, output: TOutput, ...contexts: any[]): boolean;
        createState(): TState;
        createOutput(): TOutput;
    }
}
declare module minerva.def {
    interface ITapin {
        (assets: IPipeAssets, state: IPipeState, output: IPipeOutput, ...contexts: any[]): boolean;
    }
    class Pipe<T extends ITapin, TAssets extends IPipeAssets, TState extends IPipeState, TOutput extends IPipeOutput> implements IPipe<TAssets, TState, TOutput> {
        private $$names;
        private $$tapins;
        public addTapin(name: string, tapin: T): Pipe<T, TAssets, TState, TOutput>;
        public addTapinBefore(name: string, tapin: T, before?: string): Pipe<T, TAssets, TState, TOutput>;
        public addTapinAfter(name: string, tapin: T, after?: string): Pipe<T, TAssets, TState, TOutput>;
        public replaceTapin(name: string, tapin: T): Pipe<T, TAssets, TState, TOutput>;
        public removeTapin(name: string): Pipe<T, TAssets, TState, TOutput>;
        public run(assets: TAssets, state: TState, output: TOutput, ...contexts: any[]): boolean;
        public createState(): TState;
        public createOutput(): TOutput;
    }
}
declare module minerva.def.arrange {
    interface IArrangeTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, finalRect: Rect): boolean;
    }
    interface IAssets extends IPipeAssets {
        hiddenDesire: Size;
    }
    interface IState extends IPipeState {
    }
    interface IOutput extends IPipeOutput {
    }
    class ArrangePipe extends Pipe<IArrangeTapin, IAssets, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
    }
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
        (assets: IAssets, state: IState, output: IOutput, availableSize: Size): boolean;
    }
    interface IAssets extends IPipeAssets {
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
    class MeasurePipe extends Pipe<IMeasureTapin, IAssets, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
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
        (assets: IAssets, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean;
    }
    interface IAssets extends IPipeAssets {
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
    class RenderPipe extends Pipe<IRenderTapin, IAssets, IState, IOutput> {
        constructor();
        public initState(state: IState): void;
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
    class IPipe<TAssets extends def.IPipeAssets, TState extends def.IPipeState, TOutput extends def.IPipeOutput> {
        public def: def.IPipe<TAssets, TState, TOutput>;
        public assets: TAssets;
        public state: TState;
        public output: TOutput;
    }
    function createPipe<TAssets extends def.IPipeAssets, TState extends def.IPipeState, TOutput extends def.IPipeOutput>(pipedef: def.IPipe<TAssets, TState, TOutput>, assets: any): IPipe<TAssets, TState, TOutput>;
}
declare module minerva.layout {
    interface IMeasurePipe extends IPipe<def.measure.IAssets, def.measure.IState, def.measure.IOutput> {
    }
    interface IArrangePipe extends IPipe<def.arrange.IAssets, def.arrange.IState, def.arrange.IOutput> {
    }
    interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {
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
    interface IUpdaterAssets extends def.measure.IAssets, def.arrange.IAssets, def.render.IAssets {
    }
    class Updater {
        private $$measure;
        private $$arrange;
        private $$render;
        public assets: IUpdaterAssets;
        constructor();
        public setMeasurePipe(pipedef?: def.measure.MeasurePipe): Updater;
        public setArrangePipe(pipedef?: def.arrange.ArrangePipe): Updater;
        public setRenderPipe(pipedef?: def.render.RenderPipe): Updater;
        public measure(availableSize: Size): boolean;
        public arrange(finalRect: Rect): boolean;
        public render(ctx: def.render.RenderContext, region: Rect): boolean;
    }
}
