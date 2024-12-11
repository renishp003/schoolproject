import axios from "axios"
import Swal from "sweetalert2";
import { ApiHttp } from "../../Constant";
import { GET_ACTIVITY_PHOTO } from "../types/type";

const getPhotos =(photos)=>({
    type:GET_ACTIVITY_PHOTO,
    payload:photos
})


export const addActivityPhoto = (data)=>{
    return(dispatch)=>{

        const formdata = new FormData()
        formdata.append('name',data.name)
        formdata.append('type',data.type)
        formdata.append('image',data.image[0])

        axios.post(`${ApiHttp}/activity/addActivityPhoto`,formdata).then((res)=>{
            dispatch(getActivityPhoto())
            if(res.data.isSuccess === true){
                Swal.fire({
                    position: 'center',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 2500
                })
            }else{
                Swal.fire({
                    n: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    timer : 2500
                })
            }
        })
    }
}

export const getActivityPhoto = ()=>{
    return(dispatch)=>{
        axios.get(`${ApiHttp}/activity/getData`).then((res)=>{
            dispatch(getPhotos(res.data))
        })
    }
}

export const deleteActivity = (_id)=>{
    return(dispatch)=>{
        axios.delete(`${ApiHttp}/activity/deleteActivity/${_id}`).then((res)=>{
            dispatch(getActivityPhoto())
            if(res.data.isSuccess === true){
                Swal.fire({
                    position: 'center',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 2500
                })
            }else{
                Swal.fire({
                    n: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    timer : 2500
                })
            }
        })
    }
}

export const editActivity=(data)=>{
    return(dispatch)=>{
        let formdata = new FormData()
        formdata.append('name',data.name)
        formdata.append('type',data.type)
        formdata.append('image',data.image[0])
        axios.post(`${ApiHttp}/activity/updateActivity?_id=${data._id}`,formdata).then((res)=>{
            if(res.data.isSuccess === true){
                Swal.fire({
                    position: 'center',
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 2500
                })
            }else{
                Swal.fire({
                    n: 'error',
                    title: 'Oops...',
                    text: res.data.message,
                    timer : 2500
                })
            }
        })
    }
}