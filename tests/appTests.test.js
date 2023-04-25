const chai = require('chai');
const {createTodo} = require("../controllers/todo.controller");
const {Todo} = require("../models/models");
const todoService = require("../services/todo.service");
const expect = chai.expect;



/*
* started created tests but had not enough time...(
* */
// describe('createTodo', () => {
//     it('should create a new todo with a title', async () => {
//         const title = 'Test Todo';
//         const done = true;
//         const { todo, created } = await todoService.createTodo(title, done);
//         console.log(todo)
//         expect(created).to.be.true;
//         expect(todo).to.be.an('object');
//         expect(todo.title).to.equal(title);
//         await Todo.destroy({ where: { id: todo.id } });
//     });
//
//     it('should not create a new todo if title is missing', async () => {
//         const title = 'Test Todo';
//         const done = 'true';
//         const { todo, created } = await todoService.createTodo(title, done);
//         expect(created).to.be.false;
//         expect(todo).to.be.null;
//     });
// });