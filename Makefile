
run-dev:
	uv run fastapi dev

run-e2e-test:
	pytest tests/e2e

run-test:
	pytest tests/service

build:
	uv build