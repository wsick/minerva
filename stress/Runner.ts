interface ITest {
    name: string;
    test: string;
    runCount: number;
}

import ITestImpl = require('ITestImpl');

class Runner {
    constructor (public listEl: HTMLElement, public statusEl: HTMLElement, public outputEl: HTMLElement) {
    }

    init () {
        this.getTests(tests => {
            tests.forEach(test => {
                var li = document.createElement('li');
                var a = document.createElement('a');
                a.href = "javascript:void(0)";
                a.innerText = test.name;
                a.onclick = () => this.run(test);
                li.appendChild(a);
                this.listEl.appendChild(li);
            });
        })
    }

    private run (test: ITest) {
        require([test.test], (type) => {
            var code = new type();
            code.run(test.runCount, this.reportStatus.bind(this), this.reportOutput.bind(this));
        });
    }

    private reportStatus (status) {
        this.statusEl.innerHTML = status;
    }

    private reportOutput (output) {
        this.outputEl.innerHTML = output;
    }

    private getTests (cb: (tests: ITest[]) => any) {
        require(["text!tests.json"], (result) => {
            var res = JSON.parse(result);
            cb && cb(res.tests);
        });
    }
}
export = Runner;