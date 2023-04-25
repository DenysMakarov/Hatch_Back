require('dotenv').config()
const cors = require('cors')
const path = require('path')
const express = require('express')
const router = require("./routes");
const sequelize = require("./config/config");
const {Todo} = require('./models/models')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)


const PORT = process.env.PORT || 7000;

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('server has started on ' + PORT + ' port'))
    } catch (err) {
        console.log(err)
    }
}

start()