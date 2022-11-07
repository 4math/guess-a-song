import HttpStatus from "http-status-codes";
import { PgClient } from "../db/index.js";
import { dateNow } from "./game.js";

export async function getLeaderboard(req, res) {
    try {
        const query = `
            select 
                row_number() over(order by score desc) as number,
                u.user_name as username,
                s.score,
                s.score_received_at as date
            from scoreboard s
            inner join users u on u.user_id = s.user_id
            order by score desc;
        `;
        const scoreboardList = await PgClient.query(query);
        res.status(HttpStatus.OK).json(scoreboardList.rows);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
}

export async function insertIntoLeaderboard(req, res) {
    try {
        const { gameId, userId } = req.body;

        let query = `
            select sum(guess_score) as score
            from game_rounds
            where game_id = $1
            group by game_id;
        `;
        const score = (await PgClient.query(query, [gameId])).rows[0].score;

        query = `
            insert into scoreboard (
                score,
                score_received_at,
                user_id,
                game_id
            ) values (
                $1, $2, $3, $4
            )
        `;

        await PgClient.query(query, [
            score,
            dateNow(),
            userId,
            gameId
        ]);

        res.status(HttpStatus.OK).json(score);
    } catch (error) {
        res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
}