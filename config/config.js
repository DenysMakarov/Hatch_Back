const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'postgres',
    'postgres',
    '12341234',

    {
        dialect: 'postgres',
        host: 'hatchdatabase.cdqbqb5oryfn.us-east-2.rds.amazonaws.com',
        port: 5432
    },

)

// module.exports = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//
//     {
//         dialect: 'postgres',
//         host: process.env.DB_URL,
//         port: process.env.DB_PORT,
//     }
// )



