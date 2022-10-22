SELECT 'CREATE DATABASE project'
WHERE NOT EXISTS (
    SELECT
    FROM pg_database
    WHERE datname = 'project'
)\gexec 

CREATE TABLE IF NOT EXISTS todos ( 
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    body VARCHAR NULL,
    published DATE NOT NULL
);