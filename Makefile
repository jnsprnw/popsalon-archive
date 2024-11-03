fetch:
	bun api/api.ts

dev:
	make fetch
	bun run dev

production:
	make fetch
	bun run build
