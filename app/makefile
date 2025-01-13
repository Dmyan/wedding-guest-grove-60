.PHONY: clean build deploy

clean:
	@echo "==> Cleaning dist folder..."
	@rm -rf dist

install-gh-pages:
	@if ! npm list gh-pages --depth=0 >/dev/null 2>&1; then \
		@echo "  --> Installing gh-pages..."; \
		@npm install gh-pages --save-dev; \
	fi

install-npm-run-all:
	@if ! npm list npm-run-all --depth=0 >/dev/null 2>&1; then \
		@echo "  --> Installing npm-run-all..."; \
		@npm install npm-run-all --save-dev; \
	// else \
	//	@echo "  --> npm-run-all is already installed."; \
	fi

install-dependencies: install-gh-pages install-npm-run-all
	@echo "==> Ensuring required dependencies are installed..."
	@$(MAKE) --no-print-directory install-gh-pages
	@$(MAKE) --no-print-directory install-npm-run-all
	@echo "  --> All requirements are attended !"

build: clean install-dependencies
	@echo "==> Building the project..."
	@npm run build

deploy: build
	@echo "==> Deploying to GitHub Pages..."
	@npx gh-pages -d dist
