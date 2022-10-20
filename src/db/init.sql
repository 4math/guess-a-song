SELECT 'CREATE DATABASE project'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'project')\gexec

create table if not exists tutorials (
    id int primary key,
    title varchar(50) not null,
    description varchar(255) null,
    published date not null
);