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
    salt          BINARY(29)   NOT NULL
)
