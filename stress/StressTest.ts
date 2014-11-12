import ITestImpl = require('ITestImpl');

class StressTest implements ITestImpl {
    run (runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any) {
        var all: number[] = [];

        this.prepare();

        //Pre-run
        for (var i = 0; i < 5; i++) {
            this.prepareIteration();
            this.runIteration();
        }

        console.profile();
        for (var i = 0; i < runCount; i++) {
            this.prepareIteration();
            var start = new Date().getTime();
            this.runIteration();
            var dur = new Date().getTime() - start;
            all.push(dur);
        }
        console.profileEnd();

        var min = all.reduce((agg, ms) => Math.min(agg, ms), Number.POSITIVE_INFINITY);
        var max = all.reduce((agg, ms) => Math.max(agg, ms), Number.NEGATIVE_INFINITY);
        var total = all.reduce((agg, ms) => agg + ms, 0);
        var avg = total / runCount;
        var sd = calcStdDev(all, total);

        var status = [
            "Iterations Complete: " + runCount.toString(),
            "Total Elapsed: " + createTimingString(total)
        ].join("<br />");
        onStatus(status);

        var output = [
            "Min: " + createTimingString(min),
            "Max: " + createTimingString(max),
            "Average: " + createTimingString(avg),
            "Std Dev: " + createTimingString(sd)
        ].join("<br />");
        onOutput(output);
    }

    prepare () {

    }

    prepareIteration () {

    }

    runIteration () {
    }
}

function createTimingString (ms: number): string {
    return ms.toString()
        + "ms ("
        + (ms / 1000).toFixed(1)
        + "s)";
}

function calcStdDev (all: number[], total: number): number {
    var avg = total / all.length;
    return Math.sqrt(all.reduce(ms => Math.pow(ms - avg, 2), 0) / all.length);
}

export = StressTest;