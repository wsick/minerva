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
declare module minerva.def {
    interface IPipeAssets {
    }
    interface IPipeState {
    }
    interface IPipeOutput {
    }
    interface IPipe<TAssets extends IPipeAssets, TState extends IPipeState, TOutput extends IPipeOutput> {
        run(assets: TAssets, state: TState, output: TOutput, ...contexts: any[]): boolean;
        initAssets(assets: TAssets): any;
        initState(state: TState): any;
        initOutput(output: TOutput): any;
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
        public initAssets(assets: TAssets): void;
        public initState(state: TState): void;
        public initOutput(output: TOutput): void;
    }
}
interface CanvasRenderingContext2D {
    currentTransform: number[];
}
declare module minerva.def.render {
    class RenderContext {
        static pretransformMatrix(ctx: CanvasRenderingContext2D, mat: number[]): void;
        static clipGeometry(ctx: CanvasRenderingContext2D, geom: IGeometry): void;
    }
}
declare module minerva.def.render {
    interface IRenderTapin extends ITapin {
        (assets: IAssets, state: IState, output: IOutput, ctx: CanvasRenderingContext2D, region: Rect): boolean;
    }
    interface IAssets extends IPipeAssets {
        TotalIsRenderVisible: boolean;
        TotalOpacity: number;
        SurfaceBoundsWithChildren: Rect;
        RenderXform: number[];
        Clip: IGeometry;
        Effect: IEffect;
    }
    interface IState extends IPipeState {
        RenderRegion: Rect;
    }
    interface IOutput extends IPipeOutput {
    }
    interface IEffect {
        PreRender(ctx: CanvasRenderingContext2D): any;
        PostRender(ctx: CanvasRenderingContext2D): any;
    }
    interface IGeometry {
        Draw(ctx: CanvasRenderingContext2D): any;
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
}
declare module minerva.layout {
    interface IRenderPipe extends IPipe<def.render.IAssets, def.render.IState, def.render.IOutput> {
    }
    class Updater {
        private $$render;
        constructor();
        public setRenderPipe(pipedef: def.render.RenderPipe): void;
        public render(ctx: CanvasRenderingContext2D, region: Rect): void;
    }
}
