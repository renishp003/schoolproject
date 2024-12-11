import axios from "axios";
import { AdminHeaders, AdminToken, ApiHttp, errorPopup, StudentToken, successPopup, teacherToken } from "../../Constant";
import { NOTICE_REQUEST, NOTICE_SUCCESS, NOTICE_FAILUER } from "../types/type";

export const getNoticeData = () => {
    return async (dispatch) => {
        dispatch(noticeRequest());
        let token;
        if (teacherToken) {
            token = teacherToken;
        }
        else if (AdminToken) {
            token = AdminToken
        }
        else if (StudentToken) {
            token = StudentToken
        }
        const AllHeaders = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        console.log(await token)
        if (token) {
            axios.get(`${ApiHttp}/notice/get`, AllHeaders).then(res => {
                const data = res.data.data
                dispatch(noticeSuccess(data))
            })
        }
    }
}
export const addNoticeData = (data) => {
    return (dispatch) => {
        dispatch(noticeRequest());
        const header = {
            headers: {
                'Authorization': 'Bearer ' + AdminToken
            }
        }
        let formData = new FormData()
        formData.append('noticeDiscription', data.noticeDiscription)
        formData.append('userType', data.userType)
        formData.append('noticeImage', data.noticeImage)
        if (AdminToken) {
            axios.post(`${ApiHttp}/notice/add`, formData, header).then(res => {
                if (res.data.isSuccess) {
                    dispatch(getNoticeData())
                    successPopup(res.data.message)
                }
                else {
                    errorPopup(res.data.message)
                }
            })
        }
    }
}

export const deleteNoticeData = (id) => {
    return (dispatch) => {
        dispatch(noticeRequest());
        if (AdminToken) {
            axios.delete(`${ApiHttp}/notice/delete?id=${id}`,AdminHeaders).then(res => {
                if (res.data.isSuccess) {
                    dispatch(getNoticeData())
                    successPopup(res.data.message)
                }
                else {
                    errorPopup(res.data.message)
                }
            })
        }
    }
}



export const noticeRequest = () => {
    return {
        type: NOTICE_REQUEST
    }
}

export const noticeSuccess = (data) => {
    return {
        type: NOTICE_SUCCESS,
        payload: data
    }
}

export const noticefailure = (error) => {
    return {
        type: NOTICE_FAILUER,
        payload: error
    }
}