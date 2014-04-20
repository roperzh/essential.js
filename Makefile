test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-ci:
	./node_modules/karma/bin/karma start test/config/ci.conf.js

.PHONY: test
