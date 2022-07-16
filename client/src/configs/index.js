module.exports = {
    development: {
        client: {
            url: 'http://ya.ru'
        },
        server: {
            port: 5000,
            url: 'http://localhost:5000'
        },
        database: {
            client: 'postgresql',
                connection: {
                user: 'username',
                password: 'password',
                database: 'rental_service'
            },
            migrations: {
                tableName: 'migrations',
                directory: './db/migrations'
            }
        },
        jwt: {
            secretKey: 'secret-jwt'
        }
    }
}