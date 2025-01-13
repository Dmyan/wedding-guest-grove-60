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
	@echo "  --> All requirements are attended !"

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
	@npx serve dist --no-clipboard

# deploy-pro:
# 	@echo "==> Deploying the project (production mode)..."
# 	@npx gh-pages -d dist

deploy-git:
	@echo "==> Publishing the project (Github Pages)..."
	@$(MAKE) --no-print-directory build-prd
	@npx gh-pages -d dist

	@echo "==> Serving the project (Github Pages)..."
	# @echo "  --> Homepage: $(shell node -p "require('./package.json').homepage")"

	@echo "========================================="
	@echo "          \033[32mServing!\033[0m"
	@echo ""
	@echo "  \033[32m- Deployed to:\033[0m   $(shell node -p "require('./package.json').homepage")"
	@echo "========================================="
