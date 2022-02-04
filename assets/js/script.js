class Parallel {
	constructor(p) {
		this.parallelJobs = p.parallelJobs;
		this.results = [];
		this.jobs = [];
		this.activeJobs = 0;
		this.onDone;
		this.index = 0;
	}

	go() {
		for (
			let i = 0;
			i < Math.min(this.parallelJobs, this.jobs.length);
			i++
		) {
			this.next();
		}
	}

	next() {
		const index = this.index;
		this.activeJobs++;

		this.jobs[this.index]((result) => this.onResult(result, index));

		this.index++;
	}

	onResult(result, index) {
		this.results[index] = result;
		this.activeJobs--;

		if (this.jobs[this.index]) {
			this.next();
		} else if (this.activeJobs === 0) {
			this.onDone(this.results);
		}
	}

	job(step) {
		this.jobs.push(step);
		return this;
	}

	done(onDone) {
		this.onDone = onDone;
		this.go();
	}
}

const runner = new Parallel({
	parallelJobs: 4,
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
