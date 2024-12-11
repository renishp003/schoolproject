import { ADMIN_REQUEST, ADMIN_SUCCESS, ADMIN_FAILUER } from "../types/type";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminHeaders, ApiHttp, errorPopup, successPopup } from "../../Constant";
import { getStudentDataByToken } from "./studentAction";

export const getAdminData = () => {
    return (dispatch) => {
        dispatch(adminRequest());
        axios.get(`${ApiHttp}/admin/get`).then(res => {
            const data = res.data.data
            dispatch(adminSuccess(data))
        })
    }
}


export const addAdminData = (data) => {
    return (dispatch) => {
        dispatch(adminRequest());
        axios.post(`${ApiHttp}/admin/add`, data).then(res => {
            if (res.data.isSuccess) {
                successPopup(res.data.message)
                dispatch(getAdminData())
            }
            else {
                errorPopup(res.data.message)
            }
        })
    }
}

export const editAdminData = (data) => {
    return (dispatch) => {
        dispatch(adminRequest());
        axios.post(`${ApiHttp}/admin/edit?id=${data._id}`, { branch: data.branch }).then(res => {
            if (res.data.isSuccess) {
                successPopup(res.data.message)
                dispatch(getAdminData())
            }
            else {
                errorPopup(res.data.message)
            }
        })
    }
}

export const deleteAdminData = (id) => {
    return (dispatch) => {
        dispatch(adminRequest());
        axios.delete(`${ApiHttp}/admin/delete?id=${id}`).then(res => {
            if (res.data.isSuccess) {
                dispatch(getAdminData())
                successPopup(res.data.message)
            }
            else {
                errorPopup(res.data.message)
            }
        })
    }
}

export const editStudentByAdmin =  (value) => {
    console.log(value)
    return (dispatch) => {
        dispatch(adminRequest());
        // let formData = new FormData()
        // formData.append('surname' , value.surname)
        // formData.append('name' , value.name)
        // formData.append('fatherName' , value.fatherName)
        // formData.append('mobile' , value.mobile)
        // formData.append('address' , value.address)
        // formData.append('birthDate' , value.birthDate)
        axios.post(`${ApiHttp}/admin/editStudent?id=${value._id}` , value ).then(res => {
            if(res.data.isSuccess){
                dispatch(getStudentDataByToken())
                successPopup(res.data.message)
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const checkAdminPassword = async (password) => {
    let aa = await axios.post(`${ApiHttp}/admin/checkAdminPassword`, { password: password }, AdminHeaders)
    return aa
}

export const adminLogin = (value) => {
    return async (dispatch) => {
        dispatch(adminRequest());
        await axios.post(`${ApiHttp}/admin/login`, value).then(res => {
            if (res.data.isSuccess == true) {
                localStorage.setItem('admin', res.data.token);
                localStorage.removeItem('superAdmin');
                localStorage.removeItem('teacher');
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login successfull',
                    showConfirmButton: false,
                    timer: 1500
                })
                successPopup('Login Successful.')
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            else {
                errorPopup(res.data.message);
            }
        })
    }
}

export const adminRequest = () => {
    return {
        type: ADMIN_REQUEST
    }
}

export const adminSuccess = (data) => {
    return {
        type: ADMIN_SUCCESS,
        payload: data
    }
}

export const adminfailure = (error) => {
    return {
        type: ADMIN_FAILUER,
        payload: error
    }
}