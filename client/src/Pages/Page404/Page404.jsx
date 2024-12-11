import React from 'react'
import { NavLink } from 'react-router-dom'

function Page404() {
  return (
    <>
     <div className='w-100 d-flex justify-content-center align-items-center p-3 text-center' style={{width:'100%' , height:'100vh'}}>
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <h1 style={{fontSize:'10vw'}}>Oops!</h1>
           <h2> 404  - Page not found</h2>
           <p>We're sorry. The Web address you entered is not a functioning page on our site.</p>
           <NavLink to='/' ><button className='theme_btn mt-3'>GO TO HOMEPAGE</button></NavLink>
        </div>

     </div>

    </>
  )
}

export default Page404