import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		viewportWidth: 1920,
		viewportHeight: 1080,
		baseUrl: 'http://localhost:3000',
		projectId: 'm3k73z',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
