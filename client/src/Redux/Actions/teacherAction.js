import { TEACHER_REQUEST, TEACHER_SUCCESS, TEACHER_FAILUER } from "../types/type";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminHeaders, ApiHttp, errorPopup, successPopup ,AdminToken, TeacherHeaders } from "../../Constant";
import { isLoader } from "./loaderAction";

export const getTeacherData = () => {
    return async (dispatch) => {
        dispatch(teacherRequest());
            // dispatch(isLoader(true))
            axios.get(`${ApiHttp}/teacher/get` , AdminToken ?AdminHeaders : TeacherHeaders).then(async(res) => {
                const data = res.data.data
                dispatch(teacherSuccess(data))
                dispatch(isLoader(false))
            })
    }
}

export const addTeacherData = (data) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        if(AdminToken){
            dispatch(isLoader(true))
            axios.post(`${ApiHttp}/teacher/add`, data , AdminHeaders).then(res => {
                if (res.data.isSuccess) {
                    successPopup(res.data.message)
                    dispatch(getTeacherData())
                    dispatch(isLoader(false))
                }
                else {
                    errorPopup(res.data.message)
                }
            })
        }
    }
}

export const editTeacherData = (data) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        if(AdminToken){
            dispatch(isLoader(true))
            axios.post(`${ApiHttp}/teacher/edit`, data ).then(res => {
                if (res.data.isSuccess) {
                    successPopup(res.data.message)
                    dispatch(getTeacherData())
                    dispatch(isLoader(false))
                }
                else {
                    dispatch(isLoader(false))
                    errorPopup(res.data.message)
                }
            })
        }
    }
}

export const deleteTeacherData =  (id) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        axios.delete(`${ApiHttp}/teacher/delete?id=${id}`).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getTeacherData())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const addTeacherNewWork = (data) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        axios.post(`${ApiHttp}/teacher/addWork?id=${data.id}` , data , AdminHeaders).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getTeacherData())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const deleteTeacherNewWork = (data) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        axios.post(`${ApiHttp}/teacher/deleteWork` , data).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getTeacherData())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const editTeacherWork = (data) => {
    return (dispatch) => {
        dispatch(teacherRequest());
        axios.post(`${ApiHttp}/teacher/editWork?id=${data.teacherId}` , data , AdminHeaders).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getTeacherData())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const teacherRequest = () => {
    return {
        type: TEACHER_REQUEST
    }
}

export const teacherSuccess = (data) => {
    return {
        type: TEACHER_SUCCESS,
        payload: data
    }
}

export const teacherfailure = (error) => {
    return {
        type: TEACHER_FAILUER,
        payload: error
    }
}