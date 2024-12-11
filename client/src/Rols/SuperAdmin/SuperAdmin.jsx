import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, NavLink, Outlet, Route, Routes } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { ApiHttp, getschoolName } from '../../Constant'

function SuperAdmin() {
  const [schoolName, setschoolName] = useState('Super Admin')
  
  return (
    <>
      <div className='col-2 m-0 p-0 d-none d-md-block'>
        {
          localStorage.getItem('superAdmin') ?
          <>
            <Sidebar pathName='superAdmin' schoolName={schoolName}/>
          </> :
          <>
          </>
        }
      </div>
    
    <Outlet />
    </>
  )
}

export default SuperAdmin