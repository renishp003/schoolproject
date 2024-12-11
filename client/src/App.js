import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons'
import 'animate.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminData } from './Redux/Actions/adminAction';
import { getStudentDataByToken } from './Redux/Actions/studentAction';
import { getSchoolData } from './Redux/Actions/schoolAction';
import 'react-calendar/dist/Calendar.css';
import Routing from './Components/Routing/Routing';
import NetworkError from './Components/NetworkError/NetworkError';
import { getTeacherClassWorkYourStudent , verifyToken } from './Constant';
import { getTeacherData } from './Redux/Actions/teacherAction';
import Loader from './Components/Loader/Loader';
import { getClassAndDivisionData } from './Redux/Actions/classAndDivisionAction';
import { getclassTeacherData } from './Redux/Actions/classTeacherAction';
import { getTeacherClassWorkData } from './Redux/Actions/teacherClassWorkAction';
import { getAssignmentData  , getAllAssignmentData } from './Redux/Actions/assignmentAction';
import { getNoticeData } from './Redux/Actions/noticeAction';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();
  let AdminToken = localStorage.getItem('admin')
  let StudentToken = localStorage.getItem('student')
  let superAdminToken = localStorage.getItem('superAdmin')
  let token = AdminToken || StudentToken || superAdminToken
  useEffect(() => {
     dispatch(getAdminData())
    //  dispatch(getStudentData())
     dispatch(getSchoolData())
     dispatch(getStudentDataByToken())
     dispatch(getTeacherData())
     dispatch(getClassAndDivisionData())
     dispatch(getclassTeacherData())
     dispatch(getTeacherClassWorkData())
     dispatch(getAssignmentData())
     dispatch(getNoticeData())
  },[])

  useEffect(() => {
    verifyUserToken()
  }, [])
  
  const verifyUserToken = async() =>{
    if(token){
      verifyToken(token)
    }
  }
  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleStatusChange);

    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);
  
  return (
    <>
    {
      isOnline ? 
      <>
      <Loader />
        <Routing /> 
      </>
      :<NetworkError />
    }
    </>
  );
}

export default App;
