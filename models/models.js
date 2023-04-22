const sequelize = require('../config/config')
const {DataTypes} = require('sequelize')

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.UUID,
        unique: true,
        defaultValue:
        DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        comment: 'Unique ID of the todo item',
    },
    title: {
        type: DataTypes.STRING,
        comment: 'description of task',
    },
    done: {
        type: DataTypes.BOOLEAN,
        comment: 'define todo that has already done',
    }
})

module.exports = {
    Todo
}