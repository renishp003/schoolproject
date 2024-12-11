import axios from "axios";
import { AdminHeaders, AdminToken, ApiHttp, errorPopup, successPopup, TeacherHeaders } from "../../Constant";
import { TEACHER_CLASS_WORK_REQUEST , TEACHER_CLASS_WORK_SUCCESS, TEACHER_CLASS_WORK_FAILUER } from "../types/type";

export const getTeacherClassWorkData = () => {
    return (dispatch) => {
        dispatch(teacherClassWorkRequest());
        axios.get(`${ApiHttp}/teacherClassWork/getAll` , AdminToken ? AdminHeaders : TeacherHeaders ).then(res => {
            const data = res.data.data
           dispatch(teacherClassWorkSuccess(data))
        })
    }
}




export const teacherClassWorkRequest = () => {
    return {
        type: TEACHER_CLASS_WORK_REQUEST
    }
}

export const teacherClassWorkSuccess = (data) => {
    return {
        type: TEACHER_CLASS_WORK_SUCCESS,
        payload : data
    }
}

export const teacherClassWorkfailure = (error) => {
    return {
        type: TEACHER_CLASS_WORK_FAILUER,
        payload : error
    }
}