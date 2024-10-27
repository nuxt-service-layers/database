//TODO: Make this function global
import { getServicesConfig } from "../base/modules/configModule"

export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },

	extends: [getDbLayer()],
})

/**Select the appropriate database layer */
function getDbLayer() {
	const servicesConfig = getServicesConfig()
	const database = servicesConfig.database

	const layers: Record<string, [string, { install: boolean }]> = {
		firestore: ["../firebase", { install: true }],
		mongo: ["../mongo", { install: true }],
		postgres: ["github:nuxt-service-layers/postgres#master", { install: true }],
		sqlite: ["github:nuxt-service-layers/sqlite#master", { install: true }],
	}

	if (layers[database]) return layers[database]

	console.warn("An unsupported database type has been specified in the services.config.ts")
}
