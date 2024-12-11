import React, { useEffect, useState } from 'react';
import './Header.css'
import { GiBookmarklet ,GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';


function Header() {
  // const [studentLogin, setstudentLogin] = useState(localStorage.getItem('student'))
  let studentLogin = localStorage.getItem('student')
  let adminLogin = localStorage.getItem('admin')
  let schoolLogin = localStorage.getItem('superAdmin')
  let teacherLogin = localStorage.getItem('teacher')
  const [accountRoute, setaccountRoute] = useState('superAdmin')
  useEffect(() => {
    if(studentLogin){
      setaccountRoute('/account')
    }
    else if(adminLogin){
      setaccountRoute('/admin')
    }
    else if(schoolLogin){
      setaccountRoute('/superAdmin')
    }
    else if(teacherLogin){
      setaccountRoute('/teacher')
    }
    else{

    }
  }, [])
  
  return (
    <>
      <div className="header">
        <div className='row m-0 h-100 align-items-center justify-content-between'>
        <div className='col-0 col-md-1  cursor_pointer' style={{marginTop:'-10px'}}>
             
          </div>
          <div className='col-6 col-xxl-5 col-md-3 col-sm-8'>
            <div className='logo_Section'>
              <img src="/images/siteLogo.png" alt="" height='60px' />
            </div>
          </div>
          <div className='col-8 col-xxl-6 col-sm-8 menu_Section d-none d-md-block '>
            <div className='d-flex'>
              <div className='d-flex justify-content-evenly' style={{width:'90%'}}>
                <NavLink to='/'><span>Home</span></NavLink>
                <NavLink to='/about'><span>About</span></NavLink>
                <NavLink to='/programs'><span>Our Programs</span></NavLink>
                <NavLink to='/activities'><span>Activity Rooms</span></NavLink>
                <NavLink to='/contact'><span>Contact</span></NavLink>
                
                {
                  (studentLogin || schoolLogin || adminLogin || teacherLogin) ? 
                  <>
                    <div className='login_btn d-flex' style={{width:'10%'}}>
                      <NavLink to={accountRoute} ><span>Account</span></NavLink>
                    </div>
                  </>:
                  <>
                    <div className='login_btn d-flex' style={{width:'10%'}}>
                      <NavLink to='/login' ><span>Login</span></NavLink>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
          <div className='col-1 d-block d-md-none cursor_pointer' style={{marginTop:'-10px'}}>
             <GiHamburgerMenu color='white' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header