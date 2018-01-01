create table user(
	uid int not null primary key auto_increment,
	unname varchar(100) not null,
	pwd varchar(100) not null
)ENGINE=InnoDB DEFAULT CHARSET=utf8;