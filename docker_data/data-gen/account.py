from faker import Faker
from faker.providers import lorem, address

from get_random_element import get_random_element
import bcrypt

from print_nice_bin import print_nice_bin
from get_random_string import get_random_string

CUSTOMER_LIMIT = 30000
OFFSET = 4

fake = Faker()
Faker.seed(10)
fake.add_provider(lorem)
fake.add_provider(address)

test_salt = bcrypt.gensalt()

test_account_1 = (
    'test_admin@mana.itss',
    bcrypt.hashpw('123456'.encode('utf-8'), test_salt).decode("utf-8"), test_salt.decode("utf-8"),
    'fluffy_admin', '1999-06-06', '0123456788', 'TRUE', 1)

test_account_2 = (
    'test_examiner@mana.itss',
    bcrypt.hashpw('123456'.encode('utf-8'), test_salt).decode("utf-8"), test_salt.decode("utf-8"),
    'mushy_examiner', '1999-06-06', '0123456788', 'TRUE', 2)

test_account_3 = (
    'test_examinee@mana.itss',
    bcrypt.hashpw('123456'.encode('utf-8'), test_salt).decode("utf-8"), test_salt.decode("utf-8"),
    'rusty_examinee', '1999-06-06', '0123456788', 'TRUE', 3)

role_map = {
    "examiner": 2,
    "examinee": 3
}

account_map = {
    "admin": [1],
    "examiner": [2],
    "examinee": [3]
}


def gen_admin():
    data = f"""
    --  Accounts admin
    INSERT INTO Admin(account_id)
    VALUES 
    """

    admins = account_map["admin"]
    for i in range(len(account_map["admin"])):
        data += f"({admins[i]})"

        if i != len(admins) - 1:
            data += ','
        data += '\n'

    data += """;\n
        """

    with open('./data/account.sql', 'a', encoding='utf-8') as f:
        f.write(data)


def gen_examiner():
    data = f"""
    --  Accounts examiner
    INSERT INTO Examiner(account_id, department)
    VALUES 
    """

    examiner = account_map["examiner"]
    print('er', len(examiner))
    departments = ['dp-' + get_random_string(10) for _ in range(max(10, round(len(examiner) / 10)))]

    for i in range(len(account_map["examiner"])):
        data += f"({examiner[i]}, '{get_random_element(departments)}')"

        if i != len(examiner) - 1:
            data += ','
        data += '\n'

    data += """;\n
        """

    with open('./data/account.sql', 'a', encoding='utf-8') as f:
        f.write(data)


def gen_examinee():
    data = f"""
    --  Accounts examiner
    INSERT INTO Examinee(account_id, class, major, examinee_id)
    VALUES 
    """

    examinee = account_map["examinee"]
    print('ee', len(examinee))

    classes = ['cl-' + get_random_string(20) for _ in range(max(3, round(len(examinee) / 50)))]
    major = ['mj-' + get_random_string(7) for _ in range(20)]

    for i in range(len(account_map["examinee"])):
        data += f"({examinee[i]}, '{get_random_element(classes)}', '{get_random_element(major)}', '{str(i).zfill(10)}')"

        if i != len(examinee) - 1:
            data += ','
        data += '\n'

    data += """;\n
        """

    with open('./data/account.sql', 'a', encoding='utf-8') as f:
        f.write(data)


def gen_accounts():
    data = f"""
    --  Accounts
    ALTER SEQUENCE Account_account_id_seq RESTART;
    
    INSERT INTO Account(email, hash_password, salt, name, date_of_birth,phone_number, enable, role_id)
    VALUES 
    {test_account_1},
    {test_account_2},
    {test_account_3},
    """
    _password = 'default_password'
    salt = bcrypt.gensalt().decode("utf-8")
    password_hash = bcrypt.hashpw(_password.encode("utf-8"), salt.encode("utf-8"))

    for i in range(CUSTOMER_LIMIT):
        if i % 10 == 0:
            print(f'{i}')
        name: str = fake.name()
        email = get_random_string(10)+fake.email()

        date_of_birth = fake.date()
        phone_number = '0123456788'
        enable = 'TRUE'
        role_id = get_random_element([i for i in role_map.values()] + [role_map["examinee"] for _ in range(49)])
        data += f"('{email}', '{print_nice_bin(password_hash)}', '{print_nice_bin(salt)}',  '{name}', '{date_of_birth}', '{phone_number}', {enable}, {role_id})"

        if role_id == role_map["examinee"]:
            account_map["examinee"].append(i + OFFSET)
        else:
            account_map["examiner"].append(i + OFFSET)

        if i != CUSTOMER_LIMIT - 1:
            data += ','
        data += '\n'

    data += """;\n
        """

    with open('./data/account.sql', 'w', encoding='utf-8') as f:
        f.write(data)


gen_accounts()
gen_admin()
gen_examiner()
gen_examinee()
