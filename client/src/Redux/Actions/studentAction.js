import { STUDENT_REQUEST , STUDENT_SUCCESS , STUDENT_FAILUER } from "../types/type";
import axios from "axios";
import Swal from "sweetalert2";
import { AdminHeaders, ApiHttp, errorPopup, StudentHeaders, successPopup, teacherToken } from "../../Constant";

let token  = localStorage.getItem('admin') || localStorage.getItem('teacher')

const headers = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token 
      }
}

export const getStudentData = () => {
    return (dispatch) => {
        dispatch(studentRequest());
        axios.get(`${ApiHttp}/student/getAll`).then(res => {
           const data = res.data.data
        //    dispatch(studentSuccess(data))
        })
    }
}

export const getStudentDataByToken = () => {
    return (dispatch) => {
        dispatch(studentRequest());
        if(token){
            axios.get(`${ApiHttp}/student/getByToken` , headers).then(res => {
               const data = res.data.data
               let sortedStudents = data.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
               dispatch(studentSuccess(data))
            })
        }
    }
}

export const addStudentData =  (value) => {
    return (dispatch) => {
        dispatch(studentRequest());
        axios.post(`${ApiHttp}/student/addMultiple` , value , headers).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getStudentDataByToken())
            }
            else{
                errorPopup('Something wrong!!')
            }
        })
    }
}

export const addSingleStudentData =  (value) => {
    return (dispatch) => {
        dispatch(studentRequest());
        axios.post(`${ApiHttp}/student/addOne` , value , headers).then(res => {
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

export const editStudentByStudent =  (value) => {
    console.log(value)
    return (dispatch) => {
        dispatch(studentRequest());
        let formData = new FormData()
        formData.append('surname' , value.surname)
        formData.append('name' , value.name)
        formData.append('fatherName' , value.fatherName)
        formData.append('mobile' , value.mobile)
        formData.append('address' , value.address)
        formData.append('birthDate' , value.birthDate)
        formData.append('profile' , value.profile[0])
        axios.post(`${ApiHttp}/student/editStud?id=${value._id}` , formData ).then(res => {
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

export const checkStudentPassword = async (password) => {
    let aa = await axios.post(`${ApiHttp}/admin/checkStudentPassword`, { password: password }, StudentHeaders)
    return aa
}

export const deleteSingleStudentData =  (id) => {
    return (dispatch) => {
        dispatch(studentRequest());
        axios.delete(`${ApiHttp}/student/deleteOne?id=${id}`).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getStudentDataByToken())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}


export const deleteMultipleStudentData =  (data) => {
    return (dispatch) => {
        dispatch(studentRequest());
        axios.post(`${ApiHttp}/student/deleteMany` , {deleteManyId : data}).then(res => {
            if(res.data.isSuccess){
                successPopup(res.data.message)
                dispatch(getStudentDataByToken())
            }
            else{
                errorPopup(res.data.message)
            }
        })
    }
}

export const studentLogin = (value) => {
    return async (dispatch) => {
        dispatch(studentRequest());
        await axios.post(`${ApiHttp}/student/login` , value).then(res => {
           if(res.data.isSuccess == true){
               localStorage.setItem('student' , res.data.token);
                localStorage.removeItem('superAdmin');
                localStorage.removeItem('teacher');
                localStorage.removeItem('admin');
               Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login successfull',
                showConfirmButton: false,
                timer: 1500
              })
              successPopup('Login Successful.')
              setTimeout(() => {
                  window.location.href = '/';
              }, 1500);
           }
           else{
            errorPopup(res.data.message);
           }
        })
    }
}
const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType })
  
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

export const exportStudent = async () => {
    axios.get(`${ApiHttp}/student/getByToken` , AdminHeaders).then(res => {
        const data = res.data.data
        let sortedStudents = data.sort((a, b) => {
         if (a.name < b.name) {
             return -1;
         }
         if (a.name > b.name) {
             return 1;
         }
         return 0;
        });
        let headers = ['grno,name,surname,fatherName,email,mobile,standard,division,fees,batch,address,birthDate,admissionDate,studentCurrentYear']

        let usersCsv = sortedStudents.reduce((acc, user) => {
            const { grno,name,surname,fatherName,email,mobile,standard,division,fees,batch,address,birthDate,admissionDate,studentCurrentYear } = user
            acc.push([ grno,name,surname,fatherName,email,mobile,standard,division,fees,batch,address,birthDate,admissionDate,studentCurrentYear].join(','))
            return acc
        }, [])

        downloadFile({
            data: [...headers, ...usersCsv].join('\n'),
            fileName: 'student.csv',
            fileType: 'text/csv',
        })
    })
}

export const studentRequest = () => {
    return {
        type: STUDENT_REQUEST
    }
}

export const studentSuccess = (data) => {
    return {
        type: STUDENT_SUCCESS,
        payload : data
    }
}

export const studentfailure = (error) => {
    return {
        type: STUDENT_FAILUER,
        payload : error
    }
}