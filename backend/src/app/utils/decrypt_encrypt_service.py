from typing import Tuple
import bcrypt


class DecryptAndEnCrypt:

    def encrypt(self, password: str) -> Tuple[str, str]:
        binary_salt = bcrypt.gensalt()
        binary_passwd = bcrypt.hashpw(password.encode('utf-8'), binary_salt)

        return (binary_passwd.decode('utf-8'), binary_salt.decode('utf-8'))

    def match_password(self, password: str, hashed_password: str) -> bool:
        return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
