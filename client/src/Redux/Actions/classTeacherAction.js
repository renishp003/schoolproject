import axios from "axios";
import { AdminHeaders, AdminToken, ApiHttp, errorPopup, successPopup, TeacherHeaders, teacherToken } from "../../Constant";
import { CLASS_TEACHER_REQUEST , CLASS_TEACHER_SUCCESS, CLASS_TEACHER_FAILUER } from "../types/type";

export const getclassTeacherData = () => {
    return (dispatch) => {
        dispatch(classTeacherRequest());
        if(AdminToken){
            axios.get(`${ApiHttp}/classTeacher/get` , AdminHeaders).then(res => {
                const data = res.data.data
               dispatch(classTeacherSuccess(data))
            })
        }
        if(teacherToken){
            axios.get(`${ApiHttp}/classTeacher/get` , TeacherHeaders).then(res => {
                const data = res.data.data
               dispatch(classTeacherSuccess(data))
            })
        }
    }
}

export const addclassTeacherData = (data) => {
    return (dispatch) => {
        dispatch(classTeacherRequest());
        axios.post(`${ApiHttp}/classTeacher/addTeacher` , data , AdminHeaders).then(res => {
           if(res.data.isSuccess){
            successPopup(res.data.message)
            dispatch(getclassTeacherData())
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const addStudentsInClass = (data) => {
    return (dispatch) => {
        dispatch(classTeacherRequest());
        axios.post(`${ApiHttp}/classTeacher/addStudentInClass` , data ,TeacherHeaders   ).then(res => {
           if(res.data.isSuccess){
            successPopup(res.data.message)
            dispatch(getclassTeacherData())
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const deleteclassTeacherData = (id) => {
    return (dispatch) => {
        dispatch(classTeacherRequest());
        axios.delete(`${ApiHttp}/classTeacher/delete?id=${id}`).then(res => {
            if(res.data.isSuccess){
                dispatch(getclassTeacherData())
                successPopup(res.data.message)
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const classTeacherRequest = () => {
    return {
        type: CLASS_TEACHER_REQUEST
    }
}

export const classTeacherSuccess = (data) => {
    return {
        type: CLASS_TEACHER_SUCCESS,
        payload : data
    }
}

export const classTeacherfailure = (error) => {
    return {
        type: CLASS_TEACHER_FAILUER,
        payload : error
    }
}