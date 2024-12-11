import axios from "axios";
import { ApiHttp, errorPopup, successPopup, TeacherHeaders, teacherToken } from "../../Constant";
import { ASSIGNMENT_REQUEST , ASSIGNMENT_SUCCESS, ASSIGNMENT_FAILUER } from "../types/type";
import { getAdminData } from "./adminAction";

export const getAllAssignmentData = () => {
    return (dispatch) => {
        dispatch(assignmentRequest());
        axios.get(`${ApiHttp}/assignment/getAll`).then(res => {
            console.log(res);
            const data = res.data.data
            // dispatch(assignmentSuccess(data))
        })
    }
}

export const getAssignmentData = () => {
    return (dispatch) => {
        dispatch(assignmentRequest());
        axios.get(`${ApiHttp}/assignment/get` , TeacherHeaders).then(res => {
            console.log(res);
            const data = res.data.data
            dispatch(assignmentSuccess(data))
        })
    }
}

export const uploadNewAssignment = (data) => {
    return (dispatch) => {
        dispatch(assignmentRequest());
         const Headers = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer ' + teacherToken
            }
          }
        let formData = new FormData();
        formData.append('std' , data.std)
        formData.append('sub' , data.sub)
        formData.append('div' , data.div)
        formData.append('assignment' , data.assignment)
        axios.post(`${ApiHttp}/assignment/upload` , formData , Headers).then(res => {
            if (res.data.isSuccess) {
                successPopup(res.data.message)
                dispatch(getAssignmentData())
            }
            else {
                errorPopup(res.data.message)
            }
            // const data = res.data.data
        })
    }
}

export const deleteAssignment = (data) => {
    return (dispatch) => {
        dispatch(assignmentRequest());
        axios.post(`${ApiHttp}/assignment/delete` , data , TeacherHeaders).then(res => {
            if (res.data.isSuccess) {
                successPopup(res.data.message)
                dispatch(getAssignmentData())
            }
            else {
                errorPopup(res.data.message)
            }
            // const data = res.data.data
        })
    }
}

export const  getPdf = async (obj) =>  {
    return await axios.post(`${ApiHttp}/assignment/downloadPdf`, obj,
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', obj.assignmentName); //or any other extension
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => console.log(error));
  }

export const assignmentRequest = () => {
    return {
        type: ASSIGNMENT_REQUEST
    }
}

export const assignmentSuccess = (data) => {
    return {
        type: ASSIGNMENT_SUCCESS,
        payload : data
    }
}

export const assignmentfailure = (error) => {
    return {
        type: ASSIGNMENT_FAILUER,
        payload : error
    }
}