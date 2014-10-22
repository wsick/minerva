module minerva {
    export var errors = [];

    export function layoutError (tree: core.IUpdaterTree, pipedef: any, message: string) {
        errors.push({
            tree: tree,
            pipedef: pipedef,
            message: message
        });
    }
}