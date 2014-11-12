import StressTest = require('../StressTest');

class Updater extends StressTest {
    runIteration () {
        new minerva.core.Updater();
    }
}
export = Updater;