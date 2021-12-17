from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.account import Account
from app.models.role import Role
from sqlalchemy import update, delete, select, join


def get_account_no_pass_filter(account):
    return Account(
        email=account.email,
        name=account.name,
        date_of_birth=account.date_of_birth,
        phone_number=account.phone_number,
        # role_id=account.role_id,
        role=account.role
    )


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

    # # POST
    # async def add_question(self, question_content, exam_id, question_group_id, question_type_id):
    #     new_q = Question(
    #         question_content=question_content,
    #         exam_id=exam_id,
    #         question_group_id=question_group_id,
    #         question_type_id=question_type_id
    #     )
    #     self.session.add(new_q)
    #     await self.session.commit()
    #
    # # PUT
    # async def edit_question(self, question_id, question_content, question_group_id, question_type_id):
    #     q = (update(Question).where(Question.question_id == question_id)
    #          .values(question_content=question_content)
    #          .values(question_group_id=question_group_id)
    #          .values(question_type_id=question_type_id)
    #          )
    #     q.execution_options(synchronize_session="fetch")
    #     await self.session.execute(q)
    #     await self.session.commit()
    #
    # # DELETE
    # async def delete_question(self, question_id):
    #     q = delete(Question).where(Question.question_id == question_id)
    #     await self.session.execute(q)
    #     await self.session.commit()
