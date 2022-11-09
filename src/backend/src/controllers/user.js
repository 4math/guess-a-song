import HttpStatus from "http-status-codes";
import moment from "moment";
import { PgClient } from "../db/index.js";
import { dateNow } from "./game.js";

export async function createUser(req, res) {
    try {
        const { username } = req.body;
        let query = `
            select count(*) from users where user_name = $1;
        `;

        const user_exists = (await PgClient.query(query, [username])).rows[0].count === 1;

        if (user_exists) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Such user already exist!" });
            return;
        }

        query = `
            insert into users (
                user_name,
                password,
                date_registered,
                is_temporary
            ) values (
                $1,
                NULL,
                $2,
                TRUE
            ) returning user_id;
        `;

        const userId = (await PgClient.query(query, [
            username,
            dateNow()
        ])).rows[0];

        res.status(HttpStatus.OK).json({ userId: userId.user_id });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}