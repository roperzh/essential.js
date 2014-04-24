SHELL=/bin/bash

test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-ci:
	./node_modules/karma/bin/karma start test/config/ci.conf.js

build:
	cat lib/proto.js src/{behavior,bind,camelize,crawler,main}.js > essential.js

min:
	./node_modules/uglify-js/bin/uglifyjs -m < essential.js > essential.min.js
	wc essential.js
	gzip -9 < essential.js | wc
	gzip -9 < essential.min.js | wc

.PHONY: test
