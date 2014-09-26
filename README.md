minerva
=======

Applying microservice architecture to the presentation layer.

Purpose
=======

After building [Fayde](http://github.com/bsick7/fayde) presentation engine, we reached a threshold of optimization.  Due to the structure, we could not unit test or performance test pieces of the engine.  Since the engine consisted of monolithic items, any browser profiling resulted in nothing insightful.  A sizeable chunk consisted of long functions causing browsers to bail when trying to compile interpreted code to native.

We expect a 10x (worst case) to 100x (best case) performance improvement.  We also expect a stable and configurable presentation layer due to the philosophy of unit testing.

A great side effect of a microservices pipeline architecture is the highly configurable nature.  Currently, presentation code is coupled to controls.  Instead, these pieces of functionality are injected by the defining entities.

Documentation
=======

* See [pipeline](docs/pipeline.md) notes for information on how pipelines work.
* See [engine](docs/engine.md) notes for information on how the presentation engine works.
