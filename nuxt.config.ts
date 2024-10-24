import { serviceLayerConfig } from "./services.config"

const firestoreDbLayer: [string, { install: boolean }] = ["../firebase-base", { install: true }]
const mongoDbLayer: [string, { install: boolean }] = ["../mongo-base", { install: true }]
const postgresDbLayer: [string, { install: boolean }] = ["../postgres-db-layer", { install: true }]
const sqliteDbLayer: [string, { install: boolean }] = ["../sqlite-db-layer", { install: true }]

// Choose a nuxt layer to use. This is done to ensure appropriate code splitting.
function getDbLayer() {
	console.debug("[database-layer] Database Selected: ", serviceLayerConfig.database)

	switch (serviceLayerConfig.database) {
		case "firestore":
			return firestoreDbLayer

		case "mongo":
			return mongoDbLayer

		case "postgres":
			return postgresDbLayer

		case "sqlite":
			return sqliteDbLayer
		default:
			throw new Error(`Unsupported database type: ${serviceLayerConfig.database}`)
	}
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	extends: [getDbLayer()],
})
