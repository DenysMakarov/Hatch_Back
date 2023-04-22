const todoService = require('../services/todo.service')
const ApiError = require("../errors/ApiError");
const {replaceSpacesWithUnderscores} = require("../utils/utils");

/*
* ApiError -> like a template
* */

module.exports = {
    createTodo: async (req, res, next) => {
        try {
            const {title, done} = req.body
            const todoExist = await todoService.getTodoByTitle(title)
            if (todoExist) {
                throw ApiError.conflict('todo has already exist')
            }
            const todo = await todoService.createTodo(replaceSpacesWithUnderscores(title), done)
            return res.status(201).json(todo)
        } catch (err) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    getAllTodos: async (req, res, next) => {
        try {
            const doneTodos = [];
            const undoneTodos = []
            const todos = await todoService.getAllTodos()
            todos.forEach(todo => {
                if (todo.done && doneTodos.length <= 10) doneTodos.push(todo)
                else undoneTodos.push(todo)
            })

            return res.json({doneTodos, undoneTodos})
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    getTodo: async (req, res, next) => {
        const {id} = req.params
        try {
            const todo = await todoService.getTodo(id)
            return res.json(todo)
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    getTodoByTitle: async (req, res, next) => {
        const {title} = req.params
        try {
            const todo = await todoService.getTodoByTitle(title)
            return res.json(todo)
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    updateTitle: async (req, res, next) => {
        const {id} = req.params
        const {title} = req.body

        try {
            const todo = await todoService.updateTitle(title, id)
            return res.json(todo)
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    updateDone: async (req, res, next) => {
        const {id} = req.params

        try {
            const todo = await todoService.updateDone(id)
            return res.json(todo)
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    deleteTodo: async (req, res, next) => {
        const {id} = req.params
        try {
            const todo = await todoService.deleteTodo(id)
            return res.send('done')
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    },

    deleteAllTodos: async (req, res, next) => {
        try {
            const result = await todoService.deleteAllTodos()
            return res.json(result)
        } catch (e) {
            next(ApiError.serverError('smt wrong with server'))
        }
    }

}

