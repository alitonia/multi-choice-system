from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.param_functions import Body
from sqlalchemy.ext.asyncio.session import AsyncSession
from sqlalchemy.orm import Session

from app.core import errors
from app.core.db import get_session
from app.core.principal import Principal
from app.api.libs import security
from app.services.exam_service import Exam_Service

from app.services.question_service import Question_Service
from app.services import choice_service, participant_exam_service
from app.schemas.question import (
    Question_Schema,
    Question_Schema_POST_Params,
    Question_Schema_PUT_Params,
    Question_Schema_DEL_Params
)
from app.schemas.exam import ExamAnswerSchemaIn, ExamFinishSchemaIn, ExamSchemaOut


from app.schemas.exam import (
    ExamNewInputSchema,
    ExamEditInputSchema,
    ExamDelInputSchema,
    ExamAddExamineeInputSchema
)
from app.services.account_service import Account_Service


router = APIRouter()


@router.get("/exam/get/{exam_id}")
async def show_exam(
        exam_id: int,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(exam_id, account)
        if is_viewer is False:
            return None

    exam = await qs.get_one_exam(exam_id, account)
    return exam


@router.get("/exams/get")
async def show_exams(
        skip: int = 0,
        limit: int = 15,
        s: Session = Depends(get_session),
        sort: str = None,
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(-1, account)
        if is_viewer is False:
            return None

    exams = await qs.get_exams(account, skip, limit, sort)
    count = await qs.get_exams_count(account)

    result = dict()
    result["exams"] = exams
    result["total"] = count["total"]
    return result


@router.get("/exams/total")
async def get_exam_count(
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    exams = await qs.get_exams_count(account)
    return exams


@router.post("/exam/start")
async def start_exam(exam_id: int = Body(..., embed=True), session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
    exam_service = Exam_Service(session=session)
    account_id = principal.account_id

    participant = await exam_service.get_participant_exam(
        exam_id=exam_id, examinee_id=account_id)
    if not participant:
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"Exam does not exist or you don't have permission to access this"))
    participant_exam = await participant_exam_service.get_participant_exam(session=session, exam_id=exam_id, examinee_id=account_id)
    if participant_exam:
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"You have already done this exam"))

    await participant_exam_service.create_participant_exam(session=session, exam_id=exam_id, examinee_id=account_id)

#
# @router.get("/exam/{exam_id}", response_model=ExamSchemaOut)
# async def get_examinee_exam(exam_id: int, session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
#     exam_service = Exam_Service(session=session)
#     question_service = Question_Service(session=session)
#     account_id = principal.account_id
#
#     participant = await exam_service.get_participant_exam(
#         exam_id=exam_id, examinee_id=account_id)
#     if not participant:
#         raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
#             f"Exam does not exist or you don't have permission to access this"))
#
#     questions = await question_service.get_exam_questions(exam_id=exam_id)
#
#     output_questions = []
#     for question in questions:
#         answers = await question_service.get_question_answers(question_id=question.question_id)
#         num_of_correct_answers = 0
#         for answer in answers:
#             if answer.is_correct:
#                 num_of_correct_answers += 1
#         answers_dict = [answer.__dict__ for answer in answers]
#         question_dict = question.__dict__
#         question_dict["answers"] = answers_dict
#         question_dict["num_of_correct_answers"] = num_of_correct_answers
#
#         output_questions.append(question_dict)
#
#     output_exam = participant.exam.__dict__
#     output_exam["questions"] = output_questions
#
#     # TODO: construct a schema output for this
#     return output_exam


