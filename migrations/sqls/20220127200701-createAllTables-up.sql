create table roles(
    id int primary key generated always as identity,
    name varchar(100)
);
create table users(
    id int primary key generated always as identity ,
    username varchar(100) not null ,
    surname varchar(100) not null ,
    patronymic varchar(100)not null ,
    email varchar(100) unique not null ,
    password varchar(1000) not null ,
    role_id  int references roles(id),
    refreshtoken varchar
);
create table specialities(
id int primary key generated always as identity ,
name varchar(100) not null ,
code int not null
);
create table groups(
  	id int  primary key generated always as identity ,
    name varchar(100),
    curator_id int references users(id),
    entry_year date,
    graduation_year date,
    fk_speciality_id  int references specialities(id)
);
create table students(
    id int primary key generated always as identity,
    edobo_id varchar(8),
    fk_group_id int references groups(id)
);
create table courses(
    id int primary key generated always as identity,
    lecturer_id int references users(id),
    practitioner_id int references users(id),
    isCompulsory bool not null ,
    credits int not null ,
    starting_semester int,
    quantity_semester int default 1,
    name varchar(100) not null
);
create table grades(
    student_id int references students(id),
    course_id int references courses(id),
    semester int ,
    primary key (student_id,course_id,semester),
    grade float
);
create table logs(
	id int primary key generated always as identity ,
  	operation_type varchar(100),
 	table_name varchar(10),
  	timeStamp time,
  	changed_by int  references users(id)
)
