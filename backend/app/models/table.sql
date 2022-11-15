CREATE TABLE users (
    id serial primary key,
    name varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null
);

CREATE TABLE notes(
    id serial primary key,
    user_id int,
    title varchar(255),
    note text,
    date varchar(255),
    private boolean,
    CONSTRAINT fk_users
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
)