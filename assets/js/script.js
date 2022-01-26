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
		let t = this.doneStep.bind(this);
		if(!this.jobCount.includes(step)){
			this.jobCount.push(step)
		}
		if (this.jobsNow < this.parallelJobs) {
			step(t);
			this.jobsNow++;
			return this;
		}

		this.jobs.push(step);

		return this;
	}

	doneStep(param) {
		this.result.push(param);
		this.jobsNow--;
		if (this.jobs.length) {
			let g = this.jobs.shift();
			this.job(g);
			return;
		}
		if (this.doneJob !== undefined && this.jobCount.length === this.result.length) {
			this.doneJob(this.result);
			this.doneJob = undefined
		}

		return;
	}

	done(param) {
		if (!this.jobs.length) {
			param(this.result);
			return;
		}
		this.doneJob = param;
	}
}

const runner = new Parallel({
	parallelJobs: 2,
});
runner.job(step1).job(step2).job(step3).job(step4).done(onDone);

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
	console.assert(Array.isArray(results), "result must be an array");
	console.assert(results.length == 4, "Wrong count of answers");
	console.assert(results[0] === "step1", "Wrong answer 1");
	console.assert(results[1] === "step2", "Wrong answer 2");
	console.assert(results[2] === "step3", "Wrong answer 3");
	console.assert(results[3] === "step4", "Wrong answer 4");
}
