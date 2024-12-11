import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'

function Teacher() {
  return (
    <>
      <div className='col-2 m-0 p-0'>
        {
          localStorage.getItem('teacher') ?
          <>
            <Sidebar pathName='teacher' />
          </> :
          <>
          </>
        }
      </div>
      <Outlet />
    </>
  )
}

export default Teacher