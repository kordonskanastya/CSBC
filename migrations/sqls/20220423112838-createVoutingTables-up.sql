create table voating_list(
    id int primary key generated always as identity ,
    fk_group_id int references groups(id),
    semester int not null,
    prof_course_id int[],
    not_prof_course_id int[],
    start_voating timestamp not null,
    finish_voating timestamp not null
);
create table students_voating(
  id int primary key generated always as identity,
  student_id int references students(id),
  prof_course_id int references courses(id),
  not_prof_course_id int references courses(id),
  voate_id int references voating_list(id)
)
