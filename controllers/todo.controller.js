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
            const {todo, created} = await todoService.createTodo(title, done)
            if (!created) return next(ApiError.conflict('already created'))
            return res.status(201).json(todo)
        } catch (err) {
            next(next(ApiError.serverError(`smt wrong with server: ${err}`)))
        }
    },

    getAllTodos: async (req, res, next) => {
        try {
            const doneTodos = [];
            const undoneTodos = []
            const todos = await todoService.getAllTodos()
            todos.forEach(todo => {
                if (todo.done) doneTodos.push(todo)
                else undoneTodos.push(todo)
            })
            return res.json({doneTodos, undoneTodos})
        } catch (err) {
            next(ApiError.serverError(`smt wrong with server: ${err}`))
        }
    },

    getAllDoneTodos: async (req, res, next) => {
        try {
            const todos = await todoService.getAllDoneTodos()
            return res.json(todos)
        } catch (err) {
            next(ApiError.serverError(`smt wrong with server: ${err}`))
        }
    },

    getAllUndoneTodos: async (req, res, next) => {
        try {
            const todos =  await todoService.getAllUndoneTodos()
            return res.json(todos)
        } catch (err) {
            next(ApiError.serverError(`smt wrong with server: ${err}`))
        }
    },

    getTodoById: async (req, res, next) => {
        const {id} = req.params
        try {
            const todo = await todoService.getTodoById(id)
            return res.json(todo)
        } catch (e) {
            next(ApiError.serverError(`smt wrong with server: ${err}`))
        }
    },

    getTodoByTitle: async (req, res, next) => {
        const {title} = req.params
        try {
            const todo = await todoService.getTodoByTitle(title)
            return res.json(todo)
        } catch (err) {
            next(ApiError.serverError(`smt wrong with server: ${err}`))
        }
    },

    getAllTodosByTitle: async (req, res, next) => {
        try {
            const {title} = req.params
            const todos = await todoService.getAllDoneTodosByTitle(title)
            return res.json(todos)
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
        } catch (err) {
            next(next(ApiError.serverError(`smt wrong with server: ${err}`)))
        }
    },

    updateDone: async (req, res, next) => {
        const {id} = req.params

        try {
            const todo = await todoService.updateDone(id)
            return res.json(todo)
        } catch (err) {
            next(next(ApiError.serverError(`smt wrong with server: ${err}`)))
        }
    },

    deleteTodo: async (req, res, next) => {
        const {id} = req.params
        try {
            await todoService.deleteTodo(id)
            return res.send('done')
        } catch (err) {
            next(next(ApiError.serverError(`smt wrong with server: ${err}`)))
        }
    },

    deleteAllTodos: async (req, res, next) => {
        try {
            const result = await todoService.deleteAllTodos()
            return res.json(result)
        } catch (err) {
            next(next(ApiError.serverError(`smt wrong with server: ${err}`)))
        }
    }

}

