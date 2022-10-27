import HttpStatus from "http-status-codes";
import { PgClient } from "../db/index.js";

export async function getAllTodos(req, res) {
    try {
        const todoList = await PgClient.query("select * from todos;");
        if (!todoList) throw new Error('No Todo List found');
        res.status(HttpStatus.OK).json(todoList.rows);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
}

export async function createNewTodo(req, res) {
    try {
        const query = `
            insert into todos (title, body, published)
            values ($1, $2, $3);
        `;
        await PgClient.query(query, Object.values(req.body));
        const queryId = `
            select currval(pg_get_serial_sequence('todos','id'));
        `;
        const todo = await PgClient.query(queryId);
        if (!todo) throw new Error('Something went wrong saving the Todo');
        res.status(HttpStatus.OK).json({ sucess: true, id: todo.rows[0].currval });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: error.message });
    }
}

export async function deleteTodo(req, res) {
    const { id } = req.params;
    try {
        const query = `
            delete from todos
            where id = $1;
        `;
        const removed = await PgClient.query(query, [id]);
        if (!removed) throw Error('Incorrect id was proposed!');
        res.status(HttpStatus.OK).json({ removed: removed.rowCount });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}