import path from "path"
const serviceLayerConfig = require(path.join(process.cwd(), "services.config.ts"))

const firestoreDbLayer: [string, { install: boolean }] = [
	"github:nuxt-service-layers/firebase#master",
	{ install: true },
]
const mongoDbLayer: [string, { install: boolean }] = [
	"github:nuxt-service-layers/mongo#master",
	{ install: true },
]

const postgresDbLayer: [string, { install: boolean }] = [
	"github:nuxt-service-layers/postgres#master",
	{ install: true },
]
const sqliteDbLayer: [string, { install: boolean }] = [
	"github:nuxt-service-layers/sqlite#master",
	{ install: true },
]

// Choose a nuxt layer to use.
// This is done to ensure appropriate code splitting
// with no uneeded deps
function getDbLayer() {
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
