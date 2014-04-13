test:
	./node_modules/karma/bin/karma start test/basic.conf.js

test-full:
	./node_modules/karma/bin/karma start test/full.conf.js

.PHONY: test
