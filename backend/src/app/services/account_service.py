from argparse import ArgumentError
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.account import Account
from app.models.role import Role
from sqlalchemy import update, delete, select, join
import bcrypt
from datetime import datetime
from app.utils.decrypt_encrypt_service import DecryptAndEnCrypt


def get_account_no_pass_filter(account):
    return Account(
        account_id=account.account_id,
        email=account.email,
        name=account.name,
        date_of_birth=account.date_of_birth,
        phone_number=account.phone_number,
        # role_id=account.role_id,
        role=account.role
    )


de = DecryptAndEnCrypt()


class Account_Service:
    def __init__(self, session):
        self.session = session

    async def get_one_account(self, account_id):
        result_arbit_data = await self.session.execute(
            select(Account, Role).where(Account.account_id == account_id)
                .join(Role, Account.role_id == Role.role_id)
        )
        result_list = [x for x in result_arbit_data]

        result = result_list[0] if len(result_list) > 0 else None
        if result is None:
            return None

        account = result[0]
        role = result[1]
        account.role = role
        return account

    # GET one account
    async def get_one_account_no_pass(self, account_id):
        result = await self.get_one_account(account_id)
        if result is not None:
            return get_account_no_pass_filter(result)
        else:
            return None

    # GET accounts
    async def get_accounts_no_pass(
            self,
            skip: int = 0,
            limit: int = 15,
            email: Optional[str] = None,
            role: Optional[str] = None,
    ):
        q = (
            select(Account, Role)
                .join(Role, Account.role_id == Role.role_id)
                .limit(limit)
        )
        if email is not None:
            print(email)
            q = q.filter(Account.email == email)

        if role is not None:
            q = q.filter(Role.name == role)

        # skip after filter
        q = q.offset(skip)

        result_arbit_data = await self.session.execute(q)

        result_list = [x for x in result_arbit_data]
        # first entry is account, second is role
        for entry in result_list:
            entry[0].role = entry[1]
        return [get_account_no_pass_filter(x[0]) for x in result_list]

    # POST
    async def add_account(
            self,
            email: str,
            name: str,
            date_of_birth: str,
            phone_number: str,
            role_id: int,
            password: str
    ):
        (hash_password, salt_encoded) = de.encrypt(password)

        result_arbit_data = await self.session.execute(
            select(Role).where(Role.role_id == role_id)
        )
        result_arbit_data_list = [x for x in result_arbit_data]

        if len(result_arbit_data_list) == 0:
            raise ArgumentError(None, "Invalid role_id value")

        role = result_arbit_data_list.pop(0)
        new_q = Account(
            email=email,
            name=name,
            date_of_birth=datetime.strptime(date_of_birth, "%Y-%m-%d"),
            phone_number=phone_number,
            role_id=role_id,
            hash_password=hash_password,
            salt=salt_encoded,
        )

        self.session.add(new_q)
        await self.session.flush()
        await self.session.commit()  # might not need

        new_account = get_account_no_pass_filter(new_q)

        new_account.role = role.Role  # don't know why, but it works 😇
        return new_account

    # PUT
    async def edit_account(
            self,
            id: int,
            email: str,
            name: str,
            date_of_birth: str,
            phone_number: str,
            role_id: int,
    ):
        q = (update(Account).where(Account.account_id == id)
             .values(email=email)
             .values(name=name)
             .values(date_of_birth=datetime.strptime(date_of_birth, "%Y-%m-%d"))
             .values(phone_number=phone_number)
             .values(role_id=role_id)
             )
        q.execution_options(synchronize_session="fetch")

        await self.session.execute(q)
        await self.session.commit()
        return await self.get_one_account_no_pass(id)

    # DELETE
    async def delete_question(self, account_id):
        q = delete(Account).where(Account.account_id == account_id)
        await self.session.execute(q)
        await self.session.commit()

        return {"status": "OK"}

    async def change_account_visibility(self, account_id, visibility):
        q = (
            update(Account).where(Account.account_id == account_id)
                .values(enable=visibility)
        )
        q.execution_options(synchronize_session="fetch")

        await self.session.execute(q)
        await self.session.commit()
        return {"status": "OK"}

    # Enable account
    async def enable_account(self, account_id):
        return await self.change_account_visibility(account_id, True)

    # Disable account
    async def disable_account(self, account_id):
        return await self.change_account_visibility(account_id, False)
