import path from "path"

let serviceLayerConfig: ServiceConfig

try {
	serviceLayerConfig = require(path.join(process.cwd(), "services.config.ts"))
} catch (error) {
	serviceLayerConfig = ""
}

const firestoreDbLayer: [string, { install: boolean }] = [
	// "github:nuxt-service-layers/firebase#master",
	"../firebase",
	{ install: true },
]
const mongoDbLayer: [string, { install: boolean }] = [
	// "github:nuxt-service-layers/mongo#master",
	"../mongo",
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

		case undefined:
			console.warn(
				"[database-connection] An error occured when trying to access services.config.ts database option.",
			)
			break

		default:
			console.warn("[database-connection] An unsupported database type was provided.")
			break
	}
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	extends: [getDbLayer()],
})
