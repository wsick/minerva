import ITestImpl = require('ITestImpl');

class updater implements ITestImpl {
    run (onStatus: (status: any) => any, onOutput: (output: any) => any) {
        onStatus("started");
        onOutput("completed");
    }
}
export = updater;