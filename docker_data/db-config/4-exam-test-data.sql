START TRANSACTION;

-- All pass is 123456
INSERT INTO Account(email, hash_password, salt, name, date_of_birth, phone_number, enable, role_id)
VALUES ('test_examiner_1@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffer_examiner_1', '1999-06-06', '0123456788', 'TRUE', 2),

       ('test_examiner_2@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffer_examiner_2', '1999-06-06', '0123456788', 'TRUE', 2),

       ('test_examinee_1@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffee_1', '1999-06-06', '0123456788', 'TRUE',
        3),
       ('test_examinee_2@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffee_2', '1999-06-06', '0123456788', 'TRUE', 3),

       ('test_examinee_3@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffee_3', '1999-06-06', '0123456788', 'TRUE', 3),

       ('test_examinee_4@mana.itss', '$2b$12$ZbkgdN0j5Aib6r/gTvuYJOCmGCmjEHTLbisP7MNcbcjiBIsUMo9sW',
        '$2b$12$ZbkgdN0j5Aib6r/gTvuYJO', 'fluffee_4', '1999-06-06', '0123456788', 'TRUE', 3);


INSERT INTO Examiner(account_id, department)
SELECT account_id, ('Natural Science' || account_id)
FROM Account
WHERE email in ('test_examiner_1@mana.itss', 'test_examiner_2@mana.itss');


INSERT INTO Examinee(account_id)
SELECT account_id
FROM Account
WHERE email IN (
                'test_examinee_1@mana.itss', 'test_examinee_2@mana.itss',
                'test_examinee_3@mana.itss', 'test_examinee_4@mana.itss'
    );



INSERT INTO Exam(creator, exam_name, subject, start_time, duration)
SELECT account_id, 'First alitonia test', 'DB', '2021-12-31 12:05:06', '04:05'
FROM Account
WHERE email = 'test_examiner_1@mana.itss';

INSERT INTO Exam(creator, exam_name, subject, start_time, duration)
SELECT account_id, 'Second alitonia test', 'DB', '2021-12-01 12:05:06', '02:35'
FROM Account
WHERE email = 'test_examiner_2@mana.itss';


INSERT INTO Participant
SELECT Exam.exam_id, account_id
FROM Account,
     Exam
WHERE email IN (
                'test_examinee_1@mana.itss', 'test_examinee_2@mana.itss'
    )
  and Exam.exam_name = 'Second alitonia test';

INSERT INTO Participant
SELECT Exam.exam_id, account_id
FROM Account,
     Exam
WHERE email IN (
                'test_examinee_1@mana.itss', 'test_examinee_2@mana.itss',
                'test_examinee_3@mana.itss', 'test_examinee_4@mana.itss'
    )
  and Exam.exam_name = 'First alitonia test';

WITH temp_content as (
    SELECT *
    FROM unnest(ARRAY [
        'test_content_1',
        'test_content_2',
        'test_content_3',
        'test_content_4',
        'test_content_5',
        'test_content_6',
        'test_content_7',
        'test_content_8',
        'test_content_9'
        --         'test_content_10',
--         'test_content_11',
--         'test_content_12',
--         'test_content_13',
--         'test_content_14',
--         'test_content_15',
--         'test_content_16',
--         'test_content_17',
--         'test_content_18',
--         'test_content_19'
        ])
)

INSERT
INTO Question(question_content, exam_id, question_group_id, question_type_id)
SELECT temp_content.*, exam_id, question_group_id, question_type_id
FROM Exam,
     Question_group,
     Question_type,
     temp_content
WHERE Exam.exam_name = 'First alitonia test'
  and Question_group.description = 'TEST_QT_1'
  and Question_type.description = 'single_answer';

UPDATE Question
set question_type_id = 2
where question_content like '%2'
   or question_content like '%4';
;

INSERT INTO Answer(content, is_correct, question_id)
select 'answer_1', FALSE, question_id
FROM Question;

INSERT INTO Answer(content, is_correct, question_id)
select 'answer_2', FALSE, question_id
FROM Question;

INSERT INTO Answer(content, is_correct, question_id)
select 'answer_3', TRUE, question_id
FROM Question;

INSERT INTO Answer(content, is_correct, question_id)
select 'answer_4', FALSE, question_id
FROM Question
where question_content not like '%2';

-- 2 correct answer
INSERT INTO Answer(content, is_correct, question_id)
select 'answer_5', TRUE, question_id
FROM Question
where question_content like '%2'
   or question_content like '%4';
;

-- 5 answer
INSERT INTO Answer(content, is_correct, question_id)
select 'answer_6', FALSE, question_id
FROM Question
where question_content like '%3';
;
COMMIT;
