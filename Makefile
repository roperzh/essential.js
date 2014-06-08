SHELL=/bin/bash
SOURCE_FILES=src/behavior.js src/core/{map_events,bind,camelize,crawl,sort_methods}.js
VENDOR_FILES=lib/{proto,polyfills}.js

test:
	./node_modules/karma/bin/karma start test/config/basic.conf.js

test-ci:
	./node_modules/karma/bin/karma start test/config/ci.conf.js

doc:
	mkdir docs
	cat src/main.js ${SOURCE_FILES} > docs/essential.js
	./node_modules/docco/bin/docco docs/essential.js
	mv docs/essential.html docs/index.html
	rm -rf docs/essential.js

build:
	cat src/main.js ${VENDOR_FILES} ${SOURCE_FILES}  > essential.js

min:
	./node_modules/uglify-js/bin/uglifyjs --comments "/     [a-z]/i" -m < essential.js > essential.min.js
	wc essential.js
	gzip -9 < essential.js | wc
	gzip -9 < essential.min.js | wc

beautify:
	find {src,test} -type f -name "*.js" -exec js-beautify -r {} \;

.PHONY: test
