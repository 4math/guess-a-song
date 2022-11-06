import express from "express";
import { createNewTodo, deleteTodo, getAllTodos } from "../controllers/todo.js";
import { getLeaderboard } from "../controllers/leaderboard.js";
import { updateGameRoundScore, startGame, getMaterial, playSong } from "../controllers/game.js";
import { createUser } from "../controllers/user.js";

const Router = express.Router();

Router.get('/', async (req, res) => getAllTodos(req, res));

Router.post('/', async (req, res) => createNewTodo(req, res));

Router.delete('/:id', async (req, res) => deleteTodo(req, res));

Router.get('/leaderboard', async (req, res) => getLeaderboard(req, res));

Router.post('/createUser', async (req, res) => createUser(req, res));

Router.post('/startGame', async (req, res) => startGame(req, res));

Router.get('/playSong/:songPath', async (req, res) => playSong(req, res));

Router.put('/gameRound/:gameId/:round', async (req, res) => updateGameRoundScore(req, res));

Router.get('/material/:gameId/:round', async (req, res) => getMaterial(req, res));

export default Router;