module minerva {
    export function singleton (type: Function): any {
        var x = <any>type;
        if (!x.$$instance)
            x.$$instance = new x();
        return x.$$instance;
    }
}