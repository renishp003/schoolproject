import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Sidebar.css';
import adminRoute from '../../json_data/admin_route.json'
import superAdminRoute from '../../json_data/super_admin_route.json'
import teacherRoute from '../../json_data/teacher_route.json'
import { BiMenu } from "react-icons/bi";
import OffCanvasSidebar from '../OffCanvasSidebar/OffCanvasSidebar';
import { getLoginTeacher } from '../../Constant';

function Sidebar(props) {
  const [RouteData, setRouteData] = useState([])
  const [userName, setuserName] = useState('')
  const [show, setshow] = useState(false)
  useEffect(() => {
    if (props.pathName == 'superAdmin') {
      setRouteData([...superAdminRoute])
    }
    else if (props.pathName == 'admin') {
      setRouteData([...adminRoute])
    }
    else if (props.pathName == 'teacher') {
      setRouteData([...teacherRoute])
      getLoginTeacherData()
    }
  }, [props])

  const getLoginTeacherData = async () => {
    let user =  await getLoginTeacher();
    setuserName(user?.name)
  
  }

  



  const LogoutUser = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't Logout!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F08A1D',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Successfull!',
          'You are logout.',
          'success'
        )
        localStorage.clear();
        window.location.href = '/'
      }
    })
  }

  const closeSideNav =(data) =>{
    setshow(data)
  }

  return (
    <>
      <div className='sidebar d-none d-md-block'>
        <div className='logo d-flex justify-content-center py-3'>
          <img src="/images/logo.png" alt="" width='80%' />
        </div>
        <div className='d-flex flex-column align-items-center text-white'>
          <h3 className=''>{props.schoolName}</h3>
          <img src="/images/user.png" alt="" width='45%' />
        </div>
        <h5 className='text-white text-center mt-3'>{userName}</h5>
        <hr className='text-white my-4' />
        <div className='menu'>
          {
            RouteData?.map((x, i) => {
              return <NavLink key={i} to={`/${props.pathName}/${x.link}`}><box-icon type='solid' color='#F08A1D' size='xs' name={x.icon}></box-icon><span className='ms-1'>{x.displayText}</span></NavLink>
            })
          }
        </div>
        <hr className='text-white my-4' />
        <div className='menu'>
          <span className='logout_btn' onClick={() => LogoutUser()}>Logout</span>
        </div>
      </div>

      <div className='sidebar d-block d-md-none'>
        <div className='d-flex align-items-center justify-content-center pt-3'>
          <BiMenu color='white ' size={25} onClick={() => setshow(true)} />
        </div>
        <hr className='text-white mb-3' />
        <div className='responsive_menu d-flex flex-column align-items-center justify-content-center p-1'>
          {
            RouteData?.map((x, i) => {
              return <NavLink key={i} to={`/${props.pathName}/${x.link}`} className='p-2 my-1' ><box-icon type='solid' color='#F08A1D' name={x.icon}></box-icon></NavLink>
            })
          }
        </div>
      </div>
      <OffCanvasSidebar show={show} close={closeSideNav} RouteData={RouteData} schoolName={props.schoolName} pathName={props.pathName}/>
    </>
  )
}

export default Sidebar