.PHONY: clean build deploy install-dependencies install-gh-pages install-npm-run-all

clean:
	@echo "==> Cleaning dist folder..."
	@rm -rf dist

install-gh-pages:
	@if ! npm list gh-pages --depth=0 >/dev/null 2>&1; then \
		echo "  --> Installing gh-pages..."; \
		npm install gh-pages --save-dev; \
	fi

install-npm-run-all:
	@if ! npm list npm-run-all --depth=0 >/dev/null 2>&1; then \
		echo "  --> Installing npm-run-all..."; \
		npm install npm-run-all --save-dev; \
	fi

install-dependencies:
	@echo "==> Ensuring required dependencies are installed..."
	@$(MAKE) --no-print-directory install-gh-pages
	@$(MAKE) --no-print-directory install-npm-run-all
	@echo "  --> All requirements are attended!"

build: build-dev
deploy: deploy-dev

build-dev: clean install-dependencies
	@echo "==> Building the project (development mode)..."
	@npm run build:dev

build-prd: clean install-dependencies
	@echo "==> Building the project (production mode)..."
	@npm run build:prd

deploy-dev: build-dev
	@echo "==> Serving the project locally (development mode)..."
	@npx serve dist

deploy-prd: build
	@echo "==> Deploying the project (production mode)..."
	@npx gh-pages -d dist
