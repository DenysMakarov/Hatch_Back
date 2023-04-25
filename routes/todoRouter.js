const Router = require('express')
const router = new Router()
const todoController = require('../controllers/todo.controller')

router.post('/',todoController.createTodo)
router.get('/all',todoController.getAllTodos)
router.get('/all/done',todoController.getAllDoneTodos)
router.get('/all/undone', todoController.getAllUndoneTodos)
router.get('/all/done/:title', todoController.getAllDoneTodosByTitle)
router.get('/:id',todoController.getTodoById)
router.put('/:id/update',todoController.updateTitle)
router.put('/:id/done', todoController.updateDone)
router.get('/title/:title', todoController.getTodoByTitle)
router.delete('/delete/:id', todoController.deleteTodo)
router.post('/delete/all', todoController.deleteAllTodos)

module.exports = router


