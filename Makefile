test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-full:
	./node_modules/karma/bin/karma start test/config/full.conf.js

.PHONY: test
