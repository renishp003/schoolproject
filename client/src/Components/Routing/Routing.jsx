import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../../LoginRegisterForms/Login/Login'
import About from '../../Pages/About/About'
import Activity from '../../Pages/Activity/Activity'
import Assignment from '../../Pages/Assignment/Assignment'
import ClassAndDivision from '../../Pages/ClassAndDivision/ClassAndDivision'
import ClassTeacher from '../../Pages/ClassTeacher/ClassTeacher'
import Contact from '../../Pages/Contact/Contact'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import ManageStudent from '../../Pages/ManageStudent/ManageStudent'
import Notice from '../../Pages/Notice/Notice'
import Page404 from '../../Pages/Page404/Page404'
import Programs from '../../Pages/Programs/Programs'
import Staff from '../../Pages/Staff/Staff'
import TeacherNotice from '../../Pages/TeacherNotice/TeacherNotice'
import YourClass from '../../Pages/YourClass/YourClass'
import YourJob from '../../Pages/YourJob/YourJob'
import Admin from '../../Rols/Admin/Admin'
import Student from '../../Rols/Student/Student'
import SuperAdmin from '../../Rols/SuperAdmin/SuperAdmin'
import Teacher from '../../Rols/Teacher/Teacher'
import ActivityForm from '../ActivityForm/ActivityForm'
import AdminEnquiry from '../AdminEnquiry/AdminEnquiry'
import Branch from '../Branches/Branch'
import EnrollTopNav from '../EnrollTopNav/EnrollTopNav'
import Header from '../Header/Header'
import StudentAccount from '../StudentAccount/StudentAccount'
import  Kindergarten from '../ProgramsDetails/Kindergarten'
import  Nursery from '../ProgramsDetails/Nursery'
import  Playroud from '../ProgramsDetails/Playroud'
import  Teacher_Training from '../ProgramsDetails/Teacher_Training'
import HomeActivity from '../../Pages/HomeActivity/HomeActivity'

function Routing() {
  const [adminLogin, setadminLogin] = useState(localStorage.getItem('admin'))
  const [teacherLogin, setteacherLogin] = useState(localStorage.getItem('teacher'))
  const [superAdminLogin, setsuperAdminLogin] = useState(localStorage.getItem('superAdmin'))
  const [studentLogin, setstudentLogin] = useState(localStorage.getItem('student'))
  return (
    <>
      <BrowserRouter>
        <div className='row m-0 g-0'>
          <Routes>
            <Route path="/" element={<Student />} />
            <Route path="/" >
              <Route path="about" element={<About />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="account" element={<StudentAccount />}></Route>
              <Route path="contact" element={<Contact />}></Route>
              <Route path="programs" element={<Programs />}></Route>
              <Route path='/playground' element={<Playroud />} />
              <Route path='/nursery' element={<Nursery />} />
              <Route path='/kindergarten' element={<Kindergarten />} />
              <Route path='/teacher_Training' element={<Teacher_Training />} />
              <Route path='/activities' element={<HomeActivity />} />
            </Route>

            <Route path="/admin" element={<Admin />}>
              {
                adminLogin ?
                  <>
                    <Route path="" element={<Navigate to='dashboard' />}></Route>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="student" element={<ManageStudent />}></Route>
                    <Route path="staff" element={<Staff />}></Route>
                    <Route path="enquiries" element={<AdminEnquiry />}></Route>
                    <Route path="classTeacher" element={<ClassTeacher />}></Route>
                    <Route path="classAndDivision" element={<ClassAndDivision />}></Route>
                    <Route path="notice" element={<Notice />}></Route>
                    <Route path='*' element={<Navigate to='../dashboard' />}></Route>
                  </>
                  :
                  <>
                  </>
              }
            </Route>

            <Route path="/teacher" element={<Teacher />} >
              {
                teacherLogin ?
                  <>
                    <Route path="" element={<Navigate to='dashboard' />}></Route>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="yourClass" element={<YourClass />}></Route>
                    <Route path="yourJobs" element={<YourJob />}></Route>
                    <Route path="assignment" element={<Assignment />}></Route>
                    <Route path="notice" element={<TeacherNotice />}></Route>
                    <Route path='*' element={<Navigate to='../dashboard' />}></Route>
                  </>
                  :
                  <>
                  </>
              }
            </Route>

            <Route path="/superAdmin" element={<SuperAdmin />}>
              {
                superAdminLogin ?
                  <>
                    <Route path="" element={<Navigate to='dashboard' />}></Route>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                    <Route path="branch" element={<Branch />}></Route>
                    <Route path="activity" element={<Activity />}></Route>
                  </>
                  :
                  <>
                  </>
              }
            </Route>

            <Route path='*' element={<Page404 />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default Routing