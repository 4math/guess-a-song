import express from "express";
import { createNewTodo, deleteTodo, getAllTodos } from "../controllers/todo.js";
import { getLeaderboard } from "../controllers/leaderboard.js";

const Router = express.Router();

Router.get('/', async (req, res) => getAllTodos(req, res));

Router.post('/', async (req, res) => createNewTodo(req, res));

Router.delete('/:id', async (req, res) => deleteTodo(req, res));

Router.get('/leaderboard', async (req, res) => getLeaderboard(req, res));

export default Router;