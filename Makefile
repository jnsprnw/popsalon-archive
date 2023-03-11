fetch:
	node api/api.js

dev:
	make fetch
	npm run dev

production:
	make fetch
	npm run build