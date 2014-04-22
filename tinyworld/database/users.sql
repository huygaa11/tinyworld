drop table if exists users cascade;
-- drop table if exists posts cascade;
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
    hobbies text[],
    popularity int,    
    picture bytea,
    primary key (uid)
);
/*
create table challenges(
    cid SERIAL,
    cname varchar(50),
    
);
*/

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
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('huygaa11', 'John', 'Doe', 18, 'helloo1', '{{"bike"},{"tennis"},{""}}' ,'Male', 64);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test1', 'Hillel', 'Tase', 24, 'helloo2', '{{"ballet"},{"tea sets"},{"rocks"}}' ,'Female', 36);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test2', 'Zachary', 'Onisim', 15, 'helloo3', '{{"dodgeball"},{"wolves"},{"magic tricks"}}' ,'Male', 55);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test3', 'Konstantyn', 'Bede', 26, 'helloo4', '{{"sperheroes"},{"camping"},{"martial arts"}}' ,'Male', 5);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test4', 'Artur', 'Donny', 38, 'helloo5', '{{"movies"},{"gaming"},{"television"}}' ,'Male', 70);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test5', 'Harun', 'Bairre', 14, 'helloo6', '{{"pop music"},{"basketball"},{"comedies"}}' ,'Female', 66);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test6', 'Padma', 'Teemu', 19, 'helloo7', '{{"war memorabilia"},{"ferrets"},{"classic music"}}' ,'Female', 90);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test7', 'Carolus', 'Searlas', 36, 'helloo8', '{{"sailboats"},{"carpentry"},{"fortune-telling"}}' ,'Female', 69);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test8', 'Cassius', 'Kruno', 35, 'helloo9', '{{"jewelry"},{"folklore"},{"Medieval weaponry"}}' ,'Female', 93);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test9', 'Dimitri', 'Mohan', 20, 'helloo10', '{{"Sherlock Holmes"},{"law"},{"aternative music"}}' ,'Female', 97);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test10', 'Mary', 'Estebe', 34, 'helloo11', '{{"dolls"},{"tea"},{"country music"}}' ,'Female', 90);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test11', 'Cezar', 'Mani', 18, 'helloo12', '{{"alchemy"},{"telescopes"},{"Arthurian lore"}}' ,'Male', 15);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test12', 'Oliver', 'Nathan', 19, 'helloo13', '{{"justice"},{"swimming"},{"calligraphy"}}' ,'Female', 63);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test13', 'Vibius', 'Mirek', 12, 'helloo14', '{{"motorcycles"},{"writing"},{"piano"}}' ,'Male', 92);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test14', 'Hipolito', 'Krastyu', 11, 'helloo15', '{{"obscure triva"},{"glassware"},{"run"}}' ,'Male', 10);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test15', 'Wystan', 'Mikala', 32, 'helloo16', '{{"running"},{"sleeping"},{"eating"}}' ,'Male', 74);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test16', 'Tranter', 'Theophanes', 18, 'helloo17', '{{"k-pop"},{"play LOL"},{"Facebook"}}' ,'Male', 47);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test17', 'Laka', 'Govad', 28, 'helloo18', '{{"soccer"},{"reading"},{"singing"}}' ,'Female', 28);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test18', 'Randel', 'Kai', 31, 'helloo19', '{{"table tennis"},{"camera"},{"texting"}}' ,'Female', 33);
insert into users (username, fname, lname, age, password, hobbies, gender, popularity) values ('test19', 'Mattin', 'Jozef', 27, 'helloo20', '{{"climbing"},{"movie"},{"gym"}}' ,'Male', 41);

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
--  (1, 6),
--  (2, 4),
--  (3, 6),
--  (4, 2),
--  (5, 5),
--  (6, 1),
--  (7, 3);
