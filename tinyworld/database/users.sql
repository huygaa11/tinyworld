drop table if exists users cascade;
-- drop table if exists posts cascade;
-- drop table if exists relations cascade;

create table users (
    uid SERIAL,
    uname varchar(50),
    fname varchar(50),
    lname varchar(50),
    age integer,
    password varchar(25),
    picture bytea,
    posts text[],
    primary key (uid)
);
/*
create table posts (
	pid SERIAL,
	username varchar(50),
	post varchar(300),
	primary key (pid)
);
*/

/*
create table relations (
	uid int,
	pid int,
	foreign key (uid) references users,
	foreign key (pid) references posts,
	unique(uid,pid)
);
*/
insert into users (uname, fname, lname, age, password, picture, posts) values 
('JDoe11', 'John', 'Doe', 18, 'hellooxxxxx', 'picture', '{"hi", "yeah", "bla"}');

/*
insert into users (fname, lname, password, age) values ('John', 'Doe', 'xxxx', 27);
insert into users (fname, lname, password, age) values ('Jane', 'Doe', 'yyyy', 28);
insert into users (fname, lname, password, age) values ('Bill', 'Flood', 'aaaa', 29);
insert into users (fname, lname, password, age) values ('Veb', 'Nordhagen', 'bbbb', 30);
insert into users (fname, lname, password, age) values ('Hazel', 'Nutting', 'cccc', 4);
insert into users (fname, lname, password, age) values ('Caleb', 'Manu', 'dddd', 7);
insert into users (fname, lname, password, age) values ('Aiden', 'Hall', 'eeee', 19);
*/
--insert into address values (1, '1 mallard drive', 'cambridge', 'MA', '34567');
--insert into address values (2, '21 jump street', 'new york', 'NY', '98765');
--insert into address values (3, '4 cherry lane', 'truffala', 'NJ', '58235');
--insert into address values (4, '16 strong road', 'chutney', 'VT', '38573');
--insert into address values (5, '99 livingston circle', 'amherst', 'MA', '99822');
--insert into address values (6, '1123 main street', 'worcester', 'MA', '22234');

--insert into lives values
--	(1, 6),
--	(2, 4),
--	(3, 6),
--	(4, 2),
--	(5, 5),
--	(6, 1),
--	(7, 3);
