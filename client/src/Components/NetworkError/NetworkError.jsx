import React from 'react'
import { BsWifiOff } from 'react-icons/bs'

function NetworkError() {
  return (
    <>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:'100vh'}}>
            <div>
                <div className='d-flex align-items-center justify-content-center'>
                    <BsWifiOff size={60} color='white' className='me-4 p-2 border_radius_50' style={{backgroundColor:'gray'}} />
                    <h1 className='text-danger display-3'>You're offline now</h1>
                </div>
                <h6 className='display-6' style={{fontSize:'30px'}}>Oops! Internet disconnected.</h6>
                <h6 className='display-6 mt-5' style={{fontSize:'20px'}}>Check your internet connection.</h6>
            </div>
        </div>
    </>
  )
}

export default NetworkError