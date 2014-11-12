import ITestImpl = require('ITestImpl');

class StressTest implements ITestImpl {
    run (runCount: number, onStatus: (status: any) => any, onOutput: (output: any) => any) {
        var min = Number.POSITIVE_INFINITY;
        var max = Number.NEGATIVE_INFINITY;
        var total = 0;
        var all: number[] = [];

        for (var i = 0; i < runCount; i++) {
            var start = new Date().getTime();
            this.runIteration();
            var duration = new Date().getTime() - start;
            min = Math.min(min, duration);
            max = Math.max(max, duration);
            total += duration;
            all.push(duration);
            var status = "Iterations Complete: "
                + (i + 1).toString() + "/" + runCount.toString()
                + "<br /> Total Elapsed: "
                + createTimingString(total);
            onStatus(status);
        }

        var avg = total / runCount;
        var sd = calcStdDev(all, total);

        var output = "Min: " + createTimingString(min)
            + "<br />Max: " + createTimingString(max)
            + "<br />Average: " + createTimingString(avg)
            + "<br />Std Dev: " + createTimingString(sd);
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