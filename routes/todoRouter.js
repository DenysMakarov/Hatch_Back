const Router = require('express')
const router = new Router()
const todoController = require('../controllers/todo.controller')

router
    .route('/')
    .post(todoController.createTodo)

router
    .route('/all')
    .get(todoController.getAllTodos)

router
    .route('/:title')
    .get(todoController.getTodoByTitle)

router
    .route('/:id')
    .get(todoController.getTodo)
    .put(todoController.updateTitle)

router
    .route('/:id/done')
    .put(todoController.updateDone)

router
    .route('/delete/:id')
    .delete(todoController.deleteTodo)

router
    .route('/delete/all')
    .post(todoController.deleteAllTodos)


module.exports = router


