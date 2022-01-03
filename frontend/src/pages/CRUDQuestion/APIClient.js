import axios from "axios";

const getExamInfo = async (examID) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("access_token")
    }

    try {
        const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}exam/get/${examID}`, { headers: headers });
        const examInfo = res.data;
        if (res.status === 200 && examInfo) {
            return examInfo;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
};

const getQuestionInfos = async (examID) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("access_token")
    }

    try {
        const res = await axios.get(`http://${process.env.REACT_APP_BACKEND_URL}questions/get/${examID}`, { headers: headers });
        const questionInfos = res.data;
        if (res.status === 200 && questionInfos) {
            return questionInfos;
        }
    } catch (error) {
        console.error(error);
    }

    return null;
};

const createOrUpdateQuestion = async (questionInfo) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        mode: "no-cors"
    }

    try {
        if (questionInfo.question_id >= 0) {
            const updateData = {
                question_id: questionInfo.question_id,
                question_content: questionInfo.question_content,
                question_type_id: questionInfo.question_type_id,
                question_group_id: questionInfo.question_group_id,
                answers: questionInfo.answers
            }

            const res = await axios.put(`http://${process.env.REACT_APP_BACKEND_URL}question`, updateData, { headers: headers });

            if (res.status === 200) {
                return true;
            }
        }
        else {
            const createData = {
                exam_id: questionInfo.exam_id,
                question_content: questionInfo.question_content,
                question_type_id: questionInfo.question_type_id,
                question_group_id: questionInfo.question_group_id,
                answers: questionInfo.answers
            }

            const res = await axios.post(`http://${process.env.REACT_APP_BACKEND_URL}question`, createData, { headers: headers });

            if (res.status === 200) {
                return true;
            }
        }
    } catch (error) {
        console.error(error);
    }

    return false;
};

const deleteQuestion = async (questionID) => {
    try {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }

        const deleteData = {
            question_id: questionID
        }

        const res = await axios.delete(`http://${process.env.REACT_APP_BACKEND_URL}question`, { headers: headers, data: deleteData });

        if (res.status === 200) {
            return true;
        }
    } catch (error) {
        console.error(error);
    }

    return false;
}

export default {
    getExamInfo: getExamInfo,
    getQuestionInfos: getQuestionInfos,
    createOrUpdateQuestion: createOrUpdateQuestion,
    deleteQuestion: deleteQuestion
};
