## Pipe
* Composed of tapins
* A pipe has a set of methods to help configure the tapin workflow
    * `addTapin(name, tapin)`
    * `addTapinBefore(name, tapin, before)`
    * `addTapinAfter(name, tapin, after)`
    * `replaceTapin(name, tapin)`
    * `removeTapin(name)`
* A pipe also contains 3 methods to configure parameters
    * `initAssets(assets)`
    * `initState(state)`
    * `initOutput(output)`

## Tapin
* A tapin is a function that takes assets, state, output as parameters
* A tapin has a name to reference
* A tapin must return `true`/`false`.  If `false` or nothing is returned, then pipeline will abort.
* A tapin will receive the following 3 input parameters.
    * `assets`
        * Pipeline input
        * Read-only (should not be mutated)
        * Because immutable, assets coming from another pipeline don't need to be copied 
    * `state`
        * Pipeline state parameters
        * Can be mutated by a tapin that is used in a latter tapin
        * Can also be used to reduce memory allocation/deallocation
    * `output`
        * Pipeline output
        * Write-only
        * For layout pipes, the `Updater` expects a certain set of outputs to be set upon pipeline completion
        * Can also be used to report layout errors
* A tapin may receive extra input parameters. Example: RenderPipe has `ctx` and `region` that are used for render pass context.