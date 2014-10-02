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
    interface ICornerRadius {
        topLeft: number;
        topRight: number;
        bottomRight: number;
        bottomLeft: number;
    }
    class CornerRadius implements ICornerRadius {
        public topLeft: number;
        public topRight: number;
        public bottomRight: number;
        public bottomLeft: number;
        constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number);
        static isEmpty(cr: ICornerRadius): boolean;
        static isEqual(cr1: ICornerRadius, cr2: ICornerRadius): boolean;
        static clear(dest: ICornerRadius): void;
        static copyTo(cr2: ICornerRadius, dest: ICornerRadius): void;
    }
}
declare module minerva {
    enum Orientation {
        Horizontal = 0,
        Vertical = 1,
    }
    enum PenLineJoin {
        Miter = 0,
        Bevel = 1,
        Round = 2,
    }
    enum PenLineCap {
        Flat = 0,
        Square = 1,
        Round = 2,
        Triangle = 3,
    }
    enum FillRule {
        EvenOdd = 0,
        NonZero = 1,
    }
    enum Stretch {
        None = 0,
        Fill = 1,
        Uniform = 2,
        UniformToFill = 3,
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
    enum ShapeFlags {
        None = 0,
        Empty = 1,
        Normal = 2,
        Degenerate = 4,
        Radii = 8,
    }
}
declare module minerva {
    interface IBrush {
        isTransparent(): boolean;
        setupBrush(ctx: CanvasRenderingContext2D, region: Rect): any;
        toHtml5Object(): any;
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
        current: T;
        step(): boolean;
    }
    interface IDeepWalker<T> {
        current: T;
        step(): boolean;
        skipBranch(): any;
    }
    enum WalkDirection {
        Forward = 0,
        Reverse = 1,
        ZForward = 2,
        ZReverse = 3,
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
        static shrink(dest: Rect, left: number, top: number, right: number, bottom: number): void;
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
        static min(dest: ISize, size2: ISize): void;
    }
}
declare module minerva {
    class Thickness {
        public left: number;
        public top: number;
        public right: number;
        public bottom: number;
        constructor(left?: number, top?: number, right?: number, bottom?: number);
        static add(dest: Thickness, t2: Thickness): void;
        static copyTo(thickness: Thickness, dest: Thickness): void;
        static isEmpty(thickness: Thickness): boolean;
        static isBalanced(thickness: Thickness): boolean;
        static shrinkSize(thickness: Thickness, dest: Size): Size;
        static shrinkRect(thickness: Thickness, dest: Rect): void;
        static shrinkCornerRadius(thickness: Thickness, dest: ICornerRadius): void;
        static growSize(thickness: Thickness, dest: Size): Size;
        static growRect(thickness: Thickness, dest: Rect): void;
        static growCornerRadius(thickness: Thickness, dest: ICornerRadius): void;
    }
}
declare module minerva {
    enum Visibility {
        Visible = 0,
        Collapsed = 1,
    }
}
declare module minerva {
    function singleton(type: Function): any;
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
declare module minerva.pipe {
    interface ITapin {
        (data: IPipeData, ...contexts: any[]): boolean;
    }
    class PipeDef<T extends ITapin, TData extends IPipeData> implements IPipeDef<TData> {
        private $$names;
        private $$tapins;
        public addTapin(name: string, tapin: T): PipeDef<T, TData>;
        public addTapinBefore(before: string, name: string, tapin: T): PipeDef<T, TData>;
        public addTapinAfter(after: string, name: string, tapin: T): PipeDef<T, TData>;
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
        public addTapinBefore(before: string, name: string, tapin: T): TriPipeDef<T, TInput, TState, TOutput>;
        public addTapinAfter(after: string, name: string, tapin: T): TriPipeDef<T, TInput, TState, TOutput>;
        public replaceTapin(name: string, tapin: T): TriPipeDef<T, TInput, TState, TOutput>;
        public removeTapin(name: string): TriPipeDef<T, TInput, TState, TOutput>;
        public run(input: TInput, state: TState, output: TOutput, ...contexts: any[]): boolean;
        public createState(): TState;
        public createOutput(): TOutput;
        public prepare(input: TInput, state: TState, output: TOutput, ...contexts: any[]): void;
        public flush(input: TInput, state: TState, output: TOutput, ...contexts: any[]): void;
    }
}
declare module minerva.core {
    interface IShape {
        stretch: Stretch;
        fill: IBrush;
        fillRule: FillRule;
        stroke: IBrush;
        strokeThickness: number;
        strokeStartLineCap: PenLineCap;
        strokeEndLineCap: PenLineCap;
        strokeLineJoin: PenLineJoin;
        strokeMiterLimit: number;
        actualWidth: number;
        actualHeight: number;
        draw(ctx: render.RenderContext): IShape;
        doFill(ctx: render.RenderContext, region: Rect): IShape;
        doStroke(ctx: render.RenderContext, region: Rect): IShape;
    }
}
declare module minerva.core {
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
    }
}
declare module minerva.core {
    class Updater {
        private $$measure;
        private $$measureBinder;
        private $$arrange;
        private $$arrangeBinder;
        private $$sizing;
        private $$processdown;
        private $$processup;
        private $$render;
        private $$inDownDirty;
        private $$inUpDirty;
        private $$attached;
        public assets: IUpdaterAssets;
        public tree: IUpdaterTree;
        constructor();
        public init(): void;
        public onSizeChanged(oldSize: Size, newSize: Size): void;
        public setTree(tree?: IUpdaterTree): Updater;
        public setVisualParent(visualParent: Updater): Updater;
        public walkDeep(dir?: WalkDirection): IDeepWalker<Updater>;
        public getAttachedValue(name: string): any;
        public setAttachedValue(name: string, value?: any): void;
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
        private static $$addUpDirty(updater);
        private static $$addDownDirty(updater);
        static $$propagateUiFlagsUp(updater: Updater, flags: UIFlags): void;
    }
}
declare module minerva.core {
    interface IUpdaterTree {
        isTop: boolean;
        surface: ISurface;
        visualParent: Updater;
        isContainer: boolean;
        isLayoutContainer: boolean;
        walk(direction?: WalkDirection): IWalker<Updater>;
    }
    class UpdaterTree implements IUpdaterTree {
        public isTop: boolean;
        public surface: any;
        public visualParent: any;
        public isContainer: boolean;
        public isLayoutContainer: boolean;
        public walk(direction?: WalkDirection): IWalker<Updater>;
    }
}
declare module minerva.core.helpers {
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
declare module minerva.core.arrange {
    interface IArrangeBinder {
        bind(updater: Updater): boolean;
    }
    class ArrangeBinder implements IArrangeBinder {
        public bind(updater: Updater): boolean;
        public expandViewport(viewport: Rect, assets: IUpdaterAssets, tree: IUpdaterTree): void;
        public shiftViewport(viewport: Rect, assets: IUpdaterAssets, tree: IUpdaterTree): void;
    }
}
declare module minerva.core.arrange {
    interface IArrangeTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, finalRect: Rect): boolean;
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
declare module minerva.core.arrange.tapins {
    var applyRounding: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var buildLayoutClip: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var buildLayoutXform: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var buildRenderSize: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var calcFlip: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var calcStretched: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var calcVisualOffset: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var checkNeedArrange: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var completeOverride: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var doOverride: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var invalidateFuture: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var prepareOverride: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var validateFinalRect: IArrangeTapin;
}
declare module minerva.core.arrange.tapins {
    var validateVisibility: IArrangeTapin;
}
declare module minerva.core.draft {
    interface IDraftTapin extends pipe.ITapin {
        (data: IDraftPipeData): boolean;
    }
    interface IDraftPipeData extends pipe.IPipeData {
        updater: Updater;
        tree: IUpdaterTree;
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
    class DraftPipeDef extends pipe.PipeDef<IDraftTapin, IDraftPipeData> {
        constructor();
        public prepare(data: IDraftPipeData): void;
        public flush(data: IDraftPipeData): void;
    }
}
declare module minerva.core.draft.tapins {
    var arrange: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var determinePhase: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var flushPrevious: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var measure: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var notifyResize: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var prepareArrange: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var prepareMeasure: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var prepareSizing: IDraftTapin;
}
declare module minerva.core.draft.tapins {
    var sizing: IDraftTapin;
}
declare module minerva.core.measure {
    interface IMeasureBinder {
        bind(updater: Updater): boolean;
    }
    class MeasureBinder implements IMeasureBinder {
        public bind(updater: Updater): boolean;
    }
}
declare module minerva.core.measure {
    interface IMeasureTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree, availableSize: Size): boolean;
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
declare module minerva.core.measure.tapins {
    var applyTemplate: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var checkNeedMeasure: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var completeOverride: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var doOverride: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var finishDesired: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var invalidateFuture: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var prepareOverride: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var validate: IMeasureTapin;
}
declare module minerva.core.measure.tapins {
    var validateVisibility: IMeasureTapin;
}
declare module minerva.core.processdown {
    interface IProcessDownTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: IUpdaterTree): boolean;
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
        public prepare(input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: IUpdaterTree): void;
        public flush(input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: IUpdaterTree): void;
    }
}
declare module minerva.core.processdown.tapins {
    var calcAbsoluteProjection: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var calcAbsoluteXform: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var calcLocalProjection: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var calcRenderXform: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var calcXformOrigin: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processHitTestVisibility: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processLayoutClip: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processLocalProjection: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processLocalXform: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processRenderVisibility: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processXform: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var processZIndices: IProcessDownTapin;
}
declare module minerva.core.processdown.tapins {
    var propagateDirtyToChildren: IProcessDownTapin;
}
declare module minerva.core.processup {
    interface IProcessUpTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner, tree: IUpdaterTree): boolean;
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
        public prepare(input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner, tree: IUpdaterTree): void;
        public flush(input: IInput, state: IState, output: IOutput, vo: IProcessVisualOwner, tree: IUpdaterTree): void;
    }
}
declare module minerva.core.processup.tapins {
    var calcActualSize: IProcessUpTapin;
}
declare module minerva.core.processup.tapins {
    var calcExtents: IProcessUpTapin;
}
declare module minerva.core.processup.tapins {
    var calcPaintBounds: IProcessUpTapin;
}
declare module minerva.core.processup.tapins {
    var processBounds: IProcessUpTapin;
}
declare module minerva.core.processup.tapins {
    var processInvalidate: IProcessUpTapin;
}
declare module minerva.core.processup.tapins {
    var processNewBounds: IProcessUpTapin;
}
declare module minerva.core.render {
    class RenderContext {
        private $$transforms;
        public currentTransform: number[];
        public raw: CanvasRenderingContext2D;
        public hasFillRule: boolean;
        constructor(ctx: CanvasRenderingContext2D);
        static hasFillRule : boolean;
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
        public fillEx(brush: IBrush, region: Rect, fillRule?: FillRule): void;
        public drawRectEx(extents: Rect, cr?: ICornerRadius): void;
    }
}
declare module minerva.core.render {
    interface IRenderTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, ctx: RenderContext, region: Rect, tree: IUpdaterTree): boolean;
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
declare module minerva.core.render.tapins {
    var applyClip: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var doRender: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var postRender: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var preRender: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var prepareContext: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var renderChildren: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var restoreContext: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var validate: IRenderTapin;
}
declare module minerva.core.render.tapins {
    var validateRegion: IRenderTapin;
}
declare module minerva.core.sizing {
    interface ISizingTapin extends pipe.ITriTapin {
        (input: IInput, state: IState, output: IOutput, tree: IUpdaterTree): boolean;
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
        public prepare(input: IInput, state: IState, output: IOutput, tree: IUpdaterTree): void;
        public flush(input: IInput, state: IState, output: IOutput, tree: IUpdaterTree): void;
    }
}
declare module minerva.core.sizing.tapins {
    var calcUseRender: ISizingTapin;
}
declare module minerva.core.sizing.tapins {
    var computeActual: ISizingTapin;
}
declare module minerva.controls.border {
    interface IBorderUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, render.IInput {
    }
    class BorderTree extends core.UpdaterTree {
        public isLayoutContainer: boolean;
        public isContainer: boolean;
        public child: core.Updater;
        public walk(direction?: WalkDirection): IWalker<core.Updater>;
    }
    class BorderUpdater extends core.Updater {
        public tree: BorderTree;
        public assets: IBorderUpdaterAssets;
        public init(): void;
    }
}
declare module minerva.controls.border.arrange {
    interface IInput extends core.arrange.IInput {
        padding: Thickness;
        borderThickness: Thickness;
    }
    interface IState extends core.arrange.IState {
        totalBorder: Thickness;
        childRect: Rect;
    }
    interface IOutput extends core.arrange.IOutput {
    }
    class BorderArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor();
        public createState(): IState;
    }
    function preOverride(input: IInput, state: IState, output: IOutput, tree: BorderTree, finalRect: Rect): boolean;
    function doOverride(input: IInput, state: IState, output: IOutput, tree: BorderTree, finalRect: Rect): boolean;
}
declare module minerva.controls.border.measure {
    interface IInput extends core.measure.IInput {
        padding: Thickness;
        borderThickness: Thickness;
    }
    interface IState extends core.measure.IState {
        totalBorder: Thickness;
    }
    interface IOutput extends core.measure.IOutput {
    }
    class BorderMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor();
        public createState(): IState;
    }
    function preOverride(input: IInput, state: IState, output: IOutput, tree: BorderTree, availableSize: Size): boolean;
    function doOverride(input: IInput, state: IState, output: IOutput, tree: BorderTree, availableSize: Size): boolean;
    function postOverride(input: IInput, state: IState, output: IOutput, tree: BorderTree, availableSize: Size): boolean;
}
declare module minerva.controls.border.render {
    interface IInput extends core.render.IInput {
        extents: Rect;
        backgroundBrush: IBrush;
        borderBrush: IBrush;
        borderThickness: Thickness;
        cornerRadius: CornerRadius;
    }
    interface IState extends core.render.IState {
        shouldRender: boolean;
        fillExtents: Rect;
        innerCornerRadius: CornerRadius;
        outerCornerRadius: CornerRadius;
    }
    interface IOutput extends core.render.IOutput {
    }
    class BorderRenderPipeDef extends core.render.RenderPipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.controls.border.render {
    interface IShimState extends IState {
        middleCornerRadius: CornerRadius;
        strokeExtents: Rect;
        pattern: CanvasPattern;
        oldMetrics: any;
    }
    class ShimBorderRenderPipeDef extends BorderRenderPipeDef {
        constructor();
        public createState(): IShimState;
    }
}
declare module minerva.controls.border.render.tapins {
    function calcInnerOuter(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins {
    function calcShouldRender(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins {
    function doRender(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins.shim {
    function calcBalanced(input: IInput, state: IShimState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins.shim {
    function createPattern(input: IInput, state: IShimState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins.shim {
    function doRender(input: IInput, state: IShimState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.border.render.tapins.shim {
    function invalidatePattern(input: IInput, state: IShimState, output: IOutput, ctx: core.render.RenderContext, region: Rect, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.panel {
    interface IPanelUpdaterAssets extends core.IUpdaterAssets, measure.IInput, arrange.IInput, processdown.IInput, render.IInput {
    }
    class PanelUpdater extends core.Updater {
        public assets: IPanelUpdaterAssets;
        public init(): void;
    }
}
declare module minerva.controls.canvas {
    interface ICanvasUpdaterAssets extends panel.IPanelUpdaterAssets, measure.IInput {
    }
    class CanvasUpdater extends panel.PanelUpdater {
        public assets: ICanvasUpdaterAssets;
        public init(): void;
    }
}
declare module minerva.controls.panel.arrange {
    interface IInput extends core.arrange.IInput {
    }
    interface IState extends core.arrange.IState {
        childRect: Rect;
    }
    interface IOutput extends core.arrange.IOutput {
    }
    class PanelArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.controls.canvas.arrange {
    interface IInput extends panel.arrange.IInput {
    }
    interface IState extends panel.arrange.IState {
    }
    interface IOutput extends panel.arrange.IOutput {
    }
    class CanvasArrangePipeDef extends panel.arrange.PanelArrangePipeDef {
        constructor();
    }
}
declare module minerva.controls.canvas.arrange.tapins {
    function doOverride(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean;
}
declare module minerva.controls.panel.measure {
    interface IInput extends core.measure.IInput {
    }
    interface IState extends core.measure.IState {
    }
    interface IOutput extends core.measure.IOutput {
    }
    class PanelMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor();
    }
}
declare module minerva.controls.canvas.measure {
    interface IInput extends panel.measure.IInput {
    }
    interface IState extends panel.measure.IState {
    }
    interface IOutput extends panel.measure.IOutput {
    }
    class CanvasMeasurePipeDef extends panel.measure.PanelMeasurePipeDef {
        constructor();
    }
}
declare module minerva.controls.canvas.measure.tapins {
    function doOverride(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean;
}
declare module minerva.controls.canvas.processup {
    interface IInput extends core.processup.IInput {
    }
    interface IState extends core.processup.IState {
    }
    interface IOutput extends core.processup.IOutput {
    }
    class CanvasProcessUpPipeDef extends core.processup.ProcessUpPipeDef {
        constructor();
    }
}
declare module minerva.controls.canvas.processup.tapins {
    var calcPaintBounds: (input: IInput, state: IState, output: IOutput, vo: core.processup.IProcessVisualOwner, tree: core.IUpdaterTree) => boolean;
}
declare module minerva.controls.panel.processdown {
    interface IInput extends core.processdown.IInput {
        zSorted: core.Updater[];
    }
    interface IState extends core.processdown.IState {
    }
    interface IOutput extends core.processdown.IOutput {
        zSorted: core.Updater[];
    }
    class PanelProcessDownPipeDef extends core.processdown.ProcessDownPipeDef {
        constructor();
        public createOutput(): IOutput;
        public prepare(input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): void;
        public flush(input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): void;
    }
}
declare module minerva.controls.panel.processdown.tapins {
    function processZIndices(input: IInput, state: IState, output: IOutput, vpinput: IInput, tree: core.IUpdaterTree): boolean;
}
declare module minerva.controls.panel.render {
    interface IInput extends core.render.IInput, core.helpers.ISized {
        background: IBrush;
        compositeLayoutClip: Rect;
    }
    class PanelRenderPipeDef extends core.render.RenderPipeDef {
        constructor();
    }
}
declare module minerva.controls.stackpanel {
    interface IStackPanelUpdaterAssets extends panel.IPanelUpdaterAssets, measure.IInput, arrange.IInput {
    }
    class StackPanelUpdater extends panel.PanelUpdater {
        public assets: IStackPanelUpdaterAssets;
        public init(): void;
    }
}
declare module minerva.controls.stackpanel.arrange {
    interface IInput extends panel.arrange.IInput {
        orientation: Orientation;
    }
    interface IState extends panel.arrange.IState {
        childRect: Rect;
    }
    interface IOutput extends panel.arrange.IOutput {
    }
    class StackPanelArrangePipeDef extends panel.arrange.PanelArrangePipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.controls.stackpanel.arrange.tapins {
    function doHorizontal(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean;
}
declare module minerva.controls.stackpanel.arrange.tapins {
    function doOverride(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean;
}
declare module minerva.controls.stackpanel.arrange.tapins {
    function doVertical(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, finalRect: Rect): boolean;
}
declare module minerva.controls.stackpanel.measure {
    interface IInput extends panel.measure.IInput {
        orientation: Orientation;
    }
    interface IState extends panel.measure.IState {
        childAvailable: Size;
    }
    interface IOutput extends panel.measure.IOutput {
    }
    class StackPanelMeasurePipeDef extends panel.measure.PanelMeasurePipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.controls.stackpanel.measure.tapins {
    function doHorizontal(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean;
}
declare module minerva.controls.stackpanel.measure.tapins {
    function doOverride(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean;
}
declare module minerva.controls.stackpanel.measure.tapins {
    function doVertical(input: IInput, state: IState, output: IOutput, tree: core.IUpdaterTree, availableSize: Size): boolean;
}
declare module minerva.engine {
    interface IPass extends core.draft.IDraftPipeData {
        count: number;
        maxCount: number;
    }
    class Surface implements core.ISurface {
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
        public addUpDirty(updater: core.Updater): void;
        public addDownDirty(updater: core.Updater): void;
        public updateLayout(): boolean;
    }
}
declare module minerva.engine {
    function draft(layers: core.Updater[], draftPipe: core.draft.DraftPipeDef, pass: IPass): boolean;
}
declare module minerva.engine {
    function process(down: core.Updater[], up: core.Updater[]): boolean;
}
declare module minerva.shapes {
    class Shape implements core.IShape {
        public stretch: Stretch;
        public fill: IBrush;
        public fillRule: FillRule;
        public stroke: IBrush;
        public strokeThickness: number;
        public strokeStartLineCap: PenLineCap;
        public strokeEndLineCap: PenLineCap;
        public strokeLineJoin: PenLineJoin;
        public strokeMiterLimit: number;
        public actualWidth: number;
        public actualHeight: number;
        public draw(ctx: core.render.RenderContext): core.IShape;
        public doFill(ctx: core.render.RenderContext, region: Rect): core.IShape;
        public doStroke(ctx: core.render.RenderContext, region: Rect): core.IShape;
    }
}
declare module minerva.shapes.rectangle {
    class RectangleShape extends Shape {
        public radiusX: number;
        public radiusY: number;
    }
}
declare module minerva.shapes.shape {
    interface IShapeUpdaterAssets extends core.IUpdaterAssets, render.IInput, sizing.IInput {
    }
    class ShapeUpdater extends core.Updater {
        public assets: IShapeUpdaterAssets;
        constructor();
        public createShape(): Shape;
    }
}
declare module minerva.shapes.shape.arrange {
    class ShapeArrangePipeDef extends core.arrange.ArrangePipeDef {
        constructor();
    }
}
declare module minerva.shapes.shape.measure {
    class ShapeMeasurePipeDef extends core.measure.MeasurePipeDef {
        constructor();
    }
}
declare module minerva.shapes.shape.render {
    interface IInput extends core.render.IInput {
        shape: core.IShape;
        extents: Rect;
        shapeFlags: ShapeFlags;
        stretchXform: number[];
    }
    interface IState extends core.render.IState {
        shouldDraw: boolean;
    }
    interface IOutput extends core.render.IOutput {
    }
    class ShapeRenderPipeDef extends core.render.RenderPipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.shapes.shape.render.tapins {
    function calcShouldDraw(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean;
}
declare module minerva.shapes.shape.render.tapins {
    function draw(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean;
}
declare module minerva.shapes.shape.render.tapins {
    function finishDraw(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean;
}
declare module minerva.shapes.shape.render.tapins {
    function prepareDraw(input: IInput, state: IState, output: IOutput, ctx: core.render.RenderContext, region: Rect): boolean;
}
declare module minerva.shapes.shape.sizing {
    interface IInput extends core.sizing.IInput {
        naturalBounds: Rect;
        stretch: Stretch;
    }
    interface IState extends core.sizing.IState {
        shouldStretch: boolean;
    }
    interface IOutput extends core.sizing.IOutput {
    }
    class ShapeSizingPipeDef extends core.sizing.SizingPipeDef {
        constructor();
        public createState(): IState;
    }
}
declare module minerva.shapes.shape.sizing.tapins {
    function calcShouldStretch(input: IInput, state: IState, output: core.sizing.IOutput, tree: core.IUpdaterTree): boolean;
}
declare module minerva.shapes.shape.sizing.tapins {
    function stretchActual(input: IInput, state: IState, output: core.sizing.IOutput, tree: core.IUpdaterTree): boolean;
}
