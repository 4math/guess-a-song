import HttpStatus from "http-status-codes";
import { PgClient } from "../db/index.js";

export async function getLeaderboard(req, res) {
    try {
        const query = `
            select 
                row_number() over() as number,
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