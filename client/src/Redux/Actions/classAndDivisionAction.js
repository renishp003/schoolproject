import axios from "axios";
import { AdminHeaders, ApiHttp, errorPopup, successPopup } from "../../Constant";
import { CLASS_DIVISION_REQUEST , CLASS_DIVISION_SUCCESS, CLASS_DIVISION_FAILUER } from "../types/type";

export const getClassAndDivisionData = () => {
    return (dispatch) => {
        dispatch(classAndDivisionRequest());
        axios.get(`${ApiHttp}/classAndDivision/get` , AdminHeaders).then(res => {
            const data = res.data.data
           dispatch(classAndDivisionSuccess(data))
        })
    }
}
export const addclassAndDivisionData = (data) => {
    return (dispatch) => {
        dispatch(classAndDivisionRequest());
        axios.post(`${ApiHttp}/classAndDivision/add` , data , AdminHeaders).then(res => {
           if(res.data.isSuccess){
            successPopup(res.data.message)
            dispatch(getClassAndDivisionData())
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const deleteclassAndDivisionData = (id) => {
    return (dispatch) => {
        dispatch(classAndDivisionRequest());
        axios.delete(`${ApiHttp}/classAndDivision/delete?id=${id}`).then(res => {
            if(res.data.isSuccess){
                dispatch(getClassAndDivisionData())
                successPopup(res.data.message)
           }
           else{
            errorPopup(res.data.message)
           }
        })
    }
}

export const classAndDivisionRequest = () => {
    return {
        type: CLASS_DIVISION_REQUEST
    }
}

export const classAndDivisionSuccess = (data) => {
    return {
        type: CLASS_DIVISION_SUCCESS,
        payload : data
    }
}

export const classAndDivisionfailure = (error) => {
    return {
        type: CLASS_DIVISION_FAILUER,
        payload : error
    }
}