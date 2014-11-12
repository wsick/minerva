import StressTest = require('../StressTest');

class Updater extends StressTest {
    prepare () {

    }

    prepareIteration () {

    }

    runIteration () {
        new minerva.core.Updater();
    }
}
export = Updater;