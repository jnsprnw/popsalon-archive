fetch:
	bun api/api.ts

dev:
	make fetch
	bun run dev

production:
	bun install
	make fetch
	bun run build
