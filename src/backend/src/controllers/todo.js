import HttpStatus from "http-status-codes";
import Todo from "../models/todo.js";

export async function getAllTodos(req, res) {
    try {
        const todoList = await Todo.findAll();
        if (!todoList) throw new Error('No Todo List found');
        res.status(HttpStatus.OK).json(todoList);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
}

export async function createNewTodo(req, res) {
    try {
        const todo = Todo.create(req.body);
        if (!todo) throw new Error('Something went wrong saving the Todo');
        res.status(HttpStatus.OK).json({ sucess: true });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
}

export async function deleteTodo(req, res) {
    const { id } = req.params;
    try {
        const removed = await Todo.destroy({
            where: {
                "id": id
            }
        });
        if (!removed) throw Error('Incorrect id was proposed!');
        res.status(HttpStatus.OK).json({ removed: removed });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}