START TRANSACTION;

INSERT INTO Role(role_id, name)
VALUES (1, 'admin'),
       (2, 'examiner'),
       (3, 'examinee');

COMMIT;
