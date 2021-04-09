# loadtest

Simple load-testing project. Has two services, "loader" and "tester". "loader" generates load on "tester" and reports stats about the load to our logging service. "tester" burns CPU to hit exactly N ms of compute per request, so each instance of "tester" can only run a little under 1000/N reqs/sec (as it is single-threaded). The project is meant to do a few things:

1. Configure N to be 100 so each instance of "tester" can only handle about 10 reqs/sec and then slowly ramp up concurrent requests to force scaling up and down.
2. Configure N to be 1 so each instance of "tester" can run 1000 reqs/sec. This is meant to stress test the AVM fronting it by shoving a lot of connections through it. The only way to monitor it is to manually inspect it on the VM it is running on, however.
