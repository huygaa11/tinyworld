drop table if exists users cascade;
drop table if exists challenges cascade;
drop table if exists posts cascade;
-- drop table if exists relations cascade;

create table users (
    uid SERIAL,
    username varchar(50),
    fname varchar(50),
    lname varchar(50),
    email varchar(50),
    age int,
    password varchar(25),
    gender varchar(10), 
    bio text,
    popularity int,    
    picture bytea,
    primary key (uid)
);

create table posts (
    pid SERIAL,
    chalid int,
    username varchar(50),
    post varchar(300),
    primary key (pid)
);

create table challenges (
    chalid SERIAL,
    title text,
    description text,
    username varchar(50),
    primary key (chalid)
);

insert into challenges (title, description, username) values ('Poem Challenge', 'Write a poem that soothes the soul!', 'SomeGuy');

