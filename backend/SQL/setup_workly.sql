create table Users(
    id serial primary key,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    email varchar(150) unique not null,
    password_hash varchar(255) not null,
    role varchar(30) not null check ( role in ('employee', 'manager') ),
    created_at timestamptz default current_timestamp
);

create table Taxes(
    id serial primary key,
    cas_percentage decimal(5,2) not null ,
    cass_percentage decimal(5,2) not null,
    taxation_percentage decimal(5,2) not null,
    personal_deduction decimal(5,2) not null
);

create table Activities(
    id serial primary key,
    activity_name varchar(30) not null
);

create table TimeEntries(
    id serial primary key,
    user_id int not null,
    activity_id int not null,
    time_start timestamptz not null,
    time_end timestamptz not null,

    constraint fk_time_entries_users
        foreign key (user_id)
        references Users(id),

    constraint fk_time_entries_activities
        foreign key (activity_id)
        references Activities(id)
);

create table HourlyRates(
    user_id int not null,
    activity_id int not null ,
    hourly_rate_gross decimal(10,2) not null,

    constraint pk_hourly_rates
        primary key (user_id, activity_id),

    constraint fk_hourly_rates_users
        foreign key (user_id)
        references Users(id),

    constraint fk_hourly_rates_activities
        foreign key (activity_id)
        references Activities(id)

);

create table TeamMembers(
    manager_id int not null,
    employee_id int not null,

    constraint pk_team_members
        primary key (manager_id, employee_id)
);