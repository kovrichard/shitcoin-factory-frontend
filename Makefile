.PHONY: build start stop restart sh logs test lint

container=shitcoin-factory-frontend

# Build the container
build:
	docker compose build

# Start the container
start:
	docker compose up -d

# Stop the container
stop:
	docker compose stop

# Restart the container
restart: stop start

# Open a shell inside the container
sh:
	docker compose exec $(container) sh

# Watch live logs of the container
logs:
	docker compose logs -f

# Run tests
test:
	docker compose exec $(container) /bin/sh -c "yarn test"

lint:
	docker compose exec -T $(container) /bin/sh -c "yarn eslint '**/*.ts' --fix"
	docker compose exec -T $(container) /bin/sh -c "yarn prettier --write '**/*.ts'"