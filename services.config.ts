// This is where ill define any configuration needed //

interface ServiceLayerConfig {
	database: "firestore" | "postgres" | "mongo" | "sqlite"
}

const serviceLayerConfig = {
	database: "postgres",
} as ServiceLayerConfig

export { serviceLayerConfig }
