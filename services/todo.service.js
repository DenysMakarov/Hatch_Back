const {Todo} = require("../models/models");
const {Op, literal} = require("sequelize");

module.exports = {
    createTodo: async (title, done=false) => {
        const [todo, created] = await Todo.findOrCreate({
            where: { title },
            defaults: { done },
        });
        return {todo, created}
    },

    getAllTodos: async () => {
        return await Todo.findAll({
            order: literal("lower(title) ASC")
        })
    },

    getAllDoneTodos: async () => {
        return await Todo.findAll({
            where: {
                done: true
            },
            order: [['title', 'ASC']]
        })
    },

    getAllUndoneTodos: async () => {
        return await Todo.findAll({
            where: {
                done: false
            },
            order: [['title', 'ASC']]
        })
    },

    getTodoById: async (id) => {
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