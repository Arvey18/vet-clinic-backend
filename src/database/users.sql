-- users table
create table users(
	user_id serial primary key,
	email varchar(255) unique not null,
	password varchar(255) not null,
	roles INT[],
	created_at date default current_date,
	updated_at date default current_date
);

-- users profile table
create table users_profile(
	profile_id serial primary key,
	first_name varchar(255),
	last_name varchar(255),
	display_name varchar(255),
	created_at date default current_date,
	updated_at date default current_date,
	email varchar(255),
	constraint fk_email
	foreign key(email)
	references users(email)
	on delete cascade
	on update cascade
);

-- inser data into users profile
insert into users_profile(first_name, last_name,email)
values('test', 'testlast', 'test2@gmail.com');

-- delete data in users profile
delete from users
where email = 'test3@gmail.com';

-- update data users
update users set email = 'test3@gmail.com'
where email = 'test2@gmail.com';
