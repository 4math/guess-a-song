SELECT 'CREATE DATABASE project'
WHERE NOT EXISTS (
    SELECT
    FROM pg_database
    WHERE datname = 'project'
)\gexec 

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS todos ( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    body VARCHAR NULL,
    published DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS songs ( 
    song_id SERIAL PRIMARY KEY,
    song_name VARCHAR(255) NOT NULL,
    song_author VARCHAR(255) NULL,
    song_path VARCHAR(255) NOT NULL,
    song_genre VARCHAR(15) NOT NULL,
    song_year INT NOT NULL,
    CONSTRAINT songs_genre_check CHECK (song_genre IN ('rap', 'pop', 'rock', 'latvian'))
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(255) NULL,
    date_registered TIMESTAMP NOT NULL,
    is_temporary BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS games ( 
    game_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_ended_at TIMESTAMP NULL,
    game_started_at TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    game_regime VARCHAR(15) NOT NULL,
    CONSTRAINT games_users_fk FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS scoreboard ( 
    score_id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    score_received_at TIMESTAMP NOT NULL,
    user_id INT NOT NULL,
    game_id UUID NOT NULL,
    CONSTRAINT scoreboard_users_fk FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT scoreboard_games_fk FOREIGN KEY (game_id) REFERENCES games (game_id)
);

CREATE TABLE IF NOT EXISTS game_rounds ( 
    game_round_id SERIAL PRIMARY KEY,
    guessing_theme VARCHAR(8) NOT NULL,
    guess_score INT NULL,
    game_round INT NOT NULL,
    game_id UUID NOT NULL,
    song_id INT NOT NULL,
    CONSTRAINT games_rounds_songs_fk FOREIGN KEY (song_id) REFERENCES songs (song_id),
    CONSTRAINT games_rounds_games_fk FOREIGN KEY (game_id) REFERENCES games (game_id),
    CONSTRAINT guessing_theme_check CHECK (guessing_theme IN ('bandName', 'songName'))
);