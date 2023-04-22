const {Todo} = require("../models/models");
const {Op} = require("sequelize");

module.exports = {
    createTodo: async (title, done=false) => {
        return await Todo.create({title, done});
    },

    getAllTodos: async () => {
        return await Todo.findAll({
            order: [['title', 'ASC']]
        })
    },

    getTodo: async (id) => {
        return await Todo.findByPk(id)
    },

    getTodoByTitle: async (title) => {
        return await Todo.findOne({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        })
    },

    updateTitle: async (title, id) => {
        return await Todo.update({title}, {where: {id}})
    },

    updateDone: async (id) => {
        const {done} = await Todo.findByPk(id)
        return await Todo.update({done: !done}, {where: {id}})
    },

    deleteTodo: async (id) => {
        return await Todo.destroy({where: {id}})
    },

    deleteAllTodos: async () => {
        const count = await Todo.count()
        await Todo.destroy({where: {}, truncate: true})
        return count
    }
}