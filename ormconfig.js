let config = {
    type: 'postgres',
    host: 'localhost',
    port: '15432',
    username: 'docker_user',
    password: 'secret',
    database: 'psql_local',
    synchronize: false,
    cache: false,
    logging: false,
    entities: [
      'app/db/entities/**/*.ts',
      'app/db/entities/**/*.js'
    ],
    migrations: [
      'app/db/migrations/**/*.js',
      'app/db/migrations/**/*.ts',
    ],
    // migrationsRun: true,
};

// config.entities = [process.cwd() + "/dist/db/entities/**/*.js"];
// config.migrations = [process.cwd() + "/dist/db/migrations/**/*.js"];
config.cli = {
  entitiesDir: "/app/models",
  migrationsDir: "/app/db/migrations",
};

module.exports = config;
