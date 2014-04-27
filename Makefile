SHELL=/bin/bash
SOURCE_FILES=src/behavior.js src/core/{bind,camelize,crawl}.js

test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-ci:
	./node_modules/karma/bin/karma start test/config/ci.conf.js

doc:
	mkdir docs
	cat src/main.j ${SOURCE_FILES} > docs/index.js
	./node_modules/docco/bin/docco docs/index.js
	rm -rf docs/index.js

build:
	cat src/main.js lib/proto.js ${SOURCE_FILES}  > essential.js

min:
	./node_modules/uglify-js/bin/uglifyjs --comments "/     [a-z]/i" -m < essential.js > essential.min.js
	wc essential.js
	gzip -9 < essential.js | wc
	gzip -9 < essential.min.js | wc

.PHONY: test
