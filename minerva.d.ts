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
declare module minerva {
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
        PropagateDown,
    }
    enum UIFlags {
        None = 0,
        RenderVisible = 2,
        HitTestVisible = 4,
        TotalRenderVisible = 8,
        TotalHitTestVisible = 16,
        MeasureHint = 2048,
        ArrangeHint = 4096,
        SizeHint = 8192,
        Hints,
    }
}
declare module minerva {
    interface IProjection {
        getDistanceFromXYPlane(objectWidth: number, objectHeight: number): number;
        getTransform(): number[];
    }
}
declare module minerva {
    interface IWalker<T> {
        step(): boolean;
        current: T;
    }
    interface IDeepWalker<T> {
        step(): boolean;
        current: T;
        skipBranch(): any;
    }
}
declare module minerva {
    interface IPoint {
        x: number;
        y: number;
    }
    class Point implements IPoint {
        public x: number;
        public y: number;
        constructor(x?: number, y?: number);
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
    class Rect implements IPoint, ISize {
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        static isEqual(rect1: Rect, rect2: Rect): boolean;
        static isEmpty(src: Rect): boolean;
        static copyTo(src: Rect, dest: Rect): void;
        static roundOut(r: Rect): void;
        static intersection(dest: Rect, rect2: Rect): void;
        static union(dest: Rect, rect2: Rect): void;
        static isContainedIn(src: Rect, test: Rect): boolean;
        private static clipmask(clip);
        static transform4(dest: Rect, projection: number[]): void;
        static extendTo(dest: Rect, x: number, y: number): void;
    }
}
declare module minerva {
    interface ISize {
        width: number;
        height: number;
    }
    class Size implements ISize {
        public width: number;
        public height: number;
        constructor(width?: number, height?: number);
        static copyTo(src: ISize, dest: ISize): void;
        static isEqual(size1: ISize, size2: ISize): boolean;
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
declare module minerva.pipe {
    interface ITapin {
        (data: IPipeData, ...contexts: any[]): boolean;
    }
    class PipeDef<T extends ITapin, TData extends IPipeData> implements IPipeDef<TData> {
        private $$names;
        private $$tapins;
        public addTapin(name: string, tapin: T): PipeDef<T, TData>;
        public addTapinBefore(name: string, tapin: T, before?: string): PipeDef<T, TData>;
        public addTapinAfter(name: string, tapin: T, after?: string): PipeDef<T, TData>;
        public replaceTapin(name: string, tapin: T): PipeDef<T, TData>;
        public removeTapin(name: string): PipeDef<T, TData>;
        public run(data: TData, ...contexts: any[]): boolean;
        public prepare(data: TData, ...contexts: any[]): void;
        public flush(data: TData, ...contexts: any[]): void;
    }
}
declare module minerva.pipe {
    interface ITriTapin {
        (input: IPipeInput, state: IPipeState, output: IPipeOutput, ...contexts: any[]): boolean;
    }
    class TriPipeDef<T extends ITriTapin, TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> implements ITriPipeDef<TInput, TState, TOutput> {
        private $$names;
        private $$tapins;
        public addTapin(name: string, tapin: T): TriPipeDef<T, TInput, TState, TOutput>;
        public addTapinBefore(name: string, tapin: T, before?: string): TriPipeDef<T, TInput, TState, TOutput>;
        public addTapinAfter(name: string, tapin: T, after?: string): TriPipeDef<T, TInput, TState, TOutput>;
        public replaceTapin(name: string, tapin: T): TriPipeDef<T, TInput, TState, TOutput>;
        public removeTapin(name: string): TriPipeDef<T, TInput, TState, TOutput>;
        public run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        public createState(): TState;
        public createOutput(): TOutput;
        public prepare(input: TInput, state: TState, output: TOutput, ...contexts: any[]): void;
        public flush(input: TInput, state: TState, output: TOutput, ...contexts: any[]): void;
    }
}
declare module minerva.engine {
    interface IPass extends layout.draft.ILayoutPipeData {
        count: number;
        maxCount: number;
    }
    class Surface implements layout.ISurface {
        private $$layout;
        private $$canvas;
        private $$ctx;
        private $$layers;
        private $$downDirty;
        private $$upDirty;
        private $$dirtyRegion;
        public width : number;
        public height : number;
        public updateBounds(): void;
        public invalidate(region?: Rect): void;
        public render(): void;
        public addUpDirty(updater: layout.Updater): void;
        public addDownDirty(updater: layout.Updater): void;
        public updateLayout(): boolean;
    }
}
declare module minerva.engine {
    function draft(layers: layout.Updater[], layoutPipe: layout.draft.LayoutPipeDef, pass: IPass): boolean;
}
declare module minerva.engine {
    function process(down: layout.Updater[], up: layout.Updater[]): boolean;
}
declare module minerva.layout {
    interface IMeasurePipe extends pipe.ITriPipe<measure.IInput, measure.IState, measure.IOutput> {
    }
    interface IArrangePipe extends pipe.ITriPipe<arrange.IInput, arrange.IState, arrange.IOutput> {
    }
    interface ISizingPipe extends pipe.ITriPipe<sizing.IInput, sizing.IState, sizing.IOutput> {
    }
    interface IProcessDownPipe extends pipe.ITriPipe<processdown.IInput, processdown.IState, processdown.IOutput> {
    }
    interface IProcessUpPipe extends pipe.ITriPipe<processup.IInput, processup.IState, processup.IOutput> {
    }
    interface IRenderPipe extends pipe.ITriPipe<render.IInput, render.IState, render.IOutput> {
    }
    interface IVisualOwner extends processup.IProcessVisualOwner {
    }
    interface ISurface extends IVisualOwner {
        width: number;
        height: number;
        addUpDirty(updater: Updater): any;
        addDownDirty(updater: Updater): any;
    }
    interface IUpdaterAssets extends measure.IInput, arrange.IInput, sizing.IInput, processdown.IInput, processup.IInput, render.IInput {
        isLayoutContainer: boolean;
        isContainer: boolean;
    }
}
declare module minerva.layout {
    class Updater {
        private $$measure;
        private $$measureBinder;
        private $$arrange;
        private $$arrangeBinder;
        private $$sizing;
        private $$processdown;
        private $$processup;
        private $$render;
        private $$visualParentUpdater;
        private $$surface;
        private $$inDownDirty;
        private $$inUpDirty;
        public assets: IUpdaterAssets;
        constructor();
        public setContainerMode(isLayoutContainer: boolean, isContainer?: boolean): void;
        public onSizeChanged(oldSize: Size, newSize: Size): void;
        public setMeasurePipe(pipedef?: measure.MeasurePipeDef): Updater;
        public setMeasureBinder(mb?: measure.IMeasureBinder): Updater;
        public setArrangePipe(pipedef?: arrange.ArrangePipeDef): Updater;
        public setArrangeBinder(ab?: arrange.IArrangeBinder): Updater;
        public setSizingPipe(pipedef?: sizing.SizingPipeDef): Updater;
        public setProcessDownPipe(pipedef?: processdown.ProcessDownPipeDef): Updater;
        public setProcessUpPipe(pipedef?: processup.ProcessUpPipeDef): Updater;
        public setRenderPipe(pipedef?: render.RenderPipeDef): Updater;
        public doMeasure(): void;
        public measure(availableSize: Size): boolean;
        public doArrange(): void;
        public arrange(finalRect: Rect): boolean;
        public sizing(oldSize: Size, newSize: Size): boolean;
        public processDown(): boolean;
        public processUp(): boolean;
        public render(ctx: render.RenderContext, region: Rect): boolean;
        public invalidateMeasure(): void;
        public invalidateArrange(): void;
        public updateBounds(forceRedraw?: boolean): void;
        public invalidate(region: Rect): void;
        public findChildInList(list: Updater[]): number;
        static walk(updater: Updater): IWalker<Updater>;
        static walkDeep(updater: Updater): IDeepWalker<Updater>;
        private static $$getVisualOnwer(updater);
        private static $$addUpDirty(updater);
        private static $$addDownDirty(updater);
        private static $$propagateUiFlagsUp(updater, flags);
    }
}
declare module minerva.layout.arrange {
    interface IArrangeBinder {
        bind(updater: Updater, surface: ISurface, visualParent: Updater): boolean;
    }
    class ArrangeBinder implements IArrangeBinder {
        public bind(updater: Updater, surface: ISurface, visualParent: Updater): boolean;
        public expandViewport(viewport: Rect, updater: Updater, surface: ISurface): void;
        public shiftViewport(viewport: Rect, updater: Updater, surface: ISurface): void;
    }
}
declare module minerva.layout.arrange {
    interface IArrangeTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, finalRect: Rect): boolean;
    }
    interface IInput extends pipe.IPipeInput, helpers.ISized {
        margin: Thickness;
        horizontalAlignment: HorizontalAlignment;
        verticalAlignment: VerticalAlignment;
        visibility: Visibility;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
        layoutSlot: Rect;
        renderSize: Size;
        lastRenderSize: Size;
        layoutClip: Rect;
        isTopLevel: boolean;
    }
    interface IState extends pipe.IPipeState {
        finalRect: Rect;
        finalSize: Size;
        framework: Size;
        stretched: Size;
        constrained: Size;
        visualOffset: Point;
        flipHorizontal: boolean;
    }
    interface IOutput extends pipe.IPipeOutput {
        error: string;
        dirtyFlags: DirtyFlags;
        layoutSlot: Rect;
        arrangedSize: Size;
        layoutXform: number[];
        layoutClip: Rect;
        renderSize: Size;
        lastRenderSize: Size;
        uiFlags: UIFlags;
        newUpDirty: DirtyFlags;
        newDownDirty: DirtyFlags;
        newUiFlags: UIFlags;
    }
    class ArrangePipeDef extends pipe.TriPipeDef<IArrangeTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput): void;
        public flush(input: IInput, state: IState, output: IOutput): void;
    }
}
declare module minerva.layout.arrange.tapins {
    var applyRounding: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var buildLayoutClip: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var buildLayoutXform: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var buildRenderSize: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var calcFlip: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var calcStretched: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var calcVisualOffset: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var checkNeedArrange: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var completeOverride: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var doOverride: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var invalidateFuture: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var prepareOverride: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var validateFinalRect: IArrangeTapin;
}
declare module minerva.layout.arrange.tapins {
    var validateVisibility: IArrangeTapin;
}
declare module minerva.layout.draft {
    interface ILayoutTapin extends pipe.ITapin {
        (data: ILayoutPipeData): boolean;
    }
    interface ILayoutPipeData extends pipe.IPipeData {
        updater: Updater;
        assets: IUpdaterAssets;
        flag: UIFlags;
        measureList: Updater[];
        arrangeList: Updater[];
        sizingList: Updater[];
        surfaceSize: Size;
        sizingUpdates: ISizingUpdate[];
    }
    interface ISizingUpdate {
        updater: Updater;
        oldSize: Size;
        newSize: Size;
    }
    class LayoutPipeDef extends pipe.PipeDef<ILayoutTapin, ILayoutPipeData> {
        constructor();
        public prepare(data: ILayoutPipeData): void;
        public flush(data: ILayoutPipeData): void;
    }
}
declare module minerva.layout.draft.tapins {
    var arrange: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var determinePhase: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var flushPrevious: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var measure: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var notifyResize: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var prepareArrange: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var prepareMeasure: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var prepareSizing: ILayoutTapin;
}
declare module minerva.layout.draft.tapins {
    var sizing: ILayoutTapin;
}
declare module minerva.layout.helpers {
    interface ISized {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
    }
    function coerceSize(size: ISize, assets: ISized): void;
    function copyGrowTransform4(dest: Rect, src: Rect, thickness: Thickness, projection: number[]): void;
}
declare module minerva.layout.measure {
    interface IMeasureBinder {
        bind(updater: Updater, surface: ISurface, visualParent: Updater): boolean;
    }
    class MeasureBinder implements IMeasureBinder {
        public bind(updater: Updater, surface: ISurface, visualParent: Updater): boolean;
    }
}
declare module minerva.layout.measure {
    interface IMeasureTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, availableSize: Size): boolean;
    }
    interface IInput extends pipe.IPipeInput, helpers.ISized {
        margin: Thickness;
        previousConstraint: Size;
        visibility: Visibility;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
    }
    interface IState extends pipe.IPipeState {
        availableSize: Size;
    }
    interface IOutput extends pipe.IPipeOutput {
        error: string;
        previousConstraint: Size;
        desiredSize: Size;
        hiddenDesire: Size;
        dirtyFlags: DirtyFlags;
        uiFlags: UIFlags;
        newUpDirty: DirtyFlags;
        newDownDirty: DirtyFlags;
        newUiFlags: UIFlags;
    }
    class MeasurePipeDef extends pipe.TriPipeDef<IMeasureTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput): void;
        public flush(input: IInput, state: IState, output: IOutput): void;
    }
}
declare module minerva.layout.measure.tapins {
    var applyTemplate: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var checkNeedMeasure: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var completeOverride: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var doOverride: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var finishDesired: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var invalidateFuture: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var prepareOverride: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var validate: IMeasureTapin;
}
declare module minerva.layout.measure.tapins {
    var validateVisibility: IMeasureTapin;
}
declare module minerva.layout.processdown {
    interface IProcessDownTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, vpinput: IInput): boolean;
    }
    interface IInput extends pipe.IPipeInput {
        visibility: Visibility;
        opacity: number;
        isHitTestVisible: boolean;
        renderTransform: number[];
        renderTransformOrigin: Point;
        projection: IProjection;
        actualWidth: number;
        actualHeight: number;
        surfaceBoundsWithChildren: Rect;
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        z: number;
        layoutClip: Rect;
        compositeLayoutClip: Rect;
        layoutXform: number[];
        carrierXform: number[];
        renderXform: number[];
        absoluteXform: number[];
        carrierProjection: number[];
        localProjection: number[];
        absoluteProjection: number[];
        totalHasRenderProjection: boolean;
        dirtyFlags: DirtyFlags;
    }
    interface IState extends pipe.IPipeState {
        xformOrigin: Point;
        localXform: number[];
        renderAsProjection: number[];
    }
    interface IOutput extends pipe.IPipeOutput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        totalIsHitTestVisible: boolean;
        z: number;
        compositeLayoutClip: Rect;
        renderXform: number[];
        absoluteXform: number[];
        localProjection: number[];
        absoluteProjection: number[];
        totalHasRenderProjection: boolean;
        dirtyFlags: DirtyFlags;
        newUpDirty: DirtyFlags;
    }
    class ProcessDownPipeDef extends pipe.TriPipeDef<IProcessDownTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput, vpinput: IInput): void;
        public flush(input: IInput, state: IState, output: IOutput, vpinput: IInput): void;
    }
}
declare module minerva.layout.processdown.tapins {
    var calcAbsoluteProjection: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var calcAbsoluteXform: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var calcLocalProjection: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var calcRenderXform: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var calcXformOrigin: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processHitTestVisibility: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processLayoutClip: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processLocalProjection: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processLocalXform: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processRenderVisibility: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processXform: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var processZIndices: IProcessDownTapin;
}
declare module minerva.layout.processdown.tapins {
    var propagateDirtyToChildren: IProcessDownTapin;
}
declare module minerva.layout.processup {
    interface IProcessUpTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner): boolean;
    }
    interface IInput extends pipe.IPipeInput {
        width: number;
        height: number;
        minWidth: number;
        minHeight: number;
        maxWidth: number;
        maxHeight: number;
        useLayoutRounding: boolean;
        actualWidth: number;
        actualHeight: number;
        effectPadding: Thickness;
        localProjection: number[];
        absoluteProjection: number[];
        extents: Rect;
        extentsWithChildren: Rect;
        globalBoundsWithChildren: Rect;
        surfaceBoundsWithChildren: Rect;
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        dirtyFlags: DirtyFlags;
        dirtyRegion: Rect;
        forceInvalidate: boolean;
    }
    interface IState extends pipe.IPipeState {
        actualSize: Size;
        invalidateSubtreePaint: boolean;
        hasNewBounds: boolean;
        hasInvalidate: boolean;
    }
    interface IOutput extends pipe.IPipeOutput {
        extents: Rect;
        extentsWithChildren: Rect;
        globalBoundsWithChildren: Rect;
        surfaceBoundsWithChildren: Rect;
        dirtyFlags: DirtyFlags;
        dirtyRegion: Rect;
        forceInvalidate: boolean;
    }
    interface IProcessVisualOwner {
        updateBounds(): any;
        invalidate(region: Rect): any;
    }
    class ProcessUpPipeDef extends pipe.TriPipeDef<IProcessUpTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner): void;
        public flush(input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner): void;
    }
}
declare module minerva.layout.processup.tapins {
    var calcActualSize: IProcessUpTapin;
}
declare module minerva.layout.processup.tapins {
    var calcExtents: IProcessUpTapin;
}
declare module minerva.layout.processup.tapins {
    var calcPaintBounds: IProcessUpTapin;
}
declare module minerva.layout.processup.tapins {
    var processBounds: IProcessUpTapin;
}
declare module minerva.layout.processup.tapins {
    var processInvalidate: IProcessUpTapin;
}
declare module minerva.layout.processup.tapins {
    var processNewBounds: IProcessUpTapin;
}
declare module minerva.layout.render {
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
        public clipRect(rect: Rect): void;
    }
}
declare module minerva.layout.render {
    interface IRenderTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect): boolean;
    }
    interface IInput extends pipe.IPipeInput {
        totalIsRenderVisible: boolean;
        totalOpacity: number;
        surfaceBoundsWithChildren: Rect;
        renderXform: number[];
        clip: IGeometry;
        effect: IEffect;
    }
    interface IState extends pipe.IPipeState {
        renderRegion: Rect;
    }
    interface IOutput extends pipe.IPipeOutput {
    }
    interface IEffect {
        PreRender(ctx: RenderContext): any;
        PostRender(ctx: RenderContext): any;
    }
    interface IGeometry {
        Draw(ctx: RenderContext): any;
    }
    class RenderPipeDef extends pipe.TriPipeDef<IRenderTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
    }
}
declare module minerva.layout.render.tapins {
    var applyClip: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var doRender: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var postRender: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var preRender: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var prepareContext: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var renderChildren: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var restoreContext: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var validate: IRenderTapin;
}
declare module minerva.layout.render.tapins {
    var validateRegion: IRenderTapin;
}
declare module minerva.layout.sizing {
    interface ISizingTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput): boolean;
    }
    interface IInput extends pipe.IPipeInput, helpers.ISized {
        visibility: Visibility;
        renderSize: Size;
        actualWidth: number;
        actualHeight: number;
    }
    interface IState extends pipe.IPipeState {
        useRender: boolean;
    }
    interface IOutput extends pipe.IPipeOutput {
        actualSize: Size;
    }
    class SizingPipeDef extends pipe.TriPipeDef<ISizingTapin, IInput, IState, IOutput> {
        constructor();
        public createState(): IState;
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput): void;
        public flush(input: IInput, state: IState, output: IOutput): void;
    }
}
declare module minerva.layout.sizing.tapins {
    var calcUseRender: ISizingTapin;
}
declare module minerva.layout.sizing.tapins {
    var computeActual: ISizingTapin;
}
declare module minerva.pipe {
    interface IPipeData {
    }
    interface IPipeDef<TData extends IPipeData> {
        run(...contexts: any[]): boolean;
        prepare(data: TData): any;
        flush(data: TData): any;
    }
}
declare module minerva.pipe {
    interface IPipeInput {
    }
    interface IPipeState {
    }
    interface IPipeOutput {
    }
    interface ITriPipeDef<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        createState(): TState;
        createOutput(): TOutput;
        prepare(input: TInput, state: TState, output: TOutput): any;
        flush(input: TInput, state: TState, output: TOutput): any;
    }
}
declare module minerva.pipe {
    class ITriPipe<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput> {
        public def: ITriPipeDef<TInput, TState, TOutput>;
        public state: TState;
        public output: TOutput;
    }
    function createTriPipe<TInput extends IPipeInput, TState extends IPipeState, TOutput extends IPipeOutput>(pipedef: ITriPipeDef<TInput, TState, TOutput>): ITriPipe<TInput, TState, TOutput>;
}
