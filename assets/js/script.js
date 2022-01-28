class Parallel {
    constructor(p) {
        this.parallelJobs = p.parallelJobs;
    }

    result = [];
    jobs = [];
    jobsNow = 0;
    doneJob = undefined;
    jobCount = [];

    job(step) {
        let t = this;
        // if (!this.jobCount.includes(step)) {
        //     this.jobCount.push(step);
        // }
        // if (this.jobsNow < this.parallelJobs) {
        //     step(t);
        //     this.jobsNow++;
        //     return this;
        // }

        // this.jobs.push(step);
        async function run() {
            const go = console.log(1)
            await step(go)
            t.jobs.push(step);
        }
        run()



        console.log(this.jobs);

        return this;
    }

    done(param) {
        // this.jobs.forEach((elem) => {
        //     // console.log(this)
        //     this.jobCount.push(elem());
        //     console.log(this.jobCount);
        // });
        param(this.jobs);
    }
}

const runner = new Parallel({
    parallelJobs: 2,
});
runner.job(step1).job(step2).job(step3).job(step4).done(onDone);
// runner.job(step1).job(step2).job(step3).job(step4);

function step1(done) {
    setTimeout(done, 100, "step1");
}

function step2(done) {
    setTimeout(done, 10, "step2");
}

function step3(done) {
    setTimeout(done, 150, "step3");
}

function step4(done) {
    setTimeout(done, 50, "step4");
}

function onDone(results) {
    console.log(results);
    console.assert(Array.isArray(results), "result must be an array");
    console.assert(results.length == 4, "Wrong count of answers");
    console.assert(results[0] === "step1", "Wrong answer 1");
    console.assert(results[1] === "step2", "Wrong answer 2");
    console.assert(results[2] === "step3", "Wrong answer 3");
    console.assert(results[3] === "step4", "Wrong answer 4");
}