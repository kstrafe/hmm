js_files = *.js
all:
	js-beautify -n -r -j $(js_files)
	$(MAKE) lint
lint:
	jslint $(js_files)
