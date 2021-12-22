from argparse import ArgumentError
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.account import Account
from app.models.examiner import Examiner
from app.models.examinee import Examinee
from app.models.admin import Admin

from app.models.role import Role
from sqlalchemy import update, delete, select, join
from datetime import datetime
from app.utils.decrypt_encrypt_service import DecryptAndEnCrypt
from fastapi.encoders import jsonable_encoder

de = DecryptAndEnCrypt()


class Account_Service:
    def __init__(self, session):
        self.session = session
        self.date_format = "%d-%m-%Y"
        self.original_date_format = "%Y-%m-%d"

    def convert_datetime_str_to_dmy_str(self, datetime_str, base_format=None):
        original_date_format = base_format if base_format is not None else self.original_date_format

        return (
            datetime.strptime(datetime_str, original_date_format)
                .strftime(self.date_format)
        )

    async def add_additional_info(self, json_account, account_id, role_name):
        additional_info = await self.get_specific_info(account_id, role_name)
        print(additional_info)

        if len(additional_info) > 0:
            json_account["additional_info"] = (
                additional_info[0] if isinstance(additional_info, List) else additional_info
            )
        else:
            json_account["additional_info"] = None
        return json_account

    def get_account_no_pass_filter(self, account, date_format=None):
        filtered_account = Account(
            account_id=account.account_id,
            email=account.email,
            name=account.name,
            date_of_birth=account.date_of_birth,
            phone_number=account.phone_number,
            # role_id=account.role_id,
            role=account.role
        )
        # manually change date format

        json_account = jsonable_encoder(filtered_account)
        print(json_account["date_of_birth"])
        json_account["date_of_birth"] = self.convert_datetime_str_to_dmy_str(
            json_account["date_of_birth"],
            date_format
        )

        return json_account

    # get 1 role object
    async def get_role(self, role_id: int):
        result_arbit_data = await self.session.execute(
            select(Role).where(Role.role_id == role_id)
        )
        result_list = result_arbit_data.scalars().all()
        return result_list[0] if len(result_list) > 0 else None

    def disec_role(self, role_name: str):
        if role_name == 'examiner':
            return Examiner
        elif role_name == 'examinee':
            return Examinee
        else:
            return Admin

    async def get_specific_info(self, account_id: int, role_name: str):
        target = self.disec_role(role_name)
        q = select(target).where(target.account_id == account_id)
        result = await self.session.execute(q)
        scalar = result.scalars().all()
        return scalar[0] if len(scalar) > 0 else None

    async def get_one_account(self, account_id: int):
        result_arbit_data = await self.session.execute(
            select(Account, Role).where(Account.account_id == account_id)
                .join(Role, Account.role_id == Role.role_id)
        )
        result_list = [x for x in result_arbit_data]

        result = result_list[0] if len(result_list) > 0 else None

        if result is None:
            return None

        account = result[0]
        print(account.date_of_birth)

        role = result[1]
        account.role = role

        return account

    # GET one account
    async def get_one_account_no_pass(self, account_id):
        result = await self.get_one_account(account_id)
        if result is not None:
            filtered = self.get_account_no_pass_filter(result)
            additional_info = await self.get_specific_info(account_id, filtered["role"]["name"])
            filtered["additional_info"] = additional_info
            return filtered
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

        return [self.get_account_no_pass_filter(x[0]) for x in result_list]

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
        role = await self.get_role(role_id)

        if role is None:
            raise ArgumentError(None, "Invalid role_id value")

        (hash_password, salt_encoded) = de.encrypt(password)

        new_q = Account(
            email=email,
            name=name,
            date_of_birth=datetime.strptime(date_of_birth, self.date_format),
            phone_number=phone_number,
            role_id=role_id,
            hash_password=hash_password,
            salt=salt_encoded,
        )

        self.session.add(new_q)
        target = self.disec_role(role.name)
        await self.session.commit()

        self.session.add(target(account_id=new_q.account_id))
        await self.session.commit()

        # for some reason this format is different from the get ;/
        new_account = self.get_account_no_pass_filter(new_q, '%Y-%m-%dT%H:%M:%S')
        new_account["additional_info"] = None
        return new_account

    # PUT
    async def edit_account(
            self,
            id: int,
            name: str,
            date_of_birth: str,
            phone_number: str,
    ):
        q = (update(Account).where(Account.account_id == id)
             .values(name=name)
             .values(date_of_birth=datetime.strptime(date_of_birth, self.date_format))
             .values(phone_number=phone_number)
             )
        q.execution_options(synchronize_session="fetch")

        await self.session.execute(q)
        await self.session.commit()
        pure_account = await self.get_one_account_no_pass(id)

        return pure_account

    # DELETE
    async def delete_accounts(self, account_id):
        pass

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
