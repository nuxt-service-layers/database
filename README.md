# database layer

This layer acts as a entry point for all database operations. This layer will choose a db and
provide a single interface for all db types.

## Getting started

This works with any of the following databases

-   PostgreSQL
-   Sqlite
-   Firestore
-   MongoDB

To select a database include a `services.config.ts` in your project root then choose one of the
following options:

```ts
const serviceLayerConfig = {
	database: "firestore" | "postgres" | "mongo" | "sqlite",
}
```

#### Postgres Connection

Include the following details in your `.env` file.

```ts
PG_URI="postgres://postgres:postgres@localhost:5432/postgres"
# or #
PG_HOST="localhost"
PG_PORT=5432
PG_USERNAME="postgres"
PG_PASSWORD="postgres"
PG_DATABASE="postgres"
```

#### Sqlite Connection

Include the following details in your `.env` file.

```ts
SQLITE_DB_PATH = "path-to-your-db"
```

This path should be relative to <?>

#### MongoDB Connection

... ... ... ... ...

#### Firestore Connection

Include the following details in your `.env` file.

```ts
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
measurementId=
```

## How it works

Using nuxt layers it establishes a connection to your chosen database. The database connection
object is then added to `nitro.context.db` for global server side usage.
