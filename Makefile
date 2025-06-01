fetch:
	bun api/api.ts

dev:
	make fetch
	npm run dev

production:
	make fetch
	npm run build
