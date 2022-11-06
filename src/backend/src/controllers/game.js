
import HttpStatus from "http-status-codes";
import { PgClient } from "../db/index.js";
import moment from "moment";
import "moment-timezone";
import { getAudioDurationInSeconds } from 'get-audio-duration';
import MP3Cutter from "mp3-cutter/lib/cutter.js";
import fs from 'fs';


async function cutSong(songPath, fragmentDuration) {
    const duration = await getAudioDurationInSeconds(songPath);
    const start = duration * 0.2;
    const end = duration * 0.7;
    const cuttingStart = Math.random() * (end - fragmentDuration - start) + start;
    const cutPath = `music/cut/${songPath.split("/").pop()}`;
    MP3Cutter.cut({
        src: songPath,
        target: cutPath,
        start: cuttingStart,
        end: Math.ceil(cuttingStart + fragmentDuration)
    });
    return cutPath;
}

export async function playSong(req, res) {
    const songPath = req.params.songPath;
    fs.stat(songPath, (err, stat) => {

        res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Connection': 'Keep-Alive',
            'Transfer-encoding': 'chunked',
            'Content-Length': stat.size
        });

        const highWaterMark = 32;
        const stream = fs.createReadStream(songPath, { highWaterMark });

        stream.on('end', () => console.log('End of streaming'));

        stream.pipe(res);
    });
}

export async function getMaterial(req, res) {
    try {
        const gameId = req.params.gameId;
        const gameRound = req.params.round;

        let query = `
            select 
                g.guessing_theme,
                s.song_name,
                s.song_author,
                s.song_path
            from game_rounds g
            inner join songs s on s.song_id = g.song_id
            where g.game_id = $1 and
            g.game_round = $2;
        `;

        const correctSongResult = (await PgClient.query(query, [gameId, gameRound])).rows[0];

        query = `
            select
                song_author,
                song_name
            from songs s 
            inner join games g on g.game_id = $1
            where song_genre like g.game_regime
            order by random()
            limit 3;
        `;

        const incorrectAnswersQuery = (await PgClient.query(query, [gameId])).rows;
        const incorrectAnswers = incorrectAnswersQuery.map(
            x => correctSongResult.guessing_theme === "bandName" ? x.song_author : x.song_name
        );

        const cutSongPath = await cutSong(correctSongResult.song_path, 15);
        const results = {
            guessingTheme: correctSongResult.guessing_theme,
            correctAnswer: correctSongResult.guessing_theme === "bandName" ? correctSongResult.band_name : correctSongResult.song_name,
            incorrectAnswers: incorrectAnswers,
            songPath: cutSongPath
        };

        res.status(HttpStatus.OK).json(results);
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}

export async function putGameRoundScore(req, res) {
    try {
        const { score } = req.body;
        const gameId = req.params.gameId;
        const gameRound = req.params.round;

        const query = `
            update game_rounds
            set guess_score = $1
            where game_id = $2 and
            game_round = $3
        `;

        let result = await PgClient.query(query, [score, gameId, gameRound]);

        if (result.rowCount !== 1) {
            res.status(HttpStatus.BAD_REQUEST).json({ success: false });
        }

        res.status(HttpStatus.OK).json({ success: true });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}

export async function startGame(req, res) {
    try {
        const { username, genre } = req.body;
        let query = `
            select user_id from users where user_name = $1;
        `;

        const userIds = await PgClient.query(query, [username]);

        if (userIds.rows.length !== 1) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Such user does not exist!" });
            return;
        }

        if (genre !== "rock" && genre !== "pop" && genre !== "latvian" && genre !== "rap") {
            res.status(HttpStatus.BAD_REQUEST).json({ message: "Incorrect genre" });
            return;
        }

        const userId = userIds.rows[0];

        query = `
            insert into games (game_started_at, user_id, game_regime) values ($1, $2, $3) returning game_id;
        `;
        const gameId = (await PgClient.query(query, [
            moment(new Date()).tz("Europe/Riga").format("YYYY-MM-DDTHH:mm:ss"),
            userId.user_id,
            genre
        ])).rows[0];

        query = `
            select song_id
            from songs
            where song_genre like $1
            order by random()
            limit 10
        `;

        const songIds = await PgClient.query(query, [genre]);

        const guessingThemes = ["songName", "bandName"];

        let i = 1;
        for (let songId of songIds.rows) {
            query = `
                insert into game_rounds (
                    guessing_theme,
                    guess_score,
                    game_round,
                    game_id,
                    song_id
                ) values ($1, NULL, $2, $3, $4)
            `;

            await PgClient.query(query, [
                guessingThemes[Math.floor(Math.random() * 2)],
                i++,
                gameId.game_id,
                songId.song_id
            ]);
        }

        res.status(HttpStatus.OK).json({ gameId: gameId.game_id });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
}