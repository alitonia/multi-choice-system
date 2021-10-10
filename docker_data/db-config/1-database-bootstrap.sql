use mana;

create table Permission
(
    permission_id      int AUTO_INCREMENT PRIMARY KEY,
    permission_content varchar(100)
);

create table Role
(
    role_id int AUTO_INCREMENT PRIMARY KEY,
    name    varchar(30)
);

create table PermissionForRole
(
    permission_id int NOT NULL,
    role_id       int NOT NULL,
    FOREIGN KEY (permission_id) REFERENCES Permission (permission_id),
    FOREIGN KEY (role_id) REFERENCES Role (role_id)
);

create table Account
(
    account_id    int AUTO_INCREMENT PRIMARY KEY,
    email         varchar(256) NOT NULL UNIQUE,
    hash_password BINARY(60)   NOT NULL,
    salt          BINARY(29)   NOT NULL,
    name          varchar(50)  NOT NULL,
    date_of_birth DATE         NOT NULL,
    phone_number  varchar(50),
    enable        BOOLEAN      NOT NULL DEFAULT TRUE,
    role_id       int,
    FOREIGN KEY (role_id) REFERENCES Role (role_id),
    CHECK ( email REGEXP '^[a-zA-Z0-9][+a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]*\\.[a-zA-Z]{2,4}$')
);

create table Admin
(
    account_id int NOT NULL,
    FOREIGN KEY (account_id) REFERENCES Account (account_id)
);

create table Examiner
(
    account_id int NOT NULL,
    department varchar(50),
    FOREIGN KEY (account_id) REFERENCES Account (account_id)
);

create table Examinee
(
    account_id  int NOT NULL,
    class       varchar(50),
    major       varchar(50),
    examinee_id varchar(10), # this is just meta data
    FOREIGN KEY (account_id) REFERENCES Account (account_id)
);

create table Exam
(
    exam_id    int AUTO_INCREMENT PRIMARY KEY,
    exam_name  varchar(50) NOT NULL,
    subject    varchar(50) NOT NULL,
    creator    int         NOT NULL,
    start_time TIMESTAMP   NOT NULL,
    duration   TIME        NOT NULL,
    FOREIGN KEY (creator) REFERENCES Examiner (account_id),
    CHECK ( duration between '00:00:00' and '24:00:00')
);

create table Question_group
(
    question_group_id int AUTO_INCREMENT PRIMARY KEY,
    description       varchar(50)
);

create table Question_type
(
    question_type_id int AUTO_INCREMENT PRIMARY KEY,
    description      varchar(50)
);

create table Grading_rule
(
    rule_id           int AUTO_INCREMENT PRIMARY KEY,
    rule_content      varchar(150),
    exam_id           int NOT NULL,
    question_group_id int NOT NULL,
    question_type_id  int NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES Exam (exam_id),
    FOREIGN KEY (question_group_id) REFERENCES Question_group (question_group_id),
    FOREIGN KEY (question_type_id) REFERENCES Question_type (question_type_id)
);

create table Question
(
    question_id       int AUTO_INCREMENT PRIMARY KEY,
    question_content  TEXT NOT NULL,
    exam_id           int  NOT NULL,
    question_group_id int  NOT NULL,
    question_type_id  int  NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES Exam (exam_id) on delete cascade on update cascade,
    FOREIGN KEY (question_group_id) REFERENCES Question_group (question_group_id),
    FOREIGN KEY (question_type_id) REFERENCES Question_type (question_type_id)
);

create table Answer
(
    answer_id   int AUTO_INCREMENT PRIMARY KEY,
    content     TEXT    NOT NULL,
    is_correct  BOOLEAN NOT NULL DEFAULT FALSE,
    question_id int     NOT NULL,
    FOREIGN KEY (question_id) REFERENCES Question (question_id) on delete cascade on update cascade
);

create table Choice
(
    question_id         int NOT NULL,
    answer_id           int NOT NULL,
    examinee_account_id int NOT NULL,
    FOREIGN KEY (examinee_account_id) REFERENCES Examinee (account_id),
    FOREIGN KEY (answer_id) REFERENCES Answer (answer_id),
    FOREIGN KEY (question_id) REFERENCES Question (question_id)
);

create table Exam_log
(
    log_id              int AUTO_INCREMENT PRIMARY KEY,
    examinee_account_id int         NOT NULL,
    exam_id             int         NOT NULL,
    action              varchar(50) NOT NULL,
    time                TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (examinee_account_id) REFERENCES Examinee (account_id),
    FOREIGN KEY (exam_id) REFERENCES Exam (exam_id)
);

create table Participant
(
    exam_id             int NOT NULL,
    examinee_account_id int NOT NULL,
    FOREIGN KEY (exam_id) REFERENCES Exam (exam_id) on delete cascade on update cascade,
    FOREIGN KEY (examinee_account_id) REFERENCES Examinee (account_id)
)
