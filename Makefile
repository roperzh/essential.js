SHELL=/bin/bash
SOURCE_FILES=src/{main,behavior}.js src/core/{bind,camelize,crawl}.js

test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-ci:
	./node_modules/karma/bin/karma start test/config/ci.conf.js

doc:
	cat ${SOURCE_FILES} > docs/essential.js
	./node_modules/docco/bin/docco docs/essential.js
	rm -rf docs/essential.js

build:
	cat lib/proto.js ${SOURCE_FILES}  > essential.js

min:
	./node_modules/uglify-js/bin/uglifyjs -m < essential.js > essential.min.js
	wc essential.js
	gzip -9 < essential.js | wc
	gzip -9 < essential.min.js | wc

.PHONY: test
