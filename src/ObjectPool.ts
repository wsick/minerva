module minerva {
    export interface IObjectPool<T> {
        create(): T;
        clone(t: T): T;
        release(t: T);
    }
    export function createObjectPool<T>(ctor: any, init: (t: T) => any, cloner: (t: T, template: T) => any): IObjectPool<T> {
        var available: T[] = [];

        return {
            create (): T {
                var obj = available.pop();
                if (!obj)
                    obj = new ctor();
                init(obj);
                return obj;
            },
            clone (t: T): T {
                var obj = available.pop();
                if (!obj)
                    obj = new ctor();
                cloner(obj, t);
                return obj;
            },
            release (t: T) {
                available.push(t);
            }
        };
    }
}