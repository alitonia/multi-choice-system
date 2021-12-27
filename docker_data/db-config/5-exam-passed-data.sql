START TRANSACTION;

INSERT INTO Account
VALUES (4997,
        'bingolado_test@alitonia.cc',
        '$2b$12$QsIInLIE6l/xocqmfnE0DOdGurb4FMZfBviizQMiiwzMFUq3Z.FFa',
        '$2b$12$QsIInLIE6l/xocqmfnE0DO',
        'test_examiner',
        '1992-01-01',
        '0123',
        TRUE,
        2),
       (4998,
        'bingolado_test1@alitonia.cc',
        '$2b$12$QsIInLIE6l/xocqmfnE0DOdGurb4FMZfBviizQMiiwzMFUq3Z.FFa',
        '$2b$12$QsIInLIE6l/xocqmfnE0DO',
        'test_examinee',
        '1992-01-01',
        '0123',
        TRUE,
        3),
       (4999,
        'bingolado_test2@alitonia.cc',
        '$2b$12$QsIInLIE6l/xocqmfnE0DOdGurb4FMZfBviizQMiiwzMFUq3Z.FFa',
        '$2b$12$QsIInLIE6l/xocqmfnE0DO',
        'test_examinee',
        '1992-01-01',
        '0123',
        TRUE,
        3),
       (5000,
        'bingolado_test3@alitonia.cc',
        '$2b$12$QsIInLIE6l/xocqmfnE0DOdGurb4FMZfBviizQMiiwzMFUq3Z.FFa',
        '$2b$12$QsIInLIE6l/xocqmfnE0DO',
        'test_examinee',
        '1992-01-01',
        '0123',
        TRUE,
        3)
;

INSERT INTO Examiner(account_id, department)
VALUES (4997, 'Natural Science');

INSERT INTO Examinee(account_id)
VALUES (4998),
       (4999),
       (5000);

INSERT INTO Exam(exam_id, creator, exam_name, subject, start_time, duration)
VALUES (4, 4997, 'Third done alitonia test', 'DB', '2021-12-01 12:05:06', '02:35');

INSERT INTO Participant
VALUES (4, 4998),
       (4, 4999),
       (4, 5000);

INSERT INTO Question(question_id, question_content, exam_id, question_group_id, question_type_id)
VALUES (20, 'test_content_1', 4, 1, 1),
       (21, 'test_content_2', 4, 1, 1),
       (22, 'test_content_3', 4, 1, 1),
       (23, 'test_content_4', 4, 1, 1),
       (24, 'test_content_5', 4, 1, 1);

INSERT INTO Answer(answer_id, content, is_correct, question_id)
VALUES (80, 'test_content_1', TRUE, 20),
       (81, 'test_content_1', TRUE, 21),
       (82, 'test_content_1', FALSE, 21),

       (83, 'test_content_1', FALSE, 22),
       (84, 'test_content_1', TRUE, 22),
       (85, 'test_content_1', FALSE, 22),

       (86, 'test_content_1', FALSE, 23),
       (87, 'test_content_1', TRUE, 23),
       (88, 'test_content_1', FALSE, 23),
       (89, 'test_content_1', FALSE, 23),

       (90, 'test_content_1', FALSE, 24),
       (91, 'test_content_1', TRUE, 24),
       (92, 'test_content_1', FALSE, 24),
       (93, 'test_content_1', FALSE, 24);

INSERT INTO Choice(question_id, answer_id, examinee_account_id)
VALUES (20, 80, 4998),
       (21, 81, 4998),
       (22, 84, 4998),
       (23, 87, 4998),
       (24, 91, 4998),

       (20, 80, 4999),
--        (21, 82, 4999),
--        (22, 83, 4999),
       (23, 87, 4999),
       (24, 93, 4999),

       (20, 80, 5000),
--        (21, 81, 5000),
--        (22, 83, 5000),
--        (23, 86, 5000),
       (24, 93, 5000);

COMMIT;

