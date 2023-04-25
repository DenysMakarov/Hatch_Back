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


const beforeAfter = async () => {
    try {
        await Todo.destroy({truncate: true})

        await Todo.create({title: "wake up", done: false})
        await Todo.create({title: "breakfast", done: false})
        await Todo.create({title: "interview", done: true})
        await Todo.create({title: "task", done: true})
        await Todo.create({title: "get job offer", done: true})
        await Todo.create({title: "happy", done: true})
        await Todo.create({title: "go for a walk with cats", done: false})
        await Todo.create({title: "feed cats", done: false})
        await Todo.create({title: "do the dishes", done: false})
        await Todo.create({title: "make dinner", done: false})
        await Todo.create({title: "go to bad", done: false})
    } catch (err) {
        console.error(err)
    }
}

// beforeAfter()


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