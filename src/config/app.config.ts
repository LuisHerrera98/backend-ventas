export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    database_uri: process.env.DATABASE_MONGO_URI,
    port: process.env.PORT || 3001,
})