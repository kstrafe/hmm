js_files = *.js
all:
	js-beautify -r -j $(js_files)
	$(MAKE) lint
lint:
	jslint $(js_files)