@router.post("/exam/{exam_id}/answers")
async def answer_question(exam_id: int, body: ExamAnswerSchemaIn, session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
    exam_service = Exam_Service(session=session)
    question_service = Question_Service(session=session)

    account_id = principal.account_id
    # TODO: check for legibility

    question_id = body.question_id
    answers_id = body.answers_id

    question = await question_service.get_question(question_id=question_id)
    question_answers_id = [answer.answer_id for answer in question.answers]
    if not all(item in question_answers_id for item in answers_id):
        raise HTTPException(status_code=400, detail=errors.create_http_exception_detail(
            f"Answers don't belong to this question"))

    # delete previous choices and save the new ones
    await choice_service.delete_choices(session=session, question_id=question_id, examinee_id=account_id)

    await choice_service.save_choices(session=session, question_id=question_id, answers_id=answers_id, examinee_id=account_id)

    # TODO construct a schema output for this
    return {"message": "ok"}


@router.post("/exam/finish")
async def finish_exam(body: ExamFinishSchemaIn, session: AsyncSession = Depends(get_session), principal: Principal = Depends(security.get_current_user)):
    exam_service = Exam_Service(session=session)
    question_service = Question_Service(session=session)

    account_id = principal.account_id
    # TODO: check for legibility
    exam_id = body.exam_id
    participant_exam = await participant_exam_service.get_participant_exam(session=session, exam_id=exam_id, examinee_id=account_id)

    questions = await question_service.get_exam_questions(exam_id=exam_id)
    score = 0
    for question in questions:
        answers = await question_service.get_question_answers(question_id=question.question_id)
        num_of_correct_answers = 0
        for answer in answers:
            if answer.is_correct:
                num_of_correct_answers += 1
        answers_id = [answer.answer_id for answer in answers]
        choices = await choice_service.get_choices(session=session, question_id=question.question_id, examinee_id=account_id)
        if not choices:
            continue
        choices_id = [choice.answer_id for choice in choices]
        if all(item in choices_id for item in answers_id) and all(item in answers_id for item in choices_id):
            score += 1

    await participant_exam_service.finish_participant_exam(session=session, participant_exam=participant_exam, score=score)


@router.post("/exam/new")
async def create_exam(
        item: ExamNewInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    can_create_exam = account["role"]["name"] in ['examiner', 'admin']
    if can_create_exam is False:
        return None

    # return account
    exam = qs.add_exam(
        item.exam_name,
        item.subject,
        item.start_time,
        item.duration,
        account_id
    )
    return await exam


@router.put("/exam/edit")
async def update_question(
        item: ExamEditInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(item.exam_id, account)
        if is_viewer is False:
            return None

    # return account
    exam = qs.edit_exam(
        item.exam_id,
        item.exam_name,
        item.subject,
        item.start_time,
        item.duration,
    )
    return await exam


@router.delete("/exam/del/{exam_id}")
async def update_question(
        exam_id,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(exam_id, account)
        if is_viewer is False:
            return None

    questions = qs.delete_exam(
        exam_id
    )
    return await questions


@router.put("/exam/edit/add_examinees")
async def add_examinees_to_exam(
        item: ExamAddExamineeInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(item.exam_id, account)
        if is_viewer is False:
            return None

    exam = await qs.add_examinees(
        item.exam_id,
        item.emails
    )
    return exam


@router.put("/exam/edit/remove_examinees")
async def add_examinees_to_exam(
        item: ExamAddExamineeInputSchema,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)
    account_id = principal.account_id

    qs1 = Account_Service(s)
    account = await qs1.get_one_account_no_pass(account_id)

    role_name = account["role"]["name"]
    if role_name != "admin":
        is_viewer = qs.check_exam_viewer(item.exam_id, account)
        if is_viewer is False:
            return None

    exam = await qs.remove_examinees(
        item.exam_id,
        item.emails
    )
    return exam


@router.get("/exam/get_examinees")
async def add_examinees_to_exam(
        exam_id:int= None,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)

    exam = await qs.get_examinees(
        exam_id
    )
    return exam


@router.get("/exam/get_not_examinees")
async def ge_not_examinees(
        exam_id: str = None,
        s: Session = Depends(get_session),
        principal: Principal = Depends(security.get_current_user)
):
    qs = Exam_Service(s)

    exam = await qs.get_non_examinees(
        exam_id
    )
    return exam
