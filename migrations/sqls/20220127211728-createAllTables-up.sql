create table users(
    id int primary key generated always as identity ,
    username varchar(100) not null ,
    surname varchar(100) not null ,
    patronymic varchar(100)not null ,
    email varchar(100) unique not null ,
    password varchar(1000) not null ,
    role varchar(100),
    refreshToken varchar
);

create table groups(
  	id int primary key generated always as identity,
    name varchar(100),
    curator_id int references users(id),
    order_number varchar(100) not null,
    isDeleted_order_number varchar(100)
);
create table students(
    id int primary key generated always as identity,
    edebo_id varchar(8),
    order_number varchar(100) not null,
    isFull_time bool not null,
    deleted_order_number varchar(100),
    fk_group_id int references groups(id),
    fk_user_id int references users(id)
);
create table courses(
    id int primary key generated always as identity,
    name varchar(100) not null,
    fk_group_id int references groups(id) not null,
    lecturer_id int references users(id) not null,
    isCompulsory bool not null,
    credits int not null,
    lecture_hours int not null,
    semester int not null,
    isActive bool not null,
    check (semester = 1 or semester = 2)
);
create table grades(
    student_id int references students(id),
    course_id int references courses(id),
    semester int,
    primary key (student_id,course_id,semester),
    grade int,
    check (grade > 0 and grade <= 100),
    check (semester >= 1 and semester <= 8)
);
create table logs_grades(
    id int primary key generated always as identity,
    student_id int references students(id),
    previous_grade int,
 	  description json,
    timeStamp timestamp,
    changed_by int references users(id)
);
create table logs_users(
    id int primary key generated always as identity,
    operation_type varchar(100),
    timeStamp timestamp,
    changed_by int references users(id)
);
