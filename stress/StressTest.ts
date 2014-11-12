import ITestImpl = require('ITestImpl');

class StressTest implements ITestImpl {
    run (runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any) {
        var all: number[] = [];

        //Pre-run
        for (var i = 0; i < 5; i++) {
            this.runIteration();
        }

        console.profile();
        for (var i = 0; i < runCount; i++) {
            var start = new Date().getTime();
            this.runIteration();
            all.push(new Date().getTime() - start);
            /*
             var status = "Iterations Complete: "
             + (i + 1).toString() + "/" + runCount.toString()
             + "<br /> Total Elapsed: "
             + createTimingString(total);
             onStatus(status);
             */
        }
        console.profileEnd();

        var min = all.reduce((agg, ms) => Math.min(agg, ms), Number.POSITIVE_INFINITY);
        var max = all.reduce((agg, ms) => Math.max(agg, ms), Number.NEGATIVE_INFINITY);
        var total = all.reduce((agg, ms) => agg + ms, 0);
        var avg = total / runCount;
        var sd = calcStdDev(all, total);

        var output = [
            "Count: " + runCount.toString(),
            "Min: " + createTimingString(min),
            "Max: " + createTimingString(max),
            "Total: " + createTimingString(total),
            "Average: " + createTimingString(avg),
            "Std Dev: " + createTimingString(sd)
        ].join("<br />");
        onOutput(output);
    }

    runIteration () {
    }
}

function createTimingString (ms: number): string {
    return ms.toString()
        + "ms ("
        + (ms / 1000).toFixed(1)
        + ")";
}

function calcStdDev (all: number[], total: number): number {
    var avg = total / all.length;
    return Math.sqrt(all.reduce(ms => Math.pow(ms - avg, 2), 0) / all.length);
}

export = StressTest;