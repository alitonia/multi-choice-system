START TRANSACTION;

INSERT INTO Role(role_id, name)
VALUES (1, 'admin'),
       (2, 'examiner'),
       (3, 'examinee');


INSERT INTO Question_group(description)
VALUES ('TEST_QT_1'),
       ('TEST_QT_2'),
       ('TEST_QT_3'),
       ('simple')
;

INSERT INTO Question_type(description)
VALUES ('single_answer'),
       ('multiple_answer');

COMMIT;
