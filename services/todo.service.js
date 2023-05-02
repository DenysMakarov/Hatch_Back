const {Todo} = require("../models/models");
const {Op, literal} = require("sequelize");
const ApiError = require("../errors/ApiError");

module.exports = {
    createTodo: async (title, done=false) => {
        console.log('asdsa')
        if (title){
            const [todo, created] = await Todo.findOrCreate({
                where: { title },
                defaults: { done },
            });
            return {todo, created}
        }
        return null
    },

    /*
    * pagination load only in getAllTodos because only this func is using app, other load func is auxiliary
    * */
    getAllTodos: async (page, pageSize) => {
        const offset = (page -1) * pageSize
        return await Todo.findAll({
            offset,
            limit: pageSize,
            order: [
                [literal("lower(title)"), 'ASC'],
                ['updatedAt', 'DESC']
            ]
        })
    },

    getAllDoneTodos: async () => {
        return await Todo.findAll({
            where: {
                done: true
            },
            order: [
                [literal("lower(title)"), 'ASC'],
                ['updatedAt', 'DESC']
            ]
        })
    },

    getAllUndoneTodos: async () => {
        return await Todo.findAll({
            where: {
                done: false
            },
            order: [
                [literal("lower(title)"), 'ASC'],
                ['updatedAt', 'DESC']
            ]
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

    getTodoByStrongTitle: async (title) => {
        return await Todo.findOne({
            where: {
                title: {
                    [Op.eq]: title
                }
            }
        })
    },

    getAllDoneTodosByTitle: async (title) => {
        return await Todo.findAll({
            where: {
                title: {
                    [Op.iLike]: `%${title}%`
                },
                done: true
            },
            order: [
                [literal("lower(title)"), 'ASC'],
                ['updatedAt', 'DESC']
            ],
            limit: 10
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