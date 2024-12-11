import axios from "axios";
import Swal from "sweetalert2";
import { isLoader } from "./Redux/Actions/loaderAction";
import store from "./Redux/Store/store";
const dispatch = store.dispatch
export const ApiHttp = 'http://localhost:4000/api';
export let AdminToken = localStorage.getItem('admin')
export let StudentToken = localStorage.getItem('student')
export let superAdminToken = localStorage.getItem('superAdmin')
export let teacherToken = localStorage.getItem('teacher')

export const SuperAdminHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + superAdminToken
  }
}

export const AdminHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + AdminToken
  }
}

export const StudentHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + StudentToken
  }
}
export const TeacherHeaders = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + teacherToken
  }
}

export let token ;
if(teacherToken){
  token = teacherToken;
}
else if(AdminToken){
  token = AdminToken
}
else if(StudentToken){
  token = StudentToken
}

export const AllHeaders = {
  headers: {
    'Authorization': 'Bearer ' + AdminToken || teacherToken || StudentToken
  }
}

export const errorPopup = (error) => {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error,
    timer: 2500
  })
}

export const TokenError = (error) => {
    
  setTimeout(() => {
    localStorage.clear();
    window.location.href = '/';
  }, 2500);
  return Swal.fire({
    icon: 'error',
    title: 'Your session expired!!',
    text: error,
    timer: 2500
  })
}

export const successPopup = (message) => {
  return Swal.fire({
    position: 'center',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 2500
  })
}

export const confirmDeletePopup = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be delete it!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#F08A1D',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
}

export const getschoolName = () => {
  if (AdminToken) {
    return axios.get(`${ApiHttp}/school/getById`, AdminHeaders).then((res) => {
      return res.data.data[0]
    })
  }
}

export const getLoginStudent = () => {
  if (StudentToken) {
    return axios.get(`${ApiHttp}/student/getLoginStudent`, StudentHeaders).then((res) => {
      return res.data.data[0]
    })
  }
}

export const getLoginTeacher = () => {
  if (TeacherHeaders) {
    return axios.get(`${ApiHttp}/teacher/getLoginTeacher`, TeacherHeaders).then((res) => {
      return res.data.data
    })
  }
}

export const getStudentById = (id) => {
  if (StudentToken) {
    return axios.get(`${ApiHttp}/student/getById?id=${id}`, StudentHeaders).then((res) => {
      return res.data.data
    })
  }
}


export const EnquiryAdd = (data) => {
  return axios.post(`${ApiHttp}/enquire/add`, data).then((res) => {
    if (res.data.isSuccess) {
      successPopup(res.data.message)
    }
    else {
      errorPopup(res.data.message)
    }
  })
}

export const getTeacherClassWorkYourStudent = () => {
  return axios.get(`${ApiHttp}/teacherClassWork/yourStudents` , TeacherHeaders ).then(res => {
      return res.data.data
  })
}

export const getAEnquireData = async () => {
  let token = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + AdminToken
    }
  }
  if (AdminToken) {
    return await axios.get(`${ApiHttp}/enquire/getByBranch`, token).then(res => {
      return res.data.data
    })
  }
}


export const verifyToken = (token) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  return axios.get(`${ApiHttp}/verifyToken` , header).then((res) => {
    if(res.data.isSuccess){
      localStorage.clear();
      localStorage.setItem(res.data.role , token);
      return true
    }
    else{
      TokenError()
      return false
    }
  })
}

export const LoginUser = async (data) => {
  dispatch(isLoader(true))
  await axios.post(`${ApiHttp}/login`, data).then(async (res) => {
    if (res.data.isSuccess == true) {
      // localStorage.clear();
      // localStorage.setItem('student', res.data.token);
      dispatch(isLoader(false))
      let tokenSuccess = await verifyToken(res.data.token)
      if(tokenSuccess){
        successPopup('Login Successful.')
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      }
    }
    else {
      dispatch(isLoader(false))
      errorPopup(res.data.message);
    }
  })
}

export const getLoginUser = async (data) => {
  if(StudentToken){
    return await axios.get(`${ApiHttp}/loginUserDetail` , StudentHeaders).then(async (res) => {
      if (res.data.isSuccess == true) {
        return res.data
      }
    })
  }
  else if(teacherToken){
    return await axios.get(`${ApiHttp}/loginUserDetail`, TeacherHeaders).then(async (res) => {
      if (res.data.isSuccess == true) {
        return res.data.data
      }
    })
  }
  if(superAdminToken){
    return await axios.get(`${ApiHttp}/loginUserDetail` , SuperAdminHeaders).then(async (res) => {
      if (res.data.isSuccess == true) {
        return res.data.data
      }
    })
  }
  if(AdminToken){
    return await axios.get(`${ApiHttp}/loginUserDetail` , AdminHeaders).then(async (res) => {
      if (res.data.isSuccess == true) {
        return res.data.data
      }
    })
  }
}