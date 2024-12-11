import axios from "axios";
import { ApiHttp, errorPopup, successPopup } from "../../Constant";
import { SCHOOL_REQUEST , SCHOOL_SUCCESS, SCHOOL_FAILUER } from "../types/type";
import { getAdminData } from "./adminAction";

export const getSchoolData = () => {
    return (dispatch) => {
        dispatch(schoolRequest());
        axios.get(`${ApiHttp}/school/get`).then(res => {
            const data = res.data.data
           dispatch(schoolSuccess(data))
        })
    }
}
export const addSchoolData = (data) => {
    return (dispatch) => {
        dispatch(schoolRequest());
        axios.post(`${ApiHttp}/school/add` , data).then(res => {
           dispatch(getSchoolData())
           if(res.data.isSuccess){
            successPopup(res.data.message)
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const editSchoolData = (data) => {
    return (dispatch) => {
        dispatch(schoolRequest());
        axios.patch(`${ApiHttp}/school/edit?id=${data.id}` , {schoolName : data.schoolName}).then(res => {
            if(res.data.isSuccess){
               dispatch(getSchoolData())
                successPopup(res.data.message)
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const deleteSchoolData = (id) => {
    return (dispatch) => {
        dispatch(schoolRequest());
        axios.delete(`${ApiHttp}/school/delete?id=${id}`).then(res => {
            if(res.data.isSuccess){
               dispatch(getSchoolData())
               dispatch(getAdminData())
                successPopup(res.data.message)
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const schoolRequest = () => {
    return {
        type: SCHOOL_REQUEST
    }
}

export const schoolSuccess = (data) => {
    return {
        type: SCHOOL_SUCCESS,
        payload : data
    }
}

export const schoolfailure = (error) => {
    return {
        type: SCHOOL_FAILUER,
        payload : error
    }
}