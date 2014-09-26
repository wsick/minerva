minerva
=======

Applying microservice architecture to the presentation layer.

Purpose
=======

After building [Fayde](http://github.com/bsick7/fayde) presentation engine, reached a threshold of optimization.  Due to the structure, we could not unit test or performance test pieces of the engine.  Since the engine consisted of monolithic items, any browser profiling resulted in nothing insightful.  Browsers try to convert interpreted code into native code on the fly.  When functions become long, the browsers are overwhelmed and fall back to interpreted code.

We expect a 10x (worst case) to 100x (best case) performance improvement.  We also expect a stable and configurable presentation layer due to the philosophy of unit testing.

Documentation
=======

* See [pipeline](docs/pipeline.md) notes for information on how pipelines work.
* See [engine](docs/engine.md) notes for information on how the presentation engine works.
